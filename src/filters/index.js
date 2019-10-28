/**
 * @Description: 基础过滤器
 * @author liuwenhua@tianli.com
 * @date 2019-09-11
*/

/**
 * 格式化日期
 * @param t 日期，可接受时间戳或毫秒数
 * @param formater {String} 转换格式
 * @return {String} 时间戳
 * @author 刘文华
 * dateFormater('YYYY-MM-DD HH:mm', t) ==> 2019-06-26 18:30
 * dateFormater('YYYYMMDDHHmm', t) ==> 201906261830
 */
export const dateFormater = (formater, t) => {
  if (typeof t === 'string') {
    t = Number.parseInt(t)
  }
  let date = t ? new Date(t) : new Date(),
      Y = date.getFullYear() + '',
      M = date.getMonth() + 1,
      D = date.getDate(),
      H = date.getHours(),
      m = date.getMinutes(),
      s = date.getSeconds();
  return formater.replace(/YYYY|yyyy/g,Y)
      .replace(/YY|yy/g,Y.substr(2,2))
      .replace(/MM/g,(M<10?'0':'') + M)
      .replace(/DD/g,(D<10?'0':'') + D)
      .replace(/HH|hh/g,(H<10?'0':'') + H)
      .replace(/mm/g,(m<10?'0':'') + m)
      .replace(/ss/g,(s<10?'0':'') + s)
}

/**
 *将指定字符串由一种时间格式转化为另一种from的格式应对应str的位置
 * @param str
 * @param from
 * @param to
 * @returns {*}
 * dateStrForma('20190626', 'YYYYMMDD', 'YYYY年MM月DD日') ==> 2019年06月26日
 * dateStrForma('121220190626', '----YYYYMMDD', 'YYYY年MM月DD日') ==> 2019年06月26日
 * dateStrForma('2019年06月26日', 'YYYY年MM月DD日', 'YYYYMMDD') ==> 20190626
 */
export const dateStrForma = (str, from, to) => {
  str += ''
  let Y = ''
  if(~(Y = from.indexOf('YYYY'))){
    Y = str.substr(Y, 4)
    to = to.replace(/YYYY|yyyy/g,Y)
  }else if(~(Y = from.indexOf('YY'))){
    Y = str.substr(Y, 2)
    to = to.replace(/YY|yy/g,Y)
  }

  let k,i
  ['M','D','H','h','m','s'].forEach(s =>{
    i = from.indexOf(s+s)
    k = ~i ? str.substr(i, 2) : ''
    to = to.replace(s+s, k)
  })
  return to
}

/**
 * 金额转中文大写
 * @param money
 * @returns {string}
 */
export const convertCurrency = money => {
  // 汉字的数字
  let cnNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  // 基本单位
  let cnIntRadice = ['', '拾', '佰', '仟']
  // 对应整数部分扩展单位
  let cnIntUnits = ['', '万', '亿', '兆']
  // 对应小数部分单位
  let cnDecUnits = ['角', '分', '毫', '厘']
  // 整数金额时后面跟的字符
  let cnInteger = '整'
  // 整型完以后的单位
  let cnIntLast = '元'
  // 最大处理的数字
  let maxNum = 999999999999999.9999
  // 金额整数部分
  let integerNum
  // 金额小数部分
  let decimalNum
  // 输出的中文金额字符串
  let chineseStr = ''
  // 分离金额后用的数组，预定义
  let parts
  if (money === '') { return '' }
  money = parseFloat(money)
  if (money >= maxNum) {
    // 超出最大处理数字
    return ''
  }
  if (money === 0) {
    chineseStr = cnNums[0] + cnIntLast + cnInteger
    return chineseStr
  }
  // 转换为字符串
  money = money.toString()
  if (money.indexOf('.') === -1) {
    integerNum = money
    decimalNum = ''
  } else {
    parts = money.split('.')
    integerNum = parts[0]
    decimalNum = parts[1].substr(0, 4)
  }
  // 获取整型部分转换
  if (parseInt(integerNum, 10) > 0) {
    let zeroCount = 0
    let IntLen = integerNum.length
    for (let i = 0; i < IntLen; i++) {
      let n = integerNum.substr(i, 1)
      let p = IntLen - i - 1
      let q = p / 4
      let m = p % 4
      if (n === '0') {
        zeroCount++
      } else {
        if (zeroCount > 0) {
          chineseStr += cnNums[0]
        }
        // 归零
        zeroCount = 0
        chineseStr += cnNums[parseInt(n)] + cnIntRadice[m]
      }
      if (m === 0 && zeroCount < 4) {
        chineseStr += cnIntUnits[q]
      }
    }
    chineseStr += cnIntLast
  }
  // 小数部分
  if (decimalNum !== '') {
    let decLen = decimalNum.length
    for (let i = 0; i < decLen; i++) {
      let n = decimalNum.substr(i, 1)
      if (n !== '0') {
        chineseStr += cnNums[Number(n)] + cnDecUnits[i]
      }
    }
  }
  if (chineseStr === '') {
    chineseStr += cnNums[0] + cnIntLast + cnInteger
  } else if (decimalNum === '') {
    chineseStr += cnInteger
  }
  return chineseStr
}
