import Withdraw from "./Withdraw/Withdraw";
import ConnectWalletButton from "../header/ConnectWalletButton";

const WithdrawPage = ({
  accountAddress,
  networkChainId,
  addressChanged,
  chainIdChanged,
}) => {
  return (
    <div className="body">
      <div className="main">
        <h1>Withdraw your reward</h1>
        <Withdraw chainId={networkChainId} accountAddress={accountAddress} />
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

export default WithdrawPage;
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
