// @ts-ignore
/* eslint-disable */
import { request } from '@/services/request';

/** 此处后端没有提供注释 GET /api/exam-result/teacher/v1/${param0} */
export async function getByExamId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getByExamIdParams,
  options?: { [key: string]: any },
) {
  const { examId: param0, ...queryParams } = params;
  return request<API.ResponseBaseGetExamResultByExamIdResponse>(
    `/api/exam-result/teacher/v1/${param0}`,
    {
      method: 'GET',
      params: {
        // size has a default value: 20
        size: '20',
        ...queryParams,
      },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 POST /api/exam-result/teacher/v1/create */
export async function createExam1(
  body: API.AddExamResultRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseAddExamResultResponse>('/api/exam-result/teacher/v1/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /api/exam-result/teacher/v1/delete/${param0} */
export async function deleteExam1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteExam1Params,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseStatusResponse>(`/api/exam-result/teacher/v1/delete/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/exam-result/teacher/v1/detail/${param0} */
export async function getDetailExamResult(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDetailExamResultParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseGetDetailExamResultResponse>(
    `/api/exam-result/teacher/v1/detail/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** Lấy danh sách bài kiểm tra chưa chấm điểm GET /api/exam-result/teacher/v1/get-ungraded-exams */
export async function getUngradedExams(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUngradedExamsParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseGetUngradedExamsResponse>(
    '/api/exam-result/teacher/v1/get-ungraded-exams',
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

/** 此处后端没有提供注释 PUT /api/exam-result/teacher/v1/update */
export async function updateExam1(
  body: API.UpdateExamResultRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseUpdateExamResultResponse>('/api/exam-result/teacher/v1/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/exam-result/v1/${param0} */
export async function getExamResult(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getExamResultParams,
  options?: { [key: string]: any },
) {
  const { examId: param0, ...queryParams } = params;
  return request<API.ResponseBaseGetDetailExamResultResponse>(`/api/exam-result/v1/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
