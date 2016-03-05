const host = process.env.MONGO_PORT_27017_TCP_ADDR || 'localhost'
const port = process.env.MONGO_PORT_27017_TCP_PORT || 27017

export default {
  test: `mongodb://${host}:${port}/track_test`,
  development: `mongodb://${host}:${port}/track`,
  production: process.env.MONGODB_URL
}
