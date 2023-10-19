"use client";
import { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { useDispatch } from "react-redux";
import {
  setAvailableGames,
  setCurrentAccount,
  setMyCreatedGames,
} from "../slices/viewFunctions/viewSlice";
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
  const { connector, hooks, useContract, signer, provider } = useWeb3React();
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

  const availableGames = useSelector(
    (state) => state.viewFunctions.availableGames
  );
  const myCreatedGames = useSelector(
    (state) => state.viewFunctions.myCreatedGames
  );

  const fetchGameContract = (signerOrProvider) => {
    return new ethers.Contract(gameAddress, gameAbi, signerOrProvider);
  };
  const fetchTokenContract = (signerOrProvider) => {
    return new ethers.Contract(tokenAddress, tokenAbi, signerOrProvider);
  };

  const connectWallet = async () => {
    console.log(signer, provider);
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

  const getAvailableGames = async () => {
    // console.log(ethers);
    try {
      const providers = new ethers.JsonRpcProvider(rpcProvider);
      const contract = fetchGameContract(providers);
      const g = await contract.getGameId();
      console.log(g.toString());
      const data = await contract.getAvailableGame();
      const items = await Promise.all(
        data.map(async ({ id, stakeAmount, players, state }) => {
          console.log(
            id.toString(),
            stakeAmount.toString(),
            players[0],
            players[1],
            state.toString()
          );

          return {
            id: id.toString(),
            stakeAmount: stakeAmount.toString(),
            players,
            state: state.toString(),
          };
          // eslint-disable-next-line comma-dangle
        })
      );
      dispatch(setAvailableGames(items));
      return items;
    } catch (error) {
      console.log(error);
    }
  };
  const getMyCreatedGames = async () => {
    // console.log(ethers);
    try {
      const providers = new ethers.JsonRpcProvider(rpcProvider);
      const contract = fetchGameContract(providers);
      const data = await contract.getUserCreatedGame(currentAccount);
      const items = await Promise.all(
        data.map(async ({ id, stakeAmount, players, state }) => {
          console.log(
            id.toString(),
            stakeAmount.toString(),
            players[0],
            players[1],
            state.toString()
          );

          return {
            id: id.toString(),
            stakeAmount: stakeAmount.toString(),
            players,
            state: state.toString(),
          };
          // eslint-disable-next-line comma-dangle
        })
      );
      console.log(items, currentAccount);
      dispatch(setMyCreatedGames(items));
      return items;
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
    myCreatedGames,
    getAvailableGames,
    getMyCreatedGames,
  };
};
