import { ConnectButton } from "web3uikit"
import Link from "next/link"

export default function Header() {
  return (
    <nav>
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
    </nav>
  )
}
