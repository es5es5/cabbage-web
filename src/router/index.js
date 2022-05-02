import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/Home'
import Login from '@/components/Login'
import MainLayout from '@/components/MainLayout'
import ContentsLayout from '@/components/ContentsLayout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/main',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (Vue.cookie.get('auth-token') || Vue.cookie.get('Authorization-v2')) {
        next({ name: 'Main' })
      } else {
        next()
      }
    }
  },
  {
    path: '/main',
    name: 'Main',
    redirect: 'main/microorganism',
    component: MainLayout,
    children: [
      {
        path: 'microorganism',
        name: '미생물',
        redirect: 'microorganism/channel',
        component: ContentsLayout,
        meta: {
          title: '미생물'
        },
        children: [
          {
            path: 'channel',
            name: '미생물_농업균주관리',
            redirect: 'channel/list',
            meta: {
              title: '농업균주'
            },
            component: () => import('@/templates/manage/ManageLayout'),
            children: [
              {
                path: 'list',
                name: '미생물_농업균주관리_리스트',
                meta: {
                  title: '농업균주 리스트'
                },
                component: () => import('@/templates/manage/channel/ChannelList')
              },
            ]
          },
        ]
      },
    ]
  }
]

const router = new VueRouter({
  mode: process.env.IS_ELECTRON ? 'hash' : 'history',
  linkActiveClass: 'active',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | 미생물 관리` || '미생물 관리'
  next()
})

export default router
