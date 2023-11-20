import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import { INVOICE_STATUS, PAGE_SIZE } from '@/constant';
import { getAll, teacherGetAll } from '@/services/api/InvoiceController';
import { SearchOutlined } from '@ant-design/icons';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { useAccess } from '@umijs/max';
import { Button, DatePicker, message, Select, Space, Tag } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

export default (): JSX.Element => {
  const access = useAccess();
  const columnsForStudent: ProColumns<API.InvoiceResponse>[] = [
    {
      title: 'Mã giao dịch',
      dataIndex: 'code',
      key: 'code',
      align: 'center',
      search: false,
      width: '15%',
    },
    {
      title: 'Khóa học',
      dataIndex: ['course', 'courseName'],
      key: 'courseName',
      align: 'center',
      search: false,
      width: '15%',
    },
    {
      title: 'Giá',
      dataIndex: 'amount',
      key: 'amount',
      align: 'center',
      search: false,
      width: '10%',
      render: (_, data) => {
        return (
          <>
            {(data.amount || 0).toLocaleString('vi-VN', {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
              minimumIntegerDigits: 1,
              useGrouping: true,
            })}{' '}
            VND
          </>
        );
      },
    },
    {
      title: 'Link thanh toán',
      dataIndex: 'url',
      key: 'url',
      align: 'center',
      search: false,
      width: '30%',
      render: (_, data) => {
        return (
          <div style={{ width: '456px', overflow: 'hidden' }}>
            <div
              style={{
                color: '#1677ff',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
              onClick={() => {
                if (access.canStudent) {
                  let messageString: string | undefined =
                    INVOICE_STATUS[data.status || 'NONE'].message;
                  if (messageString) {
                    message.error(messageString, 3);
                    return;
                  }
                  window.open(data.url);
                }
              }}
            >
              {data.url}
            </div>
          </div>
        );
      },
    },
    {
      title: 'Trạng thái thanh toán',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: '15%',
      render: (_, record) => {
        return (
          <Space>
            <Tag
              style={{ width: '130%' }}
              color={record.status !== undefined ? INVOICE_STATUS[record.status].color : ''}
            >
              {record.status !== undefined ? INVOICE_STATUS[record.status].nameVi : ''}
            </Tag>
          </Space>
        );
      },
      renderFormItem: () => {
        return (
          <Select
            options={[
              { value: '', label: 'Tất cả' },
              {
                value: INVOICE_STATUS.CREATED.value,
                label: INVOICE_STATUS.CREATED.nameVi,
              },
              {
                value: INVOICE_STATUS.SUCCESS.value,
                label: INVOICE_STATUS.SUCCESS.nameVi,
              },
              {
                value: INVOICE_STATUS.CANCELED.value,
                label: INVOICE_STATUS.CANCELED.nameVi,
              },
              {
                value: INVOICE_STATUS.FAIL.value,
                label: INVOICE_STATUS.FAIL.nameVi,
              },
              {
                value: INVOICE_STATUS.TIMEOUT.value,
                label: INVOICE_STATUS.TIMEOUT.nameVi,
              },
            ]}
            defaultValue={{ value: '', label: 'Tất cả' }}
          />
        );
      },
    },
    {
      title: 'Ngày giao dịch',
      dataIndex: 'time',
      key: 'time',
      align: 'center',
      width: '15%',
      render: (_, data) => {
        return <>{moment(data.time).format('HH:MM:SS DD/MM/YYYY')}</>;
      },
      renderFormItem: () => (
        <RangePicker
          allowEmpty={[true, true]}
          placeholder={['Từ ngày', 'Đến ngày']}
          format={['DD/MM/YYYY']}
        />
      ),
    },
  ];

  const columnsForTeacher: ProColumns<API.InvoiceResponse>[] = [
    {
      title: 'Mã giao dịch',
      dataIndex: 'code',
      key: 'code',
      align: 'center',
      search: false,
      width: '15%',
    },
    {
      title: 'Khóa học',
      dataIndex: ['course', 'courseName'],
      key: 'courseName',
      align: 'center',
      search: false,
      width: '10%',
    },
    {
      title: 'Giá',
      dataIndex: 'amount',
      key: 'amount',
      align: 'center',
      search: false,
      width: '10%',
      render: (_, data) => {
        return (
          <>
            {(data.amount || 0).toLocaleString('vi-VN', {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
              minimumIntegerDigits: 1,
              useGrouping: true,
            })}{' '}
            VND
          </>
        );
      },
    },
    {
      title: 'Người đăng ký',
      dataIndex: 'fullName',
      key: 'fullName',
      align: 'center',
      search: false,
      width: '15%',
      render: (_, data) => {
        return <>{`${data.user?.firstName} ${data.user?.lastName}`}</>;
      },
    },
    {
      title: 'Link thanh toán',
      dataIndex: 'url',
      key: 'url',
      align: 'center',
      search: false,
      width: '30%',
      render: (_, data) => {
        return (
          <div style={{ width: '456px', overflow: 'hidden' }}>
            <div
              style={{
                color: '#1677ff',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
              onClick={() => {
                if (access.canStudent) {
                  let messageString: string | undefined =
                    INVOICE_STATUS[data.status || 'NONE'].message;
                  if (messageString) {
                    message.error(messageString, 3);
                    return;
                  }
                  window.open(data.url);
                }
              }}
            >
              {data.url}
            </div>
          </div>
        );
      },
    },
    {
      title: 'Trạng thái thanh toán',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: '10%',
      render: (_, record) => {
        return (
          <Space>
            <Tag
              style={{ width: '130%' }}
              color={record.status !== undefined ? INVOICE_STATUS[record.status].color : ''}
            >
              {record.status !== undefined ? INVOICE_STATUS[record.status].nameVi : ''}
            </Tag>
          </Space>
        );
      },
      renderFormItem: () => {
        return (
          <Select
            options={[
              { value: '', label: 'Tất cả' },
              {
                value: INVOICE_STATUS.CREATED.value,
                label: INVOICE_STATUS.CREATED.nameVi,
              },
              {
                value: INVOICE_STATUS.SUCCESS.value,
                label: INVOICE_STATUS.SUCCESS.nameVi,
              },
              {
                value: INVOICE_STATUS.CANCELED.value,
                label: INVOICE_STATUS.CANCELED.nameVi,
              },
              {
                value: INVOICE_STATUS.FAIL.value,
                label: INVOICE_STATUS.FAIL.nameVi,
              },
              {
                value: INVOICE_STATUS.TIMEOUT.value,
                label: INVOICE_STATUS.TIMEOUT.nameVi,
              },
            ]}
            defaultValue={{ value: '', label: 'Tất cả' }}
          />
        );
      },
    },
    {
      title: 'Ngày giao dịch',
      dataIndex: 'time',
      key: 'time',
      align: 'center',
      width: '15%',
      render: (_, data) => {
        return <>{moment(data.time).format('HH:MM:SS DD/MM/YYYY')}</>;
      },
      renderFormItem: () => (
        <RangePicker
          allowEmpty={[true, true]}
          placeholder={['Từ ngày', 'Đến ngày']}
          format={['DD/MM/YYYY']}
        />
      ),
    },
  ];
  return (
    <>
      <BreadcrumbCustom
        subNav={[
          { name: 'Trang chủ', path: '/' },
          { name: 'Lịch sử giao dịch', path: '' },
        ]}
      />
      <ProTable<API.InvoiceResponse, API.getAllParams & { isReload: boolean }>
        columns={access.canStudent ? columnsForStudent : columnsForTeacher}
        toolBarRender={false}
        options={{ search: true }}
        expandable={{ showExpandColumn: true }}
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
          labelWidth: 'auto',
        }}
        request={async (params) => {
          const [fromDate, toDate] = params['time'] || [];
          let response: API.ResponseBaseGetAllInvoiceResponse;
          if (access.canStudent) {
            response = await getAll({
              fromDate: fromDate ? moment(fromDate).format('DD/MM/YYYY') : undefined,
              toDate: toDate ? moment(toDate).format('DD/MM/YYYY') : undefined,
              status: params.status,
              page: params.current ? params.current - 1 : 0,
              size: params.pageSize,
            });
          } else {
            response = await teacherGetAll({
              fromDate: fromDate ? moment(fromDate).format('DD/MM/YYYY') : undefined,
              toDate: toDate ? moment(toDate).format('DD/MM/YYYY') : undefined,
              status: params.status,
              page: params.current ? params.current - 1 : 0,
              size: params.pageSize,
            });
          }
          let resData: API.InvoiceResponse[] = [];
          let total: number = 0;
          if (response?.code === 0) {
            resData = response.data?.invoices ? response.data.invoices : [];
            total = response.data?.paginate?.total || 0;
          } else {
            message.error(response.message, 3);
          }
          return {
            data: resData,
            total: total,
          };
        }}
        pagination={{
          showTotal: (total, [start, end]) => <p>{`${start}-${end}/${total}`}</p>,
          pageSize: PAGE_SIZE,
        }}
      />
    </>
  );
};
