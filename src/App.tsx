
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import IntakePage from "./pages/IntakePage";
import WebsitesPage from "./pages/WebsitesPage";
import AuthPage from "./pages/AuthPage";
import RevenueBridgeMethod from "./pages/RevenueBridgeMethod";
import NotFound from "./pages/NotFound";
import CosmicSidebar from "./components/CosmicSidebar";
import MobileNavbar from "./components/MobileNavbar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="flex min-h-screen w-full">
            {/* Desktop Sidebar - Hidden on mobile */}
            <div className="hidden md:block">
              <CosmicSidebar />
            </div>
            
            {/* Mobile Navbar - Only shown on mobile */}
            <MobileNavbar />
            
            {/* Main Content */}
            <main className="flex-1 md:ml-16 pt-16 md:pt-0 w-full min-w-0">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/intake" element={<IntakePage />} />
                <Route path="/websites" element={<WebsitesPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/revenue-bridge-method" element={<RevenueBridgeMethod />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
