import Vue from 'vue';
import Router from 'vue-router';

import store from '../store';

const Login = () =>
  import('../views/Login');
const NotFound = () =>
  import('../views/404');
const Home = () =>
  import('../views/Home');
const DashboardEdit = () =>
   import('../views/page/DashboardEdit2');


Vue.use(Router);

const routes = [{
  path: '/',
  component: Home,
  redirect: '/login',
  children: [{
    path: '/DashboardEdit',
    component: DashboardEdit,
    title: '编辑',
  }],
},
{
  path: '/login',
  component: Login,
},
{
  path: '/404',
  component: NotFound,
},
{
  path: '*',
  redirect: {
    path: '/404',
  },
},
];

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition;
  }
  const position = {};
  if (to.hash) {
    position.selector = to.hash;
  } else {
    position.x = 0;
    position.y = 0;
  }
  return position;
};

const router = new Router({
  routes,
  scrollBehavior,
});

const whiteList = ['/login']; // 白名单
router.beforeEach((to, from, next) => {
  const {
    token,
  } = store.getters;
  if (!token) {
    if (whiteList.indexOf(to.path) >= 0) { // 是否在白名单内,不在的话直接跳转登录页
      next();
    } else {
      next({
        path: '/login',
      });
    }
  } else {
    next();
  }
});

export default router;
