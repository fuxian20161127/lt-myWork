import { Cookie } from '../../utils/storage';

const userName = 'userName';
const token = 'token';

const user = {
  state: {
    name: Cookie.get(userName),
    token: Cookie.get(token),
  },
  mutations: {
    SET_USERINFO(state, info) {
      state.name = info.userName;
      state.token = info.token;
      Cookie.set(info);
    },
    CLEARINFO(state) {
      state.name = '';
      state.token = '';
      Cookie.remove({ userName: '' });
      Cookie.remove({ token: '' });
    },
  },
};

export default user;
