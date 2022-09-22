1. Home Page

   1. If connected with owner's address:
      1. Show all listed NFTs
      2. Show them active if they are for sale, greyed out and inactive if sold(archived?)
      3. Sell Button
   2. If connected with EOA:
      1. Show all listed NFTs for sale

2. About
   1. What is the project about, who built it
3. Futures
   1. upgrades to be made to the project

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

- get your own data in the .env file. you'll need to create an account on Moralis for the front-end, Pinata(optional) and Etherscan on the back-end (follow their instructions)
- go to folder with backend -> run `yarn hardhat node` to start the local hardhat testnet and deploy the contracts
  (- if necessary, delete the content of `networkMappings.json`, leaving only `{}` in it, go back to back-end folder and run `yarn hardhat deploy 99-update-front-end`)
- go back to front-end folder (`cd ..` + `cd FrontEndMarsKetplace`)
- run `yarn moralis:sync` <= the connection to Hardhat has now begun
- run `yarn moralis:cloud` to sync the cloud functions
- run `yarn dev`, open your browser and type "localhost:3000" in the address bar

- back to the backend folder, run `yarn hardhat run scripts/mint-and-list.js --network localhost`

=> the front-end should now display the newly minted and listed NFT
