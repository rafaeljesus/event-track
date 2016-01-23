'use strict'

const krouter = require('koa-router')
  , router = krouter()
  , Event = require('./collection')

router.
  /**
   * @api {post} /v1/events Create new Event
   * @apiGroup Events
   * @apiSuccess {String} event Name of the event (order, video, integration, etc...)
   * @apiSuccess {String} status Status of the performed action
   * @apiSuccess {Object} context Extra Information about a datapoint
   * @apiSuccess {Object} properties Properties of the event
   * @apiSuccess {Date} createdAt Date of creation date
   * @apiExample {json} Example usage:
   *    curl -X POST http://event-track-api/v1/events \
   *    -d 'name=order' \
   *    -d 'status=completed' \
   *    -d 'context={
   *        "ip": "24.5.68.47",
   *        "locale": "en-US",
   *        "os": {
   *          "name": "Netscape",
   *          "version": "5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36"
   *        }
   *      }' \
   *    -d 'properties={
   *        "quantity": 5,
   *        "url": "/v1/purchases/123456",
   *        "item": {
   *          "_id": "20150101123457",
   *          "price": 100,
   *        },
   *        "user": {
   *          "_id": "20150101123458",
   *          "name": "Rafael Jesus"
   *        }
   *      }'
   * @apiSuccessExample {json} Success
   *    HTTP/1.1 201 OK
   *    {
   *      "_id": "20150101123490"
   *    }
   * @apiErrorExample {json} Error
   *    HTTP/1.1 422 Unprocessable Entity
   */
  post('/v1/events', function *() {
    const event = this.request.body
    try {
      const res = yield Event.create(event)
      this.body = res._id
      this.status = 201
    } catch (err) {
      this.throw(422, err)
    }
  }).
  /**
   * @api {get} /v1/events/search Advanced Search
   * @apiGroup Events
   * @apiSuccess {Object[]} events List of Events
   * @apiSuccess {Number} events._id Id of the event
   * @apiSuccess {String} events.event Name of the performed action
   * @apiSuccess {String} events.status Status of the action (received, queued, dequeued, success, error, etc...)
   * @apiSuccess {Object} events.properties Free-form dictionary of properties of the event
   * @apiSuccess {Date} events.createdAt Date of event creation
   * @apiExample {json} Example usage:
   *    curl -X GET https://event-track-api/v1/events/search \
   *    -d 'page=1' \
   *    -d 'pageSize=10' \
   *    -d 'query={
   *        "event": "purchases"
   *        "status": "received"
   *        "startDate": "2015-01-01"
   *        "endDate": "2015-02-02"
   *        }'
   * @apiSuccessExample {json} Success
   *    HTTP/1.1 200 OK
   *    [{
   *      "_id": 20150101123456,
   *      "event": "purchases",
   *      "status": "received",
   *      "context": {
   *        "ip": "24.5.68.47",
   *        "locale": "en-US",
   *        "os": {
   *          "name": "Netscape",
   *          "version": "5.0 (Macintosh; Intel Mac OS X 10_11_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36"
   *        }
   *      },
   *      "properties": {
   *        "quantity": 5,
   *        "url": "/v1/purchases/123456",
   *        "item": {
   *          "_id": "20150101123457",
   *          "price": 100,
   *        },
   *        "user": {
   *          "_id": "20150101123458",
   *          "name": "Rafael Jesus"
   *        }
   *      },
   *      "createdAt": "2015-09-24T15:46:51.778Z"
   *    }]
   * @apiErrorExample {json} Search Error
   *    HTTP/1.1 412 Precondition Failed
   */
  get('/v1/events/search', function *() {
    const query = this.request.query
    try {
      this.body = yield Event.search(query)
    } catch (err) {
      this.throw(412, err)
    }
  })

module.exports = router
