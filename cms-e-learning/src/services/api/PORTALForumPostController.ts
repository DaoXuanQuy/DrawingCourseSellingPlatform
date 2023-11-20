// @ts-ignore
/* eslint-disable */
import { request } from '@/services/request';

/** 此处后端没有提供注释 DELETE /api/v1/forum/post/${param0}/delete */
export async function deleteModel2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteModel2Params,
  body: API.DeletePostRequest,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseStatusResponse>(`/api/v1/forum/post/${param0}/delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/v1/forum/post/create */
export async function createModel2(body: API.CreatePostRequest, options?: { [key: string]: any }) {
  return request<API.ResponseBaseStatusResponse>('/api/v1/forum/post/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/v1/forum/post/list/page */
export async function getInfoListWithFilterPaging2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getInfoListWithFilterPaging2Params,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBasePageResponseDataPostInfo>('/api/v1/forum/post/list/page', {
    method: 'GET',
    params: {
      // size has a default value: 20
      size: '20',
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/v1/forum/post/update */
export async function updateModel2(body: API.UpdatePostRequest, options?: { [key: string]: any }) {
  return request<API.ResponseBaseStatusResponse>('/api/v1/forum/post/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
