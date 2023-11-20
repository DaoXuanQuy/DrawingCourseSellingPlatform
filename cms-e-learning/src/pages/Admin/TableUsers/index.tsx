import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import { GET_IMAGE, PAGE_SIZE } from '@/constant';
import { banUser, getALl, unbanUser } from '@/services/api/UserController';
import { LockOutlined, SearchOutlined, UnlockOutlined } from '@ant-design/icons';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import {
  Button,
  DatePicker,
  Image,
  Input,
  message,
  Modal,
  Select,
  Space,
  Tag,
  Tooltip,
} from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { history } from 'umi';
import './style.less';

const { RangePicker } = DatePicker;

export default () => {
  const [isReload, setIsReload] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const columns: ProColumns<API.UserResponse>[] = [
    {
      title: 'Ảnh đại diện',
      dataIndex: ['user', 'avatar'],
      key: 'avatar',
      align: 'center',
      search: false,
      render: (_, record) => {
        return (
          <Image
            src={record.avatar ? GET_IMAGE.getUrl(record.avatar) : '/icons/Logo.png'}
            width={40}
            height={40}
          />
        );
      },
    },
    {
      title: 'Họ',
      dataIndex: 'firstName',
      key: 'firstName',
      align: 'center',
      search: false,
      onCell: (data) => {
        return {
          onClick: () => history.push(`/manage/students/${data.id}`),
        };
      },
    },
    {
      title: 'Tên',
      dataIndex: 'lastName',
      key: 'lastName',
      align: 'center',
      renderFormItem: () => {
        return <Input className="form-item" placeholder="Tên người dùng" />;
      },
      onCell: (data) => {
        return {
          onClick: () => history.push(`/manage/students/${data.id}`),
        };
      },
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'birthday',
      key: 'birthday',
      valueType: 'date',
      align: 'center',
      search: false,
      onCell: (data) => {
        return {
          onClick: () => history.push(`/manage/students/${data.id}`),
        };
      },
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      align: 'center',
      search: false,
      onCell: (data) => {
        return {
          onClick: () => history.push(`/manage/students/${data.id}`),
        };
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'center',
      search: false,
      onCell: (data) => {
        return {
          onClick: () => history.push(`/manage/students/${data.id}`),
        };
      },
    },

    {
      title: 'Trạng thái',
      dataIndex: ['user', 'ban'],
      key: 'ban',
      align: 'center',
      width: '15%',
      render: (_, record) => {
        return (
          <Space>
            <Tag style={{ width: '130%' }} color={record?.ban ? 'error' : 'success'}>
              {record?.ban ? 'Đã khóa' : 'Hoạt động'}
            </Tag>
          </Space>
        );
      },
      renderFormItem: () => {
        return (
          <Select
            options={[
              { value: null, label: 'Tất cả' },
              { value: false, label: 'Hoạt động' },
              { value: true, label: 'Đã khóa' },
            ]}
            defaultValue={{ value: null, label: 'Tất cả' }}
          />
        );
      },
      onCell: (data) => {
        return {
          onClick: () => history.push(`/manage/students/${data.id}`),
        };
      },
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
      onCell: (data) => {
        return {
          onClick: () => history.push(`/manage/students/${data.id}`),
        };
      },
    },
    {
      title: 'Hành động',
      key: 'option',
      valueType: 'option',
      align: 'center',
      render: (text, row) => [
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <div
            style={{ cursor: 'pointer', color: '#ff4d4f', fontSize: '20px', margin: '0 6px' }}
            key="2"
            onClick={() => {
              Modal.confirm({
                title: row?.ban ? 'Xác nhận mở khóa' : 'Xác nhận khóa',
                content: row?.ban
                  ? 'Bạn có xác nhận mở khóa tài khoản này?'
                  : 'Bạn có xác nhận khóa tài khoản này?',
                okText: 'Xác nhận',
                cancelText: 'Hủy',
                onOk: () => {
                  row?.ban
                    ? unbanUser({ id: row?.id || '' })
                        .then((res) => {
                          if (res.code === 0) {
                            messageApi.success('Mở tài khoản thành công', 3);
                            setIsReload(!isReload);
                          } else {
                            messageApi.error(res.message, 3);
                          }
                        })
                        .catch((err) => {
                          messageApi.error(err, 3);
                        })
                    : banUser({ id: row.id || '' })
                        .then((res) => {
                          if (res.code === 0) {
                            messageApi.success('Khóa tài khoản thành công', 3);
                            setIsReload(!isReload);
                          } else {
                            messageApi.error(res.message, 3);
                          }
                        })
                        .catch((err) => {
                          messageApi.error(err, 3);
                        });
                },
              });
            }}
          >
            <Tooltip title={row.ban ? 'Mở khoá' : 'Khóa'}>
              {row.ban ? <UnlockOutlined /> : <LockOutlined />}
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
            name: 'Quản lí học sinh',
            path: '',
          },
        ]}
      />
      <ProTable<API.UserResponse, API.getALlParams & { isReload: boolean }>
        params={{ isReload }}
        columns={columns}
        rowKey="key"
        className="table-teacher"
        options={{ search: true }}
        expandable={{ showExpandColumn: true }}
        search={{
          optionRender: (searchConfig) => [
            <Button
              type="primary"
              onClick={() => {
                const phone: string = searchConfig.form?.getFieldValue('phone');
                const phoneRegex: RegExp = new RegExp(/^(03|05|07|08|09)+([0-9]{8})$/);
                if (phone && !phoneRegex.test(phone)) {
                  messageApi.error('Số điện thoại tìm kiếm không hợp lệ', 3);
                  return;
                }
                searchConfig.form?.submit();
              }}
              icon={<SearchOutlined />}
            >
              Tìm Kiếm
            </Button>,
          ],
          layout: 'vertical',
          span: 6,
          labelWidth: 'auto',
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
        rowClassName={'custom-row'}
        onLoadingChange={() => {}}
        request={async (params) => {
          const [fromDate, toDate] = params['createDate'] || [];
          const response = await getALl({
            lastName: params.lastName,
            createFrom: fromDate ? moment(fromDate).format('DD/MM/YYYY') : undefined,
            createTo: toDate ? moment(toDate).format('DD/MM/YYYY') : undefined,
            ban: params.ban,
            isTeacher: false,
            page: params.current ? params.current - 1 : 0,
            size: params.pageSize,
          });
          let resData: API.TeacherDto[] = [];
          let total: number = 0;
          if (response?.code === 0) {
            resData = response.data?.users ? response.data.users : [];
            total = response.data?.paginate?.total || 0;
          } else {
            messageApi.error(response.message, 3);
          }
          return {
            data: resData,
            total: total,
          };
        }}
      />
      ;
    </>
  );
};
