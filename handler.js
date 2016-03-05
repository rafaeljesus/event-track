import { json, send } from 'micro'

import Event from './events/collection'
import './lib/db'

export default async function (req, res) {
  try {
    const data = await json(req)
    const track = await Event.create(data)
    send(res, 200, track)
  } catch (err) {
    send(res, 422, {error: err})
  }
}
