import { useState } from "react";

import ConnecWallettButton from "./components/header/ConnectWalletButton";
import Body from "./components/body/Body";

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
      <div className="header">
        <img src="react-frontend/public/IMG_0147.JPG"></img>
        <h1>DeLend</h1>
        <ConnecWallettButton
          onChangeAddress={addressChanged}
          onChangeChainId={chainIdChanged}
        />
      </div>
      <div className="body">
        <Body chainId={networkChainId} accountAddress={accountAddress} />
      </div>
    </div>
  );
}

export default App;
