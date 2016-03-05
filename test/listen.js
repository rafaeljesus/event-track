import micro from 'micro'

export default async function listen (fn, opts) {
  const srv = micro(fn, opts)
  return new Promise((resolve, reject) => {
    srv.listen((err) => {
      if (err) return reject(err)
      const {port} = srv.address()
      resolve(`http://localhost:${port}`)
    })
  })
}
