import { json } from 'micro'
import { parse } from 'url'

import Event from './events/collection'

export async function create (req, res) {
  const data = await json(req)
  await Event.create(data)
  return {created: true}
}

export async function search (req, res) {
  const query = parse(req.url, true).query
  return await Event.search(query)
}
