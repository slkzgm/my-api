require('dotenv').config()
const SseChannel = require('sse-channel');
const { contract } = require('./contracts/eggs');
const { WebSocket } = require('ws');
const DiscordClient = require('./discordClient');

const sseChannel = new SseChannel();

const handleSaleEvent = async (item) => {
  const {tokenId, marketplace, price, fromAddress, toAddress, claimed} = item;

  await DiscordClient.channels.sales.send({embeds: [DiscordClient.createSaleEmbedMsg({
      tokenId,
      marketplace,
      price,
      buyer: toAddress,
      seller: fromAddress,
      claimed
    })]});
};

const handleOrderCreatedEvent = async (item) => {
  const {tokenId, marketplace, price, fromAddress, claimed} = item;
  const embedDetails = {
    tokenId,
    marketplace,
    price,
    seller: fromAddress,
    claimed
  };

  if (!claimed) {
    await Promise.all([
      DiscordClient.channels.eggs.send({embeds: [DiscordClient.createEggListingEmbedMsg(embedDetails)]}),
      DiscordClient.channels.listings.send({embeds: [DiscordClient.createEggListingEmbedMsg(embedDetails)]})
    ]);
  } else {
    await DiscordClient.channels.listings.send({embeds: [DiscordClient.createListingEmbedMsg(embedDetails)]});
  }
};

const handleEventCreated = async (payload) => {
  payload.items.map(async (item) => {
    item.claimed = await contract.methods.claimedClone(item.tokenId).call();
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
    // prepare discord client
    await DiscordClient.readyPromise();

    // handle websocket stream
    const ws = new WebSocket(process.env.BLUR_WEBSOCKET_URL);

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
      if (code === 1006 || code === 1001) {
        console.log('Reconnecting...');
        setTimeout(() => {
          connect();
        }, 1000); // adjust the delay before reconnecting if needed
      }
    });
  } catch (e) {console.log(JSON.stringify(e))}
}

connect();

module.exports = sseChannel;
