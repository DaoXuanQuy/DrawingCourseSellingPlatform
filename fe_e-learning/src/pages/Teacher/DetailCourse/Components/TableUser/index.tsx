import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { getDetailCourse, getUsersByCourse } from '@/services/api/CourseController';
import { useEffect, useState } from 'react';
import { TableProps } from 'antd';

const valueEnum = {
  0: 'close',
  1: 'running',
  2: 'online',
  3: 'error',
};
interface Props {
  courseId: string;
}

const pageSize = 10;
export default (props: Props) => {
  const { courseId } = props;
  const [dataTable, setDataTable] = useState<API.UserEntity[]>([]);
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(1);
  const columns: ProColumns<API.UserEntity>[] = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Birthday',
      dataIndex: 'birthday',
      key: 'birthday',
      width: 200,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      width: 200,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: 200,
    },
    {
      title: 'Status',
      dataIndex: 'active',
      filters: true,
      onFilter: true,
      valueType: 'select',
      valueEnum: {
        true: { text: 'Active', status: 'Success' },
        false: { text: 'Block', status: 'Error' },
      },
    },
    {
      title: 'Create At',
      key: 'since2',
      dataIndex: 'createdAt',
      valueType: 'date',
      hideInSetting: true,
    },
  ];

  const getUsers = () => {
    getUsersByCourse({ courseId: courseId, page: current - 1, size: pageSize }).then((res) => {
      if (res.code === 0) {
        setDataTable(res.data?.users || []);
        setTotal(res.data?.paginate?.total || 0);
      }
    });
  };
  const onChange: TableProps<API.UserEntity>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
    setCurrent(pagination.current || 1);
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <>
      <ProTable<API.UserEntity, { keyWord?: string }>
        columns={columns}
        options={{
          search: {
            placeholder: 'Input text search',
          },
          setting: false,
          density: false,
        }}
        dataSource={dataTable}
        rowKey="key"
        search={false}
        dateFormatter="string"
        headerTitle="Table User"
        pagination={{
          total: total,
          showTotal: (total, [start, end]) => <p>{`${start}-${end}/${total}`}</p>,
          pageSize: pageSize,
        }}
        onChange={onChange}
      />
    </>
  );
};
