const express = require('express')
const saveStructure = require('./mws/save-structure')
const getStructure = require('./mws/get-structure')
const searchProject = require('./mws/search-project')

const frontendAPI = express()

frontendAPI.get('/save-structure', saveStructure)
frontendAPI.get('/get-structure', getStructure)
frontendAPI.get('/search-project', searchProject)

module.exports = frontendAPI
