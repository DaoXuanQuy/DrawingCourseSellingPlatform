// @ts-ignore
/* eslint-disable */
import { request } from '@/services/request';

/** [Cms]Lấy thông tin card GET /api/statistic/cms/v1/getCardsInfo */
export async function cmsGetCardsInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.cmsGetCardsInfoParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseCmsGetCardsInfoResponse>('/api/statistic/cms/v1/getCardsInfo', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** [Cms]Lấy thông tin biểu đồ GET /api/statistic/cms/v1/getStatistic */
export async function cmsGetStatistic(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.cmsGetStatisticParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseCmsGetStatisticResponse>('/api/statistic/cms/v1/getStatistic', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** [Teacher]Lấy thông tin card GET /api/statistic/teacher/v1/getCardsInfo */
export async function teacherGetCardsInfo(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.teacherGetCardsInfoParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseTeacherGetCardsInfoResponse>(
    '/api/statistic/teacher/v1/getCardsInfo',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** [Teacher]Lấy thông tin biểu đồ GET /api/statistic/teacher/v1/getStatistic */
export async function teacherGetStatistic(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.teacherGetStatisticParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseTeacherGetStatisticResponse>(
    '/api/statistic/teacher/v1/getStatistic',
    {
      method: 'GET',
      params: {
        ...params,
      },
      ...(options || {}),
    },
  );
}
