/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const fs = require('fs')

const fileStoragePath = require('../../../utils/getFileStoragePath')()

const isValidString = (str) => !!str

// --- REQUIRED KEYS:
const requiredKeys = {
  q: isValidString,
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

    // const { projectName } = query
    // const projectDir = `${fileStoragePath}/${projectName}`

    const filesArr = fs.readdirSync(fileStoragePath)
    const checkTheSubstrInStr = (substr, str) => str.indexOf(substr) !== -1 // received args= encoded strs
    const checkTheSubstrByWords = (wordsAsSubstr, str) => {
      let flag = false
      const words = wordsAsSubstr.toLowerCase().split('%20')
      const flags = []
      words.forEach((wrd, i) => {
        flag = checkTheSubstrInStr(wrd, str.toLowerCase())
        flags[i] = checkTheSubstrInStr(wrd, str.toLowerCase())
      }, this)
      if (flags.indexOf(false) !== -1) flag = false
      return flag
    }
    const resultArr = filesArr
      .filter((name, _index) => checkTheSubstrByWords(query.q, name))
      .map((name) => ({
        projectName: name,
        readableName: name.split('.').slice(0, -1).join('.'),
      }))

    if (resultArr.length === 0) {
      status = 404
      throw new Error('Not found')
    }

    result.json = resultArr

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
