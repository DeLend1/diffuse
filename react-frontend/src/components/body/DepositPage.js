import DepositFunc from "./Deposit/DepositFunc";
import ConnectWalletButton from "../header/ConnectWalletButton";

const DepositPage = ({
  accountAddress,
  networkChainId,
  addressChanged,
  chainIdChanged,
}) => {
  return (
    <div className="body">
      <div className="main">
        <h1>Deposit to Earn</h1>
        <DepositFunc chainId={networkChainId} accountAddress={accountAddress} />
        <ConnectWalletButton
          connectButtonClass="button2"
          onChangeAddress={addressChanged}
          onChangeChainId={chainIdChanged}
          address={accountAddress}
          chainId={networkChainId}
        />
      </div>
    </div>
  );
};

export default DepositPage;
/*
<div className="body">
          <div className="main">
            <h1>Deposit to Earn</h1>
            <Body chainId={networkChainId} accountAddress={accountAddress} />

            <ConnectWallettButton
              connectButtonClass="button2"
              onChangeAddress={addressChanged}
              onChangeChainId={chainIdChanged}
              address={accountAddress}
              chainId={networkChainId}
            />
          </div>
        </div>
*/
