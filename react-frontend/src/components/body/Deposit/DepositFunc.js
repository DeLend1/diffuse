import { useState, useEffect } from "react";
import { ethers, constants } from "ethers";

import APY from "../APY/APY";
import Approve from "../Approve/Approve";
import CoinSelect from "../CoinSelect/CoinSelect";
import ValueInput from "../ValueInput/ValueInput";
import Deposit from "./Deposit";
import Bridge from "../Bridge/Bridge";

import abiERC20 from "../../../utils/abiERC20.json";
import protocolAddresses from "../../../utils/protocolAddresses.json";
import apyTokens from "../../../utils/apyTokens.json";

function DepositFunc({ chainId, accountAddress }) {
  const [value, setValue] = useState("");
  const [userToken, setUserToken] = useState("");
  const [approvalBalance, setApprovalBalance] = useState(constants.Zero);
  const [userBalance, setUserBalance] = useState("");
  const [convertUserBalance, setConvertUserBalance] = useState("");
  const [bestApyToken, setbestApyToken] = useState("");
  const [bestApyChain, setbestApyChain] = useState("");

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
      const decimals = 1;
      const convertValue = ethers.utils.parseUnits(String(0), decimals);
      setValue(convertValue);
    }
  };

  const addUserAllowanceHandler = (allowanceValue) => {
    setApprovalBalance(allowanceValue);
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
          setApprovalBalance(ethers.utils.parseUnits("1000000000", 18));
        }
      } catch (err) {
        console.log("Refresh approval balance error!");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userToken]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userToken]);

  //refresh input data
  useEffect(() => {
    setValue("");
    setUserBalance("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, accountAddress]);

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
      {convertUserBalance !== "" && userToken && value ? (
        <div className="balance">
          <p>{`Your balance: ${convertUserBalance} ${userToken.label}`}</p>
        </div>
      ) : null}
      <APY
        updateBestToken={setbestApyToken}
        updateBestChain={setbestApyChain}
      />
      {value !== "" &&
      approvalBalance.lt(value) &&
      userToken.contractAddress !== "0x" &&
      chainId === bestApyChain ? (
        <Approve
          tokenAddress={userToken.contractAddress}
          protocolAddress={protocolAddress}
          addUserAllowance={addUserAllowanceHandler}
        />
      ) : null}
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
      ) : approvalBalance.gte(value) && userBalance.gte(value) ? (
        <div className="buttons">
          <Deposit
            userTokenAddress={userToken.contractAddress}
            bestApyToken={apyTokens[bestApyChain][bestApyToken]}
            protocolAddress={protocolAddress}
            value={value}
          />
        </div>
      ) : (
        <p>
          <b>You don't have enough funds</b>
        </p>
      )}
    </>
  );
}

export default DepositFunc;
