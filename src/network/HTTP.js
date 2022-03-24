import HTTPBase from "./HTTPBase";

// const baseUrl1 = 'http://192.168.0.30:8080/upload.api';
const baseUrl1 = 'http://upload.rcdqiot.com:8080/upload.api';

const baseUrl2 = 'http://192.168.0.222/img';

const HTTP1 = new HTTPBase(baseUrl1);
const HTTPAssets = new HTTPBase(baseUrl2);

export {
  HTTP1,
  HTTPAssets,
};

export default {
  HTTP1,
  HTTPAssets,
};