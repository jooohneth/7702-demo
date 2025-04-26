import { PrivyProvider, PrivyClientConfig } from "@privy-io/react-auth";
import { privyConfig } from "./config";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <PrivyProvider
      appId={privyConfig.appId}
      config={privyConfig.config as PrivyClientConfig}
    >
      {children}
    </PrivyProvider>
  );
};

export default Providers;
