
import React from 'react';
import { motion } from 'framer-motion';
import { User, CreditCard, Settings, LogOut, Star, ArrowRight, Package, Calendar, DollarSign } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

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

  // Mock data - in real implementation, this would come from Supabase/Stripe
  const projectData = {
    plan: 'Business',
    billing: 'Annual',
    addOns: ['Logo Design', 'AI Chatbot', 'Maintenance'],
    totalPaid: 712,
    nextBilling: {
      amount: 25,
      date: 'July 6, 2025',
      frequency: 'monthly'
    },
    purchaseDate: 'June 6, 2025',
    status: 'Active'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-orange-600 to-black">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 container-width py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Welcome Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4">
              Welcome back, <span className="text-orange-300">{user?.user_metadata?.full_name || 'there'}</span>
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
                  <span className="text-orange-300 font-semibold">{projectData.plan} ({projectData.billing})</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">🧩 Add-Ons:</span>
                  <span className="text-white font-semibold">{projectData.addOns.join(', ')}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">📅 Purchase Date:</span>
                  <span className="text-white font-semibold">{projectData.purchaseDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Status:</span>
                  <span className="text-green-400 font-semibold">{projectData.status}</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/80">💰 Total Paid Today:</span>
                  <span className="text-orange-300 font-bold text-lg">${projectData.totalPaid}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">📆 Next Billing:</span>
                  <div className="text-right">
                    <div className="text-white font-semibold">${projectData.nextBilling.amount}/{projectData.nextBilling.frequency}</div>
                    <div className="text-white/60 text-sm">starting {projectData.nextBilling.date}</div>
                  </div>
                </div>
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
                  <span className="text-orange-300 font-semibold">{projectData.plan}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Billing</span>
                  <span className="text-white font-semibold">{projectData.billing}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Status</span>
                  <span className="text-green-400 font-semibold">{projectData.status}</span>
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
                  <span className="text-white/80">Last Payment</span>
                  <span className="text-white font-semibold">${projectData.totalPaid}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Next Payment</span>
                  <span className="text-orange-300 font-semibold">${projectData.nextBilling.amount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Due Date</span>
                  <span className="text-white font-semibold">{projectData.nextBilling.date}</span>
                </div>
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
