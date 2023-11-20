const USER_STATUS = {
  ACTIVE: {
    type: 'success',
    nameVi: 'Hoạt động',
    nameEn: 'ACTIVE',
  },
  INACTIVE: {
    type: 'error',
    nameVi: 'Vô hiệu hóa',
    nameEn: 'INACTIVE',
  },
};

const STATUS_EKYC = {
  CREATE: {
    type: 'processing',
    nameVi: 'Chờ duyệt',
    nameEn: 'CREATE',
    isApprove: undefined,
  },
  ACTIVE: {
    type: 'success',
    nameVi: 'Đã duyệt',
    nameEn: 'ACTIVE',
    isApprove: true,
  },
  BAN: {
    type: 'error',
    nameVi: 'Đã khóa',
    nameEn: 'BAN',
    isApprove: false,
  },
  REJECTED: {
    type: 'warning',
    nameVi: 'Đã từ chối',
    nameEn: 'REJECTED',
    isApprove: false,
  },
  DEFAULT: {
    type: 'default',
    nameVi: '--',
    nameEn: '--',
    isApprove: false,
  },
};
const COURSE_STATUS = {
  ACTIVE: {
    type: 'success',
    nameVi: 'Hoạt động',
    nameEn: 'ACTIVE',
  },
  INACTIVE: {
    type: 'warning',
    nameVi: 'Tạm dừng',
    nameEn: 'INACTIVE',
  },
};
const APPROVE_COURSE_STATUS = {
  BLOCK: {
    type: 'error',
    nameVi: 'Đã khóa',
    nameEn: 'BLOCK',
    isApprove: false,
  },
  APPROVE: {
    type: 'success',
    nameVi: 'Đã duyệt',
    nameEn: 'APPROVE',
    isApprove: true,
  },
  WAITING: {
    type: 'processing',
    nameVi: 'Chờ duyệt',
    nameEn: 'WAITING',
    isApprove: false,
  },
  REJECTED: {
    type: 'default',
    nameVi: 'Từ chối',
    nameEn: 'REJECTED',
    isApprove: false,
  },
};
const PAGE_SIZE = 10;
const DATE_FORMAT = 'DD/MM/YYYY';
const DOCUMENT_TYPE = {
  TEXT: 'TEXT',
  FILE: 'FILE',
  VIDEO: 'VIDEO',
};
const DISPLAY_STATUS = {
  HIDE: {
    nameVi: 'Đã ẩn',
    value: 'HIDE',
    type: 'warning',
  },
  VISIBLE: {
    nameVi: 'Đang hiển thị',
    value: 'VISIBLE ',
    type: 'success',
  },
};
const EXAM_STATUS = {
  INACTIVE: {
    nameVi: 'Đã ẩn',
    value: 'HIDE',
    type: 'warning',
  },
  ACTIVE: {
    nameVi: 'Đang hiển thị',
    value: 'VISIBLE ',
    type: 'success',
  },
};

const INVOICE_STATUS = {
  CREATED: {
    nameVi: 'Tạo mới',
    value: 'CREATED',
    color: 'blue',
    message: undefined,
  },
  SUCCESS: {
    nameVi: 'Thành công',
    value: 'SUCCESS',
    color: 'green',
    message: 'Giao dịch đã được thanh toán',
  },
  CANCELED: {
    nameVi: 'Hủy',
    value: 'CANCELED',
    color: 'red',
    message: 'Giao dịch đã bị hủy',
  },
  FAIL: {
    nameVi: 'Thất bại',
    value: 'FAIL',
    color: 'default',
    message: 'Giao dịch đã bị hủy',
  },
  TIMEOUT: {
    nameVi: 'Hết hạn',
    value: 'TIMEOUT ',
    color: 'default',
    message: 'Giao dịch đã hết hạn thanh toán',
  },
  NONE: {
    nameVi: 'Không tồn tại',
    value: 'NONE ',
    color: 'default',
    message: 'Giao dịch không tồn tại',
  },
};
const EXAM_TYPE = {
  ESSAY: {
    label: 'Tự luận',
    value: 'ESSAY',
  },
  QUIZ: {
    label: 'Trắc nghiệm',
    value: 'QUIZ',
  },
};
const WITHDRAW_STATUS = {
  SUCCESS: {
    label: 'Thành công',
    color: 'success',
  },
  FAILED: {
    label: 'Thất bại',
    color: 'error',
  },
  PENDING: {
    label: 'Đang xử lý',
    color: 'processing',
  },
};
const GET_IMAGE = {
  getUrl: (objectName?: string) => {
    if (objectName) {
      // if (objectName.startsWith('public') || objectName.startsWith('/public')) {
      //   return `${URL_MINIO}/${objectName}`;
      // }
      return `${API_URL}/api/file/v1/preview?objectName=${objectName}`;
    }
    return '';
  },
};
const EXAM_TEST_STATUS = {
  CREATE: {
    label: 'Đang làm',
    color: 'processing',
    value: 'CREATE',
  },
  WAITING: {
    label: 'Chờ chấm điểm',
    color: 'warning',
    value: 'WAITING',
  },
  COMPLETE: {
    label: 'Hoàn thành',
    color: 'success',
    value: 'COMPLETE',
  },
};
export {
  USER_STATUS,
  PAGE_SIZE,
  STATUS_EKYC,
  DATE_FORMAT,
  COURSE_STATUS,
  APPROVE_COURSE_STATUS,
  DOCUMENT_TYPE,
  DISPLAY_STATUS,
  INVOICE_STATUS,
  EXAM_TYPE,
  EXAM_STATUS,
  GET_IMAGE,
  WITHDRAW_STATUS,
  EXAM_TEST_STATUS,
};
