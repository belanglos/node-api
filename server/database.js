'use strict'

const log = require('kth-node-log')
const nodeMongo = require('kth-node-mongo')
const config = require('./configuration').server

const mongoOptions = {
  user: config.db.username,
  pass: config.db.password,
  ssl: config.db.ssl,
  dbUri: config.db.authDatabase !== '' ? config.db.uri + `?authSource=${config.db.authDatabase}` : config.db.uri,
  logger: log,
}

module.exports.connect = function connect() {
  nodeMongo
    .connect(mongoOptions)
    .then(data => {
      log.info({ data }, 'MongoDB: connected')
    })
    .catch(err => {
      log.error({ err }, 'MongoDB: ERROR connecting DB')
    })
}
