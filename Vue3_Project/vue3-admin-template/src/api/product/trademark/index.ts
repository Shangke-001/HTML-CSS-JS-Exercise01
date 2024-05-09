import requestaxios from '@/utils/requestaxios'
import type { TradeMarkResponseData } from './type'

enum API {
  TRADEMARK_URL = '/admin/product/baseTrademark/'
}
export const reqTrademarkList = (page: number, limit: number) => {
  return requestaxios.get<any, TradeMarkResponseData>(API.TRADEMARK_URL + `${page}/${limit}`)
}
