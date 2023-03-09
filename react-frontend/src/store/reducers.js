import { constants } from "ethers";

export const provider = (state = {}, action) => {
  switch (action.type) {
    case "PROVIDER_LOADED":
      return {
        ...state,
        connection: action.connection,
      };
    case "NETWORK_LOADED":
      return {
        ...state,
        chainId: action.chainId,
      };
    case "ADDRESS_LOADED":
      return {
        ...state,
        address: action.address,
      };
    default:
      return state;
  }
};

const DEFAULT_USER_CHOICE_STATE = {
  value: "",
  userToken: "",
  approvalBalance: constants.Zero,
  userBalance: constants.Zero,
  convertUserBalance: "",
  selectedChain: "bestAPY",
};

export const userChoice = (state = DEFAULT_USER_CHOICE_STATE, action) => {
  switch (action.type) {
    case "VALUE_LOADED":
      return {
        ...state,
        value: action.value,
      };
    case "USER_TOKEN_LOADED":
      return {
        ...state,
        userToken: action.userToken,
      };

    case "APPROVAL_BALANCE_LOADED":
      return {
        ...state,
        approvalBalance: action.approvalBalance,
      };

    case "USER_BALANCE_LOADED":
      return {
        ...state,
        userBalance: action.userBalance,
      };

    case "CONVERT_USER_BALANCE_LOADED":
      return {
        ...state,
        convertUserBalance: action.convertUserBalance,
      };

    case "SELECTED_CHAIN_LOADED":
      return {
        ...state,
        selectedChain: action.selectedChain,
      };
    default:
      return state;
  }
};

const DEFAULT_DATA_APY_STATE = {
  bestAPY: "",
  ethereumAPY: "",
  optimismAPY: "",
  polygonAPY: "",
};

export const dataAPY = (state = DEFAULT_DATA_APY_STATE, action) => {
  switch (action.type) {
    case "BEST_APY_LOADED":
      return {
        ...state,
        bestAPY: action.data,
      };
    case "ETHEREUM_APY_LOADED":
      return {
        ...state,
        ethereumAPY: action.data,
      };

    case "OPTIMISM_APY_LOADED":
      return {
        ...state,
        optimismAPY: action.data,
      };

    case "POLYGON_APY_LOADED":
      return {
        ...state,
        polygonAPY: action.data,
      };

    default:
      return state;
  }
};
