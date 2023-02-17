require('dotenv').config()
const { Client, GatewayIntentBits } = require('discord.js');

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

const getChannelById = async (id) => {
  // Wait for the ready Promise to resolve before returning the channel
  await readyPromise;
  return await client.channels.fetch(id);
};

module.exports = {
  getChannelById
};
