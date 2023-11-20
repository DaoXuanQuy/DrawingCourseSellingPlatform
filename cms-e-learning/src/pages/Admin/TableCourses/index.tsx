import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import { APPROVE_COURSE_STATUS, COURSE_STATUS, GET_IMAGE, PAGE_SIZE } from '@/constant';
import { cmsGetCourses } from '@/services/api/CourseController';
import { SearchOutlined } from '@ant-design/icons';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, DatePicker, Image, Input, message, Select, Space, Tag } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { history } from 'umi';
import './style.less';

const { RangePicker } = DatePicker;

export default () => {
  const [isReload, setIsReload] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const columns: ProColumns<API.CourseDto>[] = [
    {
      title: 'Ảnh khóa học',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      align: 'center',
      search: false,
      render: (_, record) => {
        return (
          <Image
            src={record.imageUrl ? GET_IMAGE.getUrl(record.imageUrl) : '/icons/Logo.png'}
            width={40}
            height={40}
          />
        );
      },
      width: '10%',
    },
    {
      title: 'Tên khóa học',
      dataIndex: 'courseName',
      key: 'courseName',
      align: 'center',
      width: '15%',
      renderFormItem: () => {
        return <Input className="form-item" placeholder="Tên khóa học" />;
      },
      onCell: (data) => {
        return {
          onClick: () => history.push(`/manage/courses/${data.id}`),
        };
      },
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      align: 'center',
      search: false,
      width: '17%',
      render: (_, record) => {
        return (
          <div
            className="long-text ql-editor"
            dangerouslySetInnerHTML={{
              __html: `${record.description ? record.description : '-'}`,
            }}
          />
        );
      },
      onCell: (data) => {
        return {
          onClick: () => history.push(`/manage/courses/${data.id}`),
        };
      },
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      align: 'center',
      search: false,
      render: (_, record) => {
        return <span>{record.price || 0} VND</span>;
      },
      width: '10%',
      onCell: (data) => {
        return {
          onClick: () => history.push(`/manage/courses/${data.id}`),
        };
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
              color={record.status !== undefined ? COURSE_STATUS[record.status].type : ''}
            >
              {record.status !== undefined ? COURSE_STATUS[record.status].nameVi : ''}
            </Tag>
          </Space>
        );
      },
      renderFormItem: () => {
        return (
          <Select
            options={[
              { value: '', label: 'Tất cả' },
              { value: COURSE_STATUS.ACTIVE.nameEn, label: COURSE_STATUS.ACTIVE.nameVi },
              { value: COURSE_STATUS.INACTIVE.nameEn, label: COURSE_STATUS.INACTIVE.nameVi },
            ]}
            defaultValue={{ value: '', label: 'Tất cả' }}
          />
        );
      },
      onCell: (data) => {
        return {
          onClick: () => history.push(`/manage/courses/${data.id}`),
        };
      },
      width: '12%',
    },
    {
      title: 'Trạng thái phê duyệt',
      dataIndex: 'approveStatus',
      key: 'approveStatus',
      align: 'center',
      render: (_, record) => {
        return (
          <Space>
            <Tag
              style={{ width: '130%' }}
              color={
                record.approveStatus !== undefined
                  ? APPROVE_COURSE_STATUS[record.approveStatus].type
                  : ''
              }
            >
              {record.approveStatus !== undefined
                ? APPROVE_COURSE_STATUS[record.approveStatus].nameVi
                : ''}
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
                value: APPROVE_COURSE_STATUS.APPROVE.nameEn,
                label: APPROVE_COURSE_STATUS.APPROVE.nameVi,
              },
              {
                value: APPROVE_COURSE_STATUS.BLOCK.nameEn,
                label: APPROVE_COURSE_STATUS.BLOCK.nameVi,
              },
              {
                value: APPROVE_COURSE_STATUS.WAITING.nameEn,
                label: APPROVE_COURSE_STATUS.WAITING.nameVi,
              },
            ]}
            defaultValue={{ value: '', label: 'Tất cả' }}
          />
        );
      },
      onCell: (data) => {
        return {
          onClick: () => history.push(`/manage/courses/${data.id}`),
        };
      },
      width: '15%',
    },
    {
      title: 'Ngày tạo',
      key: 'createDate',
      dataIndex: 'createDate',
      valueType: 'date',
      align: 'center',
      width: '10%',
      renderFormItem: () => (
        <RangePicker
          allowEmpty={[true, true]}
          placeholder={['Từ ngày', 'Đến ngày']}
          format={['DD/MM/YYYY']}
        />
      ),
      onCell: (data) => {
        return {
          onClick: () => history.push(`/manage/courses/${data.id}`),
        };
      },
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
            name: 'Quản lí khóa học',
            path: '',
          },
        ]}
      />
      <ProTable<API.CourseDto, API.cmsGetCoursesParams & { isReload: boolean }>
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
        headerTitle="Danh sách khóa học"
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
          const response = await cmsGetCourses({
            courseName: params.courseName,
            fromDate: fromDate ? moment(fromDate).format('DD/MM/YYYY') : undefined,
            toDate: toDate ? moment(toDate).format('DD/MM/YYYY') : undefined,
            status: params.status,
            approveStatus: params.approveStatus,
            page: params.current ? params.current - 1 : 0,
            size: params.pageSize,
            sort: 'createDate,desc',
          });
          let resData: API.CourseDto[] = [];
          let total: number = 0;
          if (response?.code === 0) {
            resData = response.data?.courses ? response.data.courses : [];
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
