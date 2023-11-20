require('dotenv').config()
const SseChannel = require('sse-channel');
const { contract } = require('./contracts/dunkGhostForge');
const { getData } = require("./dunkForge");

const sseChannel = new SseChannel();

const handleEventCreated = async (payload) => {
    const newData = await getData();
    const forged = parseInt(payload.returnValues[2][0]);

    newData.ghost = newData.ghost + forged;
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
