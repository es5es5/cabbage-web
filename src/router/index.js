import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/Home'
import Login from '@/components/Login'
import NotFound from '@/components/NotFound'
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
    meta: {
      title: '로그인'
    }
    // beforeEnter: (to, from, next) => {
    //   if (Vue.cookie.get('auth-token') || Vue.cookie.get('Authorization-v2')) {
    //     next({ name: 'Main' })
    //   } else {
    //     next()
    //   }
    // }
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFound,
    meta: {
      title: '페이지를 찾을 수 없습니다.'
    }
  },
  {
    path: '/main',
    name: 'Main',
    redirect: 'main/resources',
    component: MainLayout,
    children: [
      {
        path: 'resources',
        name: '생물자원',
        redirect: 'resources/bank',
        component: ContentsLayout,
        meta: {
          title: '생물 자원'
        },
        children: [
          {
            path: 'bank',
            name: '생물자원_뱅크',
            redirect: 'bank/list',
            meta: {
              title: '뱅크'
            },
            component: () => import('@/templates/resources/bank/ResourcesBankLayout'),
            children: [
              {
                path: 'list',
                name: '생물자원_뱅크_리스트',
                meta: {
                  title: '뱅크'
                },
                component: () => import('@/templates/resources/bank/BankList')
              },
              {
                path: 'statics',
                name: '생물자원_뱅크_통계',
                meta: {
                  title: '농업균주'
                },
                component: () => import('@/templates/strain/agriculture/AgricultureStatics')
              },
            ]
          },
        ]
      },
      {
        path: 'study',
        name: '연구',
        redirect: 'study/topic',
        component: ContentsLayout,
        meta: {
          title: '연구'
        },
        children: [
          {
            path: 'topic',
            name: '연구_주제',
            redirect: 'topic/list',
            meta: {
              title: '주제'
            },
            component: () => import('@/templates/study/StudyLayout'),
            children: [
              {
                path: 'list',
                name: '연구_주제_리스트',
                meta: {
                  title: '주제'
                },
                component: () => import('@/templates/study/topic/TopicList')
              },
            ]
          },
          {
            path: 'business',
            name: '연구_사업',
            redirect: 'business/list',
            meta: {
              title: '국책사업'
            },
            component: () => import('@/templates/study/StudyLayout'),
            children: [
              {
                path: 'list',
                name: '연구_사업_리스트',
                meta: {
                  title: '국책사업'
                },
                component: () => import('@/templates/study/business/BusinessList')
              },
            ]
          },
        ]
      },
      {
        path: 'schedule',
        name: '일정',
        redirect: 'schedule/schedule',
        component: ContentsLayout,
        meta: {
          title: '일정'
        },
        children: [
          {
            path: 'schedule',
            name: '일정_일정',
            redirect: 'schedule/list',
            meta: {
              title: '일정'
            },
            component: () => import('@/templates/schedule/ScheduleLayout'),
            children: [
              {
                path: 'list',
                name: '일정_일정_리스트',
                meta: {
                  title: '일정'
                },
                component: () => import('@/templates/schedule/schedule/ScheduleList')
              },
            ]
          },
        ]
      },
      {
        path: 'settings',
        name: '관리',
        redirect: 'settings/genus',
        component: ContentsLayout,
        meta: {
          title: '관리'
        },
        children: [
          {
            path: 'genus',
            name: '관리_속종',
            redirect: 'genus/list',
            meta: {
              title: '속·종'
            },
            component: () => import('@/templates/settings/SettingsLayout'),
            children: [
              {
                path: 'list',
                name: '생물자원_속종_리스트',
                meta: {
                  title: '속·종'
                },
                component: () => import('@/templates/settings/genus/GenusList')
              },
            ]
          },
          {
            path: 'placement',
            name: '관리_장소',
            redirect: 'placement/list',
            meta: {
              title: '장소'
            },
            component: () => import('@/templates/settings/SettingsLayout'),
            children: [
              {
                path: 'list',
                name: '생물자원_장소_리스트',
                meta: {
                  title: '장소'
                },
                component: () => import('@/templates/settings/placement/PlacementList')
              },
            ]
          },
          {
            path: 'origin',
            name: '관리_Origin',
            redirect: 'origin/list',
            meta: {
              title: 'Origin'
            },
            component: () => import('@/templates/settings/SettingsLayout'),
            children: [
              {
                path: 'list',
                name: '생물자원_Origin_리스트',
                meta: {
                  title: 'Origin'
                },
                component: () => import('@/templates/settings/origin/OriginList')
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
  document.title = `${to.meta.title} | 캐비지` || '캐비지'
  next()
})

export default router
