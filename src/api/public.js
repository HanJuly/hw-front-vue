/**
 * 参考：https://www.kancloud.cn/yunye/axios/234846
 */
import axios from 'axios'
axios.defaults.timeout = 10000
axios.defaults.baseURL = 'http://localhost:6503/news-service'
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
export default {
  fetchGet (url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.get(url, params).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  fetchPost (url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.post(url, params).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
