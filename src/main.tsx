// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./style/index.css";

import { Toaster } from "@/components/ui/sonner";

import Providers from "./lib/providers";

createRoot(document.getElementById("root")!).render(
  <Providers>
    <App />
    <Toaster />
  </Providers>
);
