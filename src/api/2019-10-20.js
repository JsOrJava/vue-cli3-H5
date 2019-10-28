import request from './request-header.js'

// 领取优惠券
export const receiveCoupon = (data, headers = {}) => {
  return request('post', '/api/v1/coupon/receiveCoupon', data, headers)
}

// 活动任务
export const missionAccomplished = ({type}, headers = {}) => {
  return request('get', `/api/v1.8/hibiscusTask/missionAccomplished?type=${type}`, {}, headers)
}

// 活动首页接口 1 是活动阶段
export const hibiscusIndex = (params = {}, headers = {}) => {
  return request('get', `/api/v1.8/hibiscusTask/hibiscusIndex`, {}, headers)
}

// 第一阶段任务页面 dailyTaskMap['1']活动次数 3次最多
export const oneHibiscusActivity = (params = {}, headers = {}) => {
  return request('get', `/api/v1.8/hibiscusTask/oneHibiscusActivity`, {}, headers)
}
