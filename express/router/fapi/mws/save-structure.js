/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const fs = require('fs')

const fileStoragePath = require('../../../utils/getFileStoragePath')()

const isValidJsonString = (str) => {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}
const isValidString = (str) => !!str

// --- REQUIRED KEYS:
const requiredKeys = {
  structure: isValidJsonString,
  projectName: isValidString,
}
// ---

const requiredKeysMap = new Map()

for (const key in requiredKeys) requiredKeysMap.set(key, requiredKeys[key])

const saveStructure = (req, res, _next) => {
  const result = {
    success: false,
  }
  let status = 500
  const { query } = req

  try {
    Object.keys(requiredKeys).forEach((key) => {
      if (!query[key]) {
        status = 400
        throw new Error(`Key "${key}" not found in request.query`)
      }
    })

    const { structure, projectName } = query
    const projectDir = `${fileStoragePath}/${projectName}`

    if (!fs.existsSync(projectDir)) {
      fs.mkdirSync(projectDir)
    }

    fs.writeFile(`${projectDir}/structure.json`, structure, 'utf8', (err) => {
      if (err) {
        throw new Error(err)
      }
      console.log('👌 JSON SAVED')
    })

    result.success = true
    status = 200
  } catch (err) {
    result.message = err.message || 'Fuckup'
  }

  setTimeout(() => {
    res.status(status).send(result)
  }, 2000)
}

module.exports = saveStructure
