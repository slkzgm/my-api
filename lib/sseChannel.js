const SseChannel = require('sse-channel');
const {contract, web3} = require('./contracts/eggs');

const {Network, OpenSeaStreamClient} = require("@opensea/stream-js");
const { WebSocket } = require('ws');

const DiscordClient = require('./discordClient');

const sseChannel = new SseChannel();
const client = new OpenSeaStreamClient({
  token: process.env.API_KEY,
  network: Network.MAINNET,
  connectOptions: {
    transport: WebSocket
  }
});

const run = async () => {
  const alertChannel = await DiscordClient.getChannelById('1075910242367455264');
  client.onItemListed('clonex', async (event) => {
    const cloneId = event.payload.protocol_data.parameters.offer[0].identifierOrCriteria;
    const price = event.payload.base_price;
    const claimed = await contract.methods.claimedClone(cloneId).call();

    sseChannel.send(JSON.stringify({id: cloneId, claimed, price}));
    if (!claimed) {
      await alertChannel.send(`
      ${cloneId} listed at ${web3.utils.fromWei(price, 'ether')}
      https://opensea.io/assets/ethereum/0x49cf6f5d44e70224e2e23fdcdd2c053f30ada28b/${cloneId}
      `);
    }
  });
}

run();

module.exports = sseChannel;
