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
