require('dotenv').config()
const { Client, GatewayIntentBits, EmbedBuilder} = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Create a Promise that resolves when the client is ready
const readyPromise = new Promise((resolve) => {
  client.once('ready', () => {
    console.log('Discord client is ready');
    resolve();
  });
});

// Log in the client
client.login(process.env.DISCORD_TOKEN);

const createEmbedMsg = (details) => new EmbedBuilder()
  .setColor(0x0099FF)
  .setTitle('Make an Omelet :egg:')
  .setURL(`https://opensea.io/assets/ethereum/0x49cf6f5d44e70224e2e23fdcdd2c053f30ada28b/${details.id}`)
  .setAuthor({ name: 'EggyWeggy', iconURL: 'https://i.imgur.com/6D428QM.png', url: 'https://twitter.com/LStehaye' })
  .setDescription(`A CloneX with unclaimed Eggs just got listed.`)
  .setThumbnail(`https://clonex-assets.rtfkt.com/images/${details.id}.png`)
  .addFields(
    { name: 'Buy Price', value: details.price, inline: true },
  )
  .addFields(
    { name: 'Seller', value: details.seller, inline: true },
  )
  .addFields(
    { name: 'Marketplace', value: 'Opensea', inline: true },
  )
  .setTimestamp()
  .setFooter({ text: 'SlKzᵍᵐ#4307', iconURL: 'https://i.imgur.com/6D428QM.png' });

const getChannelById = async (id) => {
  // Wait for the ready Promise to resolve before returning the channel
  await readyPromise;
  return await client.channels.fetch(id);
};

module.exports = {
  getChannelById,
  createEmbedMsg
};
