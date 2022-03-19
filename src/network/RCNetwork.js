import HTTP, { HTTP1 } from "./HTTP";
import methods from "./methods";
import RCStateCode, { RCDomain, RCError } from "./RCStateCode";

class RCRequester {
  
  _NetworkErrorHandle = (e) => {
    console.log('request e:', e);
    return;
    if (e instanceof RCError) {
      return Promise.reject(e);
    } else {
      const { errMsg } = e;
      return Promise.reject(new RCError(RCStateCode.common.networkError, RCDomain.network, errMsg || '网络错误'));
    }
  }

  _RequestPreprocess = (res) => {
    const data = res.data;
    const { code, msg } = data;
    console.log('Request res:', res);
    // 请求成功
    if (code === RCStateCode.common.success) {
      return Promise.resolve(data);
    }
    // 获取数据为空 
    else if (code === RCStateCode.common.emptyData) {
      return Promise.resolve({...res.data, data: null});
    }
    // 参数错误
    else if (code === RCStateCode.common.paramError) {
      const err = new RCError(code, RCDomain.common, msg);
      return Promise.reject(err);
    }
    // MARK: 账号已存在
    else if (code === RCStateCode.common.accountExist) {
      const err = new RCError(code, RCDomain.login, msg);
      return Promise.reject(err);
    }
    // 失败 
    else {
      const err = new RCError(code, RCDomain.common, msg)
      return Promise.reject(err);
    }
  }

  user = {
    register: (data) => {
      const { name, phone, password } = data;
      return HTTP1.post({
        method: methods.userRegister,
        data: {
          trueName: name,
          userName: phone,
          passWord: password,
        }
      })
      .then(this._RequestPreprocess)
      .catch(this._NetworkErrorHandle);
    },
    login: (data) => {
      const { phone, password } = data;
      return HTTP1.post({
        method: methods.userLogin,
        data: {
          userName: phone,
          passWord: password,
        }
      })
      .then(this._RequestPreprocess)
      .catch(this._NetworkErrorHandle);
    }
  }
  
}

const RCNetwork = new RCRequester();

export default RCNetwork;