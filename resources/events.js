import mongoose from 'mongoose'

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

  const q = buildQuery(options)

  const search = this.find(q)
  .sort('-createdAt')
  .limit(pageSize)
  .skip(page * pageSize)
  .exec()

  const [ total, result ] = await Promise.all([
    this.count(q),
    search
  ])

  return { total, result }
}

function buildQuery (options) {
  let query = {}
  const regex = (field) => new RegExp(field, 'i')

  if (options.channel) {
    query['channel'] = { $regex: regex(options.channel) }
  }

  if (options.event) {
    query['event'] = { $regex: regex(options.event) }
  }

  if (options.status) {
    query['status'] = { $regex: regex(options.status) }
  }

  if (options.startReceivedAt) {
    query['receivedAt'] = {}
    query['receivedAt']['$gte'] = new Date(options.startReceivedAt).toISOString()
  }

  if (options.endReceivedAt) {
    query['receivedAt'] || {}
    query['receivedAt']['$lte'] = new Date(options.endReceivedAt).toISOString()
  }

  return query
}

export default mongoose.model('events', Event)
