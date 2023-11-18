require('dotenv').config()
const Web3 = require('web3');

const contractAddress = '0x7999185F2B188bD86EA4CAF446C911d6A7c23DEa';
const provider = new Web3.providers.HttpProvider(process.env.WEB3_PROVIDER);
const web3 = new Web3(provider);

const callMethodBySelector = async (contractAddress, methodSelector, parameters) => {
    const encodedParameters = web3.eth.abi.encodeParameters(
        ['uint256'],
        parameters
    );

    const data = methodSelector + encodedParameters.slice(2);

    try {
        const result = await web3.eth.call({
            to: contractAddress,
            data: data
        });
        const decodedResult = web3.eth.abi.decodeParameters(['uint32'], result);

        return decodedResult[0];
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

const clonexGhostClaims = async (cloneId) => {
    try {
        return await callMethodBySelector(contractAddress, '0x443670ae', [cloneId]);
    } catch (e) {
        console.log(`Error in clonexClaims(${cloneId})`);
        console.error(e);
    }
}

const dunkGhostClaims = async (dunkId) => {
    try {
        return await callMethodBySelector(contractAddress, '0x7c55e1f1', [dunkId]);
    } catch (e) {
        console.log(`Error in dunkClaims(${dunkId})`);
        console.error(e);
    }
}

module.exports = {
    clonexGhostClaims,
    dunkGhostClaims
}