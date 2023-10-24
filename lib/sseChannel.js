require('dotenv').config()
const SseChannel = require('sse-channel');
const { contract } = require('./contracts/eggs');
const { WebSocket } = require('ws');
const DiscordClient = require('./discordClient');
const axios = require('axios');

const sseChannel = new SseChannel();

const getCloneAttributes = async (tokenId) => {
  try {
    return (await axios.get(`https://clonex-assets.rtfkt.com/${tokenId}`)).data.attributes;
  } catch (e) {
    console.log(e);
    return [{"trait_type": "unknown"}];
  }
}

const handleSaleEvent = async (item) => {
  const {tokenId, marketplace, price, fromAddress, toAddress, claimed, dna, drip} = item;

  await Promise.all([
    DiscordClient.channels.sales.send({embeds: [DiscordClient.createSaleEmbedMsg({
        tokenId,
        marketplace,
        price,
        buyer: toAddress,
        seller: fromAddress,
        claimed,
        dna,
        drip
      })]}),
    // DiscordClient.dnaChannels[dna].send({embeds: [DiscordClient.createSaleEmbedMsg({
    //     tokenId,
    //     marketplace,
    //     price,
    //     buyer: toAddress,
    //     seller: fromAddress,
    //     claimed,
    //     dna
    //   })]})
  ]);
};

const handleOrderCreatedEvent = async (item) => {
  const {tokenId, marketplace, price, fromAddress, claimed, dna, drip} = item;
  const embedDetails = {
    tokenId,
    marketplace,
    price,
    seller: fromAddress,
    claimed,
    dna,
    drip
  };

  const sendMessagePromises = [
    DiscordClient.channels.listings.send({embeds:[!claimed ?
          DiscordClient.createEggListingEmbedMsg(embedDetails) : DiscordClient.createListingEmbedMsg(embedDetails)]}),
    DiscordClient.dnaChannels[dna].send({embeds:[!claimed ?
          DiscordClient.createEggListingEmbedMsg(embedDetails) : DiscordClient.createListingEmbedMsg(embedDetails)]})
  ];

  if (!claimed) {
    sendMessagePromises
        .push(DiscordClient.channels.eggs.send({embeds: [DiscordClient.createEggListingEmbedMsg(embedDetails)]}));
  }
  if (drip) {
    sendMessagePromises
        .push(DiscordClient.dnaChannels['drip'].send({embeds:[!claimed ?
          DiscordClient.createEggListingEmbedMsg(embedDetails) : DiscordClient.createListingEmbedMsg(embedDetails)]}))
  }
  await Promise.all(sendMessagePromises);
};

const handleEventCreated = async (payload) => {
  payload.items.map(async (item) => {
    const [claimed, attributes] = await Promise.all([
      contract.methods.claimedClone(item.tokenId).call(),
      getCloneAttributes(item.tokenId)
    ]);
    const type = attributes.find(attributes => attributes.trait_type === 'Type');

    item.claimed = claimed;
    item.dna = attributes.find(attribute => attribute.trait_type === 'DNA').value.toLowerCase();
    item.drip = type && type.value === 'MURAKAMI DRIP';
    switch (item.eventType) {
      case 'SALE':
        await handleSaleEvent(item);
        break;
      case 'ORDER_CREATED':
        await handleOrderCreatedEvent(item);
        break;
      default:
        console.log('UNKNOWN EVENT_TYPE');
        break;
    }
  });
}

const parseBuffer = (buffer) => {
  const bufferString = buffer.toString();
  const code = parseInt(bufferString);
  const arr = bufferString.indexOf('[');
  const obj = bufferString.indexOf('{');
  const firstChar = (arr === -1 || obj === -1) ?
      Math.max(arr, obj)
      : Math.min(arr, obj);
  const parsed = JSON.parse(bufferString.slice(firstChar));

  return {
    code,
    event: parsed[1] ? parsed[0] : 'unknown',
    payload: parsed[1] ? parsed[1] : parsed
  }
}

const handleFortyTwo = async (event) => {
  switch (event.event) {
    case 'unknown':
      return ;
    case '0x49cf6f5d44e70224e2e23fdcdd2c053f30ada28b.feeds.activity.eventsCreated':
      await handleEventCreated(event.payload);
  }
}

// WEBSOCKET SUBSCRIPTION RETRY
const MAX_RETRIES = 20;
const RETRY_DELAY = 1000;

let subscriptionRetryCount = 0;
let retryTimeout;

async function subscribe(ws) {
  if (subscriptionRetryCount < MAX_RETRIES) {
    ws.send('4261["subscribe",["0x49cf6f5d44e70224e2e23fdcdd2c053f30ada28b.feeds.activity.eventsCreated"]]');
    subscriptionRetryCount++;

    retryTimeout = setTimeout(async () => {
      console.log('Retrying subscription...')
      await subscribe(ws);
    }, RETRY_DELAY);
  } else {
    console.log("Maximum subscription retries amount has been reached.");
  }
}

const connect = async () => {
  try {
    // handle websocket stream
    const ws = new WebSocket(process.env.BLUR_WEBSOCKET_URL);

    // prepare discord client
    if (!DiscordClient.isReady()) {
      console.log('Initiating discord client...');
      await DiscordClient.readyPromise();
      if (DiscordClient.isReady()) {
        console.log('Discord client is ready.');
      } else {
        console.log('Error initiating discord client.');
      }
    }

    ws.on('error', (err) => {
      console.log(err)
    });

    ws.on('open', async () => {
      console.log('Connected');
      ws.send(40);
      console.log('Subscribing to the activity feed...');
      await subscribe(ws);
    });

    ws.on('message', async (data) => {
      const event = parseBuffer(data);

      // console.log(data);

      // check for subscription success
      if (event.event === 'subscribed') {
        console.log('Successfully subscribed!');
        clearTimeout(retryTimeout);
        subscriptionRetryCount = 0;
      }

      switch (event.code) {
        case 2:
          ws.send(3);
          break;
        case 42:
          await handleFortyTwo(event);
          break;
        default:
          return;
      }
    })

    ws.on('close', (code, reason) => {
      console.log(`Websocket closed with code ${code} and reason: ${reason}`);

      // if (code === 1006 || code === 1001 ) {
      console.log('Reconnecting...');
      setTimeout(() => {
        connect();
      }, 1000); // adjust the delay before reconnecting if needed
      // } else {
      //   console.log('Websocket closed and not reconnecting.');
      // }
    });
  } catch (e) {console.log(JSON.stringify(e))}
}

connect();

module.exports = sseChannel;
