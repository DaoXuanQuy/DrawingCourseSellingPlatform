import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import { DATE_FORMAT, USER_STATUS } from '@/constant';
import { getInfoAdmin } from '@/services/api/administratorController';
import { useModel } from '@umijs/max';
import { Button, Card, message, Tag } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import AddAdministrator from '../Admin/TableAdministrators/Components/AddAdministrator';
import './index.less';

export default () => {
  const [admin, setAdmin] = useState<API.AdministratorDto>();
  const [messageApi, contextHolder] = message.useMessage();
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [isOpenModalPassword, setIsOpenModalPassword] = useState(false);
  const [isReload, setIsReload] = useState(false);
  const { initialState, setInitialState } = useModel('@@initialState');

  useEffect(() => {
    getInfoAdmin()
      .then((res) => {
        if (res.code === 0) {
          setAdmin(res.data?.administrator);
          setInitialState({ ...initialState, currentUser: res.data });
        } else {
          messageApi.error(res.message, 3);
        }
      })
      .catch((err) => messageApi.error('Lỗi không xác định', 3));
  }, [isReload]);
  console.log(isReload);

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
            path: '/infomation',
            name: 'Thông tin cá nhân',
          },
        ]}
      />
      <div className="custome-info">
        <Card
          type="inner"
          title={<div className="title-card">Thông tin cá nhân</div>}
          style={{ borderRadius: 8, width: '60%' }}
          actions={[
            <Button
              style={{
                backgroundColor: '#3366FF',
                color: '#fff',
                borderRadius: 8,
                height: 40,
                width: 100,
              }}
              onClick={() => {
                setIsOpenModalEdit(true);
              }}
            >
              Chỉnh sửa
            </Button>,
            <Button
            style={{
              backgroundColor: 'rgb(250, 173, 20)',
              color: '#fff',
              borderRadius: 8,
              height: 40,
              width: 120,
            }}
            onClick={() => {
              setIsOpenModalEdit(true);
            }}
          >
            Đổi mật khẩu
          </Button>,
          ]}
        >
          <div className="custom-row-ekyc">
            <div className="custome-col">
              <p className="text">Họ tên:</p>
            </div>
            <div className="custome-col">
              <p className="text">{admin?.fullName || '--'}</p>
            </div>
          </div>
          <div className="custom-row-ekyc">
            <div className="custome-col">
              <p className="text">Số điện thoại:</p>
            </div>
            <div className="custome-col">
              <p className="text">{admin?.phone || '--'}</p>
            </div>
          </div>
          <div className="custom-row-ekyc">
            <div className="custome-col">
              <p className="text">Email:</p>
            </div>
            <div className="custome-col">
              <p className="text">{admin?.email || '--'}</p>
            </div>
          </div>
          <div className="custom-row-ekyc">
            <div className="custome-col">
              <p className="text">Trạng thái:</p>
            </div>
            <div className="custome-col">
              <Tag className="text-tag" color={USER_STATUS[admin?.status || 'INACTIVE'].type}>
                {USER_STATUS[admin?.status || 'INACTIVE'].nameVi}
              </Tag>
            </div>
          </div>
          <div className="custom-row-ekyc">
            <div className="custome-col">
              <p className="text">Ngày sinh:</p>
            </div>
            <div className="custome-col">
              {moment(admin?.createDate).format(DATE_FORMAT) || '--'}
            </div>
          </div>
        </Card>
      </div>
      <AddAdministrator
        isOpen={isOpenModalEdit}
        setIsModalOpen={setIsOpenModalEdit}
        administrator={admin}
        isReload={isReload}
        setIsReload={setIsReload}
      />
    </>
  );
};
