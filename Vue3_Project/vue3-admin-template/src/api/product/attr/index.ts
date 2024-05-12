import requestaxios from '@/utils/requestaxios'
import type { CategoryResponseData, AttrResponseData, Attr } from './type'
enum API {
  ATTR_Category1 = '/admin/product/getCategory1',
  ATTR_Category2 = '/admin/product/getCategory2/',
  ATTR_Category3 = '/admin/product/getCategory3/',
  ATTR_URL = '/admin/product/attrInfoList/',
  ATTR_ADD_EDIT = '/admin/product/saveAttrInfo',
  ATTR_DELETE = '/admin/product/deleteAttr/'
}

export const reqCatrgory1 = () => requestaxios.get<any, CategoryResponseData>(API.ATTR_Category1)

export const reqCatrgory2 = (c1Id: number) =>
  requestaxios.get<any, CategoryResponseData>(API.ATTR_Category2 + `${c1Id}`)

export const reqCatrgory3 = (c2Id: number) =>
  requestaxios.get<any, CategoryResponseData>(API.ATTR_Category3 + `${c2Id}`)

export const reqAttrList = (c1Id: number | string, c2Id: number | string, c3Id: number | string) =>
  requestaxios.get<any, AttrResponseData>(API.ATTR_URL + `${c1Id}/${c2Id}/${c3Id}`)

export const reqAttrSave = (saveAttr: Attr) =>
  requestaxios.post<any, any>(API.ATTR_ADD_EDIT, saveAttr)

export const reqAttrDelete = (attrId: number) =>
  requestaxios.delete<any, any>(API.ATTR_DELETE + `${attrId}`)
