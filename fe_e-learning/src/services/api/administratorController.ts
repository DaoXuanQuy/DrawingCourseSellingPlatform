// @ts-ignore
/* eslint-disable */
import { request } from '@/services/request';

/** 此处后端没有提供注释 PUT /api/admin/v1/ban */
export async function banAdmin(body: API.BanAdminRequest, options?: { [key: string]: any }) {
  return request<API.ResponseBaseStatusResponse>('/api/admin/v1/ban', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/admin/v1/create */
export async function createAdmin(body: API.CreateAdminRequest, options?: { [key: string]: any }) {
  return request<API.ResponseBaseCreateAdminResponse>('/api/admin/v1/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/admin/v1/getInfo */
export async function getInfoAdmin(options?: { [key: string]: any }) {
  return request<API.ResponseBaseGetInfoAdminResponse>('/api/admin/v1/getInfo', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/admin/v1/getInfo/${param0} */
export async function getInfoAdminById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getInfoAdminByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseGetInfoAdminResponse>(`/api/admin/v1/getInfo/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/admin/v1/getList */
export async function getListAdministrator(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getListAdministratorParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBasePageResponseDataAdministratorDto>('/api/admin/v1/getList', {
    method: 'GET',
    params: {
      // size has a default value: 20
      size: '20',
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/admin/v1/resetPassword */
export async function resetPasswordAdmin(
  body: API.ResetPasswordAdminRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseStatusResponse>('/api/admin/v1/resetPassword', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/admin/v1/unban */
export async function unbanAdmin(body: API.UnbanAdminRequest, options?: { [key: string]: any }) {
  return request<API.ResponseBaseStatusResponse>('/api/admin/v1/unban', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/admin/v1/updateInfo */
export async function updateInfoAdmin(
  body: API.UpdateInfoAdminRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseUpdateInfoAdminResponse>('/api/admin/v1/updateInfo', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
