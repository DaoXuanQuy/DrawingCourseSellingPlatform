import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import { INVOICE_STATUS, PAGE_SIZE } from '@/constant';
import { cmsGetAll } from '@/services/api/InvoiceController';
import { SearchOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, DatePicker, message, Select, Space, Tag } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;
export default () => {
  const columns: ProColumns<API.InvoiceResponse>[] = [
    {
      title: 'Mã giao dịch',
      dataIndex: 'code',
      key: 'code',
      align: 'center',
      search: false,
      width: '15%',
    },
    {
      title: 'Tên',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (_, data) => {
        return <div>{data.user ? `${data.user?.firstName} ${data.user?.lastName}` : '-'}</div>;
      },
      align: 'center',
      search: false,
    },
    {
      title: 'Email',
      dataIndex: ['user', 'email'],
      key: 'email',
      align: 'center',
      search: false,
    },
    {
      title: 'Số điện thoại',
      dataIndex: ['user', 'phone'],
      key: 'phone',
      align: 'center',
      search: false,
    },
    {
      title: 'Khóa học',
      dataIndex: ['course', 'courseName'],
      key: 'courseName',
      align: 'center',
      search: false,
    },
    {
      title: 'Giá',
      dataIndex: ['course', 'price'],
      key: 'price',
      align: 'center',
      search: false,
    },
    {
      title: 'Link Thanh toán',
      dataIndex: 'url',
      key: 'url',
      align: 'center',
      search: false,
      width: '20%',
      render: (_, data) => {
        return (
          <div style={{ width: '345px', overflow: 'hidden' }}>
            <div
              style={{
                color: '#1677ff',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {data.url}
            </div>
          </div>
        );
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
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
          {
            name: 'Trang chủ',
            path: '/dashboard',
          },
          {
            name: 'Lịch sử giao dịch',
            path: '',
          },
        ]}
      />
      <ProTable<API.InvoiceResponse, API.getAllParams & { isReload: boolean }>
        columns={columns}
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

          response = await cmsGetAll({
            fromDate: fromDate ? moment(fromDate).format('DD/MM/YYYY') : undefined,
            toDate: toDate ? moment(toDate).format('DD/MM/YYYY') : undefined,
            status: params.status,
            page: params.current ? params.current - 1 : 0,
            size: params.pageSize,
          });
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
