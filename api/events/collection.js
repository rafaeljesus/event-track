'use strict'

const wrap = require('co').wrap
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const createQuery = require('./create.query')

const Track = Schema({
  event: String,
  status: String,
  context: {},
  properties: {},
  createdAt: Date
})

Track.statics.search = wrap(function *(options) {
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

  return yield {
    total: this.count(query),
    result: search
  }
})

module.exports = mongoose.model('tracks', Track)
