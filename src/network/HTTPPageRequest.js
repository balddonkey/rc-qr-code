import RCStateCode, { RCDomain, RCError } from "./RCStateCode";

class HTTPPageRequest {
  
  _pageIndex = 0;
  _pageSize = 10;
  _refresh;
  _loadMore;
  _hasMore = true;
  _dataExtractor;

  _init() {
    this._pageIndex = 0;
    this._pageSize = 10;
    this._hasMore = true;
  }

  /**
   * 分页请求
   * @param {Object} options Page request options
   * @param {Number} options.pageIndex 页码
   * @param {Number} options.pageSize 每页返回个数
   * @param {() => Promise} options.refresh 刷新，重新获取数据
   * @param {(res) => Array} options.dataExtractor 数据提取器
   * @param {(pageIndex: Number, pageSize: Number) => Promise} options.loadMore 获取下一页内容
   */
  constructor(options) {
    this._init();
    const { pageIndex = this._pageIndex, pageSize = this._pageSize } = options;
    if (!options.dataExtractor) {
      console.warn('必须提供dataExtractor方法，用于获取有效的结果数据，判断是否还有更多数据');
    }
    this._pageIndex = pageIndex;
    this._pageSize = pageSize;
    this._refresh = options.refresh;
    this._loadMore = options.loadMore;
    this._dataExtractor = options.dataExtractor;
  }

  refresh() {
    this._init();
    return this._refresh 
    ? this._refresh()
    .then(res => {
      const data = this._dataExtractor(res);
      return Promise.resolve(data);
    })
    : Promise.reject(RCError(RCStateCode.appError.loadConfigError, RCDomain.appError, 'Refresh方法未提供'));
  }

  loadMore() {
    if (!this._hasMore) {
      console.log('没有更多数据了')
      return Promise.resolve([]);
    }
    if (this._loadMore) {
      const pageIndex = this._pageIndex + 1;
      return this._loadMore(pageIndex, this._pageSize)
      .then(res => {
        const data = this._dataExtractor(res);
        this._pageIndex = pageIndex;
        if (data.length < this._pageSize) {
          this._hasMore = false;
        } else {
          this._pageIndex = pageIndex;
        }
        return Promise.resolve(data);
      });
    } else {
      return Promise.reject(RCError(RCStateCode.appError.loadConfigError, RCDomain.appError, 'load more方法未提供'));
    }
  }

}

export default HTTPPageRequest;