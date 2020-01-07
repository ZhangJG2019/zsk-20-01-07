import http from './public'
// 基因搜索详情页
export const getContent = (params) => {
  return http.fetchPost('/apis/taskApi/getDetailContent', params)
}
