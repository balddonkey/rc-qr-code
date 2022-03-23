import axios from "axios";
import { UserManager } from "../models/user";
import HTTP, { HTTP1 } from "./HTTP";
import methods from "./methods";
import RCStateCode, { RCDomain, RCError } from "./RCStateCode";

class RCRequester {
  
  _NetworkErrorHandle = (e) => {
    console.log('request e:', e);
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
    },
    logout: () => {
      UserManager.saveUser(null);
    }
  }

  folder = {
    getAll: (data) => {
      const { userId } = data;
      return HTTP1.get({
        method: methods.getAllFolder,
        data: {
          page: 1,
          pagesize: 999,
          userId,
        }
      })
      .then(this._RequestPreprocess)
      .catch(this._NetworkErrorHandle);
    },
    getInfo: (data) => {
      const { id } = data;
      return HTTP1.get({
        method: methods.getFolderInfo,
        data: {
          id,
        }
      })
      .then(this._RequestPreprocess)
      .catch(this._NetworkErrorHandle);
    },
    new: (data) => {
      const { name, content, userId, parentId = 0, level } = data;
      return HTTP1.upload({
        method: methods.addFolder,
        data: {
          name, content, userId, parentId, lever: level
        }
      })
      .then(this._RequestPreprocess)
      .catch(this._NetworkErrorHandle);
    },
    getByParentId: (data) => {
      const { parentId, userId } = data;
      return HTTP1.get({
        method: methods.getFolderByParentId,
        data: {
          parentId, userId,
        }
      })
      .then(this._RequestPreprocess)
      .catch(this._NetworkErrorHandle);
    },
    uploadFiles: (data) => {
      const { parentId, userId, files } = data;
      return HTTP1.upload({
        method: methods.uploadFiles,
        data: {
          id: parentId, userId
        },
        files: { files: files }
      })
      .then(this._RequestPreprocess)
      .catch(this._NetworkErrorHandle);
    },
    downloadFile: (data) => {
      const { path, userId } = data;
      return HTTP1.get({
        method: methods.downloadFile,
        data: {
          path, userId, timestamp: Date.now().toString(),
        }
      })
      .then(this._RequestPreprocess)
      .catch(this._NetworkErrorHandle);
    }
  }

  download = (data, url) => {
    return HTTP1.download({data, url})
  }
  
}

const RCNetwork = new RCRequester();

export default RCNetwork;