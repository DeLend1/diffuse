import React, { useEffect, useState } from "react";
import chainIds from "../../utils/chainIds";

function isMetaMaskInstalled() {
  return Boolean(window.ethereum);
}

async function readAddress() {
  const method = "eth_requestAccounts";
  const accounts = await window.ethereum.request({
    method,
  });
  return accounts[0];
}

function getSelectedAddress() {
  return window.ethereum?.selectedAddress;
}

const ConnectWalletButton = ({ onChangeAddress, onChangeChainId }) => {
  const [address, setAddress] = useState(getSelectedAddress());
  const [chainId, setChainId] = useState(
    Number(window.ethereum.networkVersion)
  );

  const connectWallet = async () => {
    const selectedAddress = await readAddress();
    const selectedChainId = Number(window.ethereum.networkVersion);
    setAddress(selectedAddress);
    setChainId(selectedChainId);
    onChangeAddress(selectedAddress);
    onChangeChainId(selectedChainId);
  };

  useEffect(() => {
    onChangeAddress(window.ethereum?.selectedAddress);
    onChangeChainId(Number(window.ethereum?.networkVersion));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const eventName = `accountsChanged`;
    if (!isMetaMaskInstalled()) {
      return;
    }
    const listener = ([selectedAddress]) => {
      setAddress(selectedAddress);
      onChangeAddress(selectedAddress);
    };
    window.ethereum.on(eventName, listener);
    return () => {
      window.ethereum.removeListener(eventName, listener);
    };
  }, [onChangeAddress]);

  useEffect(() => {
    const eventName = `chainChanged`;
    if (!isMetaMaskInstalled()) {
      return;
    }
    const listener = (selectedChainId) => {
      setChainId(Number(selectedChainId));
      onChangeChainId(Number(selectedChainId));
    };
    window.ethereum.on(eventName, listener);
    return () => {
      window.ethereum.removeListener(eventName, listener);
    };
  }, [onChangeChainId]);

  if (!isMetaMaskInstalled()) {
    window.alert(
      "No wallet found. Please install MetaMask and refresh the page."
    );
  }
  if (address && chainIds[chainId]) {
    return (
      <>
        <h3>Network: {chainIds[chainId]} </h3>
        <h3>Address: {address}</h3>
      </>
    );
  }
  return <button className="button1" onClick={connectWallet}>Connect Wallet</button>;
};
export default ConnectWalletButton;
