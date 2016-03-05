import mongoose from 'mongoose'

import config from '../config/db'
import log from './log'

const connection = mongoose.connection
const dbUri = config[process.env.NODE_ENV]

mongoose.connect(dbUri)
connection.on('error', (err) => log.error(`failed on mongoose conn ${err}`))
process.on('SIGINT', () => connection.close(() => process.exit(0)))
