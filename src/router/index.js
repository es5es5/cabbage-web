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
        name: '균주',
        redirect: 'microorganism/agriculture',
        component: ContentsLayout,
        meta: {
          title: '균주'
        },
        children: [
          {
            path: 'agriculture',
            name: '균주_농업균주관리',
            redirect: 'agriculture/list',
            meta: {
              title: '농업균주'
            },
            component: () => import('@/templates/microorganism/MicroorganismLayout'),
            children: [
              {
                path: 'list',
                name: '균주_농업균주관리_리스트',
                meta: {
                  title: '농업균주 리스트'
                },
                component: () => import('@/templates/microorganism/agriculture/AgricultureList')
              },
            ]
          },
          {
            path: 'fisheries',
            name: '균주_수산업균주관리',
            redirect: 'fisheries/list',
            meta: {
              title: '수산업균주'
            },
            component: () => import('@/templates/microorganism/MicroorganismLayout'),
            children: [
              {
                path: 'list',
                name: '균주_수산업균주관리_리스트',
                meta: {
                  title: '수산업균주 리스트'
                },
                component: () => import('@/templates/microorganism/fisheries/FisheriesList')
              },
            ]
          },
          {
            path: 'extra',
            name: '균주_기타균주관리',
            redirect: 'extra/list',
            meta: {
              title: '기타균주'
            },
            component: () => import('@/templates/microorganism/MicroorganismLayout'),
            children: [
              {
                path: 'list',
                name: '균주_기타균주관리_리스트',
                meta: {
                  title: '기타균주 리스트'
                },
                component: () => import('@/templates/microorganism/extra/ExtraList')
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
