// @ts-ignore
/* eslint-disable */
import { request } from '@/services/request';

/** [CMS]Lấy danh lịch sử rút tiền GET /api/invoice/cms/v1/get-all-withdraw-invoice */
export async function cmsGetAllWithdrawInvoice(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.cmsGetAllWithdrawInvoiceParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseGetAllWithdrawInvoiceResponse>(
    '/api/invoice/cms/v1/get-all-withdraw-invoice',
    {
      method: 'GET',
      params: {
        // size has a default value: 10
        size: '10',
        // sort has a default value: time,DESC
        sort: 'time,DESC',
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** [CMS]Lấy danh giao dịch GET /api/invoice/cms/v1/getAll */
export async function cmsGetAll(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.cmsGetAllParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseGetAllInvoiceResponse>('/api/invoice/cms/v1/getAll', {
    method: 'GET',
    params: {
      // size has a default value: 20
      size: '20',
      ...params,
    },
    ...(options || {}),
  });
}

/** Lấy danh sách giao dịch của học viên GET /api/invoice/getALl */
export async function getAll(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAllParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseGetAllInvoiceResponse>('/api/invoice/getALl', {
    method: 'GET',
    params: {
      // size has a default value: 20
      size: '20',
      ...params,
    },
    ...(options || {}),
  });
}

/** Notify VNPay transaction GET /api/invoice/public/v1/notify/vnpay */
export async function notifyVNPay(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.notifyVNPayParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseStatusResponse>('/api/invoice/public/v1/notify/vnpay', {
    method: 'GET',
    params: {
      ...params,
      request: undefined,
      ...params['request'],
    },
    ...(options || {}),
  });
}

/** Thông báo trạng thái hóa đơn POST /api/invoice/public/v1/notifyTransaction */
export async function notifyInvoice(
  body: API.EncryptedBodyRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseString>('/api/invoice/public/v1/notifyTransaction', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Lấy danh sách giao dịch của giảng viên GET /api/invoice/teacher/getALl */
export async function teacherGetAll(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.teacherGetAllParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseGetAllInvoiceResponse>('/api/invoice/teacher/getALl', {
    method: 'GET',
    params: {
      // size has a default value: 20
      size: '20',
      ...params,
    },
    ...(options || {}),
  });
}

/** [Teacher]Lấy danh lịch sử rút tiền GET /api/invoice/teacher/v1/get-all-withdraw-invoice */
export async function teacherGetAllWithdrawInvoice(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.teacherGetAllWithdrawInvoiceParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseGetAllWithdrawInvoiceResponse>(
    '/api/invoice/teacher/v1/get-all-withdraw-invoice',
    {
      method: 'GET',
      params: {
        // size has a default value: 10
        size: '10',
        // sort has a default value: time,DESC
        sort: 'time,DESC',
        ...params,
      },
      ...(options || {}),
    },
  );
}
