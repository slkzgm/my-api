const dotSwooshDb = require('./dotSwooshDatabase');

const getByHandle = async (handle) => {
  const swoosh = await dotSwooshDb.getDocuments({handle: handle.toLowerCase()});
  return swoosh[0];
}

const getById = async (id) => {
  const swoosh = await dotSwooshDb.getDocuments({id: parseInt(id)});
  return swoosh[0];
}

const getDistribution = async () => {
  const {colors, logos} = await dotSwooshDb.getDistribution();

  colors.sort((a, b) => a.count > b.count ? -1 : 1);
  logos.sort((a, b) => a.count > b.count ? -1 : 1);

  return {colors, logos};
}

const getColorDistribution = async () => (await dotSwooshDb.getColorDistribution()).sort((a, b) => a.count > b.count ? -1 : 1);

const getLogoDistribution = async () => (await dotSwooshDb.getLogoDistribution()).sort((a, b) => a.count > b.count ? -1 : 1);

module.exports = {
  getByHandle,
  getDistribution,
  getById,
  getColorDistribution,
  getLogoDistribution
}
