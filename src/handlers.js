const {ScanService} = require('./scan-service');
const {store} = require('./store')

const listHandler = (req, res) => {
  res.writeHead(200, 'OK', {'Content-Type': 'application/json'}).end(JSON.stringify(store.getState()))
}

const scanHandler = async (req, res) => {
  new ScanService(store).scan()
  res.writeHead(200, 'OK').end()
}

const downloadStateHandler = (req, res) => {
  const stream = new ScanService(store).getReadable()
  stream.pipe(res)
  res.writeHead(200, 'OK', {
    'Content-Type': 'application/octet-stream',
    'Content-Disposition': 'attachment; filename=files.json'
  })
}

module.exports = {
  listHandler,
  scanHandler,
  downloadStateHandler
}
