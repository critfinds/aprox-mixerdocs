import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import QuickStart from "./pages/QuickStart";
import Architecture from "./pages/Architecture";
import ZkProofs from "./pages/ZkProofs";
import ApiReference from "./pages/ApiReference";
import Tutorials from "./pages/Tutorials";
import Compliance from "./pages/Compliance";
import Appendices from "./pages/Appendices";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/quick-start" element={<QuickStart />} />
          <Route path="/architecture" element={<Architecture />} />
          <Route path="/zk-proofs" element={<ZkProofs />} />
          <Route path="/api" element={<ApiReference />} />
          <Route path="/tutorials" element={<Tutorials />} />
          <Route path="/compliance" element={<Compliance />} />
          <Route path="/appendices" element={<Appendices />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
