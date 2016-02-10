'use strict'

const chai = require('chai')
const mocha = require('mocha')
const coMocha = require('co-mocha')

const Event = require('../../api/events/collection')
const expect = chai.expect

coMocha(mocha)

describe('Event:CollectionSpec', () => {

  afterEach(() => Event.remove())

  describe('.search', () => {

    beforeEach(function *() {
      let data = require('./fixture')()
      yield [
        Event.create(data),
        Event.create(data),
        Event.create(data)
      ]
    })

    it('should search all events on page 1', function *() {
      let res = yield Event.search({
        page: 1,
        pageSize: 10
      })
      expect(res.total).to.be.eq(3)
      expect(res.result.length).to.be.eq(3)
    })

  })

})

