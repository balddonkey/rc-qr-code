
const RCStateCode = {
  common: {
    // 请求成功
    success: 0,
    accountExist: 3,
    // 参数错误
    paramError: 10,
    emptyData: 13,
    error: 99,
  },
}

const RCDomain = {
  network: 'com.rc.network.domain.network',

  common: 'com.rc.network.domain.common',

  login: 'com.rc.network.domain.login',
  register: 'com.rc.network.domain.register',

  appError: 'com.rc.network.domain.appError',
}

class RCError {
  /**
   * new 错误
   * @param {String} code 错误码
   * @param {String} domain 错误域
   * @param {String} msg 错误msg
   */
  constructor(code, domain, msg) {
    this.code = code;
    this.domain = domain;
    this.msg = msg;
  }
}

export {
  RCDomain,
  RCError,
}

export default RCStateCode;