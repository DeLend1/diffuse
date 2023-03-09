import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { ethers, constants } from "ethers";

import APY from "../APY/APY";
import CoinSelect from "../CoinSelect/CoinSelect";
import ValueInput from "../ValueInput/ValueInput";
import Bridge from "../Bridge/Bridge";
import Settings from "../Settings/Settings";

import abiERC20 from "../../../utils/abiERC20.json";
import protocolAddresses from "../../../utils/protocolAddresses.json";
import apyTokens from "../../../utils/apyTokens.json";
import abiProtocol from "../../../utils/abiProtocol.json";
import image from "./tick.png";

import {
  loadApprovalBalance,
  loadUserlBalance,
} from "../../../store/interactions";

function MainFunctionality() {
  const provider = useSelector((state) => state.provider.connection);
  const chainId = useSelector((state) => state.provider.chainId);
  const accountAddress = useSelector((state) => state.provider.address);

  const value = useSelector((state) => state.userChoice.value);
  const userToken = useSelector((state) => state.userChoice.userToken);
  const approvalBalance = useSelector(
    (state) => state.userChoice.approvalBalance
  );
  const userBalance = useSelector((state) => state.userChoice.userBalance);
  const convertUserBalance = useSelector(
    (state) => state.userChoice.convertUserBalance
  );
  const selectedChain = useSelector((state) => state.userChoice.selectedChain);

  const bestApyToken = useSelector(
    (state) => state.dataAPY[selectedChain].asset
  );
  const bestApyChain = useSelector(
    (state) => state.dataAPY[selectedChain].chain
  );

  const dispatch = useDispatch();

  const [txStatus, setTxStatus] = useState(false);
  const [responseStatus, setResponseStatus] = useState(false);

  const protocolAddress = protocolAddresses[chainId];

  // refresh approval balance
  useEffect(() => {
    (async function () {
      await loadApprovalBalance(
        provider,
        accountAddress,
        userToken,
        protocolAddress,
        dispatch
      );
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userToken, accountAddress, chainId]);

  // refresh user balance of the userToken
  useEffect(() => {
    (async function () {
      await loadUserlBalance(
        provider,
        chainId,
        accountAddress,
        userToken,
        dispatch
      );
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userToken, accountAddress, value, chainId, txStatus]);

  // change tx status
  useEffect(() => {
    setTxStatus(false);
  }, [value, userToken]);

  //approve tx
  async function approve() {
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      userToken.contractAddress,
      abiERC20,
      signer
    );
    const txAppove = await contract.approve(
      protocolAddress,
      constants.MaxUint256
    );
    await txAppove.wait();
    await loadApprovalBalance(
      provider,
      accountAddress,
      userToken,
      protocolAddress,
      dispatch
    );
  }

  // deposit token on lending protocol
  async function deposit() {
    const poolFees = ["100", "500", "3000", "10000"];
    const signer = provider.getSigner();
    const contract = new ethers.Contract(protocolAddress, abiProtocol, signer);

    if (userToken.contractAddress !== "0x") {
      for (let fee of poolFees) {
        try {
          const txDeposit = await contract.supplyFromToken(
            value,
            userToken.contractAddress,
            apyTokens[bestApyChain][bestApyToken], //bestAPYToken
            fee
          );
          setResponseStatus(true);
          await txDeposit.wait();
          setTxStatus(true);
          setResponseStatus(false);
          break;
        } catch (err) {
          if (err.reason === "user rejected transaction") {
            break;
          } else {
            console.log(err.reason);
          }
        }
      }
    } else {
      for (let fee of poolFees) {
        try {
          const txDeposit = await contract.supplyFromETH(
            apyTokens[bestApyChain][bestApyToken], //bestAPYToken
            fee,
            {
              value: value,
            }
          );
          setResponseStatus(true);
          await txDeposit.wait();
          setTxStatus(true);
          setResponseStatus(false);
          break;
        } catch (err) {
          if (err.reason === "user rejected transaction") {
            break;
          } else {
            console.log(err.reason);
          }
        }
      }
    }
  }

  //function for "deposit button"
  async function createTransaction() {
    if (approvalBalance.gte(value)) {
      await deposit();
    } else {
      await approve();
      await deposit();
    }
  }

  function changeTxStatus() {
    setTxStatus(false);
  }

  return (
    <>
      <div className="select">
        <div className="selectAsset">Select Asset:</div>
        <div className="selectAssetValue">
          <CoinSelect mode={true} />
        </div>
      </div>
      <Settings />
      <ValueInput />
      {convertUserBalance !== "" && userToken ? (
        <div className="balance">
          <p>{`Your balance: ${convertUserBalance} ${userToken.label}`}</p>
        </div>
      ) : null}
      <APY />
      {chainId === "" ? null : value === "" ||
        value === 0 ||
        value.eq(constants.Zero) ? null : chainId !== bestApyChain ? ( //for test set 31337
        <div className="buttons">
          {value !== "" && <Bridge bestApyChain={bestApyChain} />}
        </div>
      ) : userBalance.gte(value) ? (
        <div className="buttons">
          {!txStatus && !responseStatus ? (
            <div className="depositButton">
              <button className="deposit" onClick={createTransaction}>
                Deposit
              </button>
            </div>
          ) : !responseStatus ? (
            <div className="successButton">
              <button className="deposit success" onClick={changeTxStatus}>
                Successfully deposited <img src={image} alt="" />
              </button>
            </div>
          ) : (
            <div className="depositButton">
              <button className="deposit">Waiting...</button>
            </div>
          )}
        </div>
      ) : (
        <>
          {txStatus === true && (
            <div className="buttons">
              <div className="successButton">
                <button className="deposit success" onClick={changeTxStatus}>
                  Successfully deposited <img src={image} alt="" />
                </button>
              </div>
            </div>
          )}
          <p>
            <b>You don't have enough funds</b>
          </p>
        </>
      )}
    </>
  );
}

export default MainFunctionality;
