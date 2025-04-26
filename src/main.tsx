// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./style/index.css";

import { PrivyProvider, PrivyProviderProps } from "@privy-io/react-auth";
import { Toaster } from "@/components/ui/sonner";

if (!import.meta.env.VITE_PRIVY_APP_ID) {
  throw new Error("VITE_PRIVY_APP_ID is not set in the environment variables.");
}

// TODO: Add PrivyProvider config

createRoot(document.getElementById("root")!).render(
  // <PrivyProvider {...(privyConfig as PrivyProviderProps)}>
  <>
    <App />
    <Toaster />
  </>
  // </PrivyProvider>
);
