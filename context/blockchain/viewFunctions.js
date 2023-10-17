import { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { useDispatch } from "react-redux";
import { setCurrentAccount } from "../slices/viewFunctions/viewSlice";
import { useSelector } from "react-redux";
import { ethers } from "ethers";
import {
  expectedChainId,
  gameAbi,
  gameAddress,
  rpcProvider,
  tokenAbi,
  tokenAddress,
} from "./constants";
import { toast } from "react-toastify";
export const viewFunctions = () => {
  const { connector, hooks } = useWeb3React();
  const {
    useSelectedAccount,
    useSelectedChainId,
    useSelectedIsActive,
    useSelectedIsActivating,
  } = hooks;

  const dispatch = useDispatch();
  const successNotification = (msg) => toast(msg);
  const errorNotification = (msg) => toast(msg);

  const isActivating = useSelectedIsActivating(connector);
  const isActive = useSelectedIsActive(connector);
  const account = useSelectedAccount(connector);
  const chain = useSelectedChainId(connector);

  const currentAccount = useSelector(
    (state) => state.viewFunctions.currentAccount
  );

  const fetchGameContract = (signerOrProvider) => {
    return new ethers.Contract(gameAddress, gameAbi, signerOrProvider);
  };
  const fetchTokenContract = (signerOrProvider) => {
    return new ethers.Contract(tokenAddress, tokenAbi, signerOrProvider);
  };

  const connectWallet = async () => {
    if (isActive) {
      if (connector?.deactivate) {
        void connector.deactivate();
      } else {
        void connector.resetState();
        dispatch(setCurrentAccount(account));
        successNotification("You have successfully Connected your wallet!");
      }
    } else if (!isActivating) {
      try {
        await connector.activate(expectedChainId);
      } catch (error) {
        console.error("Error activating connector:", error);
        connector.resetState();
        errorNotification(
          error.message.slice(0, 300) ||
            "Something went wrong while connecting your wallet, please try again"
        );
      }
    }
    dispatch(setCurrentAccount(account));
  };

  const availableGames = async () => {
    // console.log(ethers);
    try {
      const providers = new ethers.JsonRpcProvider(rpcProvider);
      const contract = fetchGameContract(providers);
      const data = await contract.getGameId();
      console.log(data.toString(), "sdf");
    } catch (error) {
      console.log(error);
    }
  };

  return {
    account,
    chain,
    isActivating,
    isActive,
    connectWallet,
    currentAccount,
    availableGames,
  };
};
