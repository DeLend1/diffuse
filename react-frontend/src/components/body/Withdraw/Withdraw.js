import { ethers } from "ethers";
import abiProtocol from "../../../utils/abiProtocol.json";
import alphaAPYTokens from "../../../utils/alphaAPYTokens.json";
import apyTokens from "../../../utils/apyTokens.json";
function Withdraw({ userToken, protocolAddress, chainId, value }) {
  async function f_withdraw() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(protocolAddress, abiProtocol, signer);

    if (
      userToken.contractAddress !== "0x" &&
      alphaAPYTokens[chainId][userToken.value] !== undefined
    ) {
      const resultTokenName = userToken.value.replace("a", "");
      const resultTokenAddress = apyTokens[chainId][resultTokenName];
      await contract.withdraw(
        resultTokenAddress,
        userToken.contractAddress,
        value
      );
    } else {
      window.alert(
        "Please choose alpha token!\nFor example, if you want to return USDT, then select aUSDT."
      );
    }
  }

  return (
    <div className="withdrawButton">
      <button onClick={f_withdraw}>Withdraw</button>
    </div>
  );
}
export default Withdraw;
