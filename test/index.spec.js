import test from 'ava'
import 'babel-register'
import request from 'request-promise'

import Event from '../events/collection'
import listen from './listen'
import handler from '../handler'
import fixture from './fixture'

test.afterEach(async function () {
  await Event.remove()
})

test('/events', async function (t) {
  try {
    const url = await listen(handler)
    const data = fixture()
    const body = await request({
      uri: url,
      method: 'POST',
      json: true,
      body: data
    })
    t.ok(body._id)
  } catch (err) {
    t.false(err)
  }
})
