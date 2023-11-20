// @ts-ignore
/* eslint-disable */
import { request } from '@/services/request';

/** 此处后端没有提供注释 POST /api/auth/v1/cms/login */
export async function loginCms(body: API.LoginCmsRequest, options?: { [key: string]: any }) {
  return request<API.ResponseBaseAccessTokenResponseCustom>('/api/auth/v1/cms/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** - login với username là email hoặc số điện thoại POST /api/auth/v1/login */
export async function login(body: API.LoginRequest, options?: { [key: string]: any }) {
  return request<API.ResponseBaseAccessTokenResponseCustom>('/api/auth/v1/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/auth/v1/logout */
export async function logout(body: API.LogoutRequest, options?: { [key: string]: any }) {
  return request<API.ResponseBaseLogoutResponse>('/api/auth/v1/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/auth/v1/password/forgot */
export async function forgotPassword(
  body: API.ForgotPasswordRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseForgotPasswordResponse>('/api/auth/v1/password/forgot', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/auth/v1/password/reset */
export async function resetPassword(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.resetPasswordParams,
  body: API.ResetPasswordRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseResetPasswordResponse>('/api/auth/v1/password/reset', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
      ...params,
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/auth/v1/re-active */
export async function reActive(body: API.ReActiveRequest, options?: { [key: string]: any }) {
  return request<API.ResponseBaseReActiveResponse>('/api/auth/v1/re-active', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/auth/v1/register */
export async function register(body: API.RegisterRequest, options?: { [key: string]: any }) {
  return request<API.ResponseBaseRegisterResponse>('/api/auth/v1/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/auth/v1/token/refresh */
export async function refreshToken(
  body: API.RefreshTokenRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseAccessTokenResponseCustom>('/api/auth/v1/token/refresh', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/auth/v1/verify/email */
export async function verifyEmail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.verifyEmailParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseVerifyEmailResponse>('/api/auth/v1/verify/email', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/auth/v1/verify/re-active */
export async function verifyReActive(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.verifyReActiveParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseVerifyReActiveResponse>('/api/auth/v1/verify/re-active', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
