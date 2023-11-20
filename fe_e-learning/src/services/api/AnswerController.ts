// @ts-ignore
/* eslint-disable */
import { request } from '@/services/request';

/** Lấy danh sách câu trả lời của bài thi đang làm GET /api/answer/v1/getCurrentAnswers/${param0} */
export async function getCurrentAnswers(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCurrentAnswersParams,
  options?: { [key: string]: any },
) {
  const { code: param0, ...queryParams } = params;
  return request<API.ResponseBaseGetCurrentAnswerResponse>(
    `/api/answer/v1/getCurrentAnswers/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** Xem bài làm GET /api/answer/v1/review */
export async function getSubmitAnswerByExamResult(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getSubmitAnswerByExamResultParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseGetSubmitAnswerByExamResultResponse>('/api/answer/v1/review', {
    method: 'GET',
    params: {
      // size has a default value: 20
      size: '20',
      ...params,
    },
    ...(options || {}),
  });
}

/** Bắt đầu làm bài POST /api/answer/v1/start */
export async function startDoExam(body: API.StartDoExamRequest, options?: { [key: string]: any }) {
  return request<API.ResponseBaseStartDoExamResponse>('/api/answer/v1/start', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Nộp kết quả làm exam POST /api/answer/v1/submitAnswers */
export async function submitAnswers(
  body: API.SubmitAnswersRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseSubmitAnswersResponse>('/api/answer/v1/submitAnswers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
