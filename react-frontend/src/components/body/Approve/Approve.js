import { ethers } from "ethers";
import abiERC20 from "../../../utils/abiERC20.json";

function Approve({ tokenAddress, protocolAddress, addUserAllowance }) {
  async function f_approve() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(tokenAddress, abiERC20, signer);
    await contract.approve(
      protocolAddress,
      "115792089237316195423570985008687907853269984665640564039457584007913129639935"
    );
    addUserAllowance(
      ethers.utils.parseUnits(
        "115792089237316195423570985008687907853269984665640564039457584007913129639935",
        1
      )
    );
  }

  return (
    <div className="approveButton">
      <button className="approve" onClick={f_approve}>Approve</button>
    </div>
  );
}
export default Approve;
