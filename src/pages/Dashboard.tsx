
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { User, CreditCard, Settings, LogOut, Star, ArrowRight, Package, Calendar, DollarSign, AlertCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface PlanData {
  plan: string;
  billing: string;
  addOns: string[];
  totalPaid: number;
  nextBilling: {
    amount: number;
    date: string;
    frequency: string;
  };
  purchaseDate: string;
  status: string;
  companyName: string;
}

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [planData, setPlanData] = useState<PlanData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserPlanData();
    }
  }, [user]);

  const fetchUserPlanData = async () => {
    try {
      // Fetch the most recent successful submission for this user
      const { data: submissions, error } = await supabase
        .from('intake_submissions')
        .select('*')
        .or(`user_id.eq.${user?.id},email.eq.${user?.email}`)
        .eq('payment_status', 'completed')
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) {
        console.error('Error fetching plan data:', error);
        setLoading(false);
        return;
      }

      if (submissions && submissions.length > 0) {
        const submission = submissions[0];
        
        // Calculate pricing based on plan and billing
        const packagePricing = {
          'basic': { monthlyFee: 25, annualFee: 270 },
          'starter': { monthlyFee: 35, annualFee: 378 },
          'business': { monthlyFee: 69, annualFee: 745 },
          'premium': { monthlyFee: 159, annualFee: 1717 }
        };

        const planDetails = packagePricing[submission.selected_plan as keyof typeof packagePricing];
        const isAnnual = submission.billing === 'annual';
        const planFee = isAnnual ? planDetails.annualFee : planDetails.monthlyFee;

        // Extract add-ons
        const addOns = Object.entries(submission.add_ons || {})
          .filter(([_, enabled]) => enabled)
          .map(([key, _]) => {
            const addonNames = {
              'logo': 'Logo Design',
              'chatbot': 'AI Chatbot',
              'content': 'Content Writing',
              'maintenance': 'Maintenance'
            };
            return addonNames[key as keyof typeof addonNames] || key;
          });

        // Calculate next billing date (30 days from purchase for monthly, 365 days for annual)
        const purchaseDate = new Date(submission.created_at);
        const nextBillingDate = new Date(purchaseDate);
        if (isAnnual) {
          nextBillingDate.setFullYear(nextBillingDate.getFullYear() + 1);
        } else {
          nextBillingDate.setMonth(nextBillingDate.getMonth() + 1);
        }

        setPlanData({
          plan: submission.selected_plan.charAt(0).toUpperCase() + submission.selected_plan.slice(1),
          billing: submission.billing.charAt(0).toUpperCase() + submission.billing.slice(1),
          addOns,
          totalPaid: planFee,
          nextBilling: {
            amount: isAnnual ? 0 : planFee, // Annual plans don't have recurring charges in our model
            date: nextBillingDate.toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            }),
            frequency: isAnnual ? 'annual' : 'monthly'
          },
          purchaseDate: purchaseDate.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }),
          status: 'Active',
          companyName: submission.company_name
        });
      }
    } catch (error) {
      console.error('Error in fetchUserPlanData:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleManageBilling = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal');
      
      if (error) {
        console.error('Error creating customer portal session:', error);
        alert('Unable to access billing portal. Please contact support.');
        return;
      }
      
      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Unable to access billing portal. Please contact support.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-500 via-orange-600 to-black flex items-center justify-center">
        <div className="text-white text-xl">Loading your dashboard...</div>
      </div>
    );
  }

  // No plan purchased - show minimal dashboard
  if (!planData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-500 via-orange-600 to-black">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-400/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Welcome Header */}
            <div className="mb-12">
              <h1 className="text-5xl font-bold text-white mb-4">
                Welcome, <span className="text-orange-300">{user?.user_metadata?.full_name || 'there'}</span>
              </h1>
              <p className="text-xl text-white/80">Ready to get your business online?</p>
            </div>

            {/* No Plan Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-12 border border-white/20 mb-8"
            >
              <div className="flex items-center justify-center space-x-3 mb-6">
                <div className="w-16 h-16 bg-orange-gradient rounded-xl flex items-center justify-center">
                  <AlertCircle className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <h3 className="text-3xl font-bold text-white mb-4">No Active Plan</h3>
              <p className="text-xl text-white/80 mb-8">
                Start your digital transformation journey by choosing a plan that fits your business needs.
              </p>
              
              <motion.button
                onClick={() => navigate('/intake')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-orange-gradient text-white px-8 py-4 rounded-xl font-semibold text-lg inline-flex items-center space-x-2"
              >
                <span>Choose a Plan</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>

            {/* Basic Info Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 mb-8"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-orange-gradient rounded-xl flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Account Information</h3>
              </div>
              
              <div className="space-y-4 text-left">
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Email:</span>
                  <span className="text-white font-semibold">{user?.email}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Account Status:</span>
                  <span className="text-yellow-400 font-semibold">Setup Needed</span>
                </div>
              </div>
            </motion.div>

            {/* Sign Out */}
            <div className="text-center">
              <button
                onClick={handleSignOut}
                className="inline-flex items-center space-x-2 text-white/70 hover:text-white transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Full dashboard with plan data
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-orange-600 to-black">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Welcome Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4">
              Welcome back, <span className="text-orange-300">{user?.user_metadata?.full_name || planData.companyName}</span>
            </h1>
            <p className="text-xl text-white/80">Your digital transformation dashboard</p>
          </div>

          {/* Project Summary Card */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 mb-8"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-orange-gradient rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">Project Summary</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/80">📦 Plan:</span>
                  <span className="text-orange-300 font-semibold">{planData.plan} ({planData.billing})</span>
                </div>
                {planData.addOns.length > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">🧩 Add-Ons:</span>
                    <span className="text-white font-semibold">{planData.addOns.join(', ')}</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-white/80">📅 Purchase Date:</span>
                  <span className="text-white font-semibold">{planData.purchaseDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Status:</span>
                  <span className="text-green-400 font-semibold">{planData.status}</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/80">💰 Total Paid:</span>
                  <span className="text-orange-300 font-bold text-lg">${planData.totalPaid}</span>
                </div>
                {planData.nextBilling.amount > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">📆 Next Billing:</span>
                    <div className="text-right">
                      <div className="text-white font-semibold">${planData.nextBilling.amount}/{planData.nextBilling.frequency}</div>
                      <div className="text-white/60 text-sm">on {planData.nextBilling.date}</div>
                    </div>
                  </div>
                )}
                {planData.billing === 'Annual' && (
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">📆 Next Renewal:</span>
                    <div className="text-right">
                      <div className="text-white font-semibold">{planData.nextBilling.date}</div>
                      <div className="text-white/60 text-sm">annual renewal</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Dashboard Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Current Plan Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-orange-gradient rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Current Plan</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Plan Type</span>
                  <span className="text-orange-300 font-semibold">{planData.plan}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Billing</span>
                  <span className="text-white font-semibold">{planData.billing}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Status</span>
                  <span className="text-green-400 font-semibold">{planData.status}</span>
                </div>
              </div>
            </motion.div>

            {/* Billing Overview Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-orange-gradient rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Billing Overview</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Total Paid</span>
                  <span className="text-white font-semibold">${planData.totalPaid}</span>
                </div>
                {planData.nextBilling.amount > 0 ? (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Next Payment</span>
                      <span className="text-orange-300 font-semibold">${planData.nextBilling.amount}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/80">Due Date</span>
                      <span className="text-white font-semibold">{planData.nextBilling.date}</span>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between items-center">
                    <span className="text-white/80">Renewal Date</span>
                    <span className="text-white font-semibold">{planData.nextBilling.date}</span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Action Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 text-left group"
            >
              <User className="w-8 h-8 text-orange-400 mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">Edit Profile</h4>
              <p className="text-white/70 text-sm">Update your business information</p>
            </motion.button>

            <motion.button
              onClick={handleManageBilling}
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 text-left group"
            >
              <CreditCard className="w-8 h-8 text-orange-400 mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">Manage Billing</h4>
              <p className="text-white/70 text-sm">View invoices and payment methods</p>
            </motion.button>

            <motion.button
              onClick={() => navigate('/intake')}
              whileHover={{ scale: 1.05 }}
              className="bg-orange-gradient rounded-2xl p-6 text-left group"
            >
              <ArrowRight className="w-8 h-8 text-white mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">New Project</h4>
              <p className="text-white/90 text-sm">Start another website project</p>
            </motion.button>
          </div>

          {/* Motivational Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="bg-gradient-to-r from-orange-600 to-orange-500 rounded-2xl p-8 text-center mb-8"
          >
            <h3 className="text-2xl font-bold text-white mb-2">Your website is being crafted with care</h3>
            <p className="text-white/90">We'll keep you updated on every milestone. Check back soon for progress updates!</p>
          </motion.div>

          {/* Sign Out */}
          <div className="text-center">
            <button
              onClick={handleSignOut}
              className="inline-flex items-center space-x-2 text-white/70 hover:text-white transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
