import { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { useDispatch } from "react-redux";
import { setCurrentAccount } from "../slices/viewFunctions/viewSlice";
import { useSelector } from "react-redux";
export const viewFunctions = () => {
  const { connector, hooks } = useWeb3React();
  const {
    useSelectedAccount,
    useSelectedChainId,
    useSelectedIsActive,
    useSelectedIsActivating,
  } = hooks;

  const dispatch = useDispatch();
  const isActivating = useSelectedIsActivating(connector);
  const isActive = useSelectedIsActive(connector);
  const account = useSelectedAccount(connector);
  const chain = useSelectedChainId(connector);

  const connectWallet = async () => {
    if (isActive) {
      if (connector?.deactivate) {
        void connector.deactivate();
        dispatch(setCurrentAccount(""));
      } else {
        void connector.resetState();
      }
    } else if (!isActivating) {
      try {
        await connector.activate(97);
      } catch (error) {
        console.error("Error activating connector:", error);
        connector.resetState();
      }
    }
    dispatch(setCurrentAccount(account));
  };
  const currentAccount = useSelector(
    (state) => state.viewFunctions.currentAccount
  );

  return {
    account,
    chain,
    isActivating,
    isActive,
    connectWallet,
    currentAccount,
  };
};
