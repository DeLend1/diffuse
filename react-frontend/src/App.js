import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import DepositPage from "./components/body/DepositPage";
import WithdrawPage from "./components/body/WithdrawPage";

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
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout
                accountAddress={accountAddress}
                networkChainId={networkChainId}
                addressChanged={addressChanged}
                chainIdChanged={chainIdChanged}
              />
            }
          >
            <Route
              index={true}
              element={
                <DepositPage
                  accountAddress={accountAddress}
                  networkChainId={networkChainId}
                  addressChanged={addressChanged}
                  chainIdChanged={chainIdChanged}
                />
              }
            />
            <Route
              path="/withdraw"
              element={
                <WithdrawPage
                  accountAddress={accountAddress}
                  networkChainId={networkChainId}
                  addressChanged={addressChanged}
                  chainIdChanged={chainIdChanged}
                />
              }
            />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

/*
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
*/
