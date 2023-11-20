// @ts-ignore
/* eslint-disable */
import { request } from '@/services/request';

/** 此处后端没有提供注释 GET /chat/count-new-message */
export async function countNewMessage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.countNewMessageParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseCountNewMessageResponse>('/chat/count-new-message', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /chat/create-rooom */
export async function createRoomChat(
  body: API.CreateRoomChatRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseCreateRoomChatResponse>('/chat/create-rooom', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /chat/friend-recent */
export async function getChatFriendRecent(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getChatFriendRecentParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBasePageResponseDataUserInfoChat>('/chat/friend-recent', {
    method: 'GET',
    params: {
      // size has a default value: 20
      size: '20',
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /chat/getRoom */
export async function getRoomChat(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getRoomChatParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseGetRoomChatResponse>('/chat/getRoom', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /chat/teacher */
export async function getChatWithTeacher(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getChatWithTeacherParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBasePageResponseDataUserInfoChat>('/chat/teacher', {
    method: 'GET',
    params: {
      // size has a default value: 20
      size: '20',
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /messages */
export async function findChatMessages(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findChatMessagesParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBasePageResponseDataChatMessage>('/messages', {
    method: 'GET',
    params: {
      // size has a default value: 20
      size: '20',
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /messages/${param0} */
export async function findMessage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.findMessageParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<Record<string, any>>(`/messages/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /messages/${param0}/${param1}/count */
export async function countNewMessages(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.countNewMessagesParams,
  options?: { [key: string]: any },
) {
  const { senderId: param0, recipientId: param1, ...queryParams } = params;
  return request<number>(`/messages/${param0}/${param1}/count`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /portal/chat/recommend-friend */
export async function getRecommendFriendForStudent(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getRecommendFriendForStudentParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBasePageResponseDataUserInfoChat>('/portal/chat/recommend-friend', {
    method: 'GET',
    params: {
      // size has a default value: 20
      size: '20',
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /teacher/chat/recommend-friend */
export async function getRecommendFriendForTeacher(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getRecommendFriendForTeacherParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBasePageResponseDataUserInfoChat>('/teacher/chat/recommend-friend', {
    method: 'GET',
    params: {
      // size has a default value: 20
      size: '20',
      ...params,
    },
    ...(options || {}),
  });
}
