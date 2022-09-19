import { useEffect, useState } from "react"
import { useWeb3Contract, useMoralis } from "react-moralis"
//import nftMarsketplaceAbi from "../constants/NftMarsketplace.json"
import nftAbi from "../constants/MintOneToken.json"

export default function NFTBox({ price, nftAddress, tokenId, marsKetplaceAddress, seller }) {
  //const [imageURI, setImageURI] = useState("")
  const { isWeb3Enabled } = useMoralis()

  const { runContractFunction: tokenURI } = useWeb3Contract({
    abi: nftAbi,
    contractAddress: nftAddress,
    functionName: "tokenURI",
    params: {
      tokenId: tokenId,
    },
  })

  async function updateUI() {
    // get tokenURI
    try {
      const tokenuri = await tokenURI()
      console.log(tokenuri)
    } catch (e) {
      console.log(e)
    }

    // using image tag from the tokenURI
  }

  useEffect(() => {
    if (isWeb3Enabled) {
      updateUI()
    }
  }, [isWeb3Enabled])
}
