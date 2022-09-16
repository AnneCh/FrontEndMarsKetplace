import { useState } from "react"

export default function NFTBox(
  { price },
  { nftAddress },
  { tokenId },
  { marsKetplaceAddress },
  { seller }
) {
  const [imageURI, setImageURI] = useState("")

  async function updateUI() {
    // get tokenURI
    // using image tag from the tokenURI
  }
}
