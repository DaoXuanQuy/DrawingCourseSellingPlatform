import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import { PAGE_SIZE, USER_STATUS } from '@/constant';
import {
  banAdmin,
  getListAdministrator,
  resetPasswordAdmin,
  unbanAdmin,
} from '@/services/api/administratorController';
import {
  CloseCircleOutlined,
  EditFilled,
  ExclamationCircleOutlined,
  LockOutlined,
  PlusOutlined,
  RedoOutlined,
  SearchOutlined,
  UnlockOutlined,
} from '@ant-design/icons';
import { ProColumns, ProForm, ProFormText, ProTable } from '@ant-design/pro-components';
import {
  Button,
  DatePicker,
  Form,
  Input,
  List,
  message,
  Modal,
  Select,
  Space,
  Tag,
  Tooltip,
} from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import AddAdministrator from './Components/AddAdministrator';
import './style.less';

const { RangePicker } = DatePicker;

export default () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isReload, setIsReload] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [adminSelect, setAdminSelect] = useState<API.AdministratorDto | null>({});
  const [form] = Form.useForm();

  const columns: ProColumns<API.AdministratorDto>[] = [
    {
      title: 'Họ tên',
      dataIndex: 'fullName',
      key: 'fullName',
      align: 'center',
      renderFormItem: () => {
        return <Input className="form-item" placeholder="Họ tên" />;
      },
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      align: 'center',
      search: false,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'center',
      search: false,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      valueType: 'select',
      render: (_, record) => (
        <Space>
          <Tag style={{ width: '130%' }} color={USER_STATUS[record.status ?? 'INACTIVE'].type}>
            {USER_STATUS[record.status ?? 'INACTIVE'].nameVi}
          </Tag>
        </Space>
      ),
      valueEnum: {
        ALL: { text: '--', status: '' },
        ACTIVE: {
          text: 'ACTIVE',
          status: 'ACTIVE',
        },
        INACTIVE: {
          text: 'INACTIVE',
          status: 'INACTIVE',
        },
      },
      renderFormItem: () => {
        return (
          <Select
            options={[
              { value: '', label: 'Tất cả' },
              { value: 'ACTIVE', label: 'Hoạt động' },
              { value: 'INACTIVE', label: 'Vô hiệu hóa' },
            ]}
            defaultValue={{ value: '', label: 'Tất cả' }}
          />
        );
      },
      align: 'center',
    },
    {
      title: 'Ngày tạo',
      key: 'createDate',
      dataIndex: 'createDate',
      valueType: 'date',
      align: 'center',
      renderFormItem: () => (
        <RangePicker
          allowEmpty={[true, true]}
          placeholder={['Từ ngày', 'Đến ngày']}
          format={['DD/MM/YYYY']}
        />
      ),
    },
    {
      title: 'Hành động',
      key: 'option',
      valueType: 'option',
      align: 'center',
      render: (text, row) => [
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <div
            style={{ cursor: 'pointer', color: '#1890ff', fontSize: '20px', margin: '0 6px' }}
            key="1"
            onClick={() => {
              setIsOpenModal(true);
              setAdminSelect(row);
            }}
          >
            <Tooltip title="Cập nhật">
              <EditFilled />
            </Tooltip>
          </div>
          <div
            style={{ cursor: 'pointer', color: '#faad14', fontSize: '20px', margin: '0 6px' }}
            key="2"
            onClick={() => {
              Modal.confirm({
                title: <p style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>Đặt lại mặt khẩu</p>,
                icon: <LockOutlined />,
                content: (
                  <ProForm form={form} layout="vertical" submitter={false}>
                    <ProFormText.Password
                      fieldProps={{
                        prefix: <LockOutlined />,
                      }}
                      className="text-input"
                      name={'password'}
                      label="Mật khẩu"
                      placeholder={'Mật khẩu'}
                      rules={[
                        {
                          required: true,
                          pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                          message: (
                            <List>
                              <List.Item>
                                <CloseCircleOutlined style={{ marginRight: 4 }} />
                                Phải có ít nhất 8 ký tự
                              </List.Item>
                              <List.Item>
                                <CloseCircleOutlined style={{ marginRight: 4 }} />
                                Phải chứa ít nhất một ký tự đặc biệt
                              </List.Item>
                              <List.Item>
                                <CloseCircleOutlined style={{ marginRight: 4 }} />
                                Phải chứa ít nhất một ký tự viết hoa
                              </List.Item>
                              <List.Item>
                                <CloseCircleOutlined style={{ marginRight: 4 }} />
                                Phải chứa ít nhất một ký tự số
                              </List.Item>
                            </List>
                          ),
                        },
                      ]}
                    />
                  </ProForm>
                ),
                okText: 'Xác nhận',
                cancelText: 'Hủy',
                onOk: () => {
                  console.log(row);
                  const params: API.ResetPasswordAdminRequest =
                    form.getFieldsValue() as API.ResetPasswordAdminRequest;
                  resetPasswordAdmin({ ...params, id: row.id })
                    .then((res) => {
                      if (res.code === 0) {
                        messageApi.success('Đặt lại mật khẩu thành công', 3);
                        setIsReload(!isReload);
                      } else {
                        messageApi.error(res.message, 3);
                      }
                    })
                    .catch((err) => {
                      messageApi.error('Đặt lại mật khẩu Thất bại', 3);
                    });
                },
              });
            }}
          >
            <Tooltip title="Đặt lại mật khẩu">
              <RedoOutlined />
            </Tooltip>
          </div>
          <div
            style={{ cursor: 'pointer', color: '#ff4d4f', fontSize: '20px', margin: '0 6px' }}
            key="2"
            onClick={() => {
              Modal.confirm({
                title: 'Khóa Administrator',
                icon: <ExclamationCircleOutlined />,
                content: `Xác nhận khóa Administrator: ${row.fullName}`,
                okText: 'Xác nhận',
                cancelText: 'Hủy',
                onOk: () => {
                  row.status === USER_STATUS.ACTIVE.nameEn
                    ? banAdmin({ id: row.id })
                        .then((res) => {
                          if (res.code === 0) {
                            messageApi.success('Khóa administrator thành công', 3);
                            setIsReload(!isReload);
                          } else {
                            messageApi.success(res.message, 3);
                          }
                        })
                        .catch((err) => {
                          messageApi.success('Khóa administrator Thất bại', 3);
                        })
                    : unbanAdmin({ id: row.id })
                        .then((res) => {
                          if (res.code === 0) {
                            messageApi.success('Mở khóa administrator thành công', 3);
                            setIsReload(!isReload);
                          } else {
                            messageApi.success(res.message, 3);
                          }
                        })
                        .catch((err) => {
                          messageApi.success('Mở khóa administrator Thất bại', 3);
                        });
                },
              });
            }}
          >
            <Tooltip title={row.status === USER_STATUS.ACTIVE.nameEn ? 'Khoá' : 'Mở khóa'}>
              {row.status === USER_STATUS.ACTIVE.nameEn ? <LockOutlined /> : <UnlockOutlined />}
            </Tooltip>
          </div>
        </div>,
      ],
    },
  ];
  useEffect(() => {}, [isReload]);
  return (
    <>
      {contextHolder}
      <BreadcrumbCustom
        subNav={[
          {
            name: 'Trang chủ',
            path: '/dashboard',
          },
          {
            name: 'Quản lí Administrators',
            path: '',
          },
        ]}
      />
      <Button
        size="middle"
        type="primary"
        style={{ maxWidth: '15%', float: 'right' }}
        icon={<PlusOutlined />}
        onClick={() => {
          setIsOpenModal(true);
          setAdminSelect({});
        }}
      >
        Thêm quản trị viên
      </Button>
      <ProTable<API.AdministratorDto, API.getListAdministratorParams & { isReload: boolean }>
        params={{ isReload }}
        columns={columns}
        rowKey="key"
        options={{ search: true }}
        search={{
          optionRender: (searchConfig) => [
            <Button
              type="primary"
              onClick={() => {
                searchConfig.form?.submit();
              }}
              icon={<SearchOutlined />}
            >
              Tìm Kiếm
            </Button>,
          ],
          layout: 'vertical',
          collapsed: true,
        }}
        headerTitle="Bảng quản trị viên"
        pagination={{
          showTotal: (total, [start, end]) => <p>{`${start}-${end}/${total}`}</p>,
          pageSize: PAGE_SIZE,
        }}
        toolBarRender={false}
        onSubmit={(params) => {
          console.log(params);
        }}
        onLoadingChange={() => {}}
        request={async (params) => {
          const [fromDate, toDate] = params['createDate'] || [];

          const response = await getListAdministrator({
            fullName: params.fullName,
            fromDate: fromDate ? moment(fromDate).format('DD/MM/YYYY') : undefined,
            toDate: toDate ? moment(toDate).format('DD/MM/YYYY') : undefined,
            status: params.status,
            page: params.current ? params.current - 1 : 0,
            size: params.pageSize,
          });
          let resData: API.AdministratorDto[] = [];
          let total: number = 0;
          if (response?.code === 0) {
            resData = response.data?.data ? response.data.data : [];
            total = response.data?.total || 0;
          } else {
            messageApi.error(response.message, 3);
          }
          return {
            data: resData,
            total: total,
          };
        }}
      />
      <AddAdministrator
        isOpen={isOpenModal}
        setIsModalOpen={setIsOpenModal}
        isReload={isReload}
        setIsReload={setIsReload}
        administrator={adminSelect}
      />
    </>
  );
};
