import { privateKeyToAccount } from "viem/accounts";
import { createPublicClient, createWalletClient, http } from "viem";
import { sepolia } from "viem/chains";
import { eip5792Actions } from "viem/experimental";

const relayPrivateKey = import.meta.env.VITE_RELAY_PRIVATE_KEY;

if (!relayPrivateKey) {
  throw new Error(
    "VITE_RELAY_PRIVATE_KEY is not set in the environment variables."
  );
}

// TODO: Add relayClient and publicClient
export const relayClient = null;
export const publicClient = null;
