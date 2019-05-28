import http from './public'
// 主页新闻列表
export const getNewsList = (params) => {
  return http.fetchGet('/news/list', params)
}

