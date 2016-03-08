import test from 'ava'
import 'babel-register'
import request from 'request-promise'

import listen from './listen'
import Event from '../events/collection'
import fixture from './fixture'

let data = fixture()

test.afterEach(async function () {
  await Event.remove()
})

test('POST /events', async function (t) {
  try {
    const url = await listen()
    const body = await request({
      uri: url,
      method: 'POST',
      json: true,
      body: data
    })
    t.ok(body.created)
  } catch (err) {
    t.false(err)
  }
})

test('GET /events', async function (t) {
  try {
    const url = await listen()
    const body = await request({
      uri: url,
      method: 'GET',
      json: true
    })
    t.is(body.total, 1)
    t.is(body.result.length, 1)
    t.same(body.result[0].event, data.event)
  } catch (err) {
    t.false(err)
  }
})
