import { useState, useEffect } from "react";
import { ethers } from "ethers";

import APY from "./APY/APY";
import Approve from "./Approve";
import CoinSelect from "./CoinSelect";
import ValueInput from "./ValueInput";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";

import abiERC20 from "../../utils/abiERC20.json";
import protocolAddresses from "../../utils/protocolAddresses.json";
import apyTokens from "../../utils/apyTokens.json";

function Body({ chainId, accountAddress }) {
  const [value, setValue] = useState("");
  const [userToken, setUserToken] = useState("");
  const [approvalBalance, setApprovalBalance] = useState("");
  const [userBalance, setUserBalance] = useState("");
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
        setValue(userValue * 10 ** decimals);
      } else {
        setValue(userValue * 10 ** 18);
      }
    } catch (error) {
      const decimals = 1;
      console.log(error);
      setValue(userValue * 10 ** decimals);
    }
  };

  const addUserAllowanceHandler = (allowanceValue) => {
    setApprovalBalance(allowanceValue);
  };

  // refresh approval balance
  useEffect(() => {
    (async function () {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
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
        setApprovalBalance(
          "115792089237316195423570985008687907853269984665640564039457584007913129639935"
        );
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
        userToken.contractAddress !== undefined
      ) {
        const contract = new ethers.Contract(
          userToken.contractAddress,
          abiERC20,
          provider
        );
        const currentBalance = await contract.balanceOf(accountAddress);
        setUserBalance(currentBalance);
      } else if (userToken.contractAddress === "0x") {
        const currentBalance = await provider.getBalance(accountAddress);
        setUserBalance(currentBalance);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userToken]);

  return (
    <>
      <APY
        updateBestToken={setbestApyToken}
        updateBestChain={setbestApyChain}
      />
      <CoinSelect chainId={chainId} addUserToken={addUserTokenHandler} />
      <ValueInput addUserValue={addUserValueHandler} />
      {approvalBalance < value && userToken.contractAddress !== "0x" ? (
        <Approve
          tokenAddress={userToken.contractAddress}
          protocolAddress={protocolAddress}
          addUserAllowance={addUserAllowanceHandler}
        />
      ) : null}
      {chainId === "" ? null : value === "" || value === 0 ? null : chainId !==
        bestApyChain ? (
        <div className="buttons">
          <p>
            If you want to make a deposit, then choose a chain with the best APY
            or use a bridge!
          </p>
          <Withdraw
            userToken={userToken}
            protocolAddress={protocolAddress}
            chainId={chainId}
            value={value}
          />
        </div>
      ) : approvalBalance >= value && userBalance >= value ? (
        <div className="buttons">
          <Deposit
            userTokenAddress={userToken.contractAddress}
            bestApyToken={apyTokens[bestApyChain][bestApyToken]}
            protocolAddress={protocolAddress}
            chainId={chainId}
            value={value}
          />
          <Withdraw
            userToken={userToken}
            protocolAddress={protocolAddress}
            chainId={chainId}
            value={value}
          />
        </div>
      ) : (
        <p>You don't have enough funds!</p>
      )}
    </>
  );
}

export default Body;
