
/**
 * @typedef {Object} HTTPRequestOptionType
 * @property {String?} baseUrl base url
 * @property {String} method 方法
 * @property {Object?} data 请求参数体
 * @property {Object?} cookie 
 */
/**
 * @typedef {Object} HTTPRequestUploadOptionType
 * @property {String?} baseUrl base url
 * @property {String} method 方法
 * @property {Object?} data 请求参数体
 * @property {String?} filePath 文件地址
 * @property {Object} formdata 附加的数据
 */

import axios from "axios";

/**
 * HTTP 请求类
 */
class HTTPBase {

  /**
   * @type {String} base url
   */
  baseUrl;

  constructor(url) {
    this.baseUrl = url;
  }

  _preprocessResponse(res) {
    
  }

  download(options) {
    const { data, url } = options;
    return axios({
      method: 'POST',
      url: url,
      data: data,
      // headers: header,
      responseType: 'blob',
    })
  }

  /**
   * GET请求
   * @param {HTTPRequestOptionType} options 参数选项
   * @returns {Promise} request promise
   */
  get(options) {
    const { method, data, baseUrl } = options;
    console.log('on get request:', options);
    return new Promise((resolve, reject) => {
      axios.get(`${baseUrl || this.baseUrl}${method}`, {
        params: data,
        // headers: header,
      })
      .then(res => {
        this._preprocessResponse(res);
        resolve(res);
      })
      .catch(reject);
    })
  }

  /**
   * POST 请求
   * @param {HTTPRequestOptionType} options 参数选项
   * @returns {Promise} request promise
   */
  post(options) {
    const { method, data = {}, baseUrl = this.baseUrl } = options;
    let url = `${baseUrl}${method}`;
    console.log(`POST: ${url}`)
    console.log(JSON.stringify(data));
    return new Promise((resolve, reject) => {
      axios.post(url, data)
      .then(res => {
        this._preprocessResponse(res);
        resolve(res);
      })
      .catch(reject);
    })
  }

  /**
   * POST 请求
   * @param {HTTPRequestUploadOptionType} options 参数选项
   * @returns {Promise} request promise
   */
  upload(options) {
    const { method, data = {}, files, baseUrl = this.baseUrl } = options;
    let url = `${baseUrl}${method}`;
    let formdata = new FormData();
    for (const k in data) {
      if (Object.hasOwnProperty.call(data, k)) {
        const v = data[k];
        formdata.append(k, v);
      }
    }
    for (const k in files) {
      if (Object.hasOwnProperty.call(files, k)) {
        const v = files[k];
        if (v instanceof Array) {
          v.forEach(vv => {
            formdata.append(k, vv);
          });
        } else {
          formdata.append(k, v);
        }
      }
    }
    return axios.post(url, formdata, {
      baseURL: baseUrl,
    })
    .then(res => {
      console.log('upload succ:', res);
      return Promise.resolve(res);
    })
  }
}

export default HTTPBase;