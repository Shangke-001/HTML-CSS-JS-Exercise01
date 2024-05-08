import components from '@/components'

//常量路由
export const constantRoutes = [
  {
    path: '/login',
    name: 'login',
    //路由懒加载
    component: () => import('@/views/login/index.vue'),
    meta: {
      hidden: true
    }
  },
  {
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
    path: '/acl',
    name: 'acl',
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
        name: 'user',
        meta: {
          title: '用户管理',
          hidden: false,
          icon: 'User'
        },
        component: () => import('@/views/acl/user/index.vue')
      },
      {
        path: '/acl/role',
        name: 'role',
        meta: {
          title: '角色管理',
          hidden: false,
          icon: 'Avatar'
        },
        component: () => import('@/views/acl/role/index.vue')
      },
      {
        path: '/acl/premission',
        name: 'premission',
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
    path: '/product',
    name: 'product',
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
        name: 'trademark',
        meta: {
          title: '品牌管理',
          hidden: false,
          icon: 'ShoppingCart'
        },
        component: () => import('@/views/product/trademark/index.vue')
      },
      {
        path: '/product/attr',
        name: 'attr',
        meta: {
          title: '属性管理',
          hidden: false,
          icon: 'Management'
        },
        component: () => import('@/views/product/attr/index.vue')
      },
      {
        path: '/product/spu',
        name: 'spu',
        meta: {
          title: 'Spu管理',
          hidden: false,
          icon: 'Memo'
        },
        component: () => import('@/views/product/spu/index.vue')
      },
      {
        path: '/product/sku',
        name: 'sku',
        meta: {
          title: 'Sku管理',
          hidden: false,
          icon: 'TrendCharts'
        },
        component: () => import('@/views/product/sku/index.vue')
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    meta: {
      title: '404',
      hidden: true,
      icon: 'User'
    },
    component: () => import('@/views/404/index.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'any',
    meta: {
      hidden: true
    }
  }
]
