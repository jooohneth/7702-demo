import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import mantle from "/mantle.svg";
import "./style/App.css";

import { publicClient, relayClient } from "@/lib/client";
import { MNTContract, DelegateContract } from "@/lib/contract";
import { formatHex, linkExplorer } from "@/lib/utils";

import {
  encodeFunctionData,
  zeroAddress,
  Address,
  parseEther,
  WalletClient,
  Hash,
  Authorization,
  Hex,
  TransactionReceipt,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { verifyAuthorization, hashAuthorization } from "viem/utils";
import { sepolia } from "viem/chains";

import {
  usePrivy,
  useWallets,
  useSignAuthorization,
  ConnectedWallet,
} from "@privy-io/react-auth";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [authorization, setAuthorization] = useState<Authorization | null>(
    null
  );
  const [sourceCode, setSourceCode] = useState<Hex | null>(null);
  const [authorizationHash, setAuthorizationHash] = useState<Hex | null>(null);
  const [txHash, setTxHash] = useState<Hash | null>(null);
  const [txReceipt, setTxReceipt] = useState<TransactionReceipt | null>(null);

  const { ready, authenticated, login, logout } = usePrivy();
  const { signAuthorization } = useSignAuthorization();

  const { wallets } = useWallets();
  const embeddedWallet = wallets.find(
    (wallet) => wallet.walletClientType === "privy"
  );

  const mockAccount: Address = privateKeyToAccount(
    "0x25e3e39073d1d085f1d5fbf885039ebd158d07401cdc1d2417bfdbcff32f3dd9"
  ).address;

  useEffect(() => {
    publicClient
      .getCode({ address: embeddedWallet?.address as Address })
      .then((res) => {
        setSourceCode(res as Hex);
        console.log(sourceCode);
      });
  }, [embeddedWallet, txReceipt]);

  // TODO: Add onAuthorize, onUnauthorize, onExecute
  const onAuthorize = async () => {};
  const onUnauthorize = async () => {};
  const onExecute = async () => {};

  return (
    <div className="p-30 flex flex-col h-screen gap-12 bg-black/90 text-white/90 font-mono">
      <Header isLoading={isLoading} />
      <Actions
        authenticated={authenticated}
        ready={ready}
        logout={logout}
        login={login}
        onAuthorize={onAuthorize}
        onUnauthorize={onUnauthorize}
        onExecute={onExecute}
        sourceCode={sourceCode}
        authorization={authorization}
        isLoading={isLoading}
      />

      <div className="flex justify-center md:ml-10 lg:ml-25">
        <Accounts
          embeddedWallet={embeddedWallet}
          relayClient={relayClient}
          mockAccount={mockAccount}
        />
        <Details
          sourceCode={sourceCode as Hex}
          txHash={txHash}
          authorizationHash={authorizationHash}
        />
      </div>
    </div>
  );
};

export default App;

const Header = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <>
      {" "}
      <a href="https://group.mantle.xyz" target="_blank">
        <img
          src={mantle}
          className={`${
            isLoading ? "spin" : ""
          } h-30 filter drop-shadow-xl hover:drop-shadow-[#F3C9F9]/30 mx-auto`}
          alt="Mantle logo"
        />
      </a>
      <div className="text-4xl font-bold text-center">7702</div>
    </>
  );
};
const Actions = ({
  authenticated,
  ready,
  logout,
  login,
  onAuthorize,
  onUnauthorize,
  onExecute,
  sourceCode,
  authorization,
  isLoading,
}: {
  authenticated: boolean;
  ready: boolean;
  logout: () => void;
  login: () => void;
  onAuthorize: () => void;
  onUnauthorize: () => void;
  onExecute: () => void;
  sourceCode: Hex | null;
  authorization: Authorization | null;
  isLoading: boolean;
}) => {
  return (
    <div className="flex flex-col gap-10 justify-center items-center">
      <Button
        className="bg-white/90 text-black/90 hover:bg-white/70 w-20"
        onClick={authenticated ? logout : login}
      >
        {authenticated ? "Logout" : "Login"}
      </Button>

      <div className="flex gap-4">
        <Button
          className="bg-white/90 text-black/90 hover:bg-white/70"
          onClick={sourceCode ? onUnauthorize : onAuthorize}
          disabled={!ready || !authenticated || isLoading}
        >
          {sourceCode ? "Unauthorize" : "Authorize"}
        </Button>
        <Button
          className="bg-white/90 text-black/90 hover:bg-white/70"
          onClick={onExecute}
          disabled={!ready || isLoading || !authenticated || !authorization}
        >
          {"Execute"}
        </Button>
      </div>
    </div>
  );
};
const Card = ({
  label,
  value,
  link,
}: {
  label: string;
  value: Hex | null;
  link?: string | null;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-1 font-mono">
      <span
        onClick={() => setOpen(!open)}
        className="cursor-pointer uppercase text-sm font-semibold"
      >
        <span
          className={`inline-block mr-2 ${
            open ? "rotate-90" : ""
          } transition-transform duration-300`}
        >
          {" > "}
        </span>
        {label}
      </span>
      <a
        target="_blank"
        href={link ? link : undefined}
        className={`hover:underline ${open ? "block" : "hidden"} text-xs pl-4`}
      >
        {value ? value : "null."}
      </a>
    </div>
  );
};
const Accounts = ({
  embeddedWallet,
  relayClient,
  mockAccount,
}: {
  embeddedWallet: ConnectedWallet | undefined;
  relayClient: WalletClient;
  mockAccount: Address;
}) => {
  return (
    <div className="flex flex-col gap-4 w-[20%]">
      <Card
        label="Embedded Account"
        value={
          embeddedWallet ? formatHex(embeddedWallet?.address as Hex) : null
        }
        link={
          embeddedWallet
            ? linkExplorer("address", embeddedWallet?.address as Address)
            : null
        }
      />
      <Card
        label="Relay"
        value={formatHex(relayClient?.account?.address as Address)}
        link={linkExplorer("address", relayClient?.account?.address as Address)}
      />

      <Card
        label="Delegate Contract"
        value={formatHex(DelegateContract.address as Address)}
        link={linkExplorer("address", DelegateContract.address)}
      />
      <Card
        label="Mock Account"
        value={formatHex(mockAccount as Address)}
        link={linkExplorer("address", mockAccount)}
      />
    </div>
  );
};
const Details = ({
  sourceCode,
  txHash,
  authorizationHash,
}: {
  sourceCode: Address | null;
  txHash: Hash | null;
  authorizationHash: Hex | null;
}) => {
  return (
    <div className="flex flex-col gap-4 w-[20%]">
      <Card
        label="Source Code"
        value={sourceCode ? formatHex(sourceCode as Hex) : null}
      />
      <Card
        label="Authorization Hash"
        value={authorizationHash ? formatHex(authorizationHash as Hex) : null}
      />
      <Card
        label="Transaction Hash"
        value={txHash ? formatHex(txHash as Hex) : null}
        link={txHash ? linkExplorer("tx", txHash) : undefined}
      />
    </div>
  );
};
