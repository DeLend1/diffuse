import { Outlet } from "react-router-dom";
import Menu from "../components/header/Menu";
import ConnectWalletButton from "../components/header/ConnectWalletButton";
import image from "../logonew.png";
const MainLayout = ({
  accountAddress,
  networkChainId,
  addressChanged,
  chainIdChanged,
}) => {
  return (
    <>
      <header className="header">
        <div className="leftHeader">
          <img src={image} alt="" />
          <h1>Diffuse</h1>
        </div>
        <ConnectWalletButton
          connectButtonClass="button1"
          onChangeAddress={addressChanged}
          onChangeChainId={chainIdChanged}
          address={accountAddress}
          chainId={networkChainId}
        />
      </header>
      <Menu />
      <Outlet />
    </>
  );
};
export default MainLayout;
