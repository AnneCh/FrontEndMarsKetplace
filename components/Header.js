import { ConnectButton } from "web3uikit"
import Link from "next/link"

export default function Header() {
  return (
    <nav className="items-center">
      <h1 className="py-4 px-4 font-bold text-3xl">NFT MarsKetplace</h1>
      <div>
        <Link href="/">
          <a>MarsKetplace</a>
        </Link>
        <Link href="/about">
          <a>About</a>
        </Link>
        <Link href="/futures">
          <a>Futures</a>
        </Link>
        <ConnectButton />
      </div>
    </nav>
  )
}
