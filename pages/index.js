import Head from "next/head"
import Moralis from "moralis"
import styles from "../styles/Home.module.css"

function Home(props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>The MarsKetplace</title>
        <meta name="description" content="NFT MarsKetplace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="font-bold text-3xl">Own your plot on MARS</h1>
      <h3>Here are the current NFTs for sale</h3>
      <div>
        <p>Display NFT here</p>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  // reads the api key from .env.local and starts Moralis SDK
  await Moralis.start({ apiKey: process.env.NEXT_MORALIS_API_KEY })

  //const address = "0x..."

  //const nativeBalance = await Moralis.EvmApi.account.getNativeBalance({
  //  address,
  //})

  return {
    props: {
      // address,
      // Return the native balance formatted in ether via the .ether getter
      //nativeBalance: nativeBalance.result.balance.ether,
    },
  }
}

export default Home
