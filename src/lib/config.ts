import { http, createConfig } from "wagmi";
import { sepolia } from "wagmi/chains";

export const config = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(),
  },
});

export const privyConfig = {
  appId: "cm9rkudbi04ywjx0mpmp51h4n",
  config: {
    embeddedWallets: {
      showWalletUIs: false,
      createOnLogin: "all-users",
    },
  },
};
