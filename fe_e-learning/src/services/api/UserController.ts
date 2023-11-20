// @ts-ignore
/* eslint-disable */
import { request } from '@/services/request';

/** 此处后端没有提供注释 DELETE /api/user/cms/v1/${param0} */
export async function deleteUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteUserParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseStatusResponse>(`/api/user/cms/v1/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/user/cms/v1/ban/${param0} */
export async function banUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.banUserParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseCmsBanUserResponse>(`/api/user/cms/v1/ban/${param0}`, {
    method: 'PUT',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** [CMS]Lấy danh sách người dùng GET /api/user/cms/v1/getAll */
export async function getALl(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getALlParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseCmsGetAllUserResponse>('/api/user/cms/v1/getAll', {
    method: 'GET',
    params: {
      // size has a default value: 20
      size: '20',
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/user/cms/v1/info/${param0} */
export async function getInfoById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getInfoByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseGetInfoResponse>(`/api/user/cms/v1/info/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/user/cms/v1/unban/${param0} */
export async function unbanUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.unbanUserParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseStatusResponse>(`/api/user/cms/v1/unban/${param0}`, {
    method: 'PUT',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/user/cms/v1/update/${param0} */
export async function updateInfoById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateInfoByIdParams,
  body: API.CmsUpdateInfoByIdRequest,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseUpdateInfoResponse>(`/api/user/cms/v1/update/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/user/cms/v1/users */
export async function getUsers(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUsersParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseGetUsersResponse>('/api/user/cms/v1/users', {
    method: 'GET',
    params: {
      // size has a default value: 20
      size: '20',
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /api/user/cms/v2/${param0} */
export async function deleteUserV2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteUserV2Params,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseStatusResponse>(`/api/user/cms/v2/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/user/portal/v1/ekyc-info */
export async function getEkycInfo(options?: { [key: string]: any }) {
  return request<API.ResponseBaseGetEkycInfoResponse>('/api/user/portal/v1/ekyc-info', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/user/portal/v1/info */
export async function getInfo(options?: { [key: string]: any }) {
  return request<API.ResponseBaseUserResponse>('/api/user/portal/v1/info', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/user/v1/password/change */
export async function changePassword(
  body: API.ChangePasswordRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseChangePasswordResponse>('/api/user/v1/password/change', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/user/v1/update */
export async function updateInfo(body: API.UpdateInfoRequest, options?: { [key: string]: any }) {
  return request<API.ResponseBaseUserResponse>('/api/user/v1/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
