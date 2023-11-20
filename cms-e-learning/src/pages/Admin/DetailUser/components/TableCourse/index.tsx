import { GET_IMAGE, PAGE_SIZE } from '@/constant';
import { cmsGetCourses } from '@/services/api/CourseController';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { Image, message } from 'antd';

interface Props {
  userId: string;
  isReload: boolean;
}

export default (props: Props) => {
  const { userId, isReload } = props;
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
      width: '20%',
    },
    {
      title: 'Tên khóa học',
      dataIndex: 'courseName',
      key: 'courseName',
      align: 'center',
      search: false,
      width: '20%',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      align: 'center',
      search: false,
      width: '20%',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      align: 'center',
      search: false,
      render: (_, record) => {
        return <span>{record.price} VND</span>;
      },
      width: '20%',
    },

    {
      title: 'Ngày tạo',
      key: 'createDate',
      dataIndex: 'createDate',
      valueType: 'date',
      align: 'center',
      search: false,
      width: '20%',
    },
  ];
  return (
    <>
      {contextHolder}
      <ProTable<API.CourseDto, { isReload: boolean }>
        params={{ isReload }}
        columns={columns}
        rowKey="key"
        search={false}
        className="table-teacher"
        options={{ search: false }}
        expandable={{ showExpandColumn: false }}
        headerTitle="Danh sách khóa học đăng ký"
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
          const response = await cmsGetCourses({
            idUser: userId,
            page: params.current ? params.current - 1 : 0,
            size: params.pageSize,
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
