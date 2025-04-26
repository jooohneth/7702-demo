// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./style/index.css";

import { PrivyProvider, PrivyClientConfig } from "@privy-io/react-auth";
import { Toaster } from "@/components/ui/sonner";

if (!import.meta.env.VITE_PRIVY_APP_ID) {
  throw new Error("VITE_PRIVY_APP_ID is not set in the environment variables.");
}

export const privyConfig = {
  appId: import.meta.env.VITE_PRIVY_APP_ID,
  config: {
    embeddedWallets: {
      showWalletUIs: false,
      createOnLogin: "all-users",
    },
  },
};

createRoot(document.getElementById("root")!).render(
  <PrivyProvider
    appId={privyConfig.appId}
    config={privyConfig.config as PrivyClientConfig}
  >
    <App />
    <Toaster />
  </PrivyProvider>
);
