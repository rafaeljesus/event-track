import mongoose from 'mongoose'

import query from './query'

const Schema = mongoose.Schema

const Event = Schema({
  event: String,
  status: String,
  context: {},
  properties: {},
  createdAt: Date
})

Event.statics.search = async function (options) {
  options || (options = {})
  const PAGE_SIZE_LIMIT = 100
  let page = options.page || 0
  let pageSize = options.pageSize || 10

  if (page > 0) --page
  if (pageSize > PAGE_SIZE_LIMIT) pageSize = PAGE_SIZE_LIMIT

  const q = query(options)
  const search = this.find(q)
  .sort('-receivedAt')
  .limit(pageSize)
  .skip(page * pageSize)
  .exec()

  const res = await Promise.all([this.count(q), search])

  return {
    total: res[0],
    result: res[1]
  }
}

export default mongoose.model('events', Event)
