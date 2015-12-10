'use strict'

module.exports = {
  test: 'mongodb://localhost/track_test',
  development: 'mongodb://localhost/track',
  production: process.env.MONGOHQ_URL
}
