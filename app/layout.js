"use client";
import "../styles/globals.css";
import Head from "next/head";
import { Inter } from "next/font/google";
import { Web3ReactProvider } from "@web3-react/core";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connectors } from "../connectors";
import { store } from "../context/store";
import { Provider } from "react-redux";
import Navbar from "@/components/Nav";
import { metadata } from "@/components/metadata";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <body className={inter.className}>
        <Web3ReactProvider connectors={connectors}>
          <ToastContainer
            position="top-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <Provider store={store}>
            <Navbar />
            <main className="">{children}</main>
          </Provider>
        </Web3ReactProvider>
      </body>
    </html>
  );
}
