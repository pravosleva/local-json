const express = require('express')

const CONFIG = {
  EXPRESS_SERVER_PORT: 3000,
}

// --- EXPRESS APP
const server = express()

server.get('/', (req, res) => {
  res.send('Hello world! Lala Seth is here!')
})
const expressServer = () =>
  server.listen(CONFIG.EXPRESS_SERVER_PORT, () => {
    console.log(
      `Express server listening on http://localhost:${CONFIG.EXPRESS_SERVER_PORT}`
    )
  })
// ---

module.exports = expressServer
