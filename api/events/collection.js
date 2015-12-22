'use strict'

const Promise = require('bluebird')
  , mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , createQuery = require('./create.query')

Promise.promisifyAll(mongoose)

const Track = Schema({
  event: String,
  status: String,
  context: {},
  properties: {},
  createdAt: Date
})

Track.statics.search = function(options) {
  options || (options = {})
  const PAGE_SIZE_LIMIT = 100
  let page = options.page || 0
  let pageSize = options.pageSize || 10

  if (page > 0) --page
  if (pageSize > PAGE_SIZE_LIMIT) pageSize = PAGE_SIZE_LIMIT

  const query = createQuery(options)

  const find = this.
    find(query).
    sort('-receivedAt').
    limit(pageSize).
    skip(page * pageSize).
    execAsync()

  return Promise.props({
    total: this.countAsync(query),
    result: find
  })
}

module.exports = mongoose.model('tracks', Track)
