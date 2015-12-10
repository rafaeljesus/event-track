'use strict'

const Promise = require('bluebird')
  , mongoose = Promise.promisifyAll(require('mongoose'))
  , Schema = mongoose.Schema
  , createQuery = require('./create.query')

const Track = Schema({
  channel: {type: String, default: ''},
  context: {
    ip: {type: String, default: ''},
    userAgent: {type: String, default: ''}
  },
  event: {type: String, default: ''},
  createdBy: {},
  properties: {},
  receivedAt: Date,
  sentAt: Date,
  timestamp: Date
})

Track.statics.search = function(options) {
  options || (options = {})
  let PAGE_SIZE_LIMIT = 100
    , page = options.page || 0
    , pageSize = options.pageSize || 10

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
