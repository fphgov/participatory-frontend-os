import axios from "axios"

axios.defaults.baseURL = process.env.REACT_APP_API_SERVER
axios.defaults.headers.common['Accept'] = 'application/json';

axios.interceptors.response.use(response => {
   return response
}, error => {
  if (error.response.status === 401) {
    localStorage.removeItem('auth_token')

    window.location.pathname = (process.env.REACT_APP_BASENAME + '/bejelentkezes').replace(/\/\//g, '/')
  }

  return Promise.reject(error)
})

export default axios
