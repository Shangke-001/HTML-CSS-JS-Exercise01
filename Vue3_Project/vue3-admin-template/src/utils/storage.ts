//本地存储封装
export const TOKEN_GET = (tokenName: string) => {
  return localStorage.getItem(tokenName)
}
export const TOKEN_SET = (tokenName: string, tokenContent: string) => {
  localStorage.setItem(tokenName, tokenContent)
}
export const TOKEN_REMOVE = (tokenName: string) => {
  localStorage.removeItem(tokenName)
}
