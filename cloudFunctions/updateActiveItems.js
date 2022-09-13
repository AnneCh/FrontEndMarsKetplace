// script that will create a list of Active Items, delete them once they are bought

Moralis.Cloud.afterSave("NFTListed", async (request) => {
  // every event gets triggered 2x, once on unconfirmed, once on confirmed
  const confirmed = request.object.get("confirmed")
  const logger = Moralis.Cloud.getLogger()
  logger.info("Looking for confirmed transaction")
  const ActiveNFT = Moralis.Object.extend("ActiveNFT")
  if (confirmed) {
    logger.info("NFT Found!")
    //create a new table:
    const query = new Moralis.Query(ActiveNFT)
    query.equalTo("nftAddress", request.object.get("nftAddress"))
    query.equalTo("tokenId", request.object.get("tokenId"))
    query.equalTo("marsketplaceAddress", request.object.get("address"))
    query.equalTo("seller", request.object.get("seller"))
    logger.info(`Marsketplace | Query: ${query}`)
    const alreadyListedNFT = await query.first()
    console.log(`alreadyListedItem ${JSON.stringify(alreadyListedNFT)}`)
    if (alreadyListedNFT) {
      logger.info(`Deleting ${alreadyListedNFT.id}`)
      await alreadyListedNFT.destroy()
      logger.info(
        `Deleted item with tokenId ${request.object.get(
          "tokenId"
        )} at address ${request.object.get("address")} since the listing is being updated. `
      )
    }
  }

  //create a new entry in the table:
  const activeNFT = new ActiveNFT()
  // set columns in the entry:
  activeNFT.set("marsketplaceAddress", request.object.get("address"))
  activeNFT.set("nftAddress", request.object.get("nftAddress"))
  activeNFT.set("price", request.object.get("price"))
  activeNFT.set("tokenId", request.object.get("tokenId"))
  activeNFT.set("seller", request.object.get("seller"))
  logger.info(
    `Adding address: ${request.object.get("address")}, TokenId: ${request.object.get("tokenId")}}`
  )
  logger.info("Saving...")
  await activeNFT.save()
})

Moralis.Cloud.afterSave("NFTDeleted", async (request) => {
  const confirmed = request.object.get("confirmed", { useMasterKey: true })
  const logger = Moralis.Cloud.getLogger()
  logger.info(`Marsketplace | Object: ${request.object}`)
  if (confirmed) {
    logger.info("NFT Deleted!")
    //create a new table:
    const ActiveNFT = Moralis.Object.extend("ActiveNFT")
    const query = new Moralis.Query(ActiveNFT)
    query.equalTo("marsketplaceAddress", request.object.get("address"))
    query.equalTo("nftAddress", request.object.get("nftAddress"))
    query.equalTo("tokenId", request.object.get("tokenId"))
    logger.info(`Marsketplace | Query: ${query}`)
    const deletedNFT = await query.first()
    logger.info(`Marsketplace | CanceledNFT: ${deletedNFT}`)
    if (deletedNFT) {
      await deletedNFT.destroy()
      logger.info(
        `Deleting ${request.object.get("tokenId")} at address ${request.object.get(
          "address"
        )} since it was canceled.`
      )
    } else {
      logger.info(
        `No NFT found at the address ${request.object.get(
          "address"
        )} and tokenID ${request.object.get("tokenId")}`
      )
    }
  }
})
