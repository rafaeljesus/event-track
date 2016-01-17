'use strict'

const chai = require('chai')
  , Event = require('../../api/events/collection')
  , expect = chai.expect

describe('Event:CollectionSpec', () => {

  afterEach(() => Event.remove())

  describe('.search', () => {

    beforeEach(() => {
      let data = require('./fixture')()
      return Promise.all([
        Event.create(data),
        Event.create(data),
        Event.create(data)
      ])
    })

    it('should search all events on page 1', () => {
      const query = {
        page: 1,
        pageSize: 10
      }
      return Event.
        search(query).
        then(res => {
          expect(res.total).to.be.eq(3)
          expect(res.result.length).to.be.eq(3)
        })
    })

  })

})

