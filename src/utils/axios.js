//axios的工具类。包括使用拦截器
import axios from 'axios'
// 创建axios实例
const service = axios.create({
//   baseURL: process.env.BASE_API, // api的base_url
  // baseURL: 'http://107.174.186.188:8098', // api的base_url
  baseURL: process.env.NODE_ENV === "production" ? "http://107.174.186.188:8098" : "http://localhost:8098", // api的base_url
  // baseURL: 'http://192.168.220.130:8098', // api的base_url
  // baseURL: 'http://5.188.37.126:8098', // api的base_url
  timeout: 15000 // 请求超时时间
})


export default service
