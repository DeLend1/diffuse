import React, { useEffect } from "react";
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

const ConnectWalletButton = ({
  onChangeAddress,
  onChangeChainId,
  connectButtonClass,
  address,
  chainId,
}) => {
  const connectWallet = async () => {
    const selectedAddress = await readAddress();
    const selectedChainId = Number(window.ethereum.networkVersion);

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
      onChangeChainId(Number(selectedChainId));
    };
    window.ethereum.on(eventName, listener);
    return () => {
      window.ethereum.removeListener(eventName, listener);
    };
  }, [onChangeChainId]);

  if (address && chainIds[chainId]) {
    if (connectButtonClass === "button1") {
      return (
        <>
          <div className="divaddress">
            <button type="button" className="chainId">
              {chainIds[chainId]}
            </button>
            <button type="button" id="addressButton">
              <div className="address">{`${address.slice(
                0,
                6
              )}...${address.slice(-4)}`}</div>
            </button>
          </div>
        </>
      );
    }
    return null;
  }
  return (
    <button className={connectButtonClass} onClick={connectWallet}>
      Connect Wallet
    </button>
  );
};
export default ConnectWalletButton;

/*
function getSelectedAddress() {
  return window.ethereum?.selectedAddress;
} 
*/
