// @ts-ignore
/* eslint-disable */
import { request } from '@/services/request';

/** 此处后端没有提供注释 DELETE /api/v1/cms/forum/category/${param0}/delete */
export async function deleteModel3(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteModel3Params,
  body: API.DeleteCategoryRequest,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseStatusResponse>(`/api/v1/cms/forum/category/${param0}/delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/v1/cms/forum/category/${param0}/detail */
export async function getDetailById1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDetailById1Params,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseCategoryDetail>(`/api/v1/cms/forum/category/${param0}/detail`, {
    method: 'GET',
    params: {
      ...queryParams,
      id: undefined,
      ...queryParams['id'],
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/v1/cms/forum/category/create */
export async function createModel3(
  body: API.CreateCategoryRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseStatusResponse>('/api/v1/cms/forum/category/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/v1/cms/forum/category/list/page/detail */
export async function getDetailWithFilterPaging(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDetailWithFilterPagingParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBasePageResponseDataCategoryDetail>(
    '/api/v1/cms/forum/category/list/page/detail',
    {
      method: 'GET',
      params: {
        // size has a default value: 20
        size: '20',
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 PUT /api/v1/cms/forum/category/update */
export async function updateModel3(
  body: API.UpdateCategoryRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseStatusResponse>('/api/v1/cms/forum/category/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
