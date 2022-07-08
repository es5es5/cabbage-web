export const MENUS = [
  {
    name: '생물 자원',
    route: '생물자원',
    params: null,
    order: 0,
    icon: 'dna.svg',
    roles: [],
    subMenus: [
      {
        name: '뱅크',
        route: '생물자원_뱅크',
        params: null,
        order: 0,
        icon: null,
        roles: [],
        subMenus: null
      },
      {
        name: '입출입',
        route: 'NotFound',
        params: null,
        order: 0,
        icon: null,
        roles: [],
        subMenus: null
      },
    ]
  },
  {
    name: '연구',
    route: '연구',
    params: null,
    order: 0,
    icon: 'laboratory.svg',
    roles: [],
    subMenus: [
      {
        name: '연구 주제·목표',
        route: '연구_주제',
        params: null,
        order: 0,
        icon: null,
        roles: [],
        subMenus: null
      },
      {
        name: '국책사업',
        route: '연구_사업',
        params: null,
        order: 0,
        icon: null,
        roles: [],
        subMenus: null
      },
      {
        name: '자료',
        route: 'NotFound',
        params: null,
        order: 0,
        icon: null,
        roles: [],
        subMenus: null
      },
      {
        name: '장비·시약',
        route: 'NotFound',
        params: null,
        order: 0,
        icon: null,
        roles: [],
        subMenus: null
      },
    ]
  },
  {
    name: '일정',
    route: '일정',
    params: null,
    order: 0,
    icon: 'calendar.svg',
    roles: [],
    subMenus: [
      {
        name: '일정',
        route: '일정_일정',
        params: null,
        order: 0,
        icon: null,
        roles: [],
        subMenus: null
      },
    ]
  },
  {
    name: '관리',
    route: '관리',
    params: null,
    order: 0,
    icon: 'settings.svg',
    roles: [],
    subMenus: [
      {
        name: '속·종',
        route: '관리_속종',
        params: null,
        order: 0,
        icon: null,
        roles: [],
        subMenus: null
      },
      {
        name: '장소',
        route: '관리_장소',
        params: null,
        order: 0,
        icon: null,
        roles: [],
        subMenus: null
      },
      {
        name: 'Origin',
        route: '관리_Origin',
        params: null,
        order: 0,
        icon: null,
        roles: [],
        subMenus: null
      },
      {
        name: '사용자',
        route: '관리_사용자',
        params: null,
        order: 0,
        icon: null,
        roles: [],
        subMenus: null
      },
    ]
  },
]

export const OLD_MENUS = [
  {
    name: '균주',
    route: '균주',
    params: null,
    order: 0,
    icon: 'distribution.svg',
    roles: [],
    subMenus: [
      {
        name: '농업균주',
        route: '균주_농업균주관리',
        params: null,
        order: 0,
        icon: null,
        roles: [],
        subMenus: null
      },
      {
        name: '수산업균주',
        route: '균주_수산업균주관리',
        params: null,
        order: 0,
        icon: null,
        roles: [],
        subMenus: null
      },
      {
        name: '기타균주',
        route: '균주_기타균주관리',
        params: null,
        order: 0,
        icon: null,
        roles: [],
        subMenus: null
      },
    ]
  },
  {
    name: '식품',
    route: '식품',
    params: null,
    order: 0,
    icon: 'distribution.svg',
    roles: [],
    subMenus: [
      {
        name: '고시형',
        route: '식품_고시형',
        params: null,
        order: 0,
        icon: null,
        roles: [],
        subMenus: null
      },
      {
        name: '일반식품',
        route: '식품_일반식품',
        params: null,
        order: 0,
        icon: null,
        roles: [],
        subMenus: null
      },
    ]
  },
  {
    name: '관리',
    route: '관리',
    params: null,
    order: 0,
    icon: 'distribution.svg',
    roles: [],
    subMenus: [
      {
        name: '균종 관리',
        route: '관리_균종관리',
        params: null,
        order: 0,
        icon: null,
        roles: [],
        subMenus: null
      },
      {
        name: 'Origin 관리',
        route: '관리_Origin관리',
        params: null,
        order: 0,
        icon: null,
        roles: [],
        subMenus: null
      },
      {
        name: '장소 관리',
        route: '관리_장소관리',
        params: null,
        order: 0,
        icon: null,
        roles: [],
        subMenus: null
      },
    ]
  },
]

export default MENUS
