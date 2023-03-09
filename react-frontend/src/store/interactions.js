import { ethers, constants } from "ethers";
import abiERC20 from "../utils/abiERC20.json";

//PROVIDER FUNCTIONS
export const loadProvider = (dispatch) => {
  const connection = new ethers.providers.Web3Provider(window.ethereum);
  dispatch({ type: "PROVIDER_LOADED", connection });

  return connection;
};

export const loadNetwork = async (provider, dispatch) => {
  const { chainId } = await provider.getNetwork();
  dispatch({ type: "NETWORK_LOADED", chainId });

  return chainId;
};

export const loadAccount = async (provider, dispatch) => {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  const address = ethers.utils.getAddress(accounts[0]);

  dispatch({ type: "ADDRESS_LOADED", address });

  return address;
};

export const loadSelectedChain = (selectedChain, dispatch) => {
  dispatch({ type: "SELECTED_CHAIN_LOADED", selectedChain });

  return selectedChain;
};

//USER CHOICE FUNCTIONS
export const loadValue = async (provider, userValue, userToken, dispatch) => {
  try {
    if (userToken.contractAddress !== "0x") {
      const contract = new ethers.Contract(
        userToken.contractAddress,
        abiERC20,
        provider
      );
      const decimals = await contract.decimals();
      const value = ethers.utils.parseUnits(userValue.toString(), decimals);
      dispatch({ type: "VALUE_LOADED", value });
    } else {
      const value = ethers.utils.parseEther(userValue.toString());
      dispatch({ type: "VALUE_LOADED", value });
    }
  } catch (error) {
    const value = constants.Zero;
    dispatch({ type: "VALUE_LOADED", value });
  }
};

export const loadUserToken = (userToken, dispatch) => {
  dispatch({ type: "USER_TOKEN_LOADED", userToken });

  return userToken;
};

export const loadApprovalBalance = async (
  provider,
  accountAddress,
  userToken,
  protocolAddress,
  dispatch
) => {
  try {
    if (
      userToken.contractAddress &&
      userToken.contractAddress !== "0x" &&
      userToken.contractAddress !== ""
    ) {
      const contract = new ethers.Contract(
        userToken.contractAddress,
        abiERC20,
        provider
      );
      const approvalBalance = await contract.allowance(
        accountAddress,
        protocolAddress
      );
      dispatch({ type: "APPROVAL_BALANCE_LOADED", approvalBalance });
    } else if (userToken.contractAddress === "0x") {
      const approvalBalance = constants.MaxUint256;
      dispatch({ type: "APPROVAL_BALANCE_LOADED", approvalBalance });
    }
  } catch (err) {
    //console.log("Refresh approval balance error!");
  }
};

export const loadUserlBalance = async (
  provider,
  chainId,
  accountAddress,
  userToken,
  dispatch
) => {
  try {
    if (chainId && accountAddress && userToken) {
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
        const userBalance = await contract.balanceOf(accountAddress);
        const decimals = await contract.decimals();
        const convertUserBalance = Number(
          ethers.utils.formatUnits(userBalance.toString(), decimals)
        ).toFixed(3);
        dispatch({ type: "USER_BALANCE_LOADED", userBalance });
        dispatch({ type: "CONVERT_USER_BALANCE_LOADED", convertUserBalance });
      } else if (userToken.contractAddress === "0x") {
        const userBalance = await provider.getBalance(accountAddress);
        const convertUserBalance = Number(
          ethers.utils.formatUnits(userBalance.toString())
        ).toFixed(3);
        dispatch({ type: "USER_BALANCE_LOADED", userBalance });
        dispatch({ type: "CONVERT_USER_BALANCE_LOADED", convertUserBalance });
      }
    }
  } catch (err) {
    //console.log("Balance update error!");
  }
};

//APY DATA FUNCTIONS
export const loadBestAPY = (data, dispatch) => {
  dispatch({ type: "BEST_APY_LOADED", data });

  return data;
};

export const loadEthereumAPY = (data, dispatch) => {
  dispatch({ type: "ETHEREUM_APY_LOADED", data });

  return data;
};

export const loadOptimismAPY = (data, dispatch) => {
  dispatch({ type: "OPTIMISM_APY_LOADED", data });

  return data;
};

export const loadPolygonAPY = (data, dispatch) => {
  dispatch({ type: "POLYGON_APY_LOADED", data });

  return data;
};
