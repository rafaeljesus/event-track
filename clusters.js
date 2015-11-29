const cluster = require('cluster')
  , CPUS = require('os').cpus()

if (cluster.isMaster) {

  CPUS.forEach(() => cluster.fork())

  cluster.on('listening', worker => {
    console.log('Worker %d connected', worker.process.pid)
  })

  cluster.on('disconnect', worker => {
    console.log('Worker %d disconnect', worker.process.pid)
  })

  cluster.on('exit', worker => {
    console.log('Worker %d exited', worker.process.pid)
    cluster.fork()
  })
}

if (cluster.isWorker) {
  require('./bin/www')
}
