const path = require('path')

const { FILE_STORAGE_DIR } = process.env

const getFileStoragePath = () => {
  if (!FILE_STORAGE_DIR) {
    throw new Error('FILE_STORAGE_DIR was not set, check .env')
  }

  return path.join(__dirname, '../../', FILE_STORAGE_DIR)
}

module.exports = getFileStoragePath
