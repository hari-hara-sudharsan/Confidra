import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    hardhat: {},
    coston2: {
      url: "https://coston2-api.flare.network/ext/C/rpc",
      chainId: 114
    }
  }
};

export default config;
