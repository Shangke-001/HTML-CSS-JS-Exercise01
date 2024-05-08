export const getGeneralTime = () => {
  let generalTime = ''
  const nowTime = new Date().getHours()
  if (nowTime < 11) {
    generalTime = '上午'
  } else if (nowTime < 13) {
    generalTime = '中午'
  } else if (nowTime < 17) {
    generalTime = '下午'
  } else {
    generalTime = '晚上'
  }
  return generalTime
}
