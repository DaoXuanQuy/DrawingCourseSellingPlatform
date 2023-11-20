import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import { DATE_FORMAT, GET_IMAGE } from '@/constant';
import { banUser, getInfoById, unbanUser } from '@/services/api/UserController';
import { useParams } from '@umijs/max';
import { Button, Card, Col, Image, message, Modal, Row, Tag } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import TableCourse from './components/TableCourse';
import './index.less';

interface Props {}

export default (props: Props) => {
  const {} = props;
  const [user, setUser] = useState<API.UserDto | undefined>({});
  const [isReload, setIsReload] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();
  const { userId } = useParams();

  useEffect(() => {
    getInfoById({ id: userId || '' })
      .then((res) => {
        if (res.code === 0) {
          setUser(res.data?.user);
        } else {
          messageApi.error(res.message, 3);
        }
      })
      .catch((err) => messageApi.error(err, 3));
  }, [userId, isReload]);
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
            name: 'Quản lí học sinh',
            path: '/manage/students',
          },
          {
            name: 'Thông tin chi tiết',
            path: '',
          },
        ]}
      />
      <Card
        title={<div className="title-card">Thông tin chi tiết học sinh</div>}
        style={{ width: '100%', borderRadius: 8, marginBottom: 12 }}
      >
        <Row gutter={24} style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div className="custom-row-ekyc">
              <div className="custome-col">
                <p className="text">Ảnh đại diện:</p>
              </div>
              <div className="custome-col">
                <Image
                  width={80}
                  height={80}
                  src={user?.avatar ? GET_IMAGE.getUrl(user.avatar) : '/icons/Logo.png'}
                />
              </div>
            </div>
            <div className="custom-row-ekyc">
              <div className="custome-col">
                <p className="text">Họ:</p>
              </div>
              <div className="custome-col">
                <p className="text">{user?.firstName || '--'}</p>
              </div>
            </div>
            <div className="custom-row-ekyc">
              <div className="custome-col">
                <p className="text">Tên:</p>
              </div>
              <div className="custome-col">
                <p className="text">{user?.lastName || '--'}</p>
              </div>
            </div>
            <div className="custom-row-ekyc">
              <div className="custome-col">
                <p className="text">Ngày sinh:</p>
              </div>
              <div className="custome-col">
                <p className="text">{moment(user?.birthday).format(DATE_FORMAT) || '--'}</p>
              </div>
            </div>
            <div className="custom-row-ekyc">
              <div className="custome-col">
                <p className="text">Giới tính:</p>
              </div>
              <div className="custome-col">
                <p className="text">{user?.gender || '--'}</p>
              </div>
            </div>
            <div className="custom-row-ekyc">
              <div className="custome-col">
                <p className="text">Số điện thoại:</p>
              </div>
              <div className="custome-col">
                <p className="text">{user?.phone || '--'}</p>
              </div>
            </div>
            <div className="custom-row-ekyc">
              <div className="custome-col">
                <p className="text">Email:</p>
              </div>
              <div className="custome-col">
                <p className="text">{user?.email || '--'}</p>
              </div>
            </div>
            <div className="custom-row-ekyc">
              <div className="custome-col">
                <p className="text">Địa chỉ chi tiết:</p>
              </div>
              <div className="custome-col">
                <p className="text">
                  {`${user?.homeNumber || '--'},${user?.streetName || '--'},
                    ${user?.ward?.name || '--'}, ${user?.district?.name || '--'},
                    ${user?.province?.name || '--'}`}
                </p>
              </div>
            </div>
            <div className="custom-row-ekyc">
              <div className="custome-col">
                <p className="text">Trạng thái người dùng:</p>
              </div>
              <div className="custome-col">
                <Tag className="text-tag" color={user?.ban ? 'error' : 'success'}>
                  {user?.ban ? 'Đã khóa' : 'Hoạt động'}
                </Tag>
              </div>
            </div>
            <div className="custom-row-ekyc">
              <div className="custome-col">
                <p className="text">Ngày đăng ký:</p>
              </div>
              <div className="custome-col">
                <p className="text">{moment(user?.createDate).format(DATE_FORMAT) || '--'}</p>
              </div>
            </div>
          </div>
        </Row>
        <Row gutter={24} style={{ marginTop: 40 }}>
          <Col span={24}>
            <Button
              disabled={!user?.ban}
              style={{
                backgroundColor: '#3366FF',
                color: '#fff',
                borderRadius: 8,
                height: 40,
                width: 100,
                opacity: user?.ban ? 1 : 0.5,
              }}
              onClick={() => {
                Modal.confirm({
                  title: 'Xác nhận mở khóa',
                  content: 'Bạn có xác nhận mở khóa tài khoản này?',
                  okText: 'Xác nhận',
                  cancelText: 'Hủy',
                  onOk: () => {
                    unbanUser({ id: user?.id || '' })
                      .then((res) => {
                        if (res.code === 0) {
                          messageApi.success('Mở tài khoản thành công', 3);
                          setIsReload(!isReload);
                        } else {
                          messageApi.error(res.message, 3);
                        }
                      })
                      .catch((err) => {
                        messageApi.error(err, 3);
                      });
                  },
                });
              }}
            >
              Mở khóa
            </Button>
            <Button
              disabled={user?.ban}
              style={{
                backgroundColor: '#FD3549',
                color: '#fff',
                borderRadius: 8,
                height: 40,
                width: 100,
                opacity: user?.ban ? 0.5 : 1,
              }}
              onClick={() => {
                Modal.confirm({
                  title: 'Xác nhận khóa',
                  content: 'Bạn có xác nhận khóa tài khoản này?',
                  okText: 'Xác nhận',
                  cancelText: 'Hủy',
                  onOk: () => {
                    banUser({ id: user?.id || '' })
                      .then((res) => {
                        if (res.code === 0) {
                          messageApi.success('Khóa tài khoản thành công', 3);
                          setIsReload(!isReload);
                        } else {
                          messageApi.error(res.message, 3);
                        }
                      })
                      .catch((err) => {
                        messageApi.error(err, 3);
                      });
                  },
                });
              }}
            >
              Khóa
            </Button>
          </Col>
        </Row>
      </Card>
      <TableCourse userId={userId || ''} isReload={isReload} />
    </>
  );
};
