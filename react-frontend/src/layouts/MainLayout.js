import { Outlet } from "react-router-dom";
import Menu from "../components/header/Menu";
import ConnectWalletButton from "../components/header/ConnectWalletButton";
import image from "../logonew_new.png";
const MainLayout = ({
  accountAddress,
  networkChainId,
  addressChanged,
  chainIdChanged,
}) => {
  return (
    <>
      <header className="header">
        <div className="leftPart">
          <div className="leftHeader">
            <img src={image} alt="" />
          </div>
          <Menu />
        </div>
        <ConnectWalletButton
          connectButtonClass="button1"
          onChangeAddress={addressChanged}
          onChangeChainId={chainIdChanged}
          address={accountAddress}
          chainId={networkChainId}
        />
      </header>

      <Outlet />
    </>
  );
};
export default MainLayout;
