// @ts-ignore
/* eslint-disable */
import { request } from '@/services/request';

/** 此处后端没有提供注释 GET /api/v1/forum/category/list */
export async function getInfoListWithFilter(options?: { [key: string]: any }) {
  return request<API.ResponseBaseBaseResponseListCategoryInfo>('/api/v1/forum/category/list', {
    method: 'GET',
    ...(options || {}),
  });
}
