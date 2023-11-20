/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,name,icon 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @param name 配置路由的标题，默认读取国际化文件 menu.ts 中 menu.xxxx 的值，如配置 name 为 login，则读取 menu.ts 中 menu.login 的取值作为标题
 * @param icon 配置路由的图标，取值参考 https://ant.design/components/icon-cn， 注意去除风格后缀和大小写，如想要配置图标为 <StepBackwardOutlined /> 则取值应为 stepBackward 或 StepBackward，如想要配置图标为 <UserOutlined /> 则取值应为 user 或者 User
 * @doc https://umijs.org/docs/guides/routes
 */
export default [
  {
    path: '/welcome',
    icon: 'HomeOutlined',
    name: 'Trang chủ',
    component: './Welcome',
  },
  {
    layout: false,
    name: 'auth',
    path: '/auth',
    routes: [
      {
        layout: false,
        name: 'verify-email',
        path: '/auth/verify/re-active',
        component: './Verify/ReVerifyEmail',
      },
      {
        layout: false,
        name: 'verify-email',
        path: '/auth/verify/email',
        component: './Verify/Email',
      },
    ],
  },
  {
    layout: false,
    name: 'Đăng nhập',
    path: '/login',
    component: './User/Login',
  },
  {
    layout: false,
    path: '/register',
    name: 'Đăng ký tài khoản',
    component: './Register',
  },
  // Teacher
  {
    name: 'Thống kê',
    icon: 'DashboardOutlined',
    path: '/dashboard',
    component: './Teacher/Dashboard',
    access: 'canTeacher',
  },
  {
    name: 'Quán lí khóa học',
    icon: 'BookOutlined',
    path: '/courses',
    component: './Teacher/TableCourses',
    access: 'canTeacher',
  },
  // {
  //   name: 'Quán lí số dư',
  //   icon: 'CreditCardOutlined',
  //   path: '/balance',
  //   component: './Teacher/Balance',
  //   access: 'canTeacher',
  // },
  {
    hideInMenu: true,
    name: 'Chi tiết khóa học',
    path: '/courses/:courseId',
    component: './Teacher/DetailCourse',
    access: 'canTeacher',
  },
  {
    hideInMenu: true,
    name: 'Cài đặt bài học',
    path: '/courses/lessons/:courseId',
    component: './Teacher/CustomLesson',
    access: 'canTeacher',
  },
  {
    hideInMenu: true,
    name: 'Cài đặt bài kiểm tra',
    path: '/courses/exam/:examId',
    component: './Teacher/CustomExam',
    access: 'canTeacher',
  },
  {
    name: 'Chấm điểm',
    hideInMenu: true,
    path: '/courses/exam/grading/:examId',
    component: './Teacher/Grading',
    access: 'canTeacher',
  },
  {
    name: 'Chấm điểm',
    hideInMenu: true,
    path: '/courses/exam/grading/detail/:examUserId',
    component: './Teacher/GradingDetail',
    access: 'canTeacher',
  },
  // Student
  {
    path: '/portal/courses',
    name: 'Khóa học',
    icon: 'BookOutlined',
    routes: [
      {
        name: 'Khóa học của tôi',
        path: '/portal/courses/my-courses',
        component: './User/MyCourse',
        access: 'canStudent',
      },
      {
        hideInMenu: true,
        name: 'Chi tiết khóa học',
        path: '/portal/courses/my-courses/:courseId',
        component: './User/CourseDetail',
        access: 'canStudent',
      },
      {
        hideInMenu: true,
        name: 'Kiểm tra',
        path: '/portal/courses/my-courses/exam/:examId',
        component: './User/Test',
        access: 'canStudent',
      },
      {
        hideInMenu: true,
        name: 'Xem bài kiểm tra',
        path: '/portal/courses/my-courses/exam/preview/:examId',
        component: './User/ReviewExam',
        access: 'canStudent',
      },
      {
        name: 'Đăng ký',
        path: '/portal/courses/register',
        component: './User/RegisterCourse',
        access: 'canStudent',
      },
      {
        name: 'Thông tin khóa học',
        hideInMenu: true,
        path: '/portal/courses/register/:courseId',
        component: './User/PreviewCourse',
        access: 'canStudent',
      },
      {
        name: 'Thanh toán',
        hideInMenu: true,
        path: '/portal/courses/payment/:courseId',
        component: './User/Payment',
        access: 'canStudent',
      },
    ],
  },
  {
    hideInMenu: true,
    name: 'Thanh toán thành công',
    path: '/register-course/success/:courseId',
    component: './User/PaymentSuccess',
    access: 'canStudent',
  },
  {
    hideInMenu: true,
    name: 'Thanh toán thành công',
    path: '/register-course/success/vnpay/:courseId',
    component: './User/PaymentVnPaySuccess',
    access: 'canStudent',
  },

  // chung
  {
    name: 'Lịch sử giao dịch',
    icon: 'HistoryOutlined',
    path: '/history-payment',
    component: './User/HistoryPayment',
  },
  {
    name: 'Diễn đàn',
    icon: 'AppstoreAddOutlined',
    path: '/forums',
    component: './Forum',
  },
  {
    hideInMenu: true,
    name: 'Diễn đàn - chi tiết',
    path: '/forums/:categoryId',
    component: './ForumDetail',
  },
  {
    hideInMenu: true,
    name: 'Diễn đàn - tạo bài viết',
    path: '/forums/:categoryId/create',
    component: './CreatePost',
  },
  {
    hideInMenu: true,
    name: 'Diễn đàn - Bài viết',
    path: '/forums/:categoryId/topic/:topicId',
    component: './Post',
  },
  // {
  //   name: 'Trò chuyện',
  //   icon: 'WechatOutlined',
  //   path: '/chat',
  //   component: './Chat',
  // },
  {
    hideInMenu: true,
    name: 'Trò chuyện',
    path: '/chat/:recipientId',
    component: './Chat',
  },

  {
    name: 'Thông tin cá nhân',
    icon: 'user',
    path: '/infomation',
    component: './Infomation',
  },
  {
    name: 'Định danh',
    hideInMenu: true,
    path: '/identification',
    component: './Identification',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },

  {
    path: '/forgot-password',
    layout: false,
    component: './ForgotPassword',
  },
  {
    path: '/re-active',
    layout: false,
    component: './ReActive',
  },
  {
    path: '/reset-password',
    layout: false,
    component: './ResetPassword',
  },
  {
    name: 'Not Found',
    path: '/not-found',
    hideInMenu: true,
    component: './404',
  },
];
