import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Address, Hex } from "viem";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatHex(hex: Hex) {
  return (hex.slice(0, 5) + "..." + hex.slice(-5)) as Hex;
}

export function linkExplorer(type: "address" | "tx", address: Address) {
  return `https://sepolia.etherscan.io/${type}/${address}`;
}
