'use strict'

const supertest = require('supertest')
  , chai = require('chai')
  , Event = require('../../api/events/collection')
  , app = require('../../')
  , request = supertest(app.listen())
  , assign = Object.assign
  , expect = chai.expect

describe('Event:RoutesSpec', () => {

  afterEach(() => Event.removeAsync())

  describe('GET /v1/events/search', () => {

    it('should search all events', done => {
      request.
        get('/v1/events/search').
        expect('Content-Type', /json/).
        expect(200, done)
    })

    describe('.event', () => {

      beforeEach(() => {
        let data = require('./fixture')()
        return Promise.all([
          Event.createAsync(assign(data, {event: 'purchases'})),
          Event.createAsync(assign(data, {event: 'video'})),
          Event.createAsync(assign(data, {event: 'integration'}))
        ])
      })

      it('should search by event', done => {
        request.
          get('/v1/events/search/?event=purchases').
          expect('Content-Type', /json/).
          expect(200, (err, res) => {
            if (err) return done(err)
            expect(res.body.total).to.eq(1)
            expect(res.body.result.length).to.eq(1)
            done()
          })
      })
    })

    describe('.status', () => {

      beforeEach(() => {
        let data = require('./fixture')()
        return Promise.all([
          Event.createAsync(assign(data, {status: 'completed'})),
          Event.createAsync(assign(data, {status: 'received'})),
          Event.createAsync(assign(data, {status: 'error'}))
        ])
      })

      it('should search by status', done => {
        request.
          get('/v1/events/search/?status=completed').
          expect('Content-Type', /json/).
          expect(200, (err, res) => {
            if (err) return done(err)
            expect(res.body.total).to.eq(1)
            expect(res.body.result.length).to.eq(1)
            done()
          })
      })
    })

    describe('.createdAt', () => {

      beforeEach(() => {
        let data = require('./fixture')()
        return Promise.all([
          Event.createAsync(assign(data, {createdAt: '2015-10-10'})),
          Event.createAsync(assign(data, {createdAt: '2015-10-10'})),
          Event.createAsync(assign(data, {createdAt: '2015-10-20'}))
        ])
      })

      it('should search by date range', done => {
        request.
          get('/v1/events/search/?startDate=2015-10-10&endDate=2015-10-20').
          expect('Content-Type', /json/).
          expect(200, (err, res) => {
            if (err) return done(err)
            expect(res.body.total).to.eq(3)
            expect(res.body.result.length).to.eq(3)
            done()
          })
      })
    })

  })

  describe('POST /v1/events', () => {

    const data = require('./fixture')()

    it('should create events trace', done => {
      request.
        post('/v1/events').
        send(data).
        expect(201, done)
    })
  })

})

