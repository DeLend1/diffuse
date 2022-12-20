import { ethers } from "ethers";
import abiProtocolV3 from "../../utils/abiProtocolV3.json";

function Deposit({
  userTokenAddress,
  bestApyToken,
  protocolAddress,
  chainId,
  value,
}) {
  async function f_deposit() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    if (chainId !== 1) {
      const contract = new ethers.Contract(
        protocolAddress,
        abiProtocolV3,
        signer
      );
      console.log(bestApyToken);
      if (userTokenAddress !== "0x") {
        await contract.supplyFromToken(
          value,
          userTokenAddress,
          bestApyToken, //change to APY token
          "3000"
        );
      } else {
        await contract.supplyFromETH(bestApyToken, "3000", {
          value: String(value),
        });
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
