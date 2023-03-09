import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadBestAPY,
  loadEthereumAPY,
  loadOptimismAPY,
  loadPolygonAPY,
} from "../../../store/interactions.js";

import {
  ethContract,
  ethABI,
  optContract,
  optABI,
  polABI,
  polContract,
} from "../../../utils/aaveLendingPools.js";
import chainIds from "../../../utils/chainIds";
import { ethers } from "ethers";
import apyTokens from "../../../utils/apyTokens.json";

export default function APY() {
  const selectedChain = useSelector((state) => state.userChoice.selectedChain);

  const bestApy = useSelector((state) => state.dataAPY[selectedChain].APY);
  const bestAsset = useSelector((state) => state.dataAPY[selectedChain].asset);
  const bestChain = useSelector((state) => state.dataAPY[selectedChain].chain);

  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      const ethAPY = await getAPYETH();
      loadEthereumAPY(ethAPY, dispatch);
      const optAPY = await getAPYOPT();
      loadOptimismAPY(optAPY, dispatch);
      const polAPY = await getAPYPOL();
      loadPolygonAPY(polAPY, dispatch);
      const bestAPY = getBestAPY(/*ethAPY,*/ [optAPY, polAPY]);
      loadBestAPY(bestAPY, dispatch);
    })();
  });

  return (
    <div className="divAPY">
      <div className="textAPY">THE BEST CURRENT APY:</div>
      <div className="valueAPY">
        {" "}
        {bestApy
          ? `${bestApy}% ${bestAsset} on ${chainIds[bestChain]}`
          : "Loading..."}
      </div>
    </div>
  );
}

const providerETH = new ethers.providers.getDefaultProvider(
  "https://eth-mainnet.g.alchemy.com/v2/ErZy1DQKTwWpqN582ikeaixCn0s7V-nY"
);
const providerOPT = new ethers.providers.getDefaultProvider(
  "https://opt-mainnet.g.alchemy.com/v2/rGxMh-VmT6sDglxDIpLe1G2G9mfU5cSN"
);
const providerPOL = new ethers.providers.getDefaultProvider(
  "https://polygon-mainnet.g.alchemy.com/v2/2rZu6NzeOIxczqj9ECkVtEea095qnyj6"
);

const contractETH = new ethers.Contract(ethContract, ethABI, providerETH);
const contractOPT = new ethers.Contract(optContract, optABI, providerOPT);
const contractPOL = new ethers.Contract(polContract, polABI, providerPOL);

async function getAPYETH() {
  const assets = apyTokens["1"];
  const currentAPYETH = await Promise.all(
    Object.values(assets).map((element) => {
      return getAPY(contractETH, element, 3);
    })
  );
  let maxAPYIndex = currentAPYETH.indexOf(Math.max(...currentAPYETH));
  let result = {
    chain: 1,
    asset: Object.keys(assets)[maxAPYIndex],
    APY: currentAPYETH[maxAPYIndex],
  };
  return result;
}
async function getAPYOPT() {
  const assets = apyTokens["10"];
  const currentAPYOPT = await Promise.all(
    Object.values(assets).map((element) => {
      return getAPY(contractOPT, element, 5);
    })
  );
  let maxAPYIndex = currentAPYOPT.indexOf(Math.max(...currentAPYOPT));
  let result = {
    chain: 10,
    asset: Object.keys(assets)[maxAPYIndex],
    APY: currentAPYOPT[maxAPYIndex],
  };
  return result;
}
async function getAPYPOL() {
  const assets = apyTokens["137"];
  const currentAPYPOL = await Promise.all(
    Object.values(assets).map((element) => {
      return getAPY(contractPOL, element, 2);
    })
  );
  let maxAPYIndex = currentAPYPOL.indexOf(Math.max(...currentAPYPOL));
  let result = {
    chain: 137,
    asset: Object.keys(assets)[maxAPYIndex],
    APY: currentAPYPOL[maxAPYIndex],
  };
  return result;
}
function getBestAPY(array) {
  let maxAPYObj = array[0];

  for (let i = 1; i < array.length; i++) {
    if (array[i].APY > maxAPYObj.APY) {
      maxAPYObj = array[i];
    }
  }
  return maxAPYObj;
}

async function getAPY(contract, address, index) {
  const data = await contract.getReserveData(address);
  let APY = ethers.utils.formatEther(data[index]._hex);
  APY = APY / 10000000;
  APY = +APY.toFixed(2);
  return APY;
}
