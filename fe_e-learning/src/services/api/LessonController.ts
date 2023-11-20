// @ts-ignore
/* eslint-disable */
import { request } from '@/services/request';

/** [Teacher]Lấy tất cả bài học theo khóa học GET /api/lesson/teacher/v1/course/${param0} */
export async function getLessonsByCourse(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getLessonsByCourseParams,
  options?: { [key: string]: any },
) {
  const { courseId: param0, ...queryParams } = params;
  return request<API.ResponseBaseGetLessonByCourseResponse>(
    `/api/lesson/teacher/v1/course/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** Tạo một bài học POST /api/lesson/teacher/v1/create */
export async function createLesson(
  body: API.CreateLessonRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseLessonResponse>('/api/lesson/teacher/v1/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Xóa bài học DELETE /api/lesson/teacher/v1/delete/${param0} */
export async function deleteLesson(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteLessonParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseStatusResponse>(`/api/lesson/teacher/v1/delete/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Ẩn/hiện bài học PUT /api/lesson/teacher/v1/display */
export async function displayLesson(
  body: API.DisplayLessonRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseStatusResponse>('/api/lesson/teacher/v1/display', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Chỉnh sửa bài học PUT /api/lesson/teacher/v1/update */
export async function updateLesson(
  body: API.UpdateLessonRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseLessonResponse>('/api/lesson/teacher/v1/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** [Student]Lấy tất cả bài học theo khóa học GET /api/lesson/v1/course/${param0} */
export async function studentGetLessonsByCourse(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.studentGetLessonsByCourseParams,
  options?: { [key: string]: any },
) {
  const { courseId: param0, ...queryParams } = params;
  return request<API.ResponseBaseGetLessonByCourseResponse>(`/api/lesson/v1/course/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
