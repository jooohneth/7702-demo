export const MNTContract = {
  address: "0x64ad5bc6ce7b02be1d9970ae9296b4e4480ed1e1",
  abi: [
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        { indexed: true, internalType: "address", name: "to", type: "address" },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },

    {
      inputs: [{ internalType: "address", name: "account", type: "address" }],
      name: "balanceOf",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },

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
  address: "0xF98F5336b4a6fdcD4bB620e00cF66Ef8101949E1",
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
