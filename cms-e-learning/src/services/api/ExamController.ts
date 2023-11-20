// @ts-ignore
/* eslint-disable */
import { request } from '@/services/request';

/** 此处后端没有提供注释 GET /api/exam/teacher/v1/byLesson */
export async function getExamByLesson(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getExamByLessonParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseGetExamByLessonResponse>('/api/exam/teacher/v1/byLesson', {
    method: 'GET',
    params: {
      // size has a default value: 20
      size: '20',
      ...params,
    },
    ...(options || {}),
  });
}

/** Tạo bài kiểm tra POST /api/exam/teacher/v1/create */
export async function createExam(body: API.AddExamRequest, options?: { [key: string]: any }) {
  return request<API.ResponseBaseExamResponse>('/api/exam/teacher/v1/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Xóa bài kiểm tra DELETE /api/exam/teacher/v1/delete/${param0} */
export async function deleteExam(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteExamParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseStatusResponse>(`/api/exam/teacher/v1/delete/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Cập nhật bài kiểm tra PUT /api/exam/teacher/v1/update */
export async function updateExam(body: API.UpdateExamRequest, options?: { [key: string]: any }) {
  return request<API.ResponseBaseExamResponse>('/api/exam/teacher/v1/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/exam/v1/byLesson */
export async function studentGetExamByLesson(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.studentGetExamByLessonParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseGetExamByLessonResponse>('/api/exam/v1/byLesson', {
    method: 'GET',
    params: {
      // size has a default value: 20
      size: '20',
      ...params,
    },
    ...(options || {}),
  });
}

/** Lấy chi tiết bài kiểm tra GET /api/exam/v1/detail/${param0} */
export async function getDetailExam(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDetailExamParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseExamResponse>(`/api/exam/v1/detail/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/exam/v1/teacher/detail/${param0} */
export async function teacherGetDetailExam(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.teacherGetDetailExamParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseExamResponse>(`/api/exam/v1/teacher/detail/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
