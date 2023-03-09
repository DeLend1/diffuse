import MainFunctionality from "./MainFunctionality/MainFunctionality";
import ConnectWalletButton from "../header/ConnectWalletButton";
import FAQ from "./FAQ/FAQ";

const MainPage = () => {
  return (
    <div className="body">
      <div className="main">
        <h1>Deposit to Earn</h1>
        <MainFunctionality />
        <ConnectWalletButton connectButtonClass="button2" />
      </div>
      <h2 className="faqh1">FAQs</h2>

      <FAQ />
    </div>
  );
};

export default MainPage;
