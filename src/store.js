import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

// get userInfo from localStorage
const userInfoFromStorage = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null

console.log('..user', userInfoFromStorage)

// initialState
const initialState = {
  sidebarShow: true,
  user: userInfoFromStorage,
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    default:
      return state
  }
}

const store = createStore(changeState, initialState, composeWithDevTools())
export default store
