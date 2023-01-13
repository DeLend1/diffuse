import { ethers } from "ethers";
import abiProtocol from "../../../utils/abiProtocol.json";

function Deposit({ userTokenAddress, bestApyToken, protocolAddress, value }) {
  async function f_deposit() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(protocolAddress, abiProtocol, signer);
    if (userTokenAddress !== "0x") {
      try {
        //fee0.3%
        await contract.supplyFromToken(
          value,
          userTokenAddress,
          bestApyToken,
          "3000"
        );
      } catch (fee05) {
        try {
          await contract.supplyFromToken(
            value,
            userTokenAddress,
            bestApyToken,
            "5000"
          );
        } catch (fee1) {
          try {
            await contract.supplyFromToken(
              value,
              userTokenAddress,
              bestApyToken,
              "10000"
            );
          } catch (err) {
            console.log(err);
          }
        }
      }
    } else {
      try {
        //fee0.3%
        await contract.supplyFromETH(bestApyToken, "3000", {
          value: value,
        });
      } catch (fee05) {
        try {
          await contract.supplyFromETH(bestApyToken, "5000", {
            value: value,
          });
        } catch (fee1) {
          try {
            await contract.supplyFromETH(bestApyToken, "10000", {
              value: value,
            });
          } catch (err) {
            console.log(err);
          }
        }
      }
    }
  }

  return (
    <div className="depositButton">
      <button onClick={f_deposit}>Deposit</button>
    </div>
  );
}
export default Deposit;
