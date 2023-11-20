import { createAdmin, updateInfoAdmin } from '@/services/api/administratorController';
import {
  CloseCircleOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { Button, Form, List, message, Modal } from 'antd';
import { useEffect } from 'react';
import './style.less';

interface Props {
  isOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  isReload?: boolean;
  setIsReload?: (isRelaod: boolean) => void;
  administrator?: API.AdministratorDto | null;
}

const AddAdministrator: React.FC<Props> = ({
  isOpen,
  setIsModalOpen,
  isReload,
  setIsReload,
  administrator,
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  console.log(administrator);

  const [form] = Form.useForm();
  useEffect(() => {
    form.setFields([
      { name: 'fullName', value: administrator?.fullName },
      { name: 'email', value: administrator?.email },
      { name: 'phone', value: administrator?.phone },
    ]);
  }, [administrator]);
  return (
    <>
      {contextHolder}
      <Modal
        title={
          <div
            style={{
              fontSize: '20px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <UserOutlined />
            <p style={{ margin: '0 0 0 8px' }}>
              {administrator?.id === undefined ? 'Thêm Administrator' : 'Cập nhật Administrator'}
            </p>
          </div>
        }
        open={isOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer
      >
        <div
          style={{
            maxWidth: '70%',
            margin: 'auto',
          }}
        >
          <ProForm
            form={form}
            layout="vertical"
            submitter={{
              render: () => {
                return [
                  <Button
                    danger
                    type="primary"
                    onClick={() => {
                      form.resetFields();
                    }}
                  >
                    Hủy
                  </Button>,
                  <Button
                    type="primary"
                    onClick={() => {
                      if (administrator?.id === undefined) {
                        const params: API.CreateAdminRequest =
                          form.getFieldsValue() as API.CreateAdminRequest;
                        createAdmin(params)
                          .then((response) => {
                            if (response.code === 0) {
                              messageApi.success('Tạo thành công', 3);
                              setIsModalOpen(false);
                              setIsReload && isReload ? setIsReload(!isReload) : undefined;
                            } else {
                              messageApi.error(response.message, 3);
                            }
                          })
                          .catch((error) => {
                            messageApi.error('Lỗi không xác định', 3);
                          });
                      } else {
                        const params: API.UpdateInfoAdminRequest =
                          form.getFieldsValue() as API.UpdateInfoAdminRequest;
                        updateInfoAdmin({ ...params, id: administrator.id })
                          .then((response) => {
                            if (response.code === 0) {
                              messageApi.success('Cập nhật thành công', 3);
                              setIsModalOpen(false);
                              setIsReload && isReload ? setIsReload(!isReload) : undefined;
                            } else {
                              messageApi.error(response.message, 3);
                            }
                          })
                          .catch((error) => {
                            messageApi.error('Lỗi không xác định', 3);
                          });
                      }
                    }}
                  >
                    {administrator?.id !== undefined ? 'Cập nhật' : 'Thêm mới'}
                  </Button>,
                ];
              },
            }}
          >
            <ProFormText
              fieldProps={{
                prefix: <UserOutlined />,
              }}
              className="text-input-cs"
              name={'fullName'}
              label="Họ tên"
              placeholder={'Họ tên'}
              rules={[
                {
                  required: true,
                  message: 'Họ tên không được trống',
                },
              ]}
            />
            <ProFormText
              fieldProps={{
                prefix: <MailOutlined />,
              }}
              className="text-input"
              name={'email'}
              label="Email"
              placeholder={'Email'}
              rules={[
                {
                  required: true,
                  pattern: new RegExp(/\S+@\S+\.\S+/),
                  message: 'Email không hợp lệ',
                },
              ]}
            />
            {administrator?.id === undefined ? (
              <ProFormText
                fieldProps={{
                  prefix: <PhoneOutlined />,
                }}
                className="text-input"
                name={'phone'}
                label="Số điện thoại"
                placeholder={'Số điện thoại'}
                rules={[
                  {
                    required: true,
                    pattern: new RegExp(/^(03|05|07|08|09)+([0-9]{8})\b/),
                    message: 'Số điện thoại không hợp lệ',
                  },
                ]}
              />
            ) : (
              ''
            )}
            {administrator?.id === undefined ? (
              <ProFormText.Password
                fieldProps={{
                  prefix: <LockOutlined />,
                }}
                className="text-input"
                name={'password'}
                label="Mật khẩu"
                placeholder={'Mật khẩu'}
                rules={[
                  {
                    required: true,
                    pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                    message: (
                      <List>
                        <List.Item>
                          <CloseCircleOutlined style={{ marginRight: 4 }} />
                          Phải có ít nhất 8 ký tự
                        </List.Item>
                        <List.Item>
                          <CloseCircleOutlined style={{ marginRight: 4 }} />
                          Phải chứa ít nhất một ký tự đặc biệt
                        </List.Item>
                        <List.Item>
                          <CloseCircleOutlined style={{ marginRight: 4 }} />
                          Phải chứa ít nhất một ký tự viết hoa
                        </List.Item>
                        <List.Item>
                          <CloseCircleOutlined style={{ marginRight: 4 }} />
                          Phải chứa ít nhất một ký tự số
                        </List.Item>
                      </List>
                    ),
                  },
                ]}
              />
            ) : (
              ''
            )}
          </ProForm>
        </div>
      </Modal>
    </>
  );
};

export default AddAdministrator;
