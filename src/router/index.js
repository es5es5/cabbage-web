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
    // redirect: '/main',
    redirect: '/login',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    // beforeEnter: (to, from, next) => {
    //   if (Vue.cookie.get('auth-token') || Vue.cookie.get('Authorization-v2')) {
    //     next({ name: 'Main' })
    //   } else {
    //     next()
    //   }
    // }
  },
  {
    path: '/main',
    name: 'Main',
    redirect: 'main/strain',
    component: MainLayout,
    children: [
      {
        path: 'strain',
        name: '균주',
        redirect: 'strain/agriculture',
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
            component: () => import('@/templates/strain/StrainLayout'),
            children: [
              {
                path: 'list',
                name: '균주_농업균주관리_리스트',
                meta: {
                  title: '농업균주'
                },
                component: () => import('@/templates/strain/agriculture/AgricultureList')
              },
              {
                path: 'statics',
                name: '균주_농업균주관리_통계',
                meta: {
                  title: '농업균주'
                },
                component: () => import('@/templates/strain/agriculture/AgricultureStatics')
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
            component: () => import('@/templates/strain/StrainLayout'),
            children: [
              {
                path: 'list',
                name: '균주_수산업균주관리_리스트',
                meta: {
                  title: '수산업균주'
                },
                component: () => import('@/templates/strain/fisheries/FisheriesList')
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
            component: () => import('@/templates/strain/StrainLayout'),
            children: [
              {
                path: 'list',
                name: '균주_기타균주관리_리스트',
                meta: {
                  title: '기타균주'
                },
                component: () => import('@/templates/strain/extra/ExtraList')
              },
            ]
          },
        ]
      },
      {
        path: 'groceries',
        name: '식품',
        redirect: 'groceries/official',
        component: ContentsLayout,
        meta: {
          title: '고시형'
        },
        children: [
          {
            path: 'official',
            name: '식품_고시형',
            redirect: 'official/list',
            meta: {
              title: '고시형'
            },
            component: () => import('@/templates/groceries/GroceriesLayout'),
            children: [
              {
                path: 'list',
                name: '식품_고시형_리스트',
                meta: {
                  title: '고시형'
                },
                component: () => import('@/templates/groceries/official/OfficialList')
              },
            ]
          },
          {
            path: 'general',
            name: '식품_일반식품',
            redirect: 'general/list',
            meta: {
              title: '일반식품'
            },
            component: () => import('@/templates/groceries/GroceriesLayout'),
            children: [
              {
                path: 'list',
                name: '식품_일반식품_리스트',
                meta: {
                  title: '일반식품'
                },
                component: () => import('@/templates/groceries/general/GeneralList')
              },
            ]
          },
        ]
      },
      {
        path: 'manage',
        name: '관리',
        redirect: 'manage/microorganism',
        component: ContentsLayout,
        meta: {
          title: '관리'
        },
        children: [
          {
            path: 'microorganism',
            name: '관리_균종관리',
            redirect: 'microorganism/list',
            meta: {
              title: '균종 관리'
            },
            component: () => import('@/templates/manage/ManageLayout'),
            children: [
              {
                path: 'list',
                name: '관리_균종관리_리스트',
                meta: {
                  title: '균종 관리'
                },
                component: () => import('@/templates/manage/microorganism/MicroorganismList')
              },
            ]
          },
          {
            path: 'origin',
            name: '관리_Origin관리',
            redirect: 'origin/list',
            meta: {
              title: 'Origin 관리'
            },
            component: () => import('@/templates/manage/ManageLayout'),
            children: [
              {
                path: 'list',
                name: '관리_Origin관리_리스트',
                meta: {
                  title: 'Origin 관리'
                },
                component: () => import('@/templates/manage/origin/OriginList')
              },
            ]
          },
          {
            path: 'place',
            name: '관리_장소관리',
            redirect: 'place/list',
            meta: {
              title: '장소 관리'
            },
            component: () => import('@/templates/manage/ManageLayout'),
            children: [
              {
                path: 'list',
                name: '관리_장소관리_리스트',
                meta: {
                  title: '장소 관리'
                },
                component: () => import('@/templates/manage/place/PlaceList')
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
  document.title = `${to.meta.title} | 큐옴바이오` || '큐옴바이오'
  next()
})

export default router
