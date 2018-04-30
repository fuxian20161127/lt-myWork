import qs from 'qs';
import mock from './adapter';

import LoginUsers from '../data/user';

// 登录
mock.onPost('/auth/token').reply((config) => {
  const { accId, password } = qs.parse(config.data);
  return new Promise((resolve) => {
    let user = null;
    setTimeout(() => {
      const hasUser = LoginUsers.some((u) => {
        if (u.accId === accId && u.password === password) {
          user = JSON.parse(JSON.stringify(u));
          user.password = undefined;
        }
        return true;
      });
      if (hasUser) {
        resolve([200, {
          status: 1,
          msg: '请求成功',
          data: {
            user,
          },
        }]);
      } else {
        resolve([200, { code: 0, msg: '账号或密码错误' }]);
      }
    }, 1000);
  });
});
