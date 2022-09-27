import { useEffect, useState } from "react"
import { useWeb3Contract, useMoralis } from "react-moralis"
import nftMarsketplaceAbi from "../constants/NftMarsketplace.json"
import nftAbi from "../constants/MintOneToken.json"
import nft2Abi from "../constants/MintTokenTwo.json"
import nft3Abi from "../constants/MintTokenThree.json"
import Image from "next/image"
import { Card } from "web3uikit"
import { ethers } from "ethers"
import pom from "./POM1.png"

import styles from "../styles/Home.module.css"

export default function NFTBox({ price, nftAddress, tokenId, marsKetplaceAddress, seller }) {
  const [imageURI, setImageURI] = useState("")
  const [tokenName, setTokenName] = useState("")
  const [tokenDescription, setTokenDescription] = useState("")
  const { isWeb3Enabled } = useMoralis()

  const { runContractFunction: getTokenUri } = useWeb3Contract({
    abi: nftAbi,
    contractAddress: nftAddress,
    functionName: "tokenURI",
    params: {
      tokenId: tokenId,
    },
  })

  async function updateUI() {
    // get tokenUri
    const tokenUri = await getTokenUri()
    console.log(`The token uri is: ${tokenUri}`)

    if (tokenUri) {
      //use IPFS gateway to return IPFS files from a normal URL
      const requestURL = tokenUri.replace("ipfs://", "https://ipfs.io/ipfs/")
      const tokenUriResponse = await (await fetch(requestURL)).json()
      console.log(tokenUriResponse)
      const imageURI = tokenUriResponse.image
      const imageURIURL = imageURI.replace("ipfs://", "https://ipfs.io/ipfs/")

      if (imageURIURL === "undefined") {
        setImageURI(pom)
      } else {
        setImageURI(imageURIURL)
      }

      setTokenName(tokenUriResponse.name)
      setTokenDescription(tokenUriResponse.description)
    }
  }

  useEffect(() => {
    if (isWeb3Enabled) {
      updateUI()
    }
  }, [isWeb3Enabled])

  return (
    <div className={styles.card}>
      {imageURI ? (
        <Card title={tokenName} description={tokenDescription}>
          <div>#{tokenId}</div>
          <div className="italic text-sm">Owned by the wallet :{seller}</div>
          <Image
            loader={() => {
              imageURI
            }}
            src={imageURI}
            alt="NFT POM"
            height="200"
            width="200"
          />
          <div className="font-bold">{ethers.utils.formatUnits(price, "ether")} ETH</div>
          <button className="font-bold text-m">Buy it</button>
        </Card>
      ) : (
        <div>Loading..</div>
      )}
    </div>
  )
}
