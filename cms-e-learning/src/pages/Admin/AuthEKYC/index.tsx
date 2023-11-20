import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import { DATE_FORMAT, GET_IMAGE, STATUS_EKYC } from '@/constant';
import { getDetail } from '@/services/api/teacherController';
import { banUser, unbanUser } from '@/services/api/UserController';
import { useParams } from '@umijs/max';
import { Button, Card, Col, Image, message, Modal, Radio, Row, Tag } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import ModalApprove from './components/ModalApprove';
import ModalReject from './components/ModalReject';
import './ekyc.less';

const AuthEKYC: React.FC = () => {
  const [teacher, setTeacher] = useState<API.TeacherDto>({});
  const [messageApi, contextHolder] = message.useMessage();
  const { teacherId } = useParams();
  const [approve, setApprove] = useState<Boolean | undefined>(false);
  const [isOpenModalReject, setIsOpenModalReject] = useState<boolean>(false);
  const [isOpenModalApprove, setIsOpenModalApprove] = useState<boolean>(false);
  const [isOpenModalBlock, setIsOpenModalBlock] = useState<boolean>(false);
  const [isRender, setIsRender] = useState<boolean>(false);

  useEffect(() => {
    getDetail({ id: teacherId })
      .then((res) => {
        if (res.code === 0) {
          setTeacher(res.data?.teacher || {});
          setApprove(STATUS_EKYC[res.data?.teacher?.status || 'CREATE'].isApprove);
        } else {
          messageApi.error(res.message, 3);
        }
      })
      .catch((err) => {
        messageApi.error(err, 3);
      });
  }, [teacherId, isRender]);
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
            name: 'Quản lí giáo viên',
            path: '/manage/teachers',
          },
          {
            name: 'Phê duyệt eKYC',
            path: '',
          },
        ]}
      />
      <Card
        title={<div className="title-card">Thông tin định danh</div>}
        style={{ width: '100%', borderRadius: 8 }}
      >
        <Row gutter={24} style={{ justifyContent: 'space-between' }}>
          <Col span={14}>
            <Card
              type="inner"
              title={<div className="title-card">Thông tin cá nhân</div>}
              style={{ borderRadius: 8 }}
            >
              <div className="custom-row-ekyc">
                <div className="custome-col">
                  <p className="text">Trạng thái duyệt:</p>
                </div>
                <div className="custome-col">
                  <Tag className="text-tag" color={STATUS_EKYC[teacher?.status || 'CREATE'].type}>
                    {STATUS_EKYC[teacher?.status || 'CREATE'].nameVi}
                  </Tag>
                </div>
              </div>
              <div className="custom-row-ekyc">
                <div className="custome-col">
                  <p className="text-headding">Thông tin chung</p>
                </div>
              </div>
              <div className="custom-row-ekyc">
                <div className="custome-col">
                  <p className="text">Họ:</p>
                </div>
                <div className="custome-col">
                  <p className="text">{teacher?.user?.firstName || '--'}</p>
                </div>
              </div>
              <div className="custom-row-ekyc">
                <div className="custome-col">
                  <p className="text">Tên:</p>
                </div>
                <div className="custome-col">
                  <p className="text">{teacher?.user?.lastName || '--'}</p>
                </div>
              </div>
              <div className="custom-row-ekyc">
                <div className="custome-col">
                  <p className="text">Ngày sinh:</p>
                </div>
                <div className="custome-col">
                  <p className="text">
                    {moment(teacher?.user?.birthday).format(DATE_FORMAT) || '--'}
                  </p>
                </div>
              </div>
              <div className="custom-row-ekyc">
                <div className="custome-col">
                  <p className="text">Giới tính:</p>
                </div>
                <div className="custome-col">
                  <p className="text">{teacher?.user?.gender || '--'}</p>
                </div>
              </div>
              <div className="custom-row-ekyc">
                <div className="custome-col">
                  <p className="text">Số điện thoại:</p>
                </div>
                <div className="custome-col">
                  <p className="text">{teacher?.user?.phone || '--'}</p>
                </div>
              </div>
              <div className="custom-row-ekyc">
                <div className="custome-col">
                  <p className="text">Email:</p>
                </div>
                <div className="custome-col">
                  <p className="text">{teacher?.user?.email || '--'}</p>
                </div>
              </div>
              <div className="custom-row-ekyc">
                <div className="custome-col">
                  <p className="text">Địa chỉ chi tiết:</p>
                </div>
                <div className="custome-col">
                  <p className="text">
                    {`${teacher?.user?.homeNumber || '--'},${teacher?.user?.streetName || '--'},
                    ${teacher?.user?.ward?.name || '--'}, ${teacher?.user?.district?.name || '--'},
                    ${teacher?.user?.province?.name || '--'}`}
                  </p>
                </div>
              </div>
              <div className="custom-row-ekyc">
                <div className="custome-col">
                  <p className="text">Trạng thái người dùng:</p>
                </div>
                <div className="custome-col">
                  <Tag className="text-tag" color={teacher?.user?.ban ? 'error' : 'success'}>
                    {teacher?.user?.ban ? 'Đã khóa' : 'Hoạt động'}
                  </Tag>
                </div>
              </div>
              <div className="custom-row-ekyc">
                <div className="custome-col">
                  <p className="text">Ngày đăng ký:</p>
                </div>
                <div className="custome-col">
                  <p className="text">
                    {moment(teacher?.user?.createDate).format(DATE_FORMAT) || '--'}
                  </p>
                </div>
              </div>
              <div className="custom-row-ekyc">
                <div className="custome-col">
                  <p className="text-headding">Thông yêu cầu định danh EKYC</p>
                </div>
              </div>
              <div className="custom-row-ekyc">
                <div className="custome-col">
                  <p className="text">Họ tên:</p>
                </div>
                <div className="custome-col">
                  <p className="text">{teacher?.ekyc?.name || '--'}</p>
                </div>
              </div>
              <div className="custom-row-ekyc">
                <div className="custome-col">
                  <p className="text">Ngày sinh:</p>
                </div>
                <div className="custome-col">
                  <p className="text">{teacher?.ekyc?.birthday || '--'}</p>
                </div>
              </div>
              <div className="custom-row-ekyc">
                <div className="custome-col">
                  <p className="text">Giới tính:</p>
                </div>
                <div className="custome-col">
                  <p className="text">{teacher?.ekyc?.sex || '--'}</p>
                </div>
              </div>
              <div className="custom-row-ekyc">
                <div className="custome-col">
                  <p className="text">Loại giấy tờ:</p>
                </div>
                <div className="custome-col">
                  <p className="text">{teacher?.ekyc?.document || '--'}</p>
                </div>
              </div>
              <div className="custom-row-ekyc">
                <div className="custome-col">
                  <p className="text">Số CCCD/CMND:</p>
                </div>
                <div className="custome-col">
                  <p className="text">{teacher?.ekyc?.no || '--'}</p>
                </div>
              </div>
              <div className="custom-row-ekyc">
                <div className="custome-col">
                  <p className="text">Tỉnh - Thành phố:</p>
                </div>
                <div className="custome-col">
                  <p className="text">{teacher?.ekyc?.province || '--'}</p>
                </div>
              </div>
              <div className="custom-row-ekyc">
                <div className="custome-col">
                  <p className="text">Quận - Huyện:</p>
                </div>
                <div className="custome-col">
                  <p className="text">{teacher?.ekyc?.district || '--'}</p>
                </div>
              </div>
              <div className="custom-row-ekyc">
                <div className="custome-col">
                  <p className="text">Xã - Phường:</p>
                </div>
                <div className="custome-col">
                  <p className="text">{teacher?.ekyc?.ward || '--'}</p>
                </div>
              </div>
              <div className="custom-row-ekyc">
                <div className="custome-col">
                  <p className="text">Quê quán:</p>
                </div>
                <div className="custome-col">
                  <p className="text">{teacher?.ekyc?.hometown || '--'}</p>
                </div>
              </div>
              <div className="custom-row-ekyc">
                <div className="custome-col">
                  <p className="text">Địa chỉ:</p>
                </div>
                <div className="custome-col">
                  <p className="text">{teacher?.ekyc?.address || '--'}</p>
                </div>
              </div>
              <div className="custom-row-ekyc">
                <div className="custome-col">
                  <p className="text">Quốc tịch:</p>
                </div>
                <div className="custome-col">
                  <p className="text">{teacher?.ekyc?.national || '--'}</p>
                </div>
              </div>
              <div className="custom-row-ekyc">
                <div className="custome-col">
                  <p className="text">Nơi cấp:</p>
                </div>
                <div className="custome-col">
                  <p className="text">{teacher?.ekyc?.issueBy || '--'}</p>
                </div>
              </div>
              <div className="custom-row-ekyc">
                <div className="custome-col">
                  <p className="text">Ngày đăng ký:</p>
                </div>
                <div className="custome-col">
                  <p className="text">{teacher?.ekyc?.issueDate || '--'}</p>
                </div>
              </div>
              <div className="custom-row-ekyc">
                <div className="custome-col">
                  <p className="text-headding">Lý do từ chối</p>
                </div>
              </div>
              <div className="custom-row-ekyc">
                <div className="custome-col">
                  <p className="text">Lý do:</p>
                </div>
                <div className="custome-col">
                  <p className="text">{teacher?.reasonDeny || '--'}</p>
                </div>
              </div>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              type="inner"
              title={<p className="title-card">Giấy tờ tùy thân (CMND/CCCD)</p>}
              style={{ borderRadius: 8 }}
            >
              <div>
                <div className="card-ekyc">
                  <p style={{ color: '#8E9ABB', fontSize: 16 }}>Mặt trước CMND/CCCD</p>
                  <Image
                    src={GET_IMAGE.getUrl(teacher.ekyc?.frontUrl)}
                    height={'50%'}
                    width={'60%'}
                    style={{ borderRadius: 8 }}
                  />
                </div>
                <div className="card-ekyc">
                  <p style={{ color: '#8E9ABB', fontSize: 16 }}>Mặt sau CMND/CCCD</p>
                  <Image
                    src={GET_IMAGE.getUrl(teacher.ekyc?.backUrl)}
                    height={'50%'}
                    width={'60%'}
                    style={{ borderRadius: 8 }}
                  />
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
                  disabled={teacher?.status === 'ACTIVE' ? true : false}
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
                  {teacher?.user?.ban ? 'Mở khóa' : 'Khóa'}
                </Button>,
              ]}
            >
              <Radio.Group
                disabled={STATUS_EKYC[teacher?.status || 'CREATE'].isApprove ? true : false}
                onChange={(e) => setApprove(e.target.value)}
                value={approve}
                defaultValue={STATUS_EKYC[teacher?.status || 'CREATE'].isApprove}
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
        teacher={teacher}
        isRender={isRender}
        setIsRender={setIsRender}
        isOpen={isOpenModalReject}
        setIsOpen={setIsOpenModalReject}
      />
      <ModalApprove
        teacher={teacher}
        isRender={isRender}
        setIsRender={setIsRender}
        isOpen={isOpenModalApprove}
        setIsOpen={setIsOpenModalApprove}
      />

      {/* Model bloack */}
      <Modal
        title={teacher?.user?.ban ? 'Xác nhận mở khóa' : 'Xác nhận khóa'}
        okText="Xác nhận"
        cancelText="Hủy"
        open={isOpenModalBlock}
        onOk={() => {
          teacher?.user?.ban
            ? unbanUser({ id: teacher?.user?.id || '' })
                .then((res) => {
                  if (res.code === 0) {
                    messageApi.success('Mở tài khoản thành công', 3);
                    setIsRender(!isRender);
                  } else {
                    messageApi.error(res.message, 3);
                  }
                })
                .catch((err) => {
                  messageApi.error(err, 3);
                })
                .finally(() => setIsOpenModalBlock(false))
            : banUser({ id: teacher?.user?.id || '' })
                .then((res) => {
                  if (res.code === 0) {
                    messageApi.success('Khóa tài khoản thành công', 3);
                    setIsRender(!isRender);
                  } else {
                    messageApi.error(res.message, 3);
                  }
                })
                .catch((err) => {
                  messageApi.error(err, 3);
                })
                .finally(() => setIsOpenModalBlock(false));
        }}
        onCancel={() => setIsOpenModalBlock(false)}
      >
        {teacher?.user?.ban
          ? 'Bạn có xác nhận mở khóa tài khoản này?'
          : 'Bạn có xác nhận khóa tài khoản này?'}
      </Modal>
    </>
  );
};

export default AuthEKYC;
