import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import { getUsers } from '@/services/api/UserController';
import { DeleteFilled, EditFilled, ExclamationCircleOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Modal, TableProps } from 'antd';
import { useEffect, useState } from 'react';
import DetailUser from './Components/DetailUser';

const pageSize = 10;
export default () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dataUsers, setDataUsers] = useState<API.UserEntity[]>([]);
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(1);
  const [userSelect, setUserSelect] = useState<API.UserEntity>({});

  const getAllUser = async (params: API.getUsersParams) => {
    const response = await getUsers(params);
    if (response?.code === 0) {
      console.log('users: ', response.data?.users);
      console.log('response: ', response);

      setDataUsers(response.data?.users || []);
      setTotal(response.data?.paginate?.total || 0);
    }
  };

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
    {
      title: 'Action',
      key: 'option',
      width: 120,
      valueType: 'option',
      render: (text, row) => [
        <div
          style={{ cursor: 'pointer', color: '#1890ff', fontSize: '20px' }}
          key="1"
          onClick={() => {
            setIsOpen(true);
            setUserSelect(row);
          }}
        >
          <EditFilled />
        </div>,
        <div
          style={{ cursor: 'pointer', color: '#ff4d4f', fontSize: '20px' }}
          key="2"
          onClick={() => {
            Modal.confirm({
              title: 'Confirm',
              icon: <ExclamationCircleOutlined />,
              content: 'Bla bla ...',
              okText: '确认',
              cancelText: '取消',
              onOk: () => {
                console.log(row);
              },
            });
          }}
        >
          <DeleteFilled />
        </div>,
      ],
    },
  ];
  const onChange: TableProps<API.UserEntity>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
    setCurrent(pagination.current || 1);
  };

  useEffect(() => {
    getAllUser({ page: current - 1, size: pageSize });
  }, [current, dataUsers.length]);
  return (
    <>
      <BreadcrumbCustom
        subNav={[
          {
            name: 'Home',
            path: '/welcome',
          },
          {
            name: 'Manage User',
            path: '',
          },
        ]}
      />
      <ProTable<API.UserEntity, { keyWord?: string }>
        columns={columns}
        dataSource={dataUsers}
        options={{
          search: true,
          setting: false,
          density: false,
        }}
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
        // onRow={(data) => ({
        //   onClick: () => {
        //     setUserSelect(data);
        //   },
        // })}
      />
      <DetailUser isOpen={isOpen} setIsOpen={setIsOpen} user={userSelect} />
    </>
  );
};
