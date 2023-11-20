// @ts-ignore
/* eslint-disable */
import { request } from '@/services/request';

/** 此处后端没有提供注释 DELETE /api/v1/forum/topic/${param0}/delete */
export async function deleteModel(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteModelParams,
  body: API.DeleteTopicRequest,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseStatusResponse>(`/api/v1/forum/topic/${param0}/delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/v1/forum/topic/${param0}/detail */
export async function getDetailById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDetailByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseTopicInfo>(`/api/v1/forum/topic/${param0}/detail`, {
    method: 'GET',
    params: {
      ...queryParams,
      id: undefined,
      ...queryParams['id'],
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/v1/forum/topic/create */
export async function createModel(body: API.CreateTopicRequest, options?: { [key: string]: any }) {
  return request<API.ResponseBaseStatusResponse>('/api/v1/forum/topic/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/v1/forum/topic/list/page */
export async function getInfoListWithFilterPaging(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getInfoListWithFilterPagingParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBasePageResponseDataTopicInfo>('/api/v1/forum/topic/list/page', {
    method: 'GET',
    params: {
      // size has a default value: 20
      size: '20',
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/v1/forum/topic/update */
export async function updateModel(body: API.UpdateTopicRequest, options?: { [key: string]: any }) {
  return request<API.ResponseBaseStatusResponse>('/api/v1/forum/topic/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
