import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>The MarsKetplace</title>
        <meta name="description" content="NFT MarsKetplace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="font-bold text-3xl">Own your plot on MARS</h1>
      <h3>Here are the current NFTs for sale</h3>
    </div>
  )
}
