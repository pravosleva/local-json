const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const fs = require('fs')

require('dotenv').config()

// --- CREATE FS
const { FILE_STORAGE_DIR } = process.env

if (!FILE_STORAGE_DIR) {
  console.error('FILE_STORAGE_DIR was not set, check .env')
  // eslint-disable-next-line no-process-exit
  process.exit(0)
}
const fileStoragePath = require('./utils/getFileStoragePath')()

if (!fs.existsSync(fileStoragePath)) {
  fs.mkdirSync(fileStoragePath)
}
// ---

const fapiRouter = require('./router/fapi')

const isDev = process.env.NODE_ENV === 'development'
const CONFIG = {
  EXPRESS_SERVER_PORT: 3536,
}

// --- EXPRESS APP
const server = express()

if (isDev) server.use(cors())
// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
server.use(bodyParser.json())
server.use('/fapi', fapiRouter)
server.use(express.static('frontend/build'))

const expressServer = () =>
  server.listen(CONFIG.EXPRESS_SERVER_PORT, () => {
    console.log(
      `Express server listening on http://localhost:${CONFIG.EXPRESS_SERVER_PORT}`
    )
  })
// ---

module.exports = expressServer
