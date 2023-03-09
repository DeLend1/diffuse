import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { loadProvider, loadNetwork, loadAccount } from "./store/interactions";

import MainLayout from "./layouts/MainLayout";
import MainPage from "./components/body/MainPage";
import WithdrawPage from "./components/body/WithdrawPage";

function App() {
  const dispatch = useDispatch();

  const loadBlockchainData = async () => {
    // Connect Ethers to blockchain
    let provider = loadProvider(dispatch);

    // Fetch current network's chainId (e.g. hardhat: 31337, kovan: 42)
    await loadNetwork(provider, dispatch);

    // Reload page when network changes
    window.ethereum.on("chainChanged", async () => {
      provider = loadProvider(dispatch);
      await loadNetwork(provider, dispatch);
    });

    // Fetch current account & balance from Metamask when changed
    window.ethereum.on("accountsChanged", () => {
      loadAccount(provider, dispatch);
    });
  };

  useEffect(() => {
    loadBlockchainData();
  });

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index={true} element={<MainPage />} />
            <Route path="/withdraw" element={<WithdrawPage />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
