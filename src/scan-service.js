const {readdir} = require('fs/promises')
const {Readable} = require('stream')

class ScanService {
  constructor(store) {
    this._store = store
  }

  async scan() {
    const dirPath = process.env.DIR_PATH || process.cwd()
    const fileNames = await readdir(dirPath)

    const inactiveFiles = this._store
      .getState()
      .filter(({name}) => !fileNames.includes(name))
      .map(({name}) => ({name, active: false}))
    const activeFiles = fileNames.map((fileName) => ({name: fileName, active: true}))

    this._store.dispatch({
      type: 'SET_FILES',
      payload: activeFiles.concat(inactiveFiles)
    })
  }

  getReadable() {
    return Readable.from([JSON.stringify(this._store.getState(), null, 2)])
  }
}

module.exports = {
  ScanService
}
