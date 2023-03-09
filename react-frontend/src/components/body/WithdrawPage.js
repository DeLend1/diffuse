import Withdraw from "./Withdraw/Withdraw";
import ConnectWalletButton from "../header/ConnectWalletButton";
import FAQ from "./FAQ/FAQ";

const WithdrawPage = () => {
  return (
    <div className="body">
      <div className="main">
        <h1>Withdraw your assets</h1>
        <Withdraw />
        <ConnectWalletButton />
      </div>
      <h1 className="faqh1">FAQs</h1>
      <FAQ />
    </div>
  );
};

export default WithdrawPage;
