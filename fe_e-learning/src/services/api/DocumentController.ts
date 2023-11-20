// @ts-ignore
/* eslint-disable */
import { request } from '@/services/request';

/** 此处后端没有提供注释 GET /api/document/portal/v1/getDocuments/${param0} */
export async function getDocumentForStudent(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDocumentForStudentParams,
  options?: { [key: string]: any },
) {
  const { lessonId: param0, ...queryParams } = params;
  return request<API.ResponseBaseGetListDocumentResponse>(
    `/api/document/portal/v1/getDocuments/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 PUT /api/document/teacher/v1/display */
export async function displayDocument(
  body: API.DisplayDocumentRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseStatusResponse>('/api/document/teacher/v1/display', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/document/teacher/v1/getList */
export async function getDocuments(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDocumentsParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseGetListDocumentResponse>('/api/document/teacher/v1/getList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/document/v1/create */
export async function createDocument(
  body: API.AddDocumentRequest,
  file?: File,
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  if (file) {
    formData.append('file', file);
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

  return request<API.ResponseBaseAddDocumentResponse>('/api/document/v1/create', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 DELETE /api/document/v1/delete/${param0} */
export async function deleteDocument(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteDocumentParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseStatusResponse>(`/api/document/v1/delete/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/document/v1/detail/${param0} */
export async function getDetailDocument(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDetailDocumentParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseGetDetailDocumentResponse>(`/api/document/v1/detail/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/document/v1/update */
export async function updateDocument(
  body: API.UpdateDocumentRequest,
  file?: File,
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  if (file) {
    formData.append('file', file);
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

  return request<API.ResponseBaseUpdateDocumentResponse>('/api/document/v1/update', {
    method: 'PUT',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}
