
import axios from 'axios'

const baseUrl = 'http://upload.rcdqiot.com:8080/';
const url = 'upload/file/uploads';

const Netutil = {
  upload: (options) => {
    const { file } = options;
    let formdata = new FormData();
    formdata.append('file', file);
    return axios.post(url, formdata, {
      baseURL: baseUrl,
      // transformRequest: [
      //   (d) => {``
      //     return d;
      //   }
      // ]
    })
    .then(res => {
      // console.log('upload succ:', res);
      const { data } = res;
      return Promise.resolve(data);
    })
  }
}

export {
  baseUrl
}

export default Netutil;