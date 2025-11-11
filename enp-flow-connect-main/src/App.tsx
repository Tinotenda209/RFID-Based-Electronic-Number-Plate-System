import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import TollManagement from "./pages/TollManagement";
import Enforcement from "./pages/Enforcement";
import Analytics from "./pages/Analytics";
import Vehicles from "./pages/Vehicles";
import HardwareManagement from "./pages/HardwareManagement";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";
import OwnerDashboard from "./pages/OwnerDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/owner" element={<OwnerDashboard />} />
            <Route path="/toll" element={<TollManagement />} />
            <Route path="/enforcement" element={<Enforcement />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/hardware" element={<HardwareManagement />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
