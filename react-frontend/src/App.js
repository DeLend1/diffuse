import { useState } from "react";

import ConnectWallettButton from "./components/header/ConnectWalletButton";
import Body from "./components/body/Body";
import image from "./logonew.png";

function App() {
  const [accountAddress, setAccountAddress] = useState("");
  const [networkChainId, setNetworkChainId] = useState("");

  const addressChanged = (address) => {
    setAccountAddress(address);
  };

  const chainIdChanged = (networkChainId) => {
    setNetworkChainId(networkChainId);
  };

  return (
    <div className="App">
      <header className="header">
        <div className="leftHeader">
          <img src={image} alt="" />
          <h1>DeLend</h1>
        </div>
        <ConnectWallettButton
          connectButtonClass="button1"
          onChangeAddress={addressChanged}
          onChangeChainId={chainIdChanged}
          address={accountAddress}
          chainId={networkChainId}
        />
      </header>

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
    </div>
  );
}

export default App;
