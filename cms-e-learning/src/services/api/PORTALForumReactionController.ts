// @ts-ignore
/* eslint-disable */
import { request } from '@/services/request';

/** 此处后端没有提供注释 DELETE /api/v1/forum/reaction/${param0}/delete */
export async function deleteModel1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteModel1Params,
  body: API.DeleteReactionRequest,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseStatusResponse>(`/api/v1/forum/reaction/${param0}/delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/v1/forum/reaction/create */
export async function createModel1(
  body: API.CreateReactionRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseStatusResponse>('/api/v1/forum/reaction/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/v1/forum/reaction/list/page */
export async function getInfoListWithFilterPaging1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getInfoListWithFilterPaging1Params,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBasePageResponseDataReactionInfo>('/api/v1/forum/reaction/list/page', {
    method: 'GET',
    params: {
      // size has a default value: 20
      size: '20',
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/v1/forum/reaction/update */
export async function updateModel1(
  body: API.UpdateReactionRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseStatusResponse>('/api/v1/forum/reaction/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
