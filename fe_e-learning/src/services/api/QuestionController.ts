// @ts-ignore
/* eslint-disable */
import { request } from '@/services/request';

/** Giảng viên lấy câu hỏi theo bài kiểm tra GET /api/question/teacher/v1 */
export async function getQuestionByExamId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getQuestionByExamIdParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseGetQuestionResponse>('/api/question/teacher/v1', {
    method: 'GET',
    params: {
      // size has a default value: 20
      size: '20',
      ...params,
    },
    ...(options || {}),
  });
}

/** Cập nhật câu hỏi PUT /api/question/teacher/v1 */
export async function updateQuestion(
  body: API.UpdateQuestionRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseQuestionResponse>('/api/question/teacher/v1', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Tạo câu hỏi POST /api/question/teacher/v1 */
export async function createQuestion(
  body: API.CreateQuestionRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseQuestionResponse>('/api/question/teacher/v1', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Xóa câu hỏi theo bài kiểm tra DELETE /api/question/teacher/v1/${param0} */
export async function deleteQuestionByExamId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteQuestionByExamIdParams,
  options?: { [key: string]: any },
) {
  const { examId: param0, ...queryParams } = params;
  return request<API.ResponseBaseDeleteQuestionResponse>(`/api/question/teacher/v1/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Tạo theo list câu hỏi POST /api/question/teacher/v1/createList */
export async function createListQuestion(
  body: API.CreateListQuestionRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseStatusResponse>('/api/question/teacher/v1/createList', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Xóa câu hỏi DELETE /api/question/teacher/v1/question/${param0} */
export async function deleteQuestionById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteQuestionByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseDeleteQuestionResponse>(
    `/api/question/teacher/v1/question/${param0}`,
    {
      method: 'DELETE',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** Học viên lấy câu hỏi theo bài kiểm tra GET /api/question/v1 */
export async function studentGetQuestionByExamId(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.studentGetQuestionByExamIdParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseGetQuestionResponse>('/api/question/v1', {
    method: 'GET',
    params: {
      // size has a default value: 20
      size: '20',
      ...params,
    },
    ...(options || {}),
  });
}

/** tạo câu hỏi bằng file excel POST /api/question/v1/using-excel */
export async function createQuestionUsingExcel(
  body: API.CreateQuestionFromExcelRequest,
  questions?: File,
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  if (questions) {
    formData.append('questions', questions);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      formData.append(
        ele,
        typeof item === 'object' && !(item instanceof File) ? JSON.stringify(item) : item,
      );
    }
  });

  return request<API.ResponseBaseCreateQuestionFromExcelResponse>('/api/question/v1/using-excel', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}
