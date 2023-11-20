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
    layout: false,
    name: 'login',
    path: '/login',
    component: './User/Login',
  },
  {
    path: '/dashboard',
    name: 'Trang chủ',
    icon: 'HomeOutlined',
    access: 'canAdmin',
    component: './Admin/Dashboard',
  },
  {
    path: '/manage',
    name: 'Quản lí người dùng',
    icon: 'UsergroupAddOutlined',
    routes: [
      {
        name: 'Quản lí Administrators',
        path: '/manage/administrators',
        component: './Admin/TableAdministrators',
        access: 'canRootAdmin',
      },
      {
        name: 'Quản lí giáo viên',
        path: '/manage/teachers',
        component: './Admin/TableTeachers',
        access: 'canAdmin',
      },
      {
        name: 'Quản lí học sinh',
        path: '/manage/students',
        component: './Admin/TableUsers',
        access: 'canAdmin',
      },
    ],
  },
  {
    hideInMenu: true,
    name: 'Thông tin chi tiết',
    path: '/manage/students/:userId',
    component: './Admin/DetailUser',
    access: 'canAdmin',
  },
  {
    hideInMenu: true,
    name: 'Chi tiết định danh',
    path: '/manage/teachers/:teacherId',
    component: './Admin/AuthEKYC',
    access: 'canAdmin',
  },
  {
    name: 'Quản lí khóa học',
    icon: 'BookOutlined',
    path: '/courses',
    component: './Admin/TableCourses',
    access: 'canAdmin',
  },
  {
    name: 'Diễn đàn',
    icon: 'AppstoreAddOutlined',
    path: '/forums',
    routes: [
      {
        name: 'Quản lí diễn đàn',
        path: '/forums/manage',
        component: './Admin/Forum',
        access: 'canAdmin',
      },
      {
        name: 'Diễn đàn',
        path: '/forums/categories',
        component: './Forum',
        access: 'canAdmin',
      },
      {
        hideInMenu: true,
        name: 'Diễn đàn - chi tiết',
        path: '/forums/categories/:categoryId',
        component: './ForumDetail',
      },
      {
        hideInMenu: true,
        name: 'Diễn đàn - tạo bài viết',
        path: '/forums/categories/:categoryId/create',
        component: './CreatePost',
      },
      {
        hideInMenu: true,
        name: 'Diễn đàn - Bài viết',
        path: '/forums/categories/:categoryId/topic/:topicId',
        component: './Post',
      },
    ],
  },
  {
    name: 'Quán lí diễn đàn',
    path: '/forum/:categoryId',
    component: './Admin/Forum',
    access: 'canAdmin',
    hideInMenu: true,
  },
  {
    name: 'Lịch sử giao dịch',
    icon: 'HistoryOutlined',
    path: '/history-payment',
    routes: [
      {
        path: '/history-payment/invoices',
        component: './Admin/TableHistoryPayment',
        access: 'canAdmin',
        name: 'Lịch sử giao dịch',
      },
      {
        path: '/history-payment/withdraw',
        component: './Admin/TableWithdraw',
        access: 'canAdmin',
        name: 'Lịch sử  rút tiền',
      },
    ],
  },
  // page admin
  {
    name: 'Chi tiết khóa học',
    hideInMenu: true,
    path: '/manage/courses/:courseId',
    component: './Admin/DetailCourse',
    access: 'canAdmin',
  },
  {
    name: 'Thông tin cá nhân',
    icon: 'user',
    path: '/infomation',
    component: './Infomation',
  },
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },
  {
    name: 'Not Found',
    path: '/not-found',
    hideInMenu: true,
    component: './404',
  },
];
