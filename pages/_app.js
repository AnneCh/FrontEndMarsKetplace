import "../styles/globals.css"
import { MoralisProvider } from "react-moralis"
import Header from "../components/Header"
import { NotificationProvider } from "web3uikit"

const APPID = process.env.NEXT_PUBLIC_APPID
const SERVER = process.env.NEXT_PUBLIC_SERVERURL

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider appId={APPID} serverUrl={SERVER}>
      <NotificationProvider>
        <Header />
        <Component {...pageProps} />
      </NotificationProvider>
    </MoralisProvider>
  )
}

export default MyApp
