import requestaxios from '@/utils/requestaxios'
import type { TradeMarkResponseForm, TradeMark, TradeMarkAEDResposeForm } from './type'

enum API {
  TRADEMARK_URL = '/admin/product/baseTrademark/',
  TRADEMARK_ADD = '/admin/product/baseTrademark/save',
  TRADEMARK_EDIT = '/admin/product/baseTrademark/update',
  TRADEMARK_DELETE = '/admin/product/baseTrademark/remove/'
}
export const reqTrademarkList = (page: number, limit: number) => {
  return requestaxios.get<any, TradeMarkResponseForm>(API.TRADEMARK_URL + `${page}/${limit}`)
}
export const reqAddOrEditTrademark = (data: TradeMark) => {
  if (data.id) {
    //有id表明是修改
    return requestaxios.put<any, TradeMarkAEDResposeForm>(API.TRADEMARK_EDIT, data)
  } else {
    //没有表明是新增
    return requestaxios.post<any, TradeMarkAEDResposeForm>(API.TRADEMARK_ADD, data)
  }
}
export const reqDeleteTrademark = (id: number) =>
  requestaxios.delete<any, TradeMarkAEDResposeForm>(API.TRADEMARK_DELETE + `${id}`)
