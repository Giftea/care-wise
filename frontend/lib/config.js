import { getDefaultConfig } from "connectkit";
import { etherlinkTestnet } from "viem/chains";
import { createConfig, http } from "wagmi";

const projectId = process.env["NEXT_PUBLIC_PROJECT_ID"] ?? "";

export const config = createConfig(
  getDefaultConfig({
    appName: "care-wise",
    walletConnectProjectId: projectId,
    chains: [etherlinkTestnet],
    ssr: true,
    transports: {
      [etherlinkTestnet.id]: http("https://node.ghostnet.etherlink.com"),
    },
    appDescription:
      "",
    appUrl: "",
    appIcon: "",
  })
);
