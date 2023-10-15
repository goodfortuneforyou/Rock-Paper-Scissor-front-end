"use client";
import "../styles/globals.css";
import { Inter } from "next/font/google";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { connectors } from "../connectors";
import { store } from "../context/store";
import { Provider } from "react-redux";
import Navbar from "@/components/Nav";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Rock Paper Scissor",
  description: "A Defi Rock Paper Scissor game",
};

// const getLibrary = (provider) => new Web3Provider(provider);
// const connectors = [
//   [metaMask, metaMaskHooks],
//   [walletConnectV2, walletConnectV2Hooks],
//   [coinbaseWallet, coinbaseWalletHooks],
// ];
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Web3ReactProvider connectors={connectors}>
          <Provider store={store}>
            <Navbar />
            <main className="">{children}</main>
          </Provider>
        </Web3ReactProvider>
      </body>
    </html>
  );
}
