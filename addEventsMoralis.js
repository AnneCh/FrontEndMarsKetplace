//script that will ask moralis server to listen to specific events
// need to create a specific script in our back-end that will trigger this script

const Moralis = require("moralis-v1/node")
require("dotenv").config()

const contractAddresses = require("./constants/networkMappings.json")
let chainId = process.env.chainId || "31337"
//moralis understands that localchainid is 1337, so there's a need to convert it
let moralisChainId = chainId == "31337?" ? "1337" : chainId

const contractAddress = contractAddresses[chainId]["MarsKetplace"][0]
const serverUrl = process.env.NEXT_PUBLIC_SERVERURL
const appId = process.env.NEXT_PUBLIC_APPID
const masterKey = process.env.MORALIS_MASTER_KEY

async function main() {
  await Moralis.start({ serverUrl, appId, masterKey })
  console.log(`Working with ${contractAddress}`)

  let NFTListedOptions = {
    chainId: moralisChainId,
    sync_historical: true,
    topic: "NFTListed(address,address,uint256,uint256)",
    abi: {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "seller",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "nftAddress",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "price",
          type: "uint256",
        },
      ],
      name: "NFTListed",
      type: "event",
    },
    tableName: "NFT Listed",
    address: contractAddress,
  }

  let NFTBoughtOptions = {
    chainId: moralisChainId,
    sync_historical: true,
    topic: "NFTBought(address,address,uint256,uint256)",
    abi: {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "buyer",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "nftAddress",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "price",
          type: "uint256",
        },
      ],
      name: "NFTBought",
      type: "event",
    },
    tableName: "NFT Bought",
    address: contractAddress,
  }

  let NFTDeletedOptions = {
    chainId: moralisChainId,
    sync_historical: true,
    topic: "NFTDeleted(address,uint256)",
    abi: {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "nftAddress",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "NFTDeleted",
      type: "event",
    },
    tableName: "NFT Deleted",
    address: contractAddress,
  }

  const ListedResponse = await Moralis.Cloud.run("watchContractEvent", NFTListedOptions, {
    useMasterKey: true,
  })
  const BoughtResponse = await Moralis.Cloud.run("watchContractEvent", NFTBoughtOptions, {
    useMasterKey: true,
  })
  const DeletedResponse = await Moralis.Cloud.run("watchContractEvent", NFTDeletedOptions, {
    useMasterKey: true,
  })
  console.log("working on it...")
  if (ListedResponse.success && BoughtResponse.success && DeletedResponse.success) {
    console.log("Database successfully updated with watching events!")
  } else {
    console.log("Something went wrong...")
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
