import { useSelector, useDispatch } from "react-redux";
import React from "react";
import chainIds from "../../utils/chainIds";
import { loadAccount } from "../../store/interactions";

const ConnectWalletButton = ({ connectButtonClass }) => {
  const provider = useSelector((state) => state.provider.connection);
  const chainId = useSelector((state) => state.provider.chainId);
  const address = useSelector((state) => state.provider.address);
  const dispatch = useDispatch();

  const connectWallet = async () => {
    await loadAccount(provider, dispatch);
  };

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
