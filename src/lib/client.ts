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

export const relayClient = createWalletClient({
  account: privateKeyToAccount(relayPrivateKey as `0x${string}`),
  transport: http(),
  chain: sepolia,
}).extend(eip5792Actions());

export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(),
});
