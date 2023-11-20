import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import { APPROVE_COURSE_STATUS, COURSE_STATUS, DATE_FORMAT } from '@/constant';
import { blockCourse, cmsGetDetailById, unblockCourse } from '@/services/api/CourseController';
import { useParams } from '@umijs/max';
import { Button, Card, Col, message, Modal, Radio, Row, Tag } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import ModalApprove from './components/ModalApprove';
import ModalReject from './components/ModalReject';
import './ekyc.less';

const AuthEKYC: React.FC = () => {
  const [course, setCourse] = useState<API.CmsGetDetailCourseResponse>({});
  const [messageApi, contextHolder] = message.useMessage();
  const { courseId } = useParams();
  const [approve, setApprove] = useState<Boolean | undefined>(false);
  const [isOpenModalReject, setIsOpenModalReject] = useState<boolean>(false);
  const [isOpenModalApprove, setIsOpenModalApprove] = useState<boolean>(false);
  const [isOpenModalBlock, setIsOpenModalBlock] = useState<boolean>(false);
  const [isRender, setIsRender] = useState<boolean>(false);

  useEffect(() => {
    cmsGetDetailById({ id: courseId || '' })
      .then((res) => {
        if (res.code === 0) {
          setCourse(res.data || {});
          setApprove(APPROVE_COURSE_STATUS[res.data?.approveStatus || 'WAITING'].isApprove);
        } else {
          messageApi.error(res.message, 3);
        }
      })
      .catch((err) => {
        messageApi.error(err, 3);
      });
  }, [courseId, isRender]);
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
            path: '/courses',
          },
          {
            name: 'Thông tin chi tiết',
            path: '',
          },
        ]}
      />
      <Card
        title={<div className="title-card">Thông tin chi tiết khóa học</div>}
        style={{ width: '100%', borderRadius: 8 }}
      >
        <Row gutter={24} style={{ justifyContent: 'space-between' }}>
          <Col span={12}>
            <Card
              type="inner"
              title={<div className="title-card">Thông tin Khóa học</div>}
              style={{ borderRadius: 8 }}
            >
              <div className="custom-row-ekyc">
                <div className="custome-col">
                  <p className="text">Tên khóa học:</p>
                </div>
                <div className="custome-col">
                  <p className="text">{course?.courseName || '--'}</p>
                </div>
              </div>
              <div className="custom-row-ekyc">
                <div className="custome-col">
                  <p className="text">Mô tả:</p>
                </div>
                <div className="custome-col">
                  <p className="text">{course?.description || '--'}</p>
                </div>
              </div>
              <div className="custom-row-ekyc">
                <div className="custome-col">
                  <p className="text">Giá:</p>
                </div>
                <div className="custome-col">
                  <p className="text">{course?.price || '--'} VND</p>
                </div>
              </div>
              <div className="custom-row-ekyc">
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
              <div className="custom-row-ekyc">
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
              <div className="custom-row-ekyc">
                <div className="custome-col">
                  <p className="text">Ngày tạo:</p>
                </div>
                <div className="custome-col">
                  <p className="text">{moment(course?.createDate).format(DATE_FORMAT) || '--'}</p>
                </div>
              </div>
            </Card>
          </Col>
          <Col span={12}>
            <Card
              type="inner"
              title={<div className="title-card">Thông tin giáo viên</div>}
              style={{ borderRadius: 8 }}
            >
              <div className="custom-row-ekyc">
                <div className="custome-col">
                  <p className="text">Họ:</p>
                </div>
                <div className="custome-col">
                  <p className="text">{course?.firstName || '--'}</p>
                </div>
              </div>
              <div className="custom-row-ekyc">
                <div className="custome-col">
                  <p className="text">Tên:</p>
                </div>
                <div className="custome-col">
                  <p className="text">{course?.lastName || '--'}</p>
                </div>
              </div>
              <div className="custom-row-ekyc">
                <div className="custome-col">
                  <p className="text">Ngày sinh:</p>
                </div>
                <div className="custome-col">
                  {moment(course?.birthday).format(DATE_FORMAT) || '--'}
                </div>
              </div>
              <div className="custom-row-ekyc">
                <div className="custome-col">
                  <p className="text">Giới tính:</p>
                </div>
                <div className="custome-col">
                  <p className="text">{course?.gender || '--'}</p>
                </div>
              </div>
              <div className="custom-row-ekyc">
                <div className="custome-col">
                  <p className="text">Email:</p>
                </div>
                <div className="custome-col">
                  <p className="text">{course?.email || '--'}</p>
                </div>
              </div>
              <div className="custom-row-ekyc">
                <div className="custome-col">
                  <p className="text">Số điện thoại:</p>
                </div>
                <div className="custome-col">
                  <p className="text">{course?.phone || '--'}</p>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
        <Row gutter={24} style={{ marginTop: 40 }}>
          <Col span={24}>
            <Card
              type="inner"
              title="Kết quả phê duyệt"
              style={{ borderRadius: 8 }}
              actions={[
                <Button
                  disabled={course?.approveStatus === 'APPROVE' ? true : false}
                  style={{
                    backgroundColor: '#3366FF',
                    color: '#fff',
                    borderRadius: 8,
                    height: 40,
                    width: 100,
                  }}
                  onClick={() => {
                    approve ? setIsOpenModalApprove(true) : setIsOpenModalReject(true);
                  }}
                >
                  Xác nhận
                </Button>,
                <Button
                  style={{
                    backgroundColor: '#FD3549',
                    color: '#fff',
                    borderRadius: 8,
                    height: 40,
                    width: 100,
                  }}
                  onClick={() => {
                    setIsOpenModalBlock(true);
                  }}
                >
                  {course?.approveStatus === 'BLOCK' ? 'Mở khóa' : 'Khóa'}
                </Button>,
              ]}
            >
              <Radio.Group
                disabled={
                  APPROVE_COURSE_STATUS[course?.approveStatus || 'WAITING'].isApprove ? true : false
                }
                onChange={(e) => setApprove(e.target.value)}
                value={approve}
                defaultValue={APPROVE_COURSE_STATUS[course?.approveStatus || 'WAITING'].isApprove}
              >
                <Radio value={true}>Duyệt</Radio>
                <Radio value={false}>Từ chối</Radio>
              </Radio.Group>
            </Card>
          </Col>
        </Row>
      </Card>

      {/* model reject */}
      <ModalReject
        isOpen={isOpenModalReject}
        setIsOpen={setIsOpenModalReject}
        course={course}
        isRender={isRender}
        setIsRender={setIsRender}
      />

      <ModalApprove
        isOpen={isOpenModalApprove}
        setIsOpen={setIsOpenModalApprove}
        courseId={course.id || ''}
        isRender={isRender}
        setIsRender={setIsRender}
      />

      {/* Model bloack */}
      <Modal
        title={course?.approveStatus === 'BLOCK' ? 'Xác nhận mở khóa' : 'Xác nhận khóa'}
        okText="Xác nhận"
        cancelText="Hủy"
        open={isOpenModalBlock}
        onOk={() => {
          course?.approveStatus === 'BLOCK'
            ? unblockCourse({ id: course?.id || '' })
                .then((res) => {
                  if (res.code === 0) {
                    messageApi.success('Mở khóa học thành công', 3);
                    setIsRender(!isRender);
                  } else {
                    messageApi.error(res.message, 3);
                  }
                })
                .catch((err) => {
                  messageApi.error('Lỗi không xác định', 3);
                })
                .finally(() => setIsOpenModalBlock(false))
            : blockCourse({ id: course?.id || '' })
                .then((res) => {
                  if (res.code === 0) {
                    messageApi.success('Khóa khóa học thành công', 3);
                    setIsRender(!isRender);
                  } else {
                    messageApi.error(res.message, 3);
                  }
                })
                .catch((err) => {
                  messageApi.error('Lỗi không xác định', 3);
                })
                .finally(() => setIsOpenModalBlock(false));
        }}
        onCancel={() => setIsOpenModalBlock(false)}
      >
        {course?.approveStatus === 'BLOCK'
          ? 'Bạn có xác nhận mở khóa khóa học này?'
          : 'Bạn có xác nhận khóa khóa học này?'}
      </Modal>
    </>
  );
};

export default AuthEKYC;
