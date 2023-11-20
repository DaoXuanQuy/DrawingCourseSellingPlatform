import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import { GET_IMAGE, PAGE_SIZE, STATUS_EKYC } from '@/constant';
import { getListRequestRoleTeacher } from '@/services/api/teacherController';
import { banUser, unbanUser } from '@/services/api/UserController';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  LockOutlined,
  SearchOutlined,
  UnlockOutlined,
} from '@ant-design/icons';
import { ProColumns, ProTable, TableDropdown } from '@ant-design/pro-components';
import {
  Button,
  DatePicker,
  Form,
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
import ModalApprove from '../AuthEKYC/components/ModalApprove';
import ModalReject from '../AuthEKYC/components/ModalReject';
import AddAdministrator from './Components/AddAdministrator';
import './style.less';

const { RangePicker } = DatePicker;

export default () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isReload, setIsReload] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [teacherSelect, setTeacherSelect] = useState<API.TeacherDto>({});
  const [isOpenModalReject, setIsOpenModalReject] = useState<boolean>(false);
  const [isOpenModalApprove, setIsOpenModalApprove] = useState<boolean>(false);
  const [form] = Form.useForm();

  const columns: ProColumns<API.TeacherDto>[] = [
    {
      title: 'Ảnh đại diện',
      dataIndex: ['user', 'avatar'],
      key: 'avatar',
      align: 'center',
      search: false,
      render: (_, record) => {
        return (
          <Image
            src={record.user?.avatar ? GET_IMAGE.getUrl(record.user?.avatar) : '/icons/Logo.png'}
            width={40}
            height={40}
          />
        );
      },
    },
    {
      title: 'Họ',
      dataIndex: ['user', 'firstName'],
      key: 'firstName',
      align: 'center',
      search: false,
      onCell: (data) => {
        return {
          onClick: () => history.push(`/manage/teachers/${data.id}`),
        };
      },
    },
    {
      title: 'Tên',
      dataIndex: ['user', 'lastName'],
      key: 'teacherName',
      align: 'center',
      renderFormItem: () => {
        return <Input className="form-item" placeholder="Tên người dùng" />;
      },
      onCell: (data) => {
        return {
          onClick: () => history.push(`/manage/teachers/${data.id}`),
        };
      },
    },
    {
      title: 'Ngày sinh',
      dataIndex: ['user', 'birthday'],
      key: 'birthday',
      valueType: 'date',
      align: 'center',
      search: false,
      onCell: (data) => {
        return {
          onClick: () => history.push(`/manage/teachers/${data.id}`),
        };
      },
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
      align: 'center',
      search: false,
      width: '15%',
      render: (_, record) => {
        let address: string = '';
        address = address.concat(record.user?.homeNumber ? record.user.homeNumber.toString() : '');
        address = address.concat(record.user?.streetName ? `, ${record.user.streetName}` : '');
        address = address.concat(
          record.user?.ward && record.user.ward.name ? `, ${record.user.ward.name}` : '',
        );
        address = address.concat(
          record.user?.district && record.user.district.name
            ? `, ${record.user.district.name}`
            : '',
        );
        address = address.concat(
          record.user?.province && record.user.province.name
            ? `, ${record.user.province.name}`
            : '',
        );
        return address;
      },
      onCell: (data) => {
        return {
          onClick: () => history.push(`/manage/teachers/${data.id}`),
        };
      },
    },
    {
      title: 'Số điện thoại',
      dataIndex: ['user', 'phone'],
      key: 'phone',
      align: 'center',
      renderFormItem: () => {
        return <Input className="form-item" placeholder="Số điện thoại" />;
      },
      onCell: (data) => {
        return {
          onClick: () => history.push(`/manage/teachers/${data.id}`),
        };
      },
    },
    {
      title: 'Email',
      dataIndex: ['user', 'email'],
      key: 'email',
      align: 'center',
      search: false,
      onCell: (data) => {
        return {
          onClick: () => history.push(`/manage/teachers/${data.id}`),
        };
      },
    },
    {
      title: 'Trạng thái eKYC',
      dataIndex: 'status',
      key: 'status',
      valueType: 'select',
      render: (_, record) => {
        return (
          <Space>
            <Tag
              style={{ width: '130%' }}
              color={record.status !== undefined ? STATUS_EKYC[record.status].type : ''}
            >
              {record.status !== undefined ? STATUS_EKYC[record.status].nameVi : ''}
            </Tag>
          </Space>
        );
      },
      valueEnum: {
        ALL: { text: '--', status: '' },
        CREATE: {
          text: STATUS_EKYC.CREATE.nameEn,
          status: STATUS_EKYC.CREATE.nameEn,
        },
        ACTIVE: {
          text: STATUS_EKYC.ACTIVE.nameEn,
          status: STATUS_EKYC.ACTIVE.nameEn,
        },
        BAN: {
          text: STATUS_EKYC.BAN.nameEn,
          status: STATUS_EKYC.BAN.nameEn,
        },
      },
      renderFormItem: () => {
        return (
          <Select
            options={[
              { value: '', label: 'Tất cả' },
              { value: STATUS_EKYC.ACTIVE.nameEn, label: STATUS_EKYC.ACTIVE.nameVi },
              { value: STATUS_EKYC.CREATE.nameEn, label: STATUS_EKYC.CREATE.nameVi },
              { value: STATUS_EKYC.BAN.nameEn, label: STATUS_EKYC.BAN.nameVi },
            ]}
            defaultValue={{ value: '', label: 'Tất cả' }}
          />
        );
      },
      align: 'center',
      onCell: (data) => {
        return {
          onClick: () => history.push(`/manage/teachers/${data.id}`),
        };
      },
    },

    {
      title: 'Trạng thái người dùng',
      dataIndex: ['user', 'ban'],
      key: 'ban',
      align: 'center',
      render: (_, record) => {
        return (
          <Space>
            <Tag style={{ width: '130%' }} color={record?.user?.ban ? 'error' : 'success'}>
              {record?.user?.ban ? 'Đã khóa' : 'Hoạt động'}
            </Tag>
          </Space>
        );
      },
      search: false,
      onCell: (data) => {
        return {
          onClick: () => history.push(`/manage/teachers/${data.id}`),
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
          onClick: () => history.push(`/manage/teachers/${data.id}`),
        };
      },
    },
    {
      title: 'Ngày duyệt',
      key: 'approveDate',
      dataIndex: 'approveDate',
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
          onClick: () => history.push(`/manage/teachers/${data.id}`),
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
                title: row?.user?.ban ? 'Xác nhận mở khóa' : 'Xác nhận khóa',
                content: row?.user?.ban
                  ? 'Bạn có xác nhận mở khóa tài khoản này?'
                  : 'Bạn có xác nhận khóa tài khoản này?',
                okText: 'Xác nhận',
                cancelText: 'Hủy',
                onOk: () => {
                  row?.user?.ban
                    ? unbanUser({ id: row?.user?.id || '' })
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
                    : banUser({ id: row?.user?.id || '' })
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
            <Tooltip title={row.user?.ban ? 'Mở khoá' : 'Khóa'}>
              {row.user?.ban ? <UnlockOutlined /> : <LockOutlined />}
            </Tooltip>
          </div>
          <div
            style={{ cursor: 'pointer', color: '#1890ff', fontSize: '20px', margin: '0 6px' }}
            key="1"
            onClick={() => {
              // setIsOpenModal(true);
            }}
          >
            <TableDropdown
              key="actionGroup"
              menus={[
                {
                  key: 'APPROVE',
                  name: (
                    <div
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}
                      onClick={() => {
                        if (row.status === 'ACTIVE') {
                          messageApi.info('Yêu cầu đã được duyệt');
                          return;
                        }
                        setTeacherSelect(row);
                        setIsOpenModalApprove(true);
                      }}
                    >
                      <div style={{ color: '#52c41a' }}>
                        <CheckCircleOutlined style={{ marginRight: 4 }} />
                      </div>
                      <p style={{ margin: 0 }}>Duyệt</p>
                    </div>
                  ),
                },
                {
                  key: 'REJECT',
                  name: (
                    <div
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}
                      onClick={() => {
                        if (row.status === 'ACTIVE') {
                          messageApi.info('Yêu cầu đã được duyệt');
                          return;
                        }
                        setTeacherSelect(row);
                        setIsOpenModalReject(true);
                      }}
                    >
                      <div style={{ color: '#ff4d4f' }}>
                        <CloseCircleOutlined style={{ marginRight: 4 }} />
                      </div>
                      <p style={{ margin: 0 }}>Từ chối</p>
                    </div>
                  ),
                },
              ]}
            />
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
            name: 'Quản lí giáo viên',
            path: '',
          },
        ]}
      />
      <ProTable<API.TeacherDto, API.getListRequestRoleTeacherParams & { isReload: boolean }>
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
          span: 4,
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
          const [approveFromDate, approveToDate] = params['approveDate'] || [];
          console.log(params);

          const response = await getListRequestRoleTeacher({
            teacherName: params.teacherName,
            phone: params.phone,
            fromDate: fromDate ? moment(fromDate).format('DD/MM/YYYY') : undefined,
            toDate: toDate ? moment(toDate).format('DD/MM/YYYY') : undefined,
            approveFromDate: approveFromDate
              ? moment(approveFromDate).format('DD/MM/YYYY')
              : undefined,
            approveToDate: approveToDate ? moment(approveToDate).format('DD/MM/YYYY') : undefined,
            status: params.status,
            page: params.current ? params.current - 1 : 0,
            size: params.pageSize,
          });
          let resData: API.TeacherDto[] = [];
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
      />
      <ModalReject
        teacher={teacherSelect}
        isRender={isReload}
        setIsRender={setIsReload}
        isOpen={isOpenModalReject}
        setIsOpen={setIsOpenModalReject}
      />
      <ModalApprove
        teacher={teacherSelect}
        isRender={isReload}
        setIsRender={setIsReload}
        isOpen={isOpenModalApprove}
        setIsOpen={setIsOpenModalApprove}
      />
    </>
  );
};
