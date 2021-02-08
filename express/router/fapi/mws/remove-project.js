/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const fs = require('fs')
const fsExtra = require('fs-extra')

const fileStoragePath = require('../../../utils/getFileStoragePath')()

const isValidString = (str) => !!str

// --- REQUIRED KEYS:
const requiredKeys = {
  projectName: isValidString,
}
// ---

const requiredKeysMap = new Map()

for (const key in requiredKeys) requiredKeysMap.set(key, requiredKeys[key])

const saveStructure = async (req, res, _next) => {
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

    const { projectName } = query
    const projectDir = `${fileStoragePath}/${projectName}`

    if (!fs.existsSync(projectDir)) {
      status = 404
      throw new Error(`Project ${projectName} does not exists`)
    } else {
      await fsExtra
        .remove(projectDir)
        .then(() => {
          result.message = `Deleted: ${projectDir}`
          result.success = true
          status = 200
        })
        .catch((err) => {
          result.message = err.message || 'No message'
          result.success = false
          status = 500
        })
    }
  } catch (err) {
    result.message = err.message || 'Fuckup'
  }

  setTimeout(() => {
    res.status(status).send(result)
  }, 2000)
}

module.exports = saveStructure
