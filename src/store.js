const {createStore} = require('redux')

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_FILES':
      return action.payload
    default:
      return state
  }
}

const store = createStore(reducer, [])

module.exports = {
  store
}
