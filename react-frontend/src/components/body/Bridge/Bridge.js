import { useEffect, useState } from "react";

import { Hop, Chain } from "@hop-protocol/sdk";
import { ethers, constants } from "ethers";
import chainIds from "../../../utils/chainIds";
import abiERC20 from "../../../utils/abiERC20.json";
import chainParams from "../../../utils/chainsParams.json";

const Bridge = ({
  userToken,
  bestApyChain,
  chainId,
  accountAddress,
  value,
  userBalance,
}) => {
  const [approvalBalance, setApprovalBalance] = useState(constants.Zero);
  const [approvalAddress, setApprovalAddress] = useState("");
  const [estimatedValue, setEstimatedValue] = useState(constants.Zero);
  const [convertEstimatedValue, setConvertEstimatedValue] = useState("");
  const [responseStatus, setResponseStatus] = useState(false);
  const [responseFeeStatus, setResponseFeeStatus] = useState(false);

  let provider;
  let signer;
  let hop;

  try {
    provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    signer = provider.getSigner();
    hop = new Hop("mainnet", signer);
  } catch (err) {
    console.log("Bridge connection error");
  }
  const bridge = hop.connect(signer).bridge(userToken.label);

  const possibleBridgeTokens = ["USDC", "USDT", "DAI", "ETH"];

  useEffect(() => {
    (async function () {
      try {
        const bridgeAddress = await bridge.getSendApprovalAddress(
          Chain[chainIds[chainId]]
        );
        setResponseFeeStatus(true);
        const { estimatedReceived } = await bridge.getSendData(
          value,
          Chain[chainIds[chainId]],
          Chain[chainIds[bestApyChain]]
        );
        setEstimatedValue(estimatedReceived);
        const decimals = userToken.label !== "ETH" ? 6 : 18;
        const convertValue = Number(
          ethers.utils.formatUnits(estimatedReceived.toString(), decimals)
        ).toFixed(3);
        setConvertEstimatedValue(convertValue);
        setResponseFeeStatus(false);
        if (
          userToken.contractAddress !== "0x" &&
          userToken.contractAddress !== undefined
        ) {
          const contract = new ethers.Contract(
            userToken.contractAddress,
            abiERC20,
            provider
          );
          const currentAllowance = await contract.allowance(
            accountAddress,
            bridgeAddress
          );

          setApprovalBalance(currentAllowance);
          setApprovalAddress(bridgeAddress);
        } else if (userToken.contractAddress === "0x") {
          setApprovalBalance(constants.MaxUint256);
          setApprovalAddress(bridgeAddress);
        }
      } catch (err) {}
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userToken, accountAddress, chainId, value]);

  async function changeNetwork() {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${bestApyChain.toString(16)}` }],
      });
    } catch (err) {
      // This error code indicates that the chain has not been added to MetaMask
      if (err.code === 4902) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: chainParams[bestApyChain],
        });
      }
    }
  }

  async function approve() {
    const contract = new ethers.Contract(
      userToken.contractAddress,
      abiERC20,
      signer
    );
    await contract.approve(approvalAddress, constants.MaxUint256);
    setApprovalBalance(constants.MaxUint256);
  }

  async function makeBridge() {
    try {
      if (value.gt(approvalBalance)) {
        await approve();
      }
      const txBridge = await bridge.send(
        value,
        Chain[chainIds[chainId]],
        Chain[chainIds[bestApyChain]]
      );
      setResponseStatus(true);
      await txBridge.wait();
      await changeNetwork();
      setResponseStatus(false);
      window.alert(
        "Transaction completed!\nPlease wait until the tokens are credited to your account.\nThis may take about 5 minutes."
      );
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <p>
        To deposit this asset choose a chain with the best APY or use a bridge!
      </p>
      <button className="approveBridge" onClick={changeNetwork}>
        Change Network
      </button>
      {possibleBridgeTokens.indexOf(userToken.label) !== -1 &&
      !value.eq(constants.Zero) &&
      userBalance.gte(value) ? (
        <div className="bridge">
          {estimatedValue.eq(constants.Zero) ? (
            <>
              {!responseFeeStatus ? (
                <p>
                  <br />
                  The bridge commission exceeds the amount entered!
                  <br /> Transaction not possible!
                </p>
              ) : (
                <p>
                  <br />
                  Loading bridge transaction fee...
                </p>
              )}
            </>
          ) : (
            <>
              <p>
                <br />
                {`You will recieved: ${convertEstimatedValue} ${userToken.label} on ${chainIds[bestApyChain]}`}
              </p>
              {!responseStatus ? (
                <button className="bridgeTrans" onClick={makeBridge}>
                  Bridge assets
                </button>
              ) : (
                <button className="bridgeTrans">Waiting...</button>
              )}
            </>
          )}
        </div>
      ) : null}
    </>
  );
};

export default Bridge;

/*
 <p>
          Transaction completed!
          <br />
          Please change the network and wait until the tokens appear on your
          balance!
        </p>
*/
