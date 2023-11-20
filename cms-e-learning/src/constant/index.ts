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
const PAGE_SIZE = 10;
const DATE_FORMAT = 'DD/MM/YYYY';
const CATEGORY = {
  ACTIVE: {
    label: 'Hoạt động',
    color: 'success',
    value: 'ACTIVE',
  },
  INACTIVE: {
    label: 'Vô hiệu hóa',
    color: 'warning',
    value: 'INACTIVE',
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

const WITHDRAW_STATUS = {
  SUCCESS: {
    nameVi: 'Thành công',
    value: 'SUCCESS',
    color: 'green',
    message: 'Giao dịch đã được thanh toán',
  },
  FAIL: {
    nameVi: 'Thất bại',
    value: 'FAIL',
    color: 'default',
    message: 'Giao dịch đã bị hủy',
  },
  PENDING: {
    nameVi: 'Chờ duyệt',
    value: 'PENDING',
    color: 'blue',
    message: undefined,
  },
};
export {
  USER_STATUS,
  PAGE_SIZE,
  STATUS_EKYC,
  DATE_FORMAT,
  COURSE_STATUS,
  APPROVE_COURSE_STATUS,
  GET_IMAGE,
  CATEGORY,
  INVOICE_STATUS,
  WITHDRAW_STATUS,
};
