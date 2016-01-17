'use strict'

const mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , createQuery = require('./create.query')

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

  const search = this.
    find(query).
    sort('-receivedAt').
    limit(pageSize).
    skip(page * pageSize).
    exec()

  return Promise.all([
    this.count(query),
    search
  ]).then(res => ({total: res[0], result: res[1]}))
}

module.exports = mongoose.model('tracks', Track)
