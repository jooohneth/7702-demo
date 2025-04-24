import { config } from "./config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { PrivyProvider, PrivyClientConfig } from "@privy-io/react-auth";
import { privyConfig } from "./config";
const queryClient = new QueryClient();

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <PrivyProvider
      appId={privyConfig.appId}
      config={privyConfig.config as PrivyClientConfig}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </WagmiProvider>
    </PrivyProvider>
  );
};

export default Providers;
