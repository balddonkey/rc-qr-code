
const _UserLocalStorageKey = 'com.rc.localStorageKey.user';

/**
 * @typedef {Object} User 用户model
 * @property {String} User.name 用户name
 * @property {String} User.id 用户id
 * @property {String} User.account 用户账号
 * @property {String} User.token 用户login token
 */

const UserManager = {
  /**
   * @returns {User?} 获取登录用户信息
   */
  getUser: () => {
    const userStr = window.localStorage.getItem(_UserLocalStorageKey);
    // console.log('get user:', userStr);
    let user = null;
    try {
      user = JSON.parse(userStr);
    } catch (error) {
      user = null;
    }
    return user;
  },
  /**
   * 保存用户信息
   * @param {User} user 用户
   */
  saveUser: (user) => {
    // console.log('save user:', user);
    window.localStorage.setItem(_UserLocalStorageKey, JSON.stringify(user));
  }
}

export {
  UserManager,
}