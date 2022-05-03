const MENUS = [
  {
    name: '균주',
    route: '균주',
    params: null,
    order: 0,
    icon: 'list-alt',
    roles: [],
    subMenus: [
      {
        name: '농업균주 관리',
        route: '균주_농업균주관리',
        params: null,
        order: 0,
        icon: null,
        roles: [],
        subMenus: null
      },
      {
        name: '수산업균주 관리',
        route: '균주_수산업균주관리',
        params: null,
        order: 0,
        icon: null,
        roles: [],
        subMenus: null
      },
      {
        name: '기타균주 관리',
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
    icon: 'list-alt',
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
  // {
  //   name: '농업',
  //   route: '농업',
  //   params: null,
  //   order: 0,
  //   icon: 'list-alt',
  //   roles: [],
  //   subMenus: [
  //     {
  //       name: '농업균주 관리',
  //       route: '농업_농업균주관리',
  //       params: null,
  //       order: 0,
  //       icon: null,
  //       roles: [],
  //       subMenus: null
  //     },
  //   ]
  // },
  // {
  //   name: '수산업',
  //   route: '수산업',
  //   params: null,
  //   order: 0,
  //   icon: 'list-alt',
  //   roles: [],
  //   subMenus: [
  //     {
  //       name: '수산업균주 관리',
  //       route: '수산업_수산업균주관리',
  //       params: null,
  //       order: 0,
  //       icon: null,
  //       roles: [],
  //       subMenus: null
  //     },
  //   ]
  // },
  {
    name: '관리',
    route: '관리',
    params: null,
    order: 0,
    icon: 'list-alt',
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
