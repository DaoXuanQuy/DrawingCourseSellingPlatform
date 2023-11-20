// @ts-ignore
/* eslint-disable */
import { request } from '@/services/request';

/** 此处后端没有提供注释 POST /api/teacher/cms/v1/approveRequestRoleTeacher */
export async function approveRequestRoleTeacher(
  body: API.ApproveRequestRoleTeacherRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseStatusResponse>('/api/teacher/cms/v1/approveRequestRoleTeacher', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/teacher/cms/v1/getDetail */
export async function getDetail(
  body: API.GetDetailTeacherByIdRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseGetInfoTeacherResponse>('/api/teacher/cms/v1/getDetail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/teacher/cms/v1/listRequestRoleTeacher */
export async function getListRequestRoleTeacher(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getListRequestRoleTeacherParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBasePageResponseDataTeacherDto>(
    '/api/teacher/cms/v1/listRequestRoleTeacher',
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

/** 此处后端没有提供注释 PUT /api/teacher/cms/v1/rejectRequestRoleTeacher */
export async function rejectRequestRoleTeacher(
  body: API.RejectRequestRoleTeacherRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseStatusResponse>('/api/teacher/cms/v1/rejectRequestRoleTeacher', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/teacher/portal/v1/createRequestRoleTeacher */
export async function createRequestRoleTeacher(
  body: API.CreateRequestRoleTeacherRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseCreateRequestRoleTeacherResponse>(
    '/api/teacher/portal/v1/createRequestRoleTeacher',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 GET /api/teacher/protal/v1/getInfo */
export async function getTeacherInfo(options?: { [key: string]: any }) {
  return request<API.ResponseBaseGetInfoTeacherResponse>('/api/teacher/protal/v1/getInfo', {
    method: 'GET',
    ...(options || {}),
  });
}

/** Lấy số dư GET /api/teacher/teacher/v1/get-balance */
export async function getBalance(options?: { [key: string]: any }) {
  return request<API.ResponseBaseTeacherGetBalanceResponse>('/api/teacher/teacher/v1/get-balance', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/teacher/teacher/v1/getInfo */
export async function getInfo1(options?: { [key: string]: any }) {
  return request<API.ResponseBaseGetInfoTeacherResponse>('/api/teacher/teacher/v1/getInfo', {
    method: 'GET',
    ...(options || {}),
  });
}

/** Rút tiền POST /api/teacher/teacher/v1/withdraw */
export async function withDraw(body: API.WithDrawRequest, options?: { [key: string]: any }) {
  return request<API.ResponseBaseWithdrawResponse>('/api/teacher/teacher/v1/withdraw', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
