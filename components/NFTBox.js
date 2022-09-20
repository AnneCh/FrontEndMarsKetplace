import { useEffect, useState } from "react"
import { useWeb3Contract, useMoralis } from "react-moralis"
import nftMarsketplaceAbi from "../constants/NftMarsketplace.json"
import nftAbi from "../constants/MintOneToken.json"
import Image from "next/image"

export default function NFTBox({ price, nftAddress, tokenId, marsKetplaceAddress, seller }) {
  const [imageURI, setImageURI] = useState("")
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
      setImageURI(imageURIURL)
    }
  }

  useEffect(() => {
    if (isWeb3Enabled) {
      updateUI()
    }
  }, [isWeb3Enabled])

  return (
    <div>
      {imageURI ? (
        <Image
          loader={() => {
            imageURI
          }}
          src={imageURI}
          alt="NFT POM1"
          height="200"
          width="200"
        />
      ) : (
        <div>Loading..</div>
      )}
    </div>
  )
}
