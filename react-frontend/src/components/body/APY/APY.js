import { useState, useEffect } from "react";

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

export default function APY({ updateBestToken, updateBestChain }) {
  const [bestApy, setBestApy] = useState("");
  const [bestAsset, setBestAsset] = useState("");
  const [bestChain, setBestChain] = useState("");
  useEffect(() => {
    (async function () {
      const ethAPY = await getAPYETH();
      const optAPY = await getAPYOPT();
      const polAPY = await getAPYPOL();
      const [apy, asset] = getBestAPY(ethAPY, optAPY, polAPY);
      setBestApy(apy);
      setBestAsset(asset[0]);
      setBestChain(asset[1]);
      updateBestToken(asset[0]);
      updateBestChain(asset[1]);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  let result = {};
  result[currentAPYETH[maxAPYIndex]] = [Object.keys(assets)[maxAPYIndex], 1];
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
  let result = {};
  result[currentAPYOPT[maxAPYIndex]] = [Object.keys(assets)[maxAPYIndex], 10];
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
  let result = {};
  result[currentAPYPOL[maxAPYIndex]] = [Object.keys(assets)[maxAPYIndex], 137];
  return result;
}
function getBestAPY(bestETH, bestOPT, bestPOL) {
  const total = { ...bestETH, ...bestOPT, ...bestPOL };
  const APYs = Object.keys(total).map((element) => {
    return Number(element);
  });
  const maxAPY = Math.max(...APYs);
  return [maxAPY, total[maxAPY]];
}

async function getAPY(contract, address, index) {
  const data = await contract.getReserveData(address);
  let APY = ethers.utils.formatEther(data[index]._hex);
  APY = APY / 10000000;
  APY = +APY.toFixed(2);
  return APY;
}
