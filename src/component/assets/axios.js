import axios from "axios"

axios.interceptors.response.use(response => {
   return response
}, error => {
  if (error.response.status === 401) {
    localStorage.removeItem('auth_token')

    window.location.pathname = (process.env.REACT_APP_BASENAME + '/bejelentkezes').replace('/\/\//g', '/')
  }

  return Promise.reject(error)
})

export default axios
