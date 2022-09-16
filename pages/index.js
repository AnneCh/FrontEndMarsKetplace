import Head from "next/head"
import Moralis from "moralis"
import styles from "../styles/Home.module.css"
import mars from "./mars.jpg"
import { useMoralisQuery } from "react-moralis"

import NFTBox from "../components/NFTBox"

function Home(props) {
  const { data: listedNfts, isFetching: fetchingListedNfts } = useMoralisQuery(
    //table name
    "ActiveNFT",
    // function for query
    (query) => query.limit(10).descending("tokenId")
  )
  console.log(listedNfts)

  return (
    <div backgroundImage={mars} height="100vp">
      <Head>
        <title>The MarsKetplace</title>
        <meta name="description" content="NFT MarsKetplace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="font-bold text-3xl">Own your plot on MARS</h1>
      <h3 className="text-2xl">Here are the current NFTs for sale</h3>
      <div>
        <p>Display NFT here</p>
        {fetchingListedNfts ? (
          <div>Loading...</div>
        ) : (
          listedNfts.map((nft) => {
            console.log(nft.attributes)
            const { price, nftAddress, tokenId, marsKetplaceAddress, seller } = nft.attributes
            return (
              <div>
                Price : {price}, NFT address : {nftAddress}, Token ID : {tokenId}, Seller :{seller}
                <NFTBox
                  price={price}
                  nftAddress={nftAddress}
                  tokenId={tokenId}
                  marsKetplaceAddress={marsKetplaceAddress}
                  seller={seller}
                  key={`${nftAddress}${tokenId}`}
                />
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  // reads the api key from .env.local and starts Moralis SDK
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY })

  return {
    props: {},
  }
}

export default Home
