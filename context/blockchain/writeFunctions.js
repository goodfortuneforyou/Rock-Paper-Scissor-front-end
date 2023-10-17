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
import { shortenAddress } from "@/utils/shortenAddress";
export const writeFunctions = () => {
  const { connector, hooks, useContract, provider, signer } = useWeb3React();
  const {
    useSelectedAccount,
    useSelectedChainId,
    useSelectedIsActive,
    useSelectedIsActivating,
  } = hooks;
  const getSigner = () => {
    // const { provider, signer } = useWeb3React();
    return signer || provider?.getSigner();
  };
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

  const createGame = async (amount) => {
    try {
      const signer = await getSigner();
      // const contract = useContract(gameAbi, gameAddress);
      const contract = fetchGameContract(signer);
      const formattedAmount = ethers.parseEther(amount);
      await approve(formattedAmount);
      const tx = await contract.createGame(formattedAmount);
      const id = await contract.getGameId();
      // console.log(tx);
      successNotification(
        `You have successfully created a game of game id ${(id + 1).toString()}`
      );
    } catch (error) {
      console.log(error);
      errorNotification(
        error.message.slice(0, 300) ||
          "Something went wrong while creating the game, please try again"
      );
    }
  };

  const approve = async (amount) => {
    try {
      const signer = await getSigner();
      const contract = fetchTokenContract(signer);
      const tx = await contract.approve(gameAddress, amount);
      // await tx.wait();
      successNotification(
        `You have successfully approved ${shortenAddress(
          gameAddress
        )} to spend ${ethers.formatEther(amount)} tokens `
      );
    } catch (error) {
      console.log(error);
      errorNotification(
        error.message.slice(0, 300) ||
          "Something went wrong while approving token, please try again"
      );
    }
  };

  return {
    account,
    chain,
    isActivating,
    isActive,
    currentAccount,
    createGame,
  };
};
