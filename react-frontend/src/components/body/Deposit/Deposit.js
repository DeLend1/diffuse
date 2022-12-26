import { ethers } from "ethers";
import abiProtocol from "../../../utils/abiProtocol.json";

function Deposit({ userTokenAddress, bestApyToken, protocolAddress, value }) {
  async function f_deposit() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(protocolAddress, abiProtocol, signer);
    if (userTokenAddress !== "0x") {
      await contract.supplyFromToken(
        value,
        userTokenAddress,
        bestApyToken,
        "3000"
      );
    } else {
      await contract.supplyFromETH(bestApyToken, "3000", {
        value: value,
      });
    }
  }

  return (
    <div className="depositButton">
      <button onClick={f_deposit}>Deposit</button>
    </div>
  );
}
export default Deposit;
