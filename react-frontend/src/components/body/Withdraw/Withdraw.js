import { useState, useEffect } from "react";
import { ethers, constants } from "ethers";
import { useSelector, useDispatch } from "react-redux";

import CoinSelect from "../CoinSelect/CoinSelect";
import ValueInput from "../ValueInput/ValueInput";

import abiERC20 from "../../../utils/abiERC20.json";
import protocolAddresses from "../../../utils/protocolAddresses.json";
import abiProtocol from "../../../utils/abiProtocol.json";
import apyTokens from "../../../utils/apyTokens.json";
import image from "./tick.png";

import {
  loadApprovalBalance,
  loadUserlBalance,
} from "../../../store/interactions";

function WithdrawFunc() {
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

  // withdraw tx
  async function withdraw() {
    const signer = provider.getSigner();
    const contract = new ethers.Contract(protocolAddress, abiProtocol, signer);
    const resultTokenName = userToken.value.replace("a", "").toUpperCase();
    const resultTokenAddress = apyTokens[chainId][resultTokenName];
    const txWithdraw = await contract.withdraw(
      resultTokenAddress,
      userToken.contractAddress,
      value
    );
    setResponseStatus(true);
    await txWithdraw.wait();
    setResponseStatus(false);
  }

  //function for "withdraw button"
  async function createTransaction() {
    if (approvalBalance.gte(value)) {
      await withdraw();
      setTxStatus(true);
    } else {
      await approve();
      await withdraw();
      setTxStatus(true);
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
          <CoinSelect mode={false} />
        </div>
      </div>
      <ValueInput />
      {convertUserBalance !== "" && userToken ? (
        <div className="balance">
          <p>{`Your deposited balance: ${convertUserBalance} ${userToken.label}`}</p>
        </div>
      ) : null}

      {chainId === "" ? null : value === "" ||
        value === 0 ||
        value.eq(constants.Zero) ? null : userBalance.gte(value) ? (
        <div className="buttons">
          {!txStatus && !responseStatus ? (
            <div className="withdrawButton">
              <button className="withdraw" onClick={createTransaction}>
                Withdraw
              </button>
            </div>
          ) : !responseStatus ? (
            <div className="successButton">
              <button className="deposit success" onClick={changeTxStatus}>
                Successful withdrawal <img src={image} alt="" />
              </button>
            </div>
          ) : (
            <div className="depositButton">
              <button className="deposit">Loading...</button>
            </div>
          )}
        </div>
      ) : (
        <>
          {txStatus === true && (
            <div className="buttons">
              <div className="successButton">
                <button className="deposit success" onClick={changeTxStatus}>
                  Successful withdrawal <img src={image} alt="" />
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

export default WithdrawFunc;
