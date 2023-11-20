import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import ImageUpload from '@/components/ImageUpload';
import { DATE_FORMAT, GET_IMAGE } from '@/constant';
import {
  getAllProvincesV2,
  getDistrictsByProvinceV2,
  getWardsByDistrictV2,
} from '@/services/api/AddressController';
import { upload } from '@/services/api/FileStorageController';
import { changePassword, getInfo, updateInfo } from '@/services/api/UserController';
import { LockOutlined } from '@ant-design/icons';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { history, useModel } from '@umijs/max';
import {
  Button,
  Card,
  DatePicker,
  Empty,
  Form,
  Image,
  Input,
  InputNumber,
  message,
  Modal,
  Select,
  Spin,
  Tag,
  UploadFile,
} from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import moment from 'moment';
import { useEffect, useState } from 'react';
import './index.less';

export default () => {
  const [user, setUser] = useState<API.UserResponse>();
  const [messageApi, contextHolder] = message.useMessage();
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isReload, setIsReload] = useState(false);
  const { initialState, setInitialState } = useModel('@@initialState');
  const [provinces, setProvinces] = useState<API.ProvinceModel[] | []>();
  const [districts, setDistricts] = useState<API.DistrictModel[] | []>();
  const [wards, setWards] = useState<API.WardModel[] | []>();
  const [infoUpdate, setInfoUpdate] = useState<API.UpdateInfoRequest>({});
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    setIsLoading(true);
    getInfo()
      .then((res) => {
        if (res.code === 0) {
          setUser(res.data);
          setFileList([{ uid: '-1', name: 'image.png', url: GET_IMAGE.getUrl(res.data?.avatar) }]);
          setInitialState({ ...initialState, currentUser: res.data });
          setInfoUpdate({
            avatar: res.data?.avatar,
            firstName: res.data?.firstName,
            lastName: res.data?.lastName,
            birthday: res.data?.birthday,
            gender: res.data?.gender,
            homeNumber: res.data?.homeNumber,
            streetName: res.data?.streetName,
            provinceId: res.data?.province?.id,
            districtId: res.data?.district?.id,
            wardId: res.data?.ward?.id,
          });
        } else {
          messageApi.error(res.message, 3);
        }
      })
      .catch((err) => messageApi.error('Lỗi không xác định', 3))
      .finally(() => setIsLoading(false));
    getAllProvincesV2()
      .then((res) => {
        if (res.code === 0) {
          setProvinces(res.data?.provinces || []);
        } else {
          messageApi.error(res.message, 3);
        }
      })
      .catch((err) => messageApi.error('Lỗi không xác định', 3));
  }, [isReload]);

  const validRegex = (data: string, regexTemplate: RegExp): boolean => {
    return regexTemplate.test(data);
  };

  return (
    <>
      {contextHolder}
      <BreadcrumbCustom
        subNav={[
          {
            name: 'Trang chủ',
            path: '/',
          },
          {
            path: '/infomation',
            name: 'Thông tin cá nhân',
          },
        ]}
      />
      <Spin spinning={isLoading}>
        <div className="custome-info">
          <Card
            type="inner"
            title={<div className="title-card">Thông tin cá nhân</div>}
            style={{ borderRadius: 8, width: '60%' }}
            actions={[
              <Button
                style={{
                  backgroundColor: isEdit ? '#52c41a' : '#3366FF',
                  color: '#fff',
                  borderRadius: 8,
                  height: 40,
                  width: 100,
                }}
                onClick={() => {
                  if (isEdit) {
                    updateInfo(infoUpdate)
                      .then((res) => {
                        if (res.code === 0) {
                          messageApi.success('Cập nhật thành công', 3);
                          setIsEdit(!isEdit);
                          setIsReload(!isReload);
                        } else {
                          messageApi.error(res.message, 3);
                        }
                      })
                      .catch((err) => messageApi.error('Lỗi không xác định', 3));
                  } else {
                    setIsEdit(!isEdit);
                  }
                }}
              >
                {isEdit ? 'Lưu' : 'Chỉnh sửa'}
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
                  Modal.confirm({
                    title: <p style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>Đổi mật khẩu</p>,
                    centered: true,
                    icon: <LockOutlined />,
                    content: (
                      <ProForm form={form} layout="vertical" submitter={false}>
                        <ProFormText.Password
                          fieldProps={{
                            prefix: <LockOutlined />,
                          }}
                          className="text-input"
                          name={'password'}
                          label="Mật khẩu"
                          placeholder={'Mật khẩu'}
                        />
                        <ProFormText.Password
                          fieldProps={{
                            prefix: <LockOutlined />,
                          }}
                          className="text-input"
                          name={'newPassword'}
                          label="Mật khẩu mới"
                          placeholder={'Mật khẩu mới'}
                          rules={[
                            ({ getFieldValue }) => ({
                              validator(_, value) {
                                let errors: Error[] = [];
                                if (getFieldValue('newPassword').length < 8) {
                                  errors.push(new Error('Mật khẩu phải có ít nhất 8 ký tự!'));
                                }
                                if (!validRegex(getFieldValue('newPassword'), /[a-z]/)) {
                                  errors.push(
                                    new Error('Mật khẩu phải có ít nhất 1 ký tự thường!'),
                                  );
                                }
                                if (!validRegex(getFieldValue('newPassword'), /[A-Z]/)) {
                                  errors.push(new Error('Mật khẩu phải có ít nhất 1 ký tự hoa!'));
                                }
                                if (!validRegex(getFieldValue('newPassword'), /[0-9]/)) {
                                  errors.push(new Error('Mật khẩu phải có ít nhất 1 ký tự số!'));
                                }
                                if (!validRegex(getFieldValue('newPassword'), /[^a-zA-Z0-9]/)) {
                                  errors.push(
                                    new Error('Mật khẩu phải có ít nhất 1 ký tự đặc biệt!'),
                                  );
                                }
                                if (errors.length > 0) {
                                  return Promise.reject(errors);
                                }
                                return Promise.resolve();
                              },
                            }),
                          ]}
                        />
                        <ProFormText.Password
                          fieldProps={{
                            prefix: <LockOutlined />,
                          }}
                          className="text-input"
                          name={'passwordConfirm'}
                          label="Mật khẩu xác nhận"
                          placeholder={'Mật khẩu xác nhận'}
                          rules={[
                            {
                              required: true,
                              message: 'Mật khẩu xác nhận là bắt buộc!',
                            },
                            ({ getFieldValue }) => ({
                              validator(_, value) {
                                if (!value || getFieldValue('newPassword') === value) {
                                  return Promise.resolve();
                                }
                                return Promise.reject(
                                  new Error('Mật khẩu mới và mật khẩu xác nhận không khớp!'),
                                );
                              },
                            }),
                          ]}
                        />
                      </ProForm>
                    ),
                    okText: 'Xác nhận',
                    cancelText: 'Hủy',
                    onOk: () => {
                      const params: API.ChangePasswordRequest = {
                        passwordCurrent: form.getFieldValue('password'),
                        passwordNew: form.getFieldValue('newPassword'),
                        passwordConfirm: form.getFieldValue('passwordConfirm'),
                      };
                      changePassword(params)
                        .then((res) => {
                          if (res.code === 0) {
                            messageApi.success('Đổi mật khẩu thành công', 3);
                            setIsReload(!isReload);
                          } else {
                            messageApi.error(res.message, 3);
                          }
                        })
                        .catch((err) => {
                          messageApi.error('Đổi mật khẩu Thất bại', 3);
                        });
                    },
                  });
                }}
              >
                Đổi mật khẩu
              </Button>,
              <Button
                style={{
                  backgroundColor: '#52c41a',
                  color: '#fff',
                  borderRadius: 8,
                  height: 40,
                  width: 120,
                }}
                onClick={() => history.push('/identification')}
              >
                Định danh
              </Button>,
            ]}
          >
            {user === undefined ? (
              <Empty />
            ) : (
              <>
                <div className="custom-row-ekyc">
                  <div className="custome-col">
                    <p className="text">Ảnh đại diện:</p>
                  </div>
                  <div className="custome-col">
                    {!isEdit ? (
                      <Image
                        src={user?.avatar ? GET_IMAGE.getUrl(user.avatar) : 'icons/background.jpg'}
                        height={80}
                        width={80}
                      />
                    ) : (
                      <>
                        <div
                          style={{ display: 'flex', alignItems: 'center', justifyItems: 'start' }}
                        >
                          <ImageUpload
                            fileList={fileList}
                            setFileList={setFileList}
                            width={'80px'}
                            height={'80px'}
                          />
                          <Button
                            onClick={() => {
                              if (fileList.length > 0) {
                                upload({ file: '' }, fileList[0].originFileObj as File).then(
                                  (res) => {
                                    if (res.code === 0) {
                                      setInfoUpdate({ ...infoUpdate, avatar: res.data?.url });
                                      message.success('Cập nhật ảnh thành công', 3);
                                    } else {
                                      message.error('Cập nhật ảnh thất bại', 3);
                                    }
                                  },
                                );
                              }
                            }}
                            style={{ marginLeft: '20px' }}
                            type="primary"
                          >
                            Lưu ảnh
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="custom-row-ekyc">
                  <div className="custome-col">
                    <p className="text">Họ tên:</p>
                  </div>
                  <div className="custome-col">
                    {!isEdit ? (
                      <p className="text">{`${user?.firstName} ${user?.lastName}` || '--'}</p>
                    ) : (
                      <Input
                        placeholder="Họ tên"
                        defaultValue={`${user?.firstName} ${user?.lastName}`}
                        onChange={(e) => {
                          let name: string[] = e.target.value.split(' ');
                          let firstName = '';
                          for (let i = 0; i <= name.length - 2; i++) {
                            firstName += `${name[i]} `;
                          }
                          setInfoUpdate({
                            ...infoUpdate,
                            lastName: name[name.length - 1],
                            firstName: firstName,
                          });
                        }}
                      />
                    )}
                  </div>
                </div>
                <div className="custom-row-ekyc">
                  <div className="custome-col">
                    <p className="text">Giới tính:</p>
                  </div>
                  <div className="custome-col">
                    {!isEdit ? (
                      <p className="text">{user?.gender === 'MALE' ? 'Nam' : 'Nữ' || '--'}</p>
                    ) : (
                      <Select
                        placeholder="Chọn giới tính"
                        defaultValue={user?.gender === 'MALE' ? 'Nam' : 'Nữ' || undefined}
                        options={[
                          { value: 'MALE', label: 'Nam' },
                          { value: 'FEMALE', label: 'Nữ' },
                        ]}
                        onSelect={(e) => {
                          console.log(e);
                          setInfoUpdate({ ...infoUpdate, gender: e as 'MALE' | 'FEMALE' });
                        }}
                      />
                    )}
                  </div>
                </div>
                <div className="custom-row-ekyc">
                  <div className="custome-col">
                    <p className="text">Ngày sinh:</p>
                  </div>
                  <div className="custome-col">
                    {!isEdit ? (
                      user?.birthday ? (
                        moment(user?.birthday).format(DATE_FORMAT)
                      ) : (
                        '--'
                      )
                    ) : (
                      <DatePicker
                        format={'DD/MM/YYYY'}
                        defaultValue={dayjs(user?.birthday ? new Date(user.birthday) : new Date())}
                        onChange={(date, dateString) => {
                          setInfoUpdate({
                            ...infoUpdate,
                            birthday: moment(date?.toDate()).format('YYYY-MM-DD'),
                          });
                        }}
                      />
                    )}
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
                    <p className="text">Trạng thái:</p>
                  </div>
                  <div className="custome-col">
                    <Tag className="text-tag" color={user?.ban ? 'error' : 'success'}>
                      {user?.ban ? 'Đã khóa' : 'Hoạt động'}
                    </Tag>
                  </div>
                </div>
                <div className="custom-row-ekyc">
                  <div className="custome-col">
                    <p className="text">Tỉnh/thành phố:</p>
                  </div>
                  <div className="custome-col">
                    {!isEdit ? (
                      <p className="text">{`${user?.province?.name || '--'}`}</p>
                    ) : (
                      <>
                        <Select
                          showSearch
                          filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                          }
                          style={{ width: 180 }}
                          placeholder="Chọn tỉnh/thành phố"
                          defaultValue={
                            user?.province
                              ? { value: user?.province?.id, label: user?.province?.name }
                              : undefined
                          }
                          options={
                            provinces
                              ? provinces.map((data) => {
                                  return { value: data.id, label: data.name };
                                })
                              : []
                          }
                          onSelect={(e) => {
                            console.log(e);
                            setInfoUpdate({ ...infoUpdate, provinceId: e });
                            getDistrictsByProvinceV2({ provinceId: e || -1 })
                              .then((res) => {
                                if (res.code === 0) {
                                  setDistricts(res.data?.districts);
                                } else {
                                  messageApi.error(res.message, 3);
                                }
                              })
                              .catch((err) => messageApi.error('Lỗi không xác định', 3));
                          }}
                        />
                      </>
                    )}
                  </div>
                </div>
                <div className="custom-row-ekyc">
                  <div className="custome-col">
                    <p className="text">Quận/huyện:</p>
                  </div>
                  <div className="custome-col">
                    {!isEdit ? (
                      <p className="text">
                        {user?.district
                          ? `${user?.district?.prefix} ${user?.district?.name}`
                          : '--'}
                      </p>
                    ) : (
                      <>
                        <Select
                          style={{ width: 180 }}
                          placeholder="Chọn quận/huyện"
                          defaultValue={
                            user?.province
                              ? {
                                  value: user?.district?.id,
                                  label: `${user.district?.prefix} ${user?.district?.name}`,
                                }
                              : undefined
                          }
                          options={
                            districts
                              ? districts.map((data) => {
                                  return { value: data.id, label: `${data.prefix} ${data.name}` };
                                })
                              : []
                          }
                          onSelect={(e) => {
                            setInfoUpdate({ ...infoUpdate, districtId: e });
                            getWardsByDistrictV2({ districtId: e || -1 })
                              .then((res) => {
                                if (res.code === 0) {
                                  setWards(res.data?.wards);
                                } else {
                                  messageApi.error(res.message, 3);
                                }
                              })
                              .catch((err) => messageApi.error('Lỗi không xác định', 3));
                          }}
                        />
                      </>
                    )}
                  </div>
                </div>
                <div className="custom-row-ekyc">
                  <div className="custome-col">
                    <p className="text">Xã/phường:</p>
                  </div>
                  <div className="custome-col">
                    {!isEdit ? (
                      <p className="text">
                        {user?.ward ? `${user?.ward?.prefix} ${user?.ward?.name}` : '--'}
                      </p>
                    ) : (
                      <>
                        <Select
                          style={{ width: 180 }}
                          placeholder="Chọn xã/phường"
                          defaultValue={
                            user?.province
                              ? {
                                  value: user?.ward?.id,
                                  label: `${user.ward?.prefix} ${user?.ward?.name}`,
                                }
                              : undefined
                          }
                          options={
                            wards
                              ? wards.map((data) => {
                                  return { value: data.id, label: `${data.prefix} ${data.name}` };
                                })
                              : []
                          }
                          onSelect={(e) => setInfoUpdate({ ...infoUpdate, wardId: e })}
                        />
                      </>
                    )}
                  </div>
                </div>
                <div className="custom-row-ekyc">
                  <div className="custome-col">
                    <p className="text">Số nhà - đường:</p>
                  </div>
                  <div className="custome-col">
                    {!isEdit ? (
                      <p className="text">{`${user?.homeNumber?.toString() || '--'}, ${
                        user?.streetName || '--'
                      }`}</p>
                    ) : (
                      <>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'start',
                            flexDirection: 'column',
                            justifyContent: 'center',
                          }}
                        >
                          <InputNumber
                            defaultValue={user?.homeNumber}
                            controls={false}
                            placeholder="Số nhà"
                            bordered={false}
                            onChange={(e) =>
                              setInfoUpdate({
                                ...infoUpdate,
                                homeNumber: e || undefined,
                              })
                            }
                          />
                          <Input
                            defaultValue={user?.streetName}
                            placeholder="Tên đường"
                            onChange={(e) =>
                              setInfoUpdate({ ...infoUpdate, streetName: e.target.value })
                            }
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="custom-row-ekyc">
                  <div className="custome-col">
                    <p className="text">Ngày tạo:</p>
                  </div>
                  <div className="custome-col">
                    <p className="text">
                      {user?.createDate ? moment(user.createDate).format('DD/MM/YYYY') : '--'}
                    </p>
                  </div>
                </div>
              </>
            )}
          </Card>
        </div>
      </Spin>
    </>
  );
};
