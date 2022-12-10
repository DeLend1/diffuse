import { useState, useCallback } from "react";
import ConnecWallettButton from "./components/header/ConnectWalletButton";
import APY from "./components/body/APY";
function App() {
  const [accountAddress, setAccountAddress] = useState("");
  const [networkChainId, setNetworkChainId] = useState("");

  const addressChanged = useCallback((address) => {
    setAccountAddress(address);
  }, []);

  const chainIdChanged = useCallback((networkChainId) => {
    setNetworkChainId(networkChainId);
  }, []);

  return (
    <div className="App">
      <div className="header">
        <h1>deLend</h1>
        <ConnecWallettButton
          onChangeAddress={addressChanged}
          onChangeChainId={chainIdChanged}
        />
      </div>
      <div className="body">
        <APY />
      </div>
    </div>
  );
}

export default App;
