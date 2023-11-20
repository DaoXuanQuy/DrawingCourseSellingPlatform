import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import { APPROVE_COURSE_STATUS, COURSE_STATUS, GET_IMAGE, PAGE_SIZE } from '@/constant';
import { getDetailCourse, getUsersByCourse, settingCourse } from '@/services/api/CourseController';
import { PlusOutlined } from '@ant-design/icons';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { history, useParams } from '@umijs/max';
import { Button, Card, Col, Empty, Image, message, Modal, Row, Space, Spin, Tag } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import UpdateCourse from '../TableCourses/Components/UpdateCourse';
import Discount from './Components/Discount';
import './index.less';

export default () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState<API.CourseDto>();
  const [isReload, setIsReload] = useState<boolean>(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [isOpenModalDiscount, setIsOpenModalDiscount] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getDetailCourse({ id: courseId || '' })
      .then((res) => {
        if (res.code === 0) {
          setCourse(res.data?.course);
        }
      })
      .finally(() => setIsLoading(false));
  }, [courseId, isReload]);

  const columns: ProColumns<API.UserDto>[] = [
    {
      title: 'Ảnh đại diện',
      dataIndex: ['user', 'avatar'],
      key: 'avatar',
      align: 'center',
      search: false,
      render: (_, record) => {
        return (
          <Image src={record.avatar ? record.avatar : '/icons/Logo.png'} width={40} height={40} />
        );
      },
      width: '10%',
    },
    {
      title: 'Họ',
      dataIndex: 'firstName',
      key: 'firstName',
      align: 'center',
      search: false,
      width: '10%',
    },
    {
      title: 'Tên',
      dataIndex: 'lastName',
      key: 'lastName',
      align: 'center',
      search: false,
      width: '10%',
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'birthday',
      key: 'birthday',
      valueType: 'date',
      align: 'center',
      search: false,
      width: '12%',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      align: 'center',
      search: false,
      width: '15%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'center',
      search: false,
      width: '15%',
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
      search: false,
    },
    {
      title: 'Ngày tạo',
      key: 'createDate',
      dataIndex: 'createDate',
      valueType: 'date',
      align: 'center',
      search: false,
      width: '13%',
    },
  ];
  return (
    <>
      <BreadcrumbCustom
        subNav={[
          {
            name: 'Trang chủ',
            path: '/',
          },
          {
            name: 'Quản lí khóa học',
            path: '/courses',
          },
          {
            name: 'Chi tiết khóa học',
            path: '',
          },
        ]}
      />
      <Button
        size="middle"
        type="primary"
        style={{ maxWidth: '15%', float: 'right' }}
        icon={<PlusOutlined />}
        onClick={() => {
          history.push(`/courses/lessons/${courseId}`);
        }}
      >
        Thêm bài học
      </Button>
      <div className="detail-course-teacher">
        <Card title={<div className="title-card">Thông tin chi tiết</div>}>
          <Row
            gutter={24}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Col span={12}>
              <Card
                title={<div className="title-card">Thông tin khóa học</div>}
                actions={[
                  <Button
                    style={{ float: 'right', backgroundColor: '#52c41a', color: '#fff' }}
                    onClick={() => {
                      setIsOpenModalDiscount(true);
                    }}
                  >
                    Thêm giảm giá
                  </Button>,
                  <Button
                    type="primary"
                    style={{ float: 'right' }}
                    onClick={() => setIsOpenModalEdit(true)}
                  >
                    Chỉnh sửa
                  </Button>,
                  <Button
                    style={{
                      float: 'right',
                      backgroundColor: course?.status === 'ACTIVE' ? '#faad14' : '#52c41a',
                      color: '#fff',
                    }}
                    onClick={() => {
                      Modal.confirm({
                        title: <div>Xác nhận cài đặt</div>,
                        content:
                          course?.status === 'INACTIVE'
                            ? 'Bạn có chắc chắn kích hoạt khóa học này không?'
                            : 'Bạn có chắc chắn tạm dừng khóa học này không?',
                        onOk: () => {
                          settingCourse({
                            id: course?.id || '',
                            status: course?.status === 'INACTIVE' ? 'ACTIVE' : 'INACTIVE',
                          }).then((res) => {
                            if (res.code === 0) {
                              message.success('Cài đặt khóa học thành công', 3);
                              setIsReload(!isReload);
                            } else {
                              message.error(res.message, 3);
                            }
                          });
                        },
                      });
                    }}
                  >
                    {course?.status === 'ACTIVE' ? 'Tạm dừng' : 'Kích hoạt'}
                  </Button>,
                ]}
              >
                <Spin spinning={isLoading}>
                  {course === undefined ? (
                    <Empty />
                  ) : (
                    <>
                      <div className="custom-row-course">
                        <div className="custome-col">
                          <p className="text">Ảnh khóa học:</p>
                        </div>
                        <div className="custome-col">
                          <Image width={80} height={80} src={GET_IMAGE.getUrl(course.imageUrl)} />
                        </div>
                      </div>
                      <div className="custom-row-course">
                        <div className="custome-col">
                          <p className="text">Tên khóa học:</p>
                        </div>
                        <div className="custome-col">
                          <p className="text">{course?.courseName || '--'}</p>
                        </div>
                      </div>
                      <div className="custom-row-course">
                        <div className="custome-col">
                          <p className="text">Giá:</p>
                        </div>
                        <div className="custome-col">
                          <p className="text">{(course?.price || 0).toLocaleString()} VND</p>
                        </div>
                      </div>
                      <div className="custom-row-course">
                        <div className="custome-col">
                          <p className="text">Giảm giá:</p>
                        </div>
                        <div className="custome-col">
                          <p className="text">{course?.discountPercentage || 0}%</p>
                        </div>
                      </div>
                      <div className="custom-row-course">
                        <div className="custome-col">
                          <p className="text">Thành tiền:</p>
                        </div>
                        <div className="custome-col">
                          <p className="text">
                            {(
                              (course?.price || 0) *
                              (1 - (course?.discountPercentage || 0) / 100)
                            ).toLocaleString()}{' '}
                            VND
                          </p>
                        </div>
                      </div>
                      <div className="custom-row-course">
                        <div className="custome-col">
                          <p className="text">Mô tả:</p>
                        </div>
                        <div className="custome-col">
                          <div
                            className="ql-editor"
                            dangerouslySetInnerHTML={{
                              __html: course.description || '--',
                            }}
                          />
                        </div>
                      </div>
                      <div className="custom-row-course">
                        <div className="custome-col">
                          <p className="text">Trạng thái:</p>
                        </div>
                        <div className="custome-col">
                          <Tag
                            className="text-tag"
                            color={COURSE_STATUS[course?.status || 'INACTIVE'].type}
                          >
                            {COURSE_STATUS[course?.status || 'INACTIVE'].nameVi}
                          </Tag>
                        </div>
                      </div>
                      <div className="custom-row-course">
                        <div className="custome-col">
                          <p className="text">Trạng thái duyệt:</p>
                        </div>
                        <div className="custome-col">
                          <Tag
                            className="text-tag"
                            color={APPROVE_COURSE_STATUS[course?.approveStatus || 'WAITING'].type}
                          >
                            {APPROVE_COURSE_STATUS[course?.approveStatus || 'WAITING'].nameVi}
                          </Tag>
                        </div>
                      </div>
                      <div className="custom-row-course">
                        <div className="custome-col">
                          <p className="text">Ngày tạo:</p>
                        </div>
                        <div className="custome-col">
                          <p className="text">
                            {course?.createDate
                              ? moment(course?.createDate).format('HH:mm:ss DD/MM/YYYY')
                              : '--'}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </Spin>
              </Card>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}>
              <Card title={<div className="title-card">Danh sách học sinh</div>}>
                <ProTable<API.UserDto, API.getUsersByCourseParams>
                  columns={columns}
                  rowKey="key"
                  search={false}
                  expandable={{ showExpandColumn: true }}
                  toolBarRender={false}
                  pagination={{
                    showTotal: (total, [start, end]) => <p>{`${start}-${end}/${total}`}</p>,
                    pageSize: PAGE_SIZE,
                  }}
                  request={async (params) => {
                    const response = await getUsersByCourse({
                      courseId: courseId || '',
                      page: params.current ? params.current - 1 : 0,
                      size: params.pageSize,
                    });
                    let resData: API.UserDto[] = [];
                    let total: number = 0;
                    if (response?.code === 0) {
                      resData = response.data?.users ? response.data.users : [];
                      total = response.data?.paginate?.total || 0;
                    } else {
                      message.error(response.message, 3);
                    }
                    return {
                      data: resData,
                      total: total,
                    };
                  }}
                />
              </Card>
            </Col>
          </Row>
        </Card>
      </div>
      <UpdateCourse
        isOpen={isOpenModalEdit}
        handleOpen={(e) => {
          setIsOpenModalEdit(e);
        }}
        isRender={isReload}
        setIsRender={(e) => {
          setIsReload(e);
        }}
        course={course}
      />
      <Discount
        isOpen={isOpenModalDiscount}
        setIsOpen={setIsOpenModalDiscount}
        course={course || {}}
        isReload={isReload}
        setIsReload={setIsReload}
      />
    </>
  );
};
