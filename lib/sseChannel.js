const SseChannel = require('sse-channel');
const { contract } = require('./contracts/eggs');

const { Network, OpenSeaStreamClient } = require("@opensea/stream-js");
const { WebSocket } = require('ws');

const DiscordClient = require('./discordClient');

const sseChannel = new SseChannel();

const run = async () => {
  try {
    const client = new OpenSeaStreamClient({
      token: process.env.API_KEY,
      network: Network.MAINNET,
      connectOptions: {
        transport: WebSocket
      },
      onError: (error) => console.log(JSON.stringify(error))
    });
    const alertChannel = await DiscordClient.getChannelById('1075910242367455264');

    client.onItemListed('clonex', async (event) => {
      const id = event.payload.protocol_data.parameters.offer[0].identifierOrCriteria;
      const seller = event.payload.protocol_data.parameters.offerer;
      const price = event.payload.base_price;
      const claimed = await contract.methods.claimedClone(id).call();

      sseChannel.send(JSON.stringify({id, claimed, price}));
      if (!claimed) {
        const embed = DiscordClient.createEmbedMsg({id, price, seller});
        await alertChannel.send({embeds: [embed]})
      }
    });
  } catch (e) {console.log(JSON.stringify(e))}
}

run();

module.exports = sseChannel;
