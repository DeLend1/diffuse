import { useState, useEffect } from "react";
import { ethers, constants } from "ethers";

import APY from "../APY/APY";
import CoinSelect from "../CoinSelect/CoinSelect";
import ValueInput from "../ValueInput/ValueInput";
import Bridge from "../Bridge/Bridge";

import abiERC20 from "../../../utils/abiERC20.json";
import protocolAddresses from "../../../utils/protocolAddresses.json";
import apyTokens from "../../../utils/apyTokens.json";
import abiProtocol from "../../../utils/abiProtocol.json";
import image from "./tick.png";

function MainFunctionality({ chainId, accountAddress }) {
  const [value, setValue] = useState("");
  const [userToken, setUserToken] = useState("");
  const [approvalBalance, setApprovalBalance] = useState(constants.Zero);
  const [userBalance, setUserBalance] = useState(constants.Zero);
  const [convertUserBalance, setConvertUserBalance] = useState("");
  const [bestApyToken, setbestApyToken] = useState("");
  const [bestApyChain, setbestApyChain] = useState("");
  const [txStatus, setTxStatus] = useState(false);

  const protocolAddress = protocolAddresses[chainId];

  const addUserTokenHandler = (coin) => {
    setUserToken(coin);
  };

  // sets the value entered by the user and converts it to a value
  // for the function
  const addUserValueHandler = async (userValue) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      if (userToken.contractAddress !== "0x") {
        const contract = new ethers.Contract(
          userToken.contractAddress,
          abiERC20,
          provider
        );
        const decimals = await contract.decimals();
        const convertValue = ethers.utils.parseUnits(
          userValue.toString(),
          decimals
        );
        setValue(convertValue);
      } else {
        const convertValue = ethers.utils.parseEther(userValue.toString());
        setValue(convertValue);
      }
    } catch (error) {
      const convertValue = constants.Zero;
      setValue(convertValue);
    }
  };

  // refresh approval balance
  useEffect(() => {
    (async function () {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      try {
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
            protocolAddress
          );
          setApprovalBalance(currentAllowance);
        } else if (userToken.contractAddress === "0x") {
          setApprovalBalance(constants.MaxUint256);
        }
      } catch (err) {
        console.log("Refresh approval balance error!");
      }
    })();
  }, [userToken, accountAddress, protocolAddress, chainId]);

  // refresh user balance of the userToken
  useEffect(() => {
    (async function () {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      if (
        userToken.contractAddress !== "0x" &&
        userToken.contractAddress !== undefined &&
        userToken.contractAddress !== ""
      ) {
        const contract = new ethers.Contract(
          userToken.contractAddress,
          abiERC20,
          provider
        );
        const currentBalance = await contract.balanceOf(accountAddress);
        const decimals = await contract.decimals();
        const convertValue = Number(
          ethers.utils.formatUnits(currentBalance.toString(), decimals)
        ).toFixed(3);
        setUserBalance(currentBalance);
        setConvertUserBalance(convertValue);
      } else if (userToken.contractAddress === "0x") {
        const currentBalance = await provider.getBalance(accountAddress);
        const convertValue = Number(
          ethers.utils.formatUnits(currentBalance.toString())
        ).toFixed(3);
        setUserBalance(currentBalance);
        setConvertUserBalance(convertValue);
      }
    })();
  }, [userToken, accountAddress, value, chainId, txStatus]);

  //refresh input data
  useEffect(() => {
    setValue("");
    setUserBalance("");
  }, [chainId, accountAddress]);

  // change tx status
  useEffect(() => {
    setTxStatus(false);
  }, [value, userToken]);

  //approve tx
  async function approve() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
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
    setApprovalBalance(constants.MaxUint256);
  }

  // deposit token on lending protocol
  async function deposit() {
    const poolFees = ["100", "500", "3000", "10000"];
    const provider = new ethers.providers.Web3Provider(window.ethereum);
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
          await txDeposit.wait();
          setTxStatus(true);
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
          await txDeposit.wait();
          setTxStatus(true);
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
      setTxStatus(true);
    } else {
      await approve();
      await deposit();
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
          <CoinSelect
            chainId={chainId}
            addUserToken={addUserTokenHandler}
            mode={true}
          />
        </div>
      </div>
      <ValueInput addUserValue={addUserValueHandler} />
      {convertUserBalance !== "" && userToken ? (
        <div className="balance">
          <p>{`Your balance: ${convertUserBalance} ${userToken.label}`}</p>
        </div>
      ) : null}
      <APY
        updateBestToken={setbestApyToken}
        updateBestChain={setbestApyChain}
      />
      {chainId === "" ? null : value === "" ||
        value === 0 ||
        value.eq(constants.Zero) ? null : chainId !== 31337 ? ( //for test set bestApyChain
        <div className="buttons">
          {value !== "" && (
            <Bridge
              userToken={userToken}
              bestApyChain={bestApyChain}
              chainId={chainId}
              accountAddress={accountAddress}
              value={value}
            />
          )}
        </div>
      ) : userBalance.gte(value) ? (
        <div className="buttons">
          {!txStatus ? (
            <div className="depositButton">
              <button className="deposit" onClick={createTransaction}>
                Deposit
              </button>
            </div>
          ) : (
            <div className="successButton">
              <button className="deposit success" onClick={changeTxStatus}>
                Successfully deposited <img src={image} alt="" />
              </button>
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
