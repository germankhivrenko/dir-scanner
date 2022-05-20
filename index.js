const {server} = require('./src/server')
const {ScanService} = require('./src/scan-service')
const {store} = require('./src/store')

;(async () => {
  new ScanService(store).scan()

  server.listen(3000, '127.0.0.1', () => {
    console.log('Server is listening...')
  })
})()
