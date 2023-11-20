import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import { CATEGORY, PAGE_SIZE } from '@/constant';
import { getDetailWithFilterPaging } from '@/services/api/CMSForumCategoryController';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { ProColumns, ProTable, TableDropdown } from '@ant-design/pro-components';
import { history, useParams } from '@umijs/max';
import { Button, Input, message, Select, Space, Tag } from 'antd';
import { useEffect, useState } from 'react';
import ModalCategory from './ModalCategory';

export default (): JSX.Element => {
  const [isReload, setIsReload] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<API.CategoryDetail[]>([]);
  const [categorieSelect, setCategorieSelect] = useState<API.CategoryDetail>({});
  const [action, setAction] = useState<'ADD' | 'UPDATE'>();
  const { categoryId } = useParams();

  useEffect(() => {
    getDetailWithFilterPaging({ page: 0, size: 999 }).then((res) => {
      setCategories(
        res.data?.data?.filter((data) => data.parentId === null || data.parentId === undefined) ||
          [],
      );
    });
  }, []);

  const columns: ProColumns<API.CategoryDetail>[] = [
    {
      title: 'Tên Category',
      dataIndex: 'title',
      key: 'title',
      align: 'center',
      renderFormItem: () => {
        return <Input placeholder="Tên category" />;
      },
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      align: 'center',
      search: false,
    },
    {
      title: 'Số lượng topic',
      dataIndex: 'topic',
      key: 'topic',
      align: 'center',
      search: false,
    },
    {
      title: 'Sô lượng post',
      dataIndex: 'post',
      key: 'post',
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
              color={record.status !== undefined ? CATEGORY[record.status].color : ''}
            >
              {record.status !== undefined ? CATEGORY[record.status].label : ''}
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
                value: CATEGORY.ACTIVE.value,
                label: CATEGORY.ACTIVE.label,
              },
              {
                value: CATEGORY.INACTIVE.value,
                label: CATEGORY.INACTIVE.label,
              },
            ]}
            defaultValue={{ value: '', label: 'Tất cả' }}
          />
        );
      },
    },
    {
      title: 'Hành động',
      key: 'option',
      valueType: 'option',
      align: 'center',
      render: (text, row) => [
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            cursor: 'pointer',
          }}
        >
          <TableDropdown
            menus={[
              {
                key: 'Detail',
                name: <div onClick={() => history.push(`/forum/${row.id}`)}>Chi tiết</div>,
              },
              {
                key: 'update',
                name: (
                  <div
                    onClick={() => {
                      setCategorieSelect(row);
                      setIsOpen(true);
                      setAction('UPDATE');
                    }}
                  >
                    Cập nhật
                  </div>
                ),
              },
            ]}
          />
        </div>,
      ],
    },
  ];
  return (
    <>
      <BreadcrumbCustom
        subNav={
          categoryId
            ? [
                {
                  name: 'Trang chủ',
                  path: '/',
                },
                {
                  name: 'Quản lí diễn đàn',
                  path: '/forums/manage',
                },
                {
                  name: 'Chi tiết category',
                  path: '',
                },
              ]
            : [
                {
                  name: 'Trang chủ',
                  path: '/',
                },
                {
                  name: 'Quản lí diễn đàn',
                  path: '',
                },
              ]
        }
      />
      {categoryId ? (
        <></>
      ) : (
        <Button
          size="middle"
          type="primary"
          style={{ maxWidth: '15%', float: 'right' }}
          icon={<PlusOutlined />}
          onClick={() => {
            setIsOpen(true);
            setAction('ADD');
          }}
        >
          Thêm category
        </Button>
      )}
      <ProTable<API.CategoryInfo, API.getDetailWithFilterPagingParams & { isReload: boolean }>
        params={{ isReload }}
        columns={columns}
        options={{ search: false }}
        expandable={{ showExpandColumn: true }}
        pagination={{
          showTotal: (total, [start, end]) => <p>{`${start}-${end}/${total}`}</p>,
          pageSize: PAGE_SIZE,
        }}
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
        toolBarRender={false}
        request={async (params) => {
          const response = await getDetailWithFilterPaging({
            title: params.title,
            parentId: categoryId,
            status: params.status,
            page: params.current ? params.current - 1 : 0,
            size: params.pageSize,
          });
          let resData: API.CategoryDetail[] = [];
          let total: number = 0;
          if (response?.code === 0) {
            resData = response.data?.data ? response.data.data : [];
            total = response.data?.total || 0;
          } else {
            message.error(response.message, 3);
          }
          return {
            data: resData,
            total: total,
          };
        }}
      />
      <ModalCategory
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        category={action === 'ADD' ? {} : categorieSelect}
        categoriesRoot={categories}
        action={action}
        isReload={isReload}
        setIsReload={setIsReload}
      />
    </>
  );
};
