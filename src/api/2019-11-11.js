import request from './request-header.js'

// 领取优惠券
export const receiveCoupon = (data, headers = {}) => {
  return request('post', '/api/v1/coupon/receiveCoupon', data, headers)
}
