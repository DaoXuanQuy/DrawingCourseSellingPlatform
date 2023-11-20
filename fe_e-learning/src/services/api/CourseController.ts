// @ts-ignore
/* eslint-disable */
import { request } from '@/services/request';

/** 此处后端没有提供注释 GET /api/course/cms/courses */
export async function cmsGetCourses(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.cmsGetCoursesParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseGetListCoursesResponse>('/api/course/cms/courses', {
    method: 'GET',
    params: {
      // size has a default value: 20
      size: '20',
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/course/cms/v1/approve/${param0} */
export async function approveCourse(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.approveCourseParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseStatusResponse>(`/api/course/cms/v1/approve/${param0}`, {
    method: 'PUT',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/course/cms/v1/block/${param0} */
export async function blockCourse(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.blockCourseParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseBlockCourseResponse>(`/api/course/cms/v1/block/${param0}`, {
    method: 'PUT',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/course/cms/v1/getDetail/${param0} */
export async function cmsGetDetailById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.cmsGetDetailByIdParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseCmsGetDetailCourseResponse>(
    `/api/course/cms/v1/getDetail/${param0}`,
    {
      method: 'GET',
      params: { ...queryParams },
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 PUT /api/course/cms/v1/rejected/${param0} */
export async function rejectedCourse(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.rejectedCourseParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseStatusResponse>(`/api/course/cms/v1/rejected/${param0}`, {
    method: 'PUT',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/course/cms/v1/unblock/${param0} */
export async function unblockCourse(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.unblockCourseParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseUnblockCourseResponse>(`/api/course/cms/v1/unblock/${param0}`, {
    method: 'PUT',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/course/portal/v1/course */
export async function getCourse(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCourseParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseGetCourseByUserIdResponse>('/api/course/portal/v1/course', {
    method: 'GET',
    params: {
      // size has a default value: 20
      size: '20',
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/course/portal/v1/register */
export async function registerCourse(
  body: API.RegisterCourseRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseRegisterCourseResponse>('/api/course/portal/v1/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** Tham quan khóa học GET /api/course/public/v1/review/${param0} */
export async function reviewCourse(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.reviewCourseParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseReviewCourseResponse>(`/api/course/public/v1/review/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/course/teacher/courses */
export async function teacherGetCourses(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.teacherGetCoursesParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseGetListCoursesResponse>('/api/course/teacher/courses', {
    method: 'GET',
    params: {
      // size has a default value: 20
      size: '20',
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/course/teacher/v1/create */
export async function createCourse(
  body: API.CreateCourseRequest,
  courseImage?: File,
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  if (courseImage) {
    formData.append('courseImage', courseImage);
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

  return request<API.ResponseBaseCreateCourseResponse>('/api/course/teacher/v1/create', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** Chỉnh sửa giảm giá khóa học PUT /api/course/teacher/v1/setDiscountPercentage */
export async function setDiscountPercentage(
  body: API.SetDiscountPercentageRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseUpdateCourseResponse>(
    '/api/course/teacher/v1/setDiscountPercentage',
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    },
  );
}

/** 此处后端没有提供注释 PUT /api/course/teacher/v1/setting */
export async function settingCourse(
  body: API.SettingCourseRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseSettingCourseResponse>('/api/course/teacher/v1/setting', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 PUT /api/course/teacher/v1/update */
export async function updateCourse(
  body: API.UpdateCourseRequest,
  courseImage?: File,
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  if (courseImage) {
    formData.append('courseImage', courseImage);
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

  return request<API.ResponseBaseUpdateCourseResponse>('/api/course/teacher/v1/update', {
    method: 'PUT',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/course/v1/courses */
export async function getListCourses(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getListCoursesParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseGetListCoursesResponse>('/api/course/v1/courses', {
    method: 'GET',
    params: {
      // size has a default value: 20
      size: '20',
      ...params,
    },
    ...(options || {}),
  });
}

/** Giảm tiến độ khóa học DELETE /api/course/v1/decrease-progress */
export async function decreaseProgress(
  body: API.DecreaseProgressRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseStatusResponse>('/api/course/v1/decrease-progress', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/course/v1/detail/${param0} */
export async function getDetailCourse(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getDetailCourseParams,
  options?: { [key: string]: any },
) {
  const { id: param0, ...queryParams } = params;
  return request<API.ResponseBaseGetDetailCourseResponse>(`/api/course/v1/detail/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** Lấy các khóa học chưa đăng ký GET /api/course/v1/getUnregisterCourse */
export async function getUnregisterCourse(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUnregisterCourseParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseGetUnregisterCourseResponse>(
    '/api/course/v1/getUnregisterCourse',
    {
      method: 'GET',
      params: {
        // size has a default value: 20
        size: '20',
        ...params,
      },
      ...(options || {}),
    },
  );
}

/** Lấy danh sách học viên theo khóa học GET /api/course/v1/getUsersByCourse */
export async function getUsersByCourse(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getUsersByCourseParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseGetUsersByCourseResponse>('/api/course/v1/getUsersByCourse', {
    method: 'GET',
    params: {
      // size has a default value: 20
      size: '20',
      ...params,
    },
    ...(options || {}),
  });
}

/** tăng tiến độ khóa học POST /api/course/v1/increase-progress */
export async function increaseProgress(
  body: API.IncreaseProgressRequest,
  options?: { [key: string]: any },
) {
  return request<API.ResponseBaseStatusResponse>('/api/course/v1/increase-progress', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
