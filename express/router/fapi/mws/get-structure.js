/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const fs = require('fs')

const fileStoragePath = require('../../../utils/getFileStoragePath')()

const isValidString = (str) => !!str

// --- REQUIRED KEYS:
const requiredKeys = {
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

    const { projectName } = query
    const projectDir = `${fileStoragePath}/${projectName}`

    if (!fs.existsSync(projectDir)) {
      // fs.mkdirSync(projectDir)
      status = 404
      throw new Error(`Project ${projectName} does not exists`)
    } else {
      const text = fs.readFileSync(`${projectDir}/structure.json`, 'utf8')

      result.json = JSON.parse(text)
    }

    result.success = true
    status = 200
  } catch (err) {
    result.message = err.message || 'Fuckup'
  }

  res.status(status).send(result)
}

module.exports = saveStructure
