import axios from 'axios'
import store from 'src/store'

const api = axios.create({
  baseURL: 'http://18.116.216.181:3001/api/',
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
  Intercept requests and responses from apis
 **/

/* api requests */
api.interceptors.request.use(
  async (request) => {
    const accesstoken = store.getState()?.user?.data?.accesstoken
    request.headers['oauth-token'] = accesstoken
    return request
  },
  (err) => {
    return Promise.reject(err)
  },
)
/* api responses */
api.interceptors.response.use(
  (response) => {
    return response
  },
  (err) => {
    return Promise.reject(err)
  },
)

export default api
