import type { RouteRecordRaw } from 'vue-router'
export interface storeType {
  token: null | string
  menuRoutes: RouteRecordRaw[]
  userName: string
  userAvatar: string
}
