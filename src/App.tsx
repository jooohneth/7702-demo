import mantle from "/mantle.svg";
import "./style/App.css";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { publicClient, relayClient } from "./lib/client";
import { MNTContract, DelegateContract } from "./lib/contract";

import { encodeFunctionData, Hex, parseEther } from "viem";
import { SignAuthorizationReturnType } from "viem/actions";
import { privateKeyToAccount } from "viem/accounts";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useSignAuthorization } from "@privy-io/react-auth";
import { sepolia } from "viem/chains";

const App = () => {
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [authorization, setAuthorization] =
    useState<SignAuthorizationReturnType | null>(null);

  const { ready, authenticated, login, logout } = usePrivy();
  const { signAuthorization } = useSignAuthorization();

  const { wallets } = useWallets();
  const embeddedWallet = wallets.find(
    (wallet) => wallet.walletClientType === "privy"
  );

  const addrMap: Record<string, Hex> = {
    Alice: privateKeyToAccount(
      "0x25e3e39073d1d085f1d5fbf885039ebd158d07401cdc1d2417bfdbcff32f3dd9"
    ).address,
    Bob: privateKeyToAccount(
      "0x2bbfd5527ad190da475fe2fc6de8f1fdd5bc350bee9c6120dfa4b053ce213f1d"
    ).address,
  };

  const onAuthorize = async () => {
    setIsAuthorizing(true);

    // // Viem's implementation
    // const authorization = await walletClient.signAuthorization({
    //   executor: "self",
    //   contractAddress: DelegateContract.address,
    // });

    // Privy's implementation
    const authorization = await signAuthorization({
      contractAddress: DelegateContract.address as `0x${string}`,
      chainId: sepolia.id,
    });

    console.log(authorization);

    publicClient
      .getCode({ address: embeddedWallet?.address as `0x${string}` })
      .then((res) => {
        console.log("EOA's code: ", res);
      });

    setAuthorization(authorization);
    setIsAuthorizing(false);
    toast.success("Authorized");
  };

  const onExecute = async () => {
    setIsLoading(true);

    const tx = await relayClient?.writeContract({
      abi: DelegateContract.abi,
      address: embeddedWallet?.address as `0x${string}`,
      functionName: "execute",
      args: [
        [
          {
            data: encodeFunctionData({
              abi: MNTContract.abi,
              functionName: "mint",
              args: [embeddedWallet?.address as Hex, parseEther("100")],
            }),
            to: MNTContract.address as `0x${string}`,
            value: 0n,
          },

          ...["Alice", "Bob"].map((account) => ({
            data: encodeFunctionData({
              abi: MNTContract.abi,
              functionName: "transfer",
              args: [addrMap[account], parseEther("10")],
            }),
            to: MNTContract.address as `0x${string}`,
            value: 0n,
          })),
        ],
      ],
      authorizationList: authorization ? [authorization] : undefined,
    });

    const receipt = await publicClient.waitForTransactionReceipt({
      hash: tx,
    });

    console.log(receipt);
    setIsLoading(false);
    toast.success("Success");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-12 bg-black/90 text-white/90">
      <a href="https://group.mantle.xyz" target="_blank">
        <img
          src={mantle}
          className={`${
            isLoading ? "spin" : ""
          } h-30 filter drop-shadow-xl hover:drop-shadow-[#F3C9F9]/40`}
          alt="Mantle logo"
        />
      </a>
      <div className="text-4xl font-bold font-mono">7702</div>
      <div className="flex gap-4">
        {authenticated ? (
          <Button
            className="bg-white/90 text-black/90 hover:bg-white/70"
            onClick={logout}
          >
            Logout
          </Button>
        ) : (
          <Button
            className="bg-white/90 text-black/90 hover:bg-white/70"
            onClick={login}
          >
            Login
          </Button>
        )}

        <Button
          className="bg-white/90 text-black/90 hover:bg-white/70"
          onClick={onAuthorize}
          disabled={!ready || isAuthorizing || !authenticated}
        >
          {isAuthorizing ? "Authorizing..." : "Authorize"}
        </Button>
        <Button
          className="bg-white/90 text-black/90 hover:bg-white/70"
          onClick={onExecute}
          disabled={!ready || isLoading || !authenticated}
        >
          {isLoading ? "Executing..." : "Execute"}
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        <a
          href={`https://sepolia.etherscan.io/address/${embeddedWallet?.address}`}
          target="_blank"
          className="hover:underline"
        >
          Embedded Account: {embeddedWallet?.address}
        </a>
        <a
          href={`https://sepolia.etherscan.io/address/${relayClient?.account.address}`}
          target="_blank"
          className="hover:underline"
        >
          Relay: {relayClient?.account.address}
        </a>
        <a
          href={`https://sepolia.etherscan.io/address/${DelegateContract.address}`}
          target="_blank"
          className="hover:underline"
        >
          Delegate Contract: {DelegateContract.address}
        </a>
        <a
          href={`https://sepolia.etherscan.io/address/${addrMap.Alice}`}
          target="_blank"
          className="hover:underline"
        >
          Alice: {addrMap.Alice}
        </a>
        <a
          href={`https://sepolia.etherscan.io/address/${addrMap.Bob}`}
          target="_blank"
          className="hover:underline"
        >
          Bob: {addrMap.Bob}
        </a>
      </div>
    </div>
  );
};

export default App;
