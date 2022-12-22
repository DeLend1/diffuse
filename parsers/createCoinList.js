const fetch = require("node-fetch");
const fs = require("fs");
const alphaTokens = require("../react-frontend/src/utils/alphaAPYTokens.json");

async function parser() {
  //get list of all coins
  const responseCoins = await fetch(
    `https://api.coingecko.com/api/v3/coins/list?include_platform=true`
  );
  const dataCoins = await responseCoins.json();

  // get list of top 2000 coins
  let dataMarket = [];
  for (let i = 1; i <= 4; i++) {
    const responseMarket = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=${i}`
    );
    const pageData = await responseMarket.json();
    dataMarket = [...dataMarket, ...pageData];
  }

  // create data
  let filteredData = {
    1: [{ value: "eth", label: "ETH", contractAddress: "0x" }],
    10: [{ value: "eth", label: "ETH", contractAddress: "0x" }],
    137: [{ value: "matic", label: "MATIC", contractAddress: "0x" }],
  };

  //start filter
  for (let element of dataCoins) {
    //check that rating<2000
    let rating = 2001;
    for (let marketStat of dataMarket) {
      if (marketStat.id === element.id) {
        rating = marketStat["market_cap_rank"];
        break;
      }
    }
    if (rating > 2000) {
      continue;
    }

    // save data
    for (let platform in element.platforms) {
      if (platform === "ethereum") {
        const coin = {
          value: element.symbol,
          label: element.symbol.toUpperCase(),
          contractAddress: element.platforms[platform],
          rating: rating,
        };
        filteredData[1].push(coin);
      } else if (platform === "polygon-pos") {
        const coin = {
          value: element.symbol,
          label: element.symbol.toUpperCase(),
          contractAddress: element.platforms[platform],
          rating: rating,
        };
        filteredData[137].push(coin);
      } else if (platform === "optimistic-ethereum") {
        const coin = {
          value: element.symbol,
          label: element.symbol.toUpperCase(),
          contractAddress: element.platforms[platform],
          rating: rating,
        };
        filteredData[10].push(coin);
      }
    }
  }
  //sort data by rating
  filteredData[1].sort((a, b) => {
    return a.rating - b.rating;
  });
  filteredData[10].sort((a, b) => {
    return a.rating - b.rating;
  });
  filteredData[137].sort((a, b) => {
    return a.rating - b.rating;
  });

  //delete key "rating"
  filteredData[1].map((coin) => {
    delete coin["rating"];
  });
  filteredData[10].map((coin) => {
    delete coin["rating"];
  });
  filteredData[137].map((coin) => {
    delete coin["rating"];
  });

  //added alpha tokens
  for (let token in alphaTokens["1"]) {
    const coin = {
      value: token,
      label: token.toUpperCase(),
      contractAddress: alphaTokens["1"][token],
    };
    filteredData[1].push(coin);
  }
  for (let token in alphaTokens["10"]) {
    const coin = {
      value: token,
      label: token.toUpperCase(),
      contractAddress: alphaTokens["10"][token],
    };
    filteredData[10].push(coin);
  }
  for (let token in alphaTokens["137"]) {
    const coin = {
      value: token,
      label: token.toUpperCase(),
      contractAddress: alphaTokens["137"][token],
    };
    filteredData[137].push(coin);
  }
  //save filtered data in json
  fs.writeFileSync(
    "../react-frontend/src/utils/coinsData.json",
    JSON.stringify(filteredData)
  );
}

parser();
