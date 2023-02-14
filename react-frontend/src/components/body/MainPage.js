import MainFunctionality from "./MainFunctionality/MainFunctionality";
import ConnectWalletButton from "../header/ConnectWalletButton";
import FAQ from "./FAQ/FAQ";

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
      <FAQ />
    </div>
  );
};

export default MainPage;
