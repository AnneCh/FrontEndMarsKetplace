import { ConnectButton } from "web3uikit"
import Link from "next/link"

export default function Header() {
  return (
    <nav className="p-5 border-b-2 flex flex-row justify-between items-center">
      <div>
        <h1 className="py-4 px-4 font-bold text-4xl">The One and Only MarsKetplace</h1>
        <p className=" px-4">
          The only place in the galaxy where you can buy your own plot of land on Mars!
        </p>
      </div>
      <div className="flex flex-row items-center space-between">
        <Link href="/">
          <a className="mr-4 p-6">Home</a>
        </Link>
        <Link href="/about">
          <a className="mr-4 p-6">About</a>
        </Link>
        <Link href="/futures">
          <a className="mr-4 p-6">Futures</a>
        </Link>
        <ConnectButton moralisAuth={false} />
      </div>
    </nav>
  )
}
