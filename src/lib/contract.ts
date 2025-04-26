export const MNTContract = {
  address: "0x64ad5bc6ce7b02be1d9970ae9296b4e4480ed1e1",
  abi: [
    {
      inputs: [
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "amount", type: "uint256" },
      ],
      name: "mint",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "value", type: "uint256" },
      ],
      name: "transfer",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
};

export const DelegateContract = {
  address: "", // TODO: Add implementation contract's address
  abi: [
    { type: "fallback", stateMutability: "payable" },
    { type: "receive", stateMutability: "payable" },
    {
      type: "function",
      name: "execute",
      inputs: [
        {
          name: "calls",
          type: "tuple[]",
          internalType: "struct Delegate.Call[]",
          components: [
            { name: "data", type: "bytes", internalType: "bytes" },
            { name: "to", type: "address", internalType: "address" },
            { name: "value", type: "uint256", internalType: "uint256" },
          ],
        },
      ],
      outputs: [],
      stateMutability: "payable",
    },
  ],
} as const;
