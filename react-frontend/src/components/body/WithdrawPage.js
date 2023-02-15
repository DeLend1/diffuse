import Withdraw from "./Withdraw/Withdraw";
import ConnectWalletButton from "../header/ConnectWalletButton";
import FAQ from "./FAQ/FAQ";

const WithdrawPage = ({
  accountAddress,
  networkChainId,
  addressChanged,
  chainIdChanged,
}) => {
  return (
    <div className="body">
      <div className="main">
        <h1>Withdraw your assets</h1>
        <Withdraw chainId={networkChainId} accountAddress={accountAddress} />
        <ConnectWalletButton
          connectButtonClass="button2"
          onChangeAddress={addressChanged}
          onChangeChainId={chainIdChanged}
          address={accountAddress}
          chainId={networkChainId}
        />
      </div>
      <h1 class="faqh1">FAQ</h1>
      <FAQ />
    </div>
  );
};

export default WithdrawPage;
