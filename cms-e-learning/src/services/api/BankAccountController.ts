// @ts-ignore
/* eslint-disable */
import { request } from '@/services/request';

/** Kiểm tra tài khoản GET /api/bank-account/teacher/v1/check-account */
export async function checkBankAccount(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.checkBankAccountParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseCheckBankAccountResponse>(
    '/api/bank-account/teacher/v1/check-account',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** Lấy tài khoản liên kết GET /api/bank-account/teacher/v1/get */
export async function getLinkedAccount(options?: { [key: string]: any }) {
  return request<API.ResponseBaseLinkedAccountResponse>('/api/bank-account/teacher/v1/get', {
    method: 'GET',
    ...(options || {}),
  });
}

/** Link tài khoản PUT /api/bank-account/teacher/v1/link */
export async function linkBankAccount(
  body: API.LinkBankAccountRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseStatusResponse>('/api/bank-account/teacher/v1/link', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Hủy liên kết PUT /api/bank-account/teacher/v1/unlink */
export async function unlinkBankAccount(options?: { [key: string]: any }) {
  return request<API.ResponseBaseStatusResponse>('/api/bank-account/teacher/v1/unlink', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** Lấy tất cả danh sách ngân hàng - Lấy tất cả danh sách ngân hàng GET /api/bank-account/v1/getBanks */
export async function getAllBanks(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAllBanksParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseGetAllBanksResponse>('/api/bank-account/v1/getBanks', {
    method: 'GET',
    params: {
      // size has a default value: 20
      size: '20',
      ...params,
    },
    ...(options || {}),
  });
}
