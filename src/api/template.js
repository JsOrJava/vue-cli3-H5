import axios from './request'

// 获取用户信息
const fetchUserInfo = () => axios.get('/user')

// 登录
const login = data => axios.post('/sys/login', data)

export { fetchUserInfo, login }
