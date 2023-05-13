require('dotenv').config()
const { Client, GatewayIntentBits, EmbedBuilder} = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
let channels = {};
let clientReady = false;

const initializeClient = async () => {
  [channels.eggs, channels.listings, channels.sales, channels.debug] = await Promise.all([
    getChannelById('1075910242367455264'),
    getChannelById('1077300034216923277'),
    getChannelById('1077304741245227058'),
    getChannelById('1076248623731462214'),
  ]);
  console.log('Client successfully initialized.');
}

const isReady = () => clientReady;

const readyPromise = () => new Promise((resolve) => {
  client.on('ready', async () => {
    console.log('Discord client logged.');
    await initializeClient();
    clientReady = true;
    resolve();
  });
});

client.login(process.env.DISCORD_TOKEN);

// UTILS \\

const getMarketplaceLink = (marketplace, tokenId) => {
  switch (marketplace) {
    case 'BLUR':
      return `https://blur.io/asset/0x49cf6f5d44e70224e2e23fdcdd2c053f30ada28b/${tokenId}`;
    case 'OPENSEA':
      return `https://opensea.io/assets/ethereum/0x49cf6f5d44e70224e2e23fdcdd2c053f30ada28b/${tokenId}`;
    case 'X2Y2':
      return `https://x2y2.io/eth/0x49cF6f5d44E70224e2E23fDcdd2C053F30aDA28B/${tokenId}`;
    default:
      return `INVALID MARKETPLACE: ${marketplace}`;
  }
}
const getMarketplaceEmoji = (marketplace) => {
  switch (marketplace) {
    case 'BLUR':
      return '<:blur:1087398802673123469> BLUR'
    case 'OPENSEA':
      return '<:opensea:1087398639317553213> OPENSEA'
    case 'X2Y2':
      return '<:x2y2:1087399408737468466> X2Y2'
    default:
      return `INVALID MARKETPLACE: ${marketplace}`;
  }
}

const createSaleEmbedMsg = (details) => {
  return new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle('New CloneX sale!')
    .setURL(getMarketplaceLink(details.marketplace, details.tokenId))
    .setAuthor({ name: 'EggyWeggy', iconURL: 'https://i.imgur.com/6D428QM.png', url: 'https://twitter.com/LStehaye' })
    .setThumbnail(`https://clonex-assets.rtfkt.com/images/${details.tokenId}.png`)
    .addFields(
      { name: 'Price', value: details.price, inline: true },
      { name: 'Marketplace', value: getMarketplaceEmoji(details.marketplace), inline: true },
      { name: 'Eggs', value: details.claimed ? ':x:' : ':egg:'}
    )
    .addFields(
      { name: 'Seller', value: details.seller, inline: true },
      { name: 'Buyer', value: details.buyer, inline: true },
    )
    .setTimestamp()
    .setFooter({ text: 'SlKzᵍᵐ#4307', iconURL: 'https://i.imgur.com/6D428QM.png' });
};

const createListingEmbedMsg = (details) => {
  return new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle(`A CloneX just got listed.`)
    .setURL(getMarketplaceLink(details.marketplace, details.tokenId))
    .setAuthor({ name: 'EggyWeggy', iconURL: 'https://i.imgur.com/6D428QM.png', url: 'https://twitter.com/LStehaye' })
    .setThumbnail(`https://clonex-assets.rtfkt.com/images/${details.tokenId}.png`)
    .addFields(
      { name: 'Price', value: details.price, inline: true },
      { name: 'Marketplace', value: getMarketplaceEmoji(details.marketplace), inline: true },
      { name: 'Eggs', value: details.claimed ? ':x:' : ':egg:'}
    )
    .addFields(
      { name: 'Offerer', value: details.seller, inline: true },
    )
    .setTimestamp()
    .setFooter({ text: 'SlKzᵍᵐ#4307', iconURL: 'https://i.imgur.com/6D428QM.png' });
};

const createEggListingEmbedMsg = (details) => {
  return new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle('Make an Omelet :egg:')
    .setURL(getMarketplaceLink(details.marketplace, details.tokenId))
    .setAuthor({ name: 'EggyWeggy', iconURL: 'https://i.imgur.com/6D428QM.png', url: 'https://twitter.com/LStehaye' })
    .setThumbnail(`https://clonex-assets.rtfkt.com/images/${details.tokenId}.png`)
    .addFields(
      { name: 'Price', value: details.price, inline: true },
      { name: 'Marketplace', value: getMarketplaceEmoji(details.marketplace), inline: true },
      { name: 'Eggs', value: details.claimed ? ':x:' : ':egg:'}
    )
    .addFields(
      { name: 'Offerer', value: details.seller, inline: true },
    )
    .setTimestamp()
    .setFooter({ text: 'SlKzᵍᵐ#4307', iconURL: 'https://i.imgur.com/6D428QM.png' });
};

const getChannelById = async (id) => {
  return await client.channels.fetch(id);
};
// ----- \\

module.exports = {
  client,
  channels,
  isReady,
  readyPromise,
  createEggListingEmbedMsg,
  createListingEmbedMsg,
  createSaleEmbedMsg
};
