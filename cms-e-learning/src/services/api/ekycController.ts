// @ts-ignore
/* eslint-disable */
import { request } from '@/services/request';

/** 此处后端没有提供注释 POST /api/ekyc/portal/v1/ocr */
export async function detectIdCard(
  body: API.DetectIdCardRequest,
  imageFront?: File,
  imageBack?: File,
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  if (imageFront) {
    formData.append('imageFront', imageFront);
  }

  if (imageBack) {
    formData.append('imageBack', imageBack);
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

  return request<API.ResponseBaseDetectIdCardResponse>('/api/ekyc/portal/v1/ocr', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/ekyc/portal/v1/update */
export async function updateEkyc(body: API.UpdateEkycRequest, options?: { [key: string]: any }) {
  return request<API.ResponseBaseUpdateEkycResponse>('/api/ekyc/portal/v1/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
