const axios = require('axios');
const cheerio = require('cheerio');

const getOncyberFilesLink = async (url) => {
  try {
   const response = await axios.get(url);
   const $ = cheerio.load(response.data);
   const nextData = JSON.parse($('#__NEXT_DATA__').html());
   const availableArtworks = [];

   const artworks = nextData.props.pageProps.experience.artworks;
   Object.keys(artworks).forEach(artwork => {
     const assetData = artworks[artwork].data;

     availableArtworks.push({
       name: assetData.name,
       mimeType: assetData.mime_type,
       animation_url: assetData.animation_url,
       image_original_url: assetData.image_original_url,
       image_preview_url: assetData.image_preview_url,
       original_mime_type: assetData.original_mime_type,
       image_original_preview_url: assetData.image_preview_url,
       image_url: assetData.image_url,
       dcompressed_animation_url: assetData.dcompressed_animation_url,
       animation_original_url: assetData.animation_original_url
     });
   });
   return availableArtworks;
  } catch (e) {
    return [];
  }
};

module.exports = {
  getOncyberFilesLink
}
