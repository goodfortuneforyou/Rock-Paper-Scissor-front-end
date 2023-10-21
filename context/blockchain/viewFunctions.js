"use client";
import { useWeb3React } from "@web3-react/core";
import { useDispatch } from "react-redux";
import {
  setAvailableGames,
  setCurrentAccount,
  setMyComittedGames,
  setMyCreatedGames,
  setMyJoinedGames,
  setRevealedGames,
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

  const availableGames = useSelector(
    (state) => state.viewFunctions.availableGames
  );
  const myCreatedGames = useSelector(
    (state) => state.viewFunctions.myCreatedGames
  );
  const myJoinedGames = useSelector(
    (state) => state.viewFunctions.myJoinedGames
  );
  const myComittedGames = useSelector(
    (state) => state.viewFunctions.myComittedGames
  );
  const revealedGames = useSelector(
    (state) => state.viewFunctions.revealedGames
  );

  const fetchGameContract = (signerOrProvider) => {
    return new ethers.Contract(gameAddress, gameAbi, signerOrProvider);
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!window.ethereum) {
        errorNotification("Please install MetaMask!");
      }
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length) {
        if (!isActive) {
          try {
            await connector.activate(expectedChainId);
          } catch (error) {
            console.log(error);
          }
        }
        dispatch(setCurrentAccount(accounts[0]));
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
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

  const getAvailableGames = async () => {
    try {
      const providers = new ethers.JsonRpcProvider(rpcProvider);
      const contract = fetchGameContract(providers);
      const data = await contract.getAvailableGame();
      const items = await Promise.all(
        data.map(async ({ id, stakeAmount, players, state, winner }) => {
          return {
            id: id.toString(),
            stakeAmount: stakeAmount.toString(),
            players,
            state: state.toString(),
            winner,
          };
        })
      );
      dispatch(setAvailableGames(items));
      return items;
    } catch (error) {
      console.log(error);
    }
  };
  const getMyCreatedGames = async () => {
    try {
      const providers = new ethers.JsonRpcProvider(rpcProvider);
      const contract = fetchGameContract(providers);
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const account = currentAccount ? currentAccount : accounts[0];
      const data = await contract.getUserCreatedGame(account);
      const items = await Promise.all(
        data.map(async ({ id, stakeAmount, players, state, winner }) => {
          return {
            id: id.toString(),
            stakeAmount: stakeAmount.toString(),
            players,
            state: state.toString(),
            winner,
          };
        })
      );
      dispatch(setMyCreatedGames(items));
      return items;
    } catch (error) {
      console.log(error);
    }
  };
  const getMyJoinedGames = async () => {
    try {
      const providers = new ethers.JsonRpcProvider(rpcProvider);
      const contract = fetchGameContract(providers);
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const account = currentAccount ? currentAccount : accounts[0];
      const data = await contract.getPlayersJoinedGamed(account);
      const items = await Promise.all(
        data.map(async ({ id, stakeAmount, players, state, winner }) => {
          return {
            id: id.toString(),
            stakeAmount: stakeAmount.toString(),
            players,
            state: state.toString(),
            winner,
          };
        })
      );
      dispatch(setMyJoinedGames(items));
      return items;
    } catch (error) {
      console.log(error);
    }
  };
  const getMyComittedGames = async () => {
    try {
      const providers = new ethers.JsonRpcProvider(rpcProvider);
      const contract = fetchGameContract(providers);
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      const account = currentAccount ? currentAccount : accounts[0];
      const data = await contract.getPlayersComitedGamed(account);
      const items = await Promise.all(
        data.map(async ({ id, stakeAmount, players, state, winner }) => {
          return {
            id: id.toString(),
            stakeAmount: stakeAmount.toString(),
            players,
            state: state.toString(),
            winner,
          };
        })
      );
      dispatch(setMyComittedGames(items));
      return items;
    } catch (error) {
      console.log(error);
    }
  };
  const getrevealedGames = async () => {
    try {
      const providers = new ethers.JsonRpcProvider(rpcProvider);
      const contract = fetchGameContract(providers);
      const data = await contract.getRevealedGames();
      const items = await Promise.all(
        data.map(async ({ id, stakeAmount, players, state, winner }) => {
          return {
            id: id.toString(),
            stakeAmount: stakeAmount.toString(),
            players,
            state: state.toString(),
            winner,
          };
        })
      );
      dispatch(setRevealedGames(items));
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
    checkIfWalletIsConnected,
    currentAccount,
    availableGames,
    myCreatedGames,
    myJoinedGames,
    myComittedGames,
    revealedGames,
    getAvailableGames,
    getMyCreatedGames,
    getMyJoinedGames,
    getMyComittedGames,
    getrevealedGames,
  };
};
