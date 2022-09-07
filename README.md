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

- go to folder with backend -> run `yarn hardhat node` to start the local hardhat testnet and deploy the contracts
  (- if necessary, delete the content of `networkMappings.json`, leaving only `{}` in it, go back to back-end folder and run `yarn hardhat deploy 99-update-front-end`)
- go back to front-end folder (`cd ..` + `cd FrontEndMarsKetplace`) and run `yarn dev`
- run `yarn run moralis:sync` <= the connection to Hardhat has now begun

<!-- 
First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.
