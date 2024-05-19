import requestaxios from '@/utils/requestaxios'
import type {
  UserListResponseData,
  UserOne,
  UserAEResposeForm,
  UserRoleListResponseData,
  UserRoleData
} from './type'

enum API {
  USER_URL = '/admin/acl/user/',
  USER_ADD = '/admin/acl/user/save',
  USER_EDIT = '/admin/acl/user/update',
  USER_DELETE = '/admin/acl/user/remove/',
  USER_DELETE_LIST = '/admin/acl/user/batchRemove',
  USER_ROLE_GET = '/admin/acl/user/toAssign/',
  USER_ROLE_CHANGE = '/admin/acl/user/doAssignRole'
}

export const reqUserList = (page: number, limit: number, username: string) =>
  requestaxios.get<any, UserListResponseData>(
    API.USER_URL + `${page}/${limit}/?username=${username}`
  )

export const reqUserAddOrEdit = (data: UserOne) => {
  if (data.id) {
    return requestaxios.put<any, UserAEResposeForm>(API.USER_EDIT, data)
  } else {
    return requestaxios.post<any, UserAEResposeForm>(API.USER_ADD, data)
  }
}

export const reqUserDeleteOne = (id: number) =>
  requestaxios.delete<any, UserAEResposeForm>(API.USER_DELETE + `${id}`)

export const reqUserDeleteList = (idList: number[]) =>
  requestaxios.delete<any, UserAEResposeForm>(API.USER_DELETE_LIST, { data: idList })

export const reqUserRoleList = (adminId: number) =>
  requestaxios.get<any, UserRoleListResponseData>(API.USER_ROLE_GET + `${adminId}`)

export const reqUserRoleChange = (data: UserRoleData) =>
  requestaxios.post<any, UserAEResposeForm>(API.USER_ROLE_CHANGE, data)
