import { useEffect, useState } from "react";

import { Hop, Chain } from "@hop-protocol/sdk";
import { ethers, constants } from "ethers";
import chainIds from "../../../utils/chainIds";
import abiERC20 from "../../../utils/abiERC20.json";

const Bridge = ({
  userToken,
  bestApyChain,
  chainId,
  accountAddress,
  value,
}) => {
  const [approvalBalance, setApprovalBalance] = useState(constants.Zero);
  const [approvalAddress, setApprovalAddress] = useState("");
  const [txStatus, setTxStatus] = useState(false);

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
  }, [userToken]);

  async function f_approve() {
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
      await bridge.send(
        value,
        Chain[chainIds[chainId]],
        Chain[chainIds[bestApyChain]]
      );
      setTxStatus(true);
    } catch (err) {
      window.alert(
        "The bridge is down! Please choose another token or try again later!"
      );
      console.log(err);
    }
  }

  return (
    <>
      {possibleBridgeTokens.indexOf(userToken.label) !== -1 &&
      !value.eq(constants.Zero) ? (
        <div className="bridge">
          {!txStatus && (
            <p>
              To deposit this asset choose a chain with the best
              APY or use a bridge!
            </p>
          )}
          {approvalBalance.lt(value) && value !== "" ? (
            <button className="approveBridge" onClick={f_approve}>Approve Bridge</button>
          ) : !txStatus ? (
            <button className="bridgeTrans" onClick={makeBridge}>Bridge assets</button>
          ) : (
            <p>
              Transaction completed!
              <br />
              Please change the network and wait until the tokens appear on
               your balance!
            </p>
          )}
        </div>
      ) : null}
    </>
  );
};

export default Bridge;
