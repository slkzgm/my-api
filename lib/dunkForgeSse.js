require('dotenv').config()
const SseChannel = require('sse-channel');
const { contract } = require('./contracts/dunkGhostForge');
const { getData } = require("./dunkForge");

const sseChannel = new SseChannel();
let baseData = false;

const handleEventCreated = async (payload) => {
    if (baseData === false) {
        baseData = await getData();
    }
    const forged = parseInt(payload.returnValues[2][0]);

    baseData.ghost = baseData.ghost + forged;
    baseData.total = baseData.total + forged;
    baseData.volume = baseData.volume + (forged * 0.11);
    sseChannel.send({data: JSON.stringify(newData)});
}

const connect = async () => {
    contract.events.NewDunkForge({})
        .on('data', (event) => {
            handleEventCreated(event);
        })
        .on('error', (error) => {
            console.error(`Error while listening to NewDunkForge events: `, error);
        })
}

connect();

module.exports = sseChannel;
