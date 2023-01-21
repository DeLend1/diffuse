import { ethers } from "ethers";
import abiProtocol from "../../../utils/abiProtocol.json";

function Deposit({ userTokenAddress, bestApyToken, protocolAddress, value }) {
  async function f_deposit() {
    let txSuccess = false;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(protocolAddress, abiProtocol, signer);
    if (userTokenAddress !== "0x") {
      //fee0.01%
      try {
        await contract.supplyFromToken(
          value,
          userTokenAddress,
          bestApyToken,
          "100"
        );
        txSuccess = true;
      } catch (err) {
        if (err.reason === "user rejected transaction") {
          txSuccess = true;
        }
      }

      //fee0.05%
      if (!txSuccess) {
        try {
          await contract.supplyFromToken(
            value,
            userTokenAddress,
            bestApyToken,
            "500"
          );
          txSuccess = true;
        } catch (err) {
          if (err.reason === "user rejected transaction") {
            txSuccess = true;
          }
        }
      }

      //fee0.3%
      if (!txSuccess) {
        try {
          await contract.supplyFromToken(
            value,
            userTokenAddress,
            bestApyToken,
            "3000"
          );
          txSuccess = true;
        } catch (err) {
          if (err.reason === "user rejected transaction") {
            txSuccess = true;
          }
        }
      }
    }

    //fee1.0%
    if (!txSuccess) {
      try {
        await contract.supplyFromToken(
          value,
          userTokenAddress,
          bestApyToken,
          "10000"
        );
        txSuccess = true;
      } catch (err) {
        console.log(err);
        console.log(err.reason);
      }
    } else {
      try {
        //fee0.01%
        await contract.supplyFromETH(bestApyToken, "100", {
          value: value,
        });
        txSuccess = true;
      } catch (err) {
        if (err.reason === "user rejected transaction") {
          txSuccess = true;
        }
      }
      //fee0.05%
      if (!txSuccess) {
        try {
          await contract.supplyFromETH(bestApyToken, "500", {
            value: value,
          });
          txSuccess = true;
        } catch (err) {
          if (err.reason === "user rejected transaction") {
            txSuccess = true;
          }
        }
      }
      //fee0.3%
      if (!txSuccess) {
        try {
          await contract.supplyFromETH(bestApyToken, "3000", {
            value: value,
          });
          txSuccess = true;
        } catch (err) {
          if (err.reason === "user rejected transaction") {
            txSuccess = true;
          }
        }
      }
      //fee1%
      if (!txSuccess) {
        try {
          await contract.supplyFromETH(bestApyToken, "10000", {
            value: value,
          });
          txSuccess = true;
        } catch (err) {
          console.log(err);
          console.log(err.reason);
        }
      }
    }
  }

  return (
    <div className="depositButton">
      <button className="deposit" onClick={f_deposit}>Deposit</button>
    </div>
  );
}
export default Deposit;
