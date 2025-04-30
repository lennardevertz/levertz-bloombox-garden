import { Chain, createConfig, http, injected, WagmiProvider } from "wagmi";

const baseSepolia: Chain = {
  id: 84531,
  name: "Base Sepolia",
  network: "base-sepolia",
  nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: { default: { http: ["https://sepolia.base.org"] } },
  blockExplorers: { default: { name: "Base Sepolia Explorer", url: "https://sepoliascan.com" } },
  testnet: true,
};

export { baseSepolia };
import { base, degen, mainnet, optimism } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { farcasterFrame } from "@farcaster/frame-wagmi-connector";
import { DaimoPayProvider, getDefaultConfig } from "@daimo/pay";
import { PROJECT_TITLE } from "../../lib/constants";

export const config = createConfig(
  getDefaultConfig({
    appName: PROJECT_TITLE,
    chains: [baseSepolia, degen, mainnet, optimism],
    additionalConnectors: [farcasterFrame(), injected()],
  }),
);

const queryClient = new QueryClient();

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <DaimoPayProvider>{children}</DaimoPayProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
