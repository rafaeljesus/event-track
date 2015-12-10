'use strict'

module.exports = options => {

  const regex = field => new RegExp(field, 'i')
  let query = {}

  if (options.channel) {
    query['channel'] = {$regex: regex(options.channel)}
  }

  if (options.event) {
    query['event'] = {$regex: regex(options.event)}
  }

  if (options.startReceivedAt) {
    query['receivedAt'] = {}
    query['receivedAt']['$gte'] = new Date(options.startReceivedAt).toISOString()
  }

  if (options.endReceivedAt) {
    query['receivedAt'] || {}
    query['receivedAt']['$lte'] = new Date(options.endReceivedAt).toISOString()
  }

  if (options.startSentAt) {
    query['sentAt'] = {}
    query['sentAt']['$gte'] = new Date(options.startReceivedAt).toISOString()
  }

  if (options.endSentAt) {
    query['sentAt'] || {}
    query['sentAt']['$lte'] = new Date(options.endSentAt).toISOString()
  }

  return query
}
