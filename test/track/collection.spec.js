'use strict'

const chai = require('chai')
  , Track = require('../../api/track/collection')
  , expect = chai.expect

describe('Track:CollectionSpec', () => {

  afterEach(() => Track.removeAsync())

  describe('.search', () => {

    beforeEach(() => {
      let data = require('./fixture')()
      return Promise.all([
        Track.createAsync(data),
        Track.createAsync(data),
        Track.createAsync(data)
      ])
    })

    it('should search all events on page 1', () => {
      const query = {
        page: 1,
        pageSize: 10
      }
      return Track.
        search(query).
        then(res => {
          expect(res.total).to.be.eq(3)
          expect(res.result.length).to.be.eq(3)
        })
    })

  })

})

