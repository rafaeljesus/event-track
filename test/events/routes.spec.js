'use strict'

const supertest = require('supertest')
const chai = require('chai')
const mocha = require('mocha')
const coMocha = require('co-mocha')

const Event = require('../../api/events/collection')
const app = require('../../')

const request = supertest(app.listen())
const assign = Object.assign
const expect = chai.expect

coMocha(mocha)

describe('Event:RoutesSpec', () => {

  afterEach(function *() {
    yield Event.remove()
  })

  describe('GET /v1/events/search', () => {

    it('should search all events', done => {
      request.
        get('/v1/events/search').
        expect('Content-Type', /json/).
        expect(200, done)
    })

    describe('.event', () => {

      beforeEach(function *() {
        let data = require('./fixture')()
        yield [
          Event.create(assign(data, {event: 'purchases'})),
          Event.create(assign(data, {event: 'video'})),
          Event.create(assign(data, {event: 'integration'}))
        ]
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

      beforeEach(function *() {
        let data = require('./fixture')()
        yield [
          Event.create(assign(data, {status: 'completed'})),
          Event.create(assign(data, {status: 'received'})),
          Event.create(assign(data, {status: 'error'}))
        ]
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

      beforeEach(function *() {
        let data = require('./fixture')()
        yield [
          Event.create(assign(data, {createdAt: '2015-10-10'})),
          Event.create(assign(data, {createdAt: '2015-10-10'})),
          Event.create(assign(data, {createdAt: '2015-10-20'}))
        ]
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

