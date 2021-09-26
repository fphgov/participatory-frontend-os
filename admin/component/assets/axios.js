import axios from "axios"

axios.defaults.baseURL = process.env.REACT_APP_API_ADMIN_SERVER
axios.defaults.headers.common[ 'Accept' ] = 'application/json';

axios.interceptors.response.use(response => {
   return response
}, error => {
  if (error.response && error.response.status === 401) {
    localStorage.removeItem('auth_admin_token')
    localStorage.removeItem('role')

    window.location.hash = '#/login'
  }

  return Promise.reject(error)
})

export default axios
