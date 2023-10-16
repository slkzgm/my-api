const metadatURI = 'https://mnlthassets.rtfkt.com/'
const axios = require('axios');

const getSkinvialMetadata = async (vialId) => {
    if (!vialId) return ;
    vialId = parseInt(vialId);
    if (!vialId || vialId < 1 || vialId > 20011) return ;

    return (await axios.get(metadatURI + vialId)).data;
}

const getSkinvialDNA = async (vialId) => {
    const metadata = await getSkinvialMetadata(vialId);

    if (metadata)
        return metadata.attributes.filter(e => e.trait_type === 'DNA')[0].value;
    else
        return null;
}

module.exports = {
    getSkinvialMetadata,
    getSkinvialDNA
}