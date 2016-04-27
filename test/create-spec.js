import test from 'ava'
import 'babel-register'
import request from 'request-promise'

import listen from './listen'
import Event from '../resources/events'
import fixture from './fixture'

let data = fixture()

test.beforeEach(async () => {
  await Event.remove()
})

test('POST /events', async (t) => {
  const url = await listen()
  const body = await request({
    uri: url,
    method: 'POST',
    json: true,
    body: data
  })
  t.truthy(body.created)
})

test('GET /events', async (t) => {
  const url = await listen()
  const body = await request({
    uri: url,
    method: 'GET',
    json: true
  })
  t.is(body.total, 1)
  t.is(body.result.length, 1)
  t.deepEqual(body.result[0].event, data.event)
})
