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
      <header className="header">
        <h1>DeLend</h1>
        <ConnecWallettButton className="button1"
          onChangeAddress={addressChanged}
          onChangeChainId={chainIdChanged}
        />
      </header>

      <div className="body">
        <div className="main">
        <h1>Deposit to Earn</h1>
        <Body chainId={networkChainId} accountAddress={accountAddress} />
        
        <ConnecWallettButton className="button2"
          onChangeAddress={addressChanged}
          onChangeChainId={chainIdChanged}
        />
        </div>
        
      
      </div>
    </div>
  );
}

export default App;
