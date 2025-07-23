import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Record from "./pages/Record";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import CreateLegacy from "./pages/CreateLegacy";
import LifeCapsule from "./pages/LifeCapsule";
import AddMemory from "./pages/AddMemory";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/record" element={<Record />} />
          <Route path="/about" element={<About />} />
          <Route path="/create-legacy" element={<CreateLegacy />} />
          <Route path="/life-capsule" element={<LifeCapsule />} />
          <Route path="/life-capsule/add" element={<AddMemory />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
