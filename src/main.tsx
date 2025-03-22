import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // 🔥 Import thêm
import App from "./App.tsx";
import { OrderProvider } from "./components/admin/OrderContext.tsx"; // Import OrderProvider
import "antd/dist/reset.css";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}> {/* 🔥 Bọc App bằng QueryClientProvider */}
          <OrderProvider>
        <App />
        </QueryClientProvider>
      </HelmetProvider>
      </OrderProvider>
    </BrowserRouter>
  </StrictMode>
);
