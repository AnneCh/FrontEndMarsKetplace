import Head from "next/head"
import Moralis from "moralis"
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
    <div height="100vp">
      <Head>
        <title>The MarsKetplace</title>
        <meta name="description" content="NFT MarsKetplace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1 className="font-bold text-3xl p-3 ">Own your plot on MARS</h1>
        <div className="flex flex-col items-center gap-2 w-3/3 ">
          <p className="font-bold text-3xl">Plot On Mars NFTs for sale</p>
          {fetchingListedNfts ? (
            <div>Loading...</div>
          ) : (
            listedNfts.map((nft) => {
              console.log(nft.attributes)
              const { price, nftAddress, tokenId, marsKetplaceAddress, seller } = nft.attributes
              return (
                <div className="flex flex-col items-center">
                  <NFTBox
                    key={tokenId}
                    price={price}
                    nftAddress={nftAddress}
                    tokenId={tokenId}
                    marsKetplaceAddress={marsKetplaceAddress}
                    seller={seller}
                  />
                </div>
              )
            })
          )}
        </div>
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
