// @ts-ignore
/* eslint-disable */
import { request } from '@/services/request';

/** Lấy danh sách đánh giá theo khóa học GET /api/review/public/v1/course/${param0} */
export async function getAllReviewByCourse(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAllReviewByCourseParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseGetAllReviewByCourseResponse>(
    `/api/review/public/v1/course/${param0}`,
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

/** Tạo bình luận về bài nhận xét khóa học POST /api/review/v1/comment/create */
export async function createComment(
  body: API.CreateCommentRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseCommentResponse>('/api/review/v1/comment/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Xóa bình luận về bài nhận xét khóa học DELETE /api/review/v1/comment/delete */
export async function deleteComment(
  body: API.DeleteCommentRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseStatusResponse>('/api/review/v1/comment/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Chỉnh sửa bình luận về bài nhận xét khóa học PUT /api/review/v1/comment/update */
export async function updateComment(
  body: API.UpdateCommentRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseCommentResponse>('/api/review/v1/comment/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Tạo đánh giá POST /api/review/v1/create */
export async function createReview(
  body: API.CreateReviewRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseReviewResponse>('/api/review/v1/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Xóa đánh giá DELETE /api/review/v1/delete */
export async function deleteReview(
  body: API.DeleteReviewRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseDeleteReviewResponse>('/api/review/v1/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Chỉnh sửa đánh giá PUT /api/review/v1/update */
export async function updateReview(
  body: API.UpdateReviewRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseReviewResponse>('/api/review/v1/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
