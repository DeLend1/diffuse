import { Hop } from "./node_modules/@hop-protocol/sdk/dist/src/index.js";

async function bridgeHop(amount, chainFrom, chainTo) {
  //указать чейныы в формате стринг 'etherium' 'polygon' 'optimizm'
  //amount в big numbers
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const hop = new Hop("mainnet");
  const bridge = hop.connect(signer).bridge("USDC");
  const tx = await bridge.send(amount, chainFrom, chainTo);
  console.log(tx.hash);
}
