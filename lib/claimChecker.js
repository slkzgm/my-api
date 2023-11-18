const {contract: eggsContract} = require('./contracts/eggs');
const {contract: forgeszn1Contract} = require('./contracts/forgeszn1');
const {contract: dunkForgeContract} = require('./contracts/dunkForge');
const {clonexGhostClaims} = require("./contracts/dunkGhostForge");

// const getInformations = async (ipfsLink) => {
//     const res = (await axios.get(`https://ipfs.io/ipfs/${ipfsLink}`)).data;
//     return {
//         name: res.name,
//         image: `https://ipfs.io/ipfs/${res.image.slice(7)}`,
//         maxMints: res.name.includes('Genesis') ? 1 : 2
//     }
// }
// const retrieveSzn1metadatas = async () => {
//     const full = [];
//     full.push({});
//     for (let i = 1; i <= 74; i++) {
//         const ipfsLink = (await forgeszn1Contract.methods.uri(i).call()).slice(7);
//         const infos = await getInformations(ipfsLink);
//         console.log(infos);
//         full.push(infos);
//     }
//     return full;
// }

const forgeSzn1Assets = [
    {},{"name":"CLONE X Genesis T-Shirt 🧬","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/genesis/1.png","maxMints":1},{"name":"CLONE X Genesis Hoodie 🧬","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/genesis/2.png","maxMints":1},{"name":"CLONE X Genesis Cap 🧬","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/genesis/3.png","maxMints":1},{"name":"CLONE X Genesis Socks 🧬","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/genesis/4.png","maxMints":1},{"name":"RTFKT x Nike Air Force 1 - Genesis 🧬","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/genesis/5.png","maxMints":1},{"name":"Human T-Shirt 🖐","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/humans/6.png","maxMints":2},{"name":"Human LS T-Shirt 🖐","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/humans/7.png","maxMints":2},{"name":"Human Hoodie 🖐","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/humans/8.png","maxMints":2},{"name":"Human Cap 🖐","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/humans/9.png","maxMints":2},{"name":"Human Pants 🖐","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/humans/10.png","maxMints":2},{"name":"Human Socks 🖐","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/humans/11.png","maxMints":2},{"name":"RTFKT x Nike Air Force 1 - Human 🖐","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/humans/12.png","maxMints":2},{"name":"Robot T-Shirt 🤖","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/robot/13.png","maxMints":2},{"name":"Robot LS T-Shirt 🤖","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/robot/14.png","maxMints":2},{"name":"Robot Hoodie 🤖","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/robot/15.png","maxMints":2},{"name":"Robot Cap 🤖","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/robot/16.png","maxMints":2},{"name":"Robot Socks 🤖","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/robot/17.png","maxMints":2},{"name":"Robot Pants 🤖","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/robot/18.png","maxMints":2},{"name":"Robot Utility Vest 🤖","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/robot/19.png","maxMints":2},{"name":"RTFKT x Nike Air Force 1 - Robot 🤖","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/robot/20.png","maxMints":2},{"name":"Demon T-Shirt 😈","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/demon/21.png","maxMints":2},{"name":"Demon LS T-Shirt 😈","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/demon/22.png","maxMints":2},{"name":"Demon Hoodie 😈","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/demon/23.png","maxMints":2},{"name":"Demon Cap 😈","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/demon/24.png","maxMints":2},{"name":"Demon Socks 😈","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/demon/25.png","maxMints":2},{"name":"Demon Pants 😈","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/demon/26.png","maxMints":2},{"name":"‘Demon Time’ Jersey 😈","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/demon/27.png","maxMints":2},{"name":"RTFKT x Nike Air Force 1 - Demon 😈","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/demon/28.png","maxMints":2},{"name":"Angel T-Shirt 😇","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/angel/29.png","maxMints":2},{"name":"Angel LS T-Shirt 😇","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/angel/30.png","maxMints":2},{"name":"Angel Hoodie 😇","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/angel/31.png","maxMints":2},{"name":"Angel Cap 😇","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/angel/32.png","maxMints":2},{"name":"Angel Socks 😇","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/angel/33.png","maxMints":2},{"name":"Angel Pants 😇","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/angel/34.png","maxMints":2},{"name":"Angel Virtue Jacket 😇","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/angel/35.png","maxMints":2},{"name":"RTFKT x Nike Air Force 1 - Angel 😇","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/angel/36.png","maxMints":2},{"name":"Reptile T-Shirt 🦎","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/reptile/37.png","maxMints":2},{"name":"Reptile LS T-Shirt 🦎","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/reptile/38.png","maxMints":2},{"name":"Reptile Hoodie 🦎","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/reptile/39.png","maxMints":2},{"name":"Reptile Cap 🦎","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/reptile/40.png","maxMints":2},{"name":"Reptile Socks 🦎","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/reptile/41.png","maxMints":2},{"name":"Reptile Pants 🦎","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/reptile/42.png","maxMints":2},{"name":"Reptile Pit Jacket 🦎","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/reptile/43.png","maxMints":2},{"name":"RTFKT x Nike Air Force 1 - Reptile 🦎","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/reptile/44.png","maxMints":2},{"name":"Undead T-Shirt ☠️","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/undead/45.png","maxMints":2},{"name":"Undead LS T-Shirt ☠️","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/undead/46.png","maxMints":2},{"name":"Undead Hoodie ☠️","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/undead/47.png","maxMints":2},{"name":"Undead Cap ☠️","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/undead/48.png","maxMints":2},{"name":"Undead Socks ☠️","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/undead/49.png","maxMints":2},{"name":"Undead Pants ☠️","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/undead/50.png","maxMints":2},{"name":"Undead Swarm Varsity ☠️","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/undead/51.png","maxMints":2},{"name":"RTFKT x Nike Air Force 1 - Undead ☠️","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/undead/52.png","maxMints":2},{"name":"Alien T-Shirt 👽","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/alien/53.png","maxMints":2},{"name":"Alien LS T-Shirt 👽","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/alien/54.png","maxMints":2},{"name":"Alien Hoodie 👽","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/alien/55.png","maxMints":2},{"name":"Alien Cap 👽","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/alien/56.png","maxMints":2},{"name":"Alien Socks 👽","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/alien/57.png","maxMints":2},{"name":"Alien Pants 👽","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/alien/58.png","maxMints":2},{"name":"Alien Space Puffa 👽","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/alien/59.png","maxMints":2},{"name":"RTFKT x Nike Air Force 1 - Alien 👽","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/alien/60.png","maxMints":2},{"name":"Murakami DNA T-Shirt 🌸","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/murakamidna/61.png","maxMints":2},{"name":"Murakami DNA LS T-Shirt 🌸","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/murakamidna/62.png","maxMints":2},{"name":"Murakami DNA Hoodie 🌸","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/murakamidna/63.png","maxMints":2},{"name":"Murakami DNA Cap 🌸","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/murakamidna/64.png","maxMints":2},{"name":"Murakami DNA Socks 🌸","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/murakamidna/65.png","maxMints":2},{"name":"Murakami DNA Pants 🌸","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/murakamidna/66.png","maxMints":2},{"name":"Murakami DNA Varsity 🌸","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/murakamidna/67.png","maxMints":2},{"name":"RTFKT x Nike Air Force 1 - Murakami DNA 🌸","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/murakamidna/68.png","maxMints":2},{"name":"Murakami Drip LS T-Shirt 🌸💧","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/murakamidrip/69.png","maxMints":2},{"name":"Murakami Drip T-Shirt 🌸💧","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/murakamidrip/70.png","maxMints":2},{"name":"Murakami Drip Hoodie 🌸💧","image":"https://ipfs.io/ipfs/QmVxmTBNihh5zSR56wUksp53TEMW5zbEr5q2cL4NoGcBLm","maxMints":2},{"name":"Murakami Drip Cap 🌸💧","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/murakamidrip/72.png","maxMints":2},{"name":"Murakami Drip Socks 🌸💧","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/murakamidrip/73.png","maxMints":2},{"name":"RTFKT x Nike Air Force 1 - Murakami Drip 🌸💧","image":"https://ipfs.io/ipfs/QmWpbme9ECzeNZDbpe5kJKRmiL6WhKGJJZ9RbHb5ioLeHD/murakamidrip/74.png","maxMints":2}
];

const getClaimedStatus = async (tokenId) => {
    try {
        const [eggClaimed, forgeszn, dunkForge, ghostDunkForge] = await Promise.all([
            eggsContract.methods.claimedClone(tokenId).call(),
            forgeszn1Contract.methods.remainingMints(tokenId).call(),
            dunkForgeContract.methods.cloneXClaims(tokenId).call(),
            clonexGhostClaims(tokenId)
        ]);
        const forgesznObj = forgeszn.map(item => {
            const id = parseInt(item['WearableId']);
            const data = forgeSzn1Assets[id];

            return ({
                ...data,
                remainingMints: parseInt(item['RemainingMints']),
                id
            })
        });

        return {
            egg: eggClaimed,
            forgeszn1: forgesznObj,
            dunk: 2 - parseInt(dunkForge),
            ghostDunk: 2 - parseInt(ghostDunkForge)
        }
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    getClaimedStatus
}