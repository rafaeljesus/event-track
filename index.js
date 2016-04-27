import { send, sendError } from 'micro'

import { create, search } from './handler'
import './resources/db'

export default async (req, res) => {
  try {
    send(res, 200, await handleMethod(req))
  } catch (err) {
    sendError(req, res, err)
  }
}

async function handleMethod (req, res) {
  switch (req.method) {
    case 'POST':
      return await create(req)
    case 'GET':
      return await search(req)
    default:
      send(res, 405, 'Invalid method')
      break
  }
}
