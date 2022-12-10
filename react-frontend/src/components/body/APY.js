import { useState, useEffect } from "react";

import {
  ethContract,
  ethABI,
  optContract,
  optABI,
  tokenVariables,
  polABI,
  polContract,
} from "./constants.js";
import { ethers } from "ethers";

export default function APY() {
  const [bestApy, setBestApy] = useState("");
  const [bestAsset, setBestAsset] = useState("");
  useEffect(() => {
    (async function () {
      const ethAPY = await getAPYETH();
      const optAPY = await getAPYOPT();
      const polAPY = await getAPYPOL();
      const [apy, asset] = getBestAPY(ethAPY, optAPY, polAPY);
      setBestApy(apy);
      setBestAsset(asset);
    })();
  }, []);
  return (
    <h3> {bestApy ? `Best APY is %${bestApy} ${bestAsset}` : "Loading..."}</h3>
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
  const assets = [
    "ethUSDT",
    "ethWETH",
    "ethUSDC",
    "ethDAI",
    "ethBUSD",
    "ethLUSD",
  ];
  const currentAPYETH = await Promise.all([
    getAPY(contractETH, tokenVariables.ethUSDT, 3),
    getAPY(contractETH, tokenVariables.ethWETH, 3),
    getAPY(contractETH, tokenVariables.ethUSDC, 3),
    getAPY(contractETH, tokenVariables.ethDAI, 3),
    getAPY(contractETH, tokenVariables.ethBUSD, 3),
    getAPY(contractETH, tokenVariables.ethLUSD, 3),
  ]);
  let maxAPYIndex = currentAPYETH.indexOf(Math.max(...currentAPYETH));
  let result = {};
  result[currentAPYETH[maxAPYIndex]] = assets[maxAPYIndex];
  return result;
}
async function getAPYOPT() {
  const assets = ["optUSDT", "optDAI", "optUSDC"];
  const currentAPYOPT = await Promise.all([
    getAPY(contractOPT, tokenVariables.optUSDT, 5),
    getAPY(contractOPT, tokenVariables.optDAI, 5),
    getAPY(contractOPT, tokenVariables.optUSDC, 5),
  ]);
  const maxAPYIndex = currentAPYOPT.indexOf(Math.max(...currentAPYOPT));
  let result = {};
  result[currentAPYOPT[maxAPYIndex]] = assets[maxAPYIndex];
  return result;
}
async function getAPYPOL() {
  const assets = ["polUSDC", "polDAI", "polUSDT"];
  const currentAPYPOL = await Promise.all([
    getAPY(contractPOL, tokenVariables.polUSDT, 2),
    getAPY(contractPOL, tokenVariables.polDAI, 2),
    getAPY(contractPOL, tokenVariables.polUSDC, 2),
  ]);
  let maxAPYIndex = currentAPYPOL.indexOf(Math.max(...currentAPYPOL));
  let result = {};
  result[currentAPYPOL[maxAPYIndex]] = assets[maxAPYIndex];
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
  const data = await contract.getReserveData(address); //getReserveData(ethUSDT);
  let APY = ethers.utils.formatEther(data[index]._hex);
  APY = APY / 10000000;
  APY = +APY.toFixed(2);
  return APY;
}
