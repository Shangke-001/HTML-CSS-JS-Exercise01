interface ResponseData {
  code: number
  message: string
  ok: boolean
}
export interface UserOne {
  id?: number
  createTime?: string
  updateTime?: string
  username: string
  password: string
  name: string
  phone?: null | string
  roleName?: string
}
export type UserList = UserOne[]
export interface UserListResponseData extends ResponseData {
  data: {
    records: UserList
    total: number
  }
}
export interface UserAEResposeForm extends ResponseData {
  data: {} | null
}

export interface UserRole {
  id?: number
  createTime?: string
  updateTime?: string
  roleName: string
  remark: null | string
}
export type UserRoleList = UserRole[]
export interface UserRoleListResponseData extends ResponseData {
  data: {
    assignRoles: UserRoleList
    allRolesList: UserRoleList
  }
}
export interface UserRoleData {
  userId: number | string
  roleIdList: number[]
}
