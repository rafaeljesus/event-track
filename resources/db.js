import mongoose from 'mongoose'

import config from '../config/db'

const connection = mongoose.connection
const dbUri = config[process.env.NODE_ENV]

mongoose.connect(dbUri)

connection.on('error', (err) => {
  console.error(`failed on mongoose conn ${err}`)
})

process.on('SIGINT', () => connection.close(() => process.exit(0)))
