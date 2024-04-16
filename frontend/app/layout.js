"use client";
import "react-phone-number-input/style.css";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/header";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ConnectKitProvider } from "connectkit";
import { config } from "@/lib/config";
import { Toaster } from "@/components/ui/toaster";
import { User } from "./userContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const queryClient = new QueryClient();

  return (
    <html lang="en">
      <body className={inter.className}>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <ConnectKitProvider
              customTheme={{
                "--ck-connectbutton-background": "#2e279d",
                "--ck-connectbutton-padding": "2rem",
                "--ck-connectbutton-border-radius": "0.5rem",
                "--ck-connectbutton-hover-background": "#0e204d",
              }}
            >
              <User>
                <Header />
                <div className="mt-[110px]">{children}</div>
                <Toaster />
              </User>
            </ConnectKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
