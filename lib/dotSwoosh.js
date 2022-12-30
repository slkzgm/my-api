const dotSwooshDb = require('./dotSwooshDatabase');

const getByHandle = async (handle) => {
  const swoosh = await dotSwooshDb.getDocuments({handle: handle.toLowerCase()});
  return swoosh[0];
}

const getById = async (id) => {
  const swoosh = await dotSwooshDb.getDocuments({id: parseInt(id)});
  return swoosh[0];
}

module.exports = {
  getByHandle,
  getById
}
