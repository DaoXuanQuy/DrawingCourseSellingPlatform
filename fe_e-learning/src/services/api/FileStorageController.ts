// @ts-ignore
/* eslint-disable */
import { request } from '@/services/request';

/** 此处后端没有提供注释 POST /api/file/v1/multiUpload */
export async function multiUpload(
  body: API.MultiUploadRequest,
  files?: File[],
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  if (files) {
    files.forEach((f) => formData.append('files', f || ''));
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

  return request<API.ResponseBaseMultiUploadResponse>('/api/file/v1/multiUpload', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/file/v1/preview */
export async function preview(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.previewParams,
  options?: { [key: string]: any },
) {
  return request<string>('/api/file/v1/preview', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/file/v1/upload */
export async function upload(
  body: API.UploadFileRequest,
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

  return request<API.ResponseBaseUploadFileResponse>('/api/file/v1/upload', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}
