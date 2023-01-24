import MainFunctionality from "./MainFunctionality/MainFunctionality";
import ConnectWalletButton from "../header/ConnectWalletButton";

const MainPage = ({
  accountAddress,
  networkChainId,
  addressChanged,
  chainIdChanged,
}) => {
  return (
    <div className="body">
      <div className="main">
        <h1>Deposit to Earn</h1>
        <MainFunctionality
          chainId={networkChainId}
          accountAddress={accountAddress}
        />
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

export default MainPage;
