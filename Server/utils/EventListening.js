import { webSocket } from "./env.js";
import Web3 from "web3";
import { heroCoreABI, heroCoreAddress } from "./Variable.js";

const ws = new Web3.providers.WebsocketProvider(
  "wss://testnet-dex.binance.org/api/.",
  {
    reconnect: { auto: true },
  }
);

const eventWeb3 = new Web3(ws);

const heroInstance = new eventWeb3.eth.Contract(heroCoreABI, heroCoreAddress)
  .methods;

export const eventLintening = async () => {
  setInterval(async () => {
    console.log("Inverval");
    eventWeb3.eth.getBlockNumber();
  }, 5000);
};
