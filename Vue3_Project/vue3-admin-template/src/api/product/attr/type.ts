interface ResponseData {
  code: number
  message: string
  ok: boolean
}

export interface CategoryItem {
  id: number
  name: string
  category1Id?: number
  category2Id?: number
}

export interface CategoryResponseData extends ResponseData {
  data: CategoryItem[]
}

export interface AttrValue {
  id?: number
  valueName: string
  attrId?: number
  flag?: boolean //这个是啥
}
export type AttrValueList = AttrValue[]

export interface Attr {
  id?: number
  attrName: string
  categoryId: number | string
  categoryLevel: number
  attrValueList: AttrValueList
}

export type AttrList = Attr[]

export interface AttrResponseData extends ResponseData {
  data: AttrList
}

export interface AttrSaveOrDeleteResposeForm extends ResponseData {
  data: null
}
