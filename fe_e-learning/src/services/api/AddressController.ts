// @ts-ignore
/* eslint-disable */
import { request } from '@/services/request';

/** Lấy tất cả tỉnh thành GET /api/address/public/v2/getAllProvinces */
export async function getAllProvincesV2(options?: { [key: string]: any }) {
  return request<API.ResponseBaseGetAllProvinceV2Response>(
    '/api/address/public/v2/getAllProvinces',
    {
      method: 'GET',
      ...(options || {}),
    },
  );
}

/** Lấy quận huyện theo tỉnh thành GET /api/address/public/v2/getDistrictsByProvince */
export async function getDistrictsByProvinceV2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDistrictsByProvinceV2Params,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseGetDistrictsByProvinceV2Response>(
    '/api/address/public/v2/getDistrictsByProvince',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** Lấy xã phường theo quận huyện GET /api/address/public/v2/getWardsByDistrict */
export async function getWardsByDistrictV2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getWardsByDistrictV2Params,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseGetWardsByDistrictV2Response>(
    '/api/address/public/v2/getWardsByDistrict',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** Hiển thị tất cả tỉnh thành, quận huyện, xã phường GET /api/address/v1/getAll */
export async function showAllDivisions(options?: { [key: string]: any }) {
  return request<API.ResponseBaseShowAllResponse>('/api/address/v1/getAll', {
    method: 'GET',
    ...(options || {}),
  });
}

/** Lấy tất cả tỉnh thành GET /api/address/v1/getAllProvinces */
export async function getAllProvinces(options?: { [key: string]: any }) {
  return request<API.ResponseBaseGetAllProvincesResponse>('/api/address/v1/getAllProvinces', {
    method: 'GET',
    ...(options || {}),
  });
}

/** Lấy quận huyện theo tỉnh thành GET /api/address/v1/getDistrictsByProvince */
export async function getDistrictsByProvince(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDistrictsByProvinceParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseGetDistrictsByProvinceResponse>(
    '/api/address/v1/getDistrictsByProvince',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** Lấy xã phường theo quận huyện GET /api/address/v1/getWardsByDistrict */
export async function getWardsByProvince(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getWardsByProvinceParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseGetWardsbyDistrictResponse>('/api/address/v1/getWardsByDistrict', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
