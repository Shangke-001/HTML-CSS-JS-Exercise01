import components from '@/components'
import router from '.'

//常量路由
export const constantRoutes = [
  {
    //login登录
    path: '/login',
    name: 'login',
    //路由懒加载
    component: () => import('@/views/login/index.vue'),
    meta: {
      hidden: true,
      title: '登录'
    }
  },
  {
    //layout首页
    path: '/',
    name: 'layout',
    component: () => import('@/layout/index.vue'),
    meta: {
      hidden: false
    },
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          title: '首页',
          hidden: false,
          icon: 'HomeFilled'
        },
        component: () => import('@/views/home/index.vue')
      }
    ]
  },
  {
    //screen数字大屏
    path: '/screen',
    name: 'screen',
    meta: {
      title: '数字大屏',
      hidden: false,
      icon: 'Platform'
    },
    component: () => import('@/views/screen/index.vue')
  },
  {
    //404
    path: '/404',
    name: '404',
    meta: {
      title: '404',
      hidden: true,
      icon: 'User'
    },
    component: () => import('@/views/404/index.vue')
  }
]

export const asyncRoutes = [
  {
    //acl权限管理
    path: '/acl',
    name: 'Acl',
    meta: {
      title: '权限管理',
      hidden: false,
      icon: 'Lock'
    },
    component: () => import('@/layout/index.vue'),
    redirect: '/acl/user',
    children: [
      {
        path: '/acl/user',
        name: 'User',
        meta: {
          title: '用户管理',
          hidden: false,
          icon: 'User'
        },
        component: () => import('@/views/acl/user/index.vue')
      },
      {
        path: '/acl/role',
        name: 'Role',
        meta: {
          title: '角色管理',
          hidden: false,
          icon: 'Avatar'
        },
        component: () => import('@/views/acl/role/index.vue')
      },
      {
        path: '/acl/premission',
        name: 'Permission',
        meta: {
          title: '菜单管理',
          hidden: false,
          icon: 'List'
        },
        component: () => import('@/views/acl/premission/index.vue')
      }
    ]
  },
  {
    //product商品管理
    path: '/product',
    name: 'Product',
    meta: {
      title: '商品管理',
      hidden: false,
      icon: 'Goods'
    },
    component: () => import('@/layout/index.vue'),
    redirect: '/product/trademark',
    children: [
      {
        path: '/product/trademark',
        name: 'Trademark',
        meta: {
          title: '品牌管理',
          hidden: false,
          icon: 'ShoppingCart'
        },
        component: () => import('@/views/product/trademark/index.vue')
      },
      {
        path: '/product/attr',
        name: 'Attr',
        meta: {
          title: '属性管理',
          hidden: false,
          icon: 'Management'
        },
        component: () => import('@/views/product/attr/index.vue')
      },
      {
        path: '/product/spu',
        name: 'Spu',
        meta: {
          title: 'Spu管理',
          hidden: false,
          icon: 'Memo'
        },
        component: () => import('@/views/product/spu/index.vue')
      },
      {
        path: '/product/sku',
        name: 'Sku',
        meta: {
          title: 'Sku管理',
          hidden: false,
          icon: 'TrendCharts'
        },
        component: () => import('@/views/product/sku/index.vue')
      }
    ]
  }
]

export const anyRoutes = [
  {
    //other
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'any',
    meta: {
      title: '404',
      hidden: true
    }
  }
]

//asnycRoute动态路由, route用户的权限string[]
export function filterAsyncRoute(asnycRoute: any[], routes: string[]) {
  return asnycRoute.filter((route: any) => {
    if (routes.includes(route.name)) {
      if (route.children && route.children.length > 0) {
        route.children = filterAsyncRoute(route.children, routes)
      }
      return true
    }
  })
}

//注册路由
export const addAsyncAnyRoutes = (routes: any[]) => {
  routes.forEach((route) => {
    router.addRoute(route)
  })
}
