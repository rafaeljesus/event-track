export default (options) => {
  let query = {}
  const regex = (field) => new RegExp(field, 'i')

  if (options.channel) {
    query['channel'] = {$regex: regex(options.channel)}
  }

  if (options.event) {
    query['event'] = {$regex: regex(options.event)}
  }

  if (options.status) {
    query['status'] = {$regex: regex(options.status)}
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
