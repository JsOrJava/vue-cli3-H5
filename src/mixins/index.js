/**
 * @Description: 混入基础设施
 * @author liuwenhua@tianli.com
 * @date 2019-09-11
*/
export default {
    data () {
        return {

        }
    },

    methods: {
        /**
         * 获取Url参数，返回一个对象
         * @returns {any}
         * @private
         */
        _getUrlParam () {
            let url = document.location.toString()
            let arrObj = url.split("?")
            let params = Object.create(null)
            if (arrObj.length > 1){
                arrObj = arrObj[1].split("&")
                arrObj.forEach(item=>{
                    item = item.split("=")
                    params[item[0]] = item[1]
                })
            }
            return params
        },
        /**
         * 函数节流
         * @param method 需要节流的函数
         * @param delay  延时时间
         * @param duration 时间间隔
         * @returns {Function}
         * @private
         * @author 刘文华
         */
        /* eslint-disable */
        _throttle (method, delay = 300, duration = 500) {
            let timer = null
            let begin = new Date()
            return function () {
                let context = this
                let args = arguments
                let current = new Date()

                if (current.getTime() - begin.getTime() >= duration) {
                    method.apply(context, args)
                    begin = current
                } else {
                    timer = setTimeout(function () {
                        method.apply(context, args)
                    }, delay, duration)
                }
            }
        },
        /**
         * 识别各种浏览器及平台
         * @private
         */
        /* eslint-disable */
        _environments () {
            // 运行环境是浏览器
            let inBrowser = typeof window !== 'undefined'
            // 运行环境是微信
            let inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform
            let weexPlatform = inWeex && WXEnvironment.platform.toLowerCase()
            // 浏览器 UA 判断
            let UA = inBrowser && window.navigator.userAgent.toLowerCase()
            let isIE = UA && /msie|trident/.test(UA)
            let isIE9 = UA && UA.indexOf('msie 9.0') > 0
            let isEdge = UA && UA.indexOf('edge/') > 0
            let isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android')
            let isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios')
            // let isChrome = UA && /chrome/d+/.test(UA) && !isEdge
            return {
                inBrowser,
                weexPlatform,
                isIE,
                isIE9,
                isEdge,
                isAndroid,
                isIOS
            }
        }
    }
}
