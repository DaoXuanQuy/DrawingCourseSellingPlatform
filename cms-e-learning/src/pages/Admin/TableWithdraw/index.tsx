import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import { PAGE_SIZE, WITHDRAW_STATUS } from '@/constant';
import { cmsGetAllWithdrawInvoice } from '@/services/api/InvoiceController';
import { SearchOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, DatePicker, Input, message, Select, Space, Tag } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;
export default () => {
  const columns: ProColumns<API.WithdrawResponse>[] = [
    {
      title: 'Mã giao dịch',
      dataIndex: 'txnNumber',
      key: 'txnNumber',
      align: 'center',
      // search: false,
      width: '15%',
      renderFormItem: () => <Input placeholder="Mã giao dịch" />,
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
      title: 'Tên ngân hàng',
      dataIndex: 'commonName',
      key: 'commonName',
      align: 'center',
      search: false,
    },
    {
      title: 'Tên tài khoản',
      dataIndex: 'accountName',
      key: 'accountName',
      align: 'center',
      search: false,
    },
    {
      title: 'Số tài khoản',
      dataIndex: 'accountNo',
      key: 'accountNo',
      align: 'center',
      search: false,
    },
    {
      title: 'Số tiền',
      dataIndex: 'amount',
      key: 'amount',
      align: 'center',
      search: false,
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
              color={record.status !== undefined ? WITHDRAW_STATUS[record.status]?.color : ''}
            >
              {record.status !== undefined ? WITHDRAW_STATUS[record.status]?.nameVi : ''}
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
                value: WITHDRAW_STATUS.SUCCESS.value,
                label: WITHDRAW_STATUS.SUCCESS.nameVi,
              },
              {
                value: WITHDRAW_STATUS.PENDING.value,
                label: WITHDRAW_STATUS.PENDING.nameVi,
              },
              {
                value: WITHDRAW_STATUS.FAIL.value,
                label: WITHDRAW_STATUS.FAIL.nameVi,
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
      <ProTable<API.WithdrawResponse, API.cmsGetAllWithdrawInvoiceParams & { isReload: boolean }>
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
          let response: API.ResponseBaseGetAllWithdrawInvoiceResponse;

          response = await cmsGetAllWithdrawInvoice({
            fromDate: fromDate ? moment(fromDate).format('DD/MM/YYYY') : undefined,
            toDate: toDate ? moment(toDate).format('DD/MM/YYYY') : undefined,
            status: params.status,
            page: params.current ? params.current - 1 : 0,
            size: params.pageSize,
          });
          let resData: API.WithdrawResponse[] = [];
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
