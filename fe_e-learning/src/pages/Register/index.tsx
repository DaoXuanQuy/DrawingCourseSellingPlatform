import { register } from '@/services/api/AuthController';
import { EditOutlined, LockOutlined, MailOutlined, MobileOutlined } from '@ant-design/icons';
import {
  LoginForm,
  ProForm,
  ProFormDatePicker,
  ProFormRadio,
  ProFormText,
  SubmitterProps,
} from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Divider, message, Tabs } from 'antd';
import React, { useState } from 'react';
import styles from './index.less';

const Login: React.FC = () => {
  const [type, setType] = useState<string>('register');

  const registerUser = async (values: API.RegisterRequest) => {
    const res = await register(values);
    if (res?.code === 0) {
      const defaultRegisterSuccess =
        'Đăng ký thành công, vui lòng kiểm tra email để kích hoạt tài khoản';
      message.success(defaultRegisterSuccess);
    } else {
      const defaultRegisterFail = res.message;
      message.error(defaultRegisterFail);
    }
  };
  const submitter: SubmitterProps<any> = {
    searchConfig: {
      submitText: 'Đăng ký',
    },
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          submitter={submitter}
          logo={<img alt="logo" src="icons/Logo.png" />}
          title="E-Learning"
          subTitle={<p style={{ fontSize: '16px' }}>Wellcome to E-Learning</p>}
          initialValues={{
            autoLogin: true,
          }}
          actions={[
            <p>
              Bạn đã có tài khoản? <a onClick={() => history.push('/login')}>Đăng nhập ngay</a>
            </p>,
          ]}
          onFinish={async (values) => {
            await registerUser(values as API.RegisterRequest);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'register',
                label: 'Đăng ký tài khoản',
              },
            ]}
          />
          {type === 'register' && (
            <>
              <div style={{ width: '328px' }}>
                <ProForm.Group style={{ display: 'flex' }}>
                  <ProFormText
                    width={164}
                    style={{ marginRight: '8px !important' }}
                    fieldProps={{
                      size: 'large',
                      prefix: <EditOutlined className={styles.prefixIcon} />,
                    }}
                    name="firstName"
                    placeholder="Họ & Tên đệm"
                    rules={[
                      {
                        required: true,
                        message: 'Họ & Tên đệm không được trống',
                      },
                    ]}
                  />
                  <ProFormText
                    width={164}
                    fieldProps={{
                      size: 'large',
                      prefix: <EditOutlined className={styles.prefixIcon} />,
                    }}
                    name="lastName"
                    placeholder="Tên"
                    rules={[
                      {
                        required: true,
                        message: 'Tên không được trông',
                      },
                    ]}
                  />
                </ProForm.Group>
                <ProFormText
                  fieldProps={{
                    size: 'large',
                    prefix: <MailOutlined className={styles.prefixIcon} />,
                  }}
                  name="email"
                  placeholder="Email"
                  rules={[
                    {
                      required: true,
                      message: 'Email không được trống',
                    },
                  ]}
                />
                <ProFormText
                  fieldProps={{
                    size: 'large',
                    prefix: <MobileOutlined className={styles.prefixIcon} />,
                  }}
                  name="phone"
                  placeholder="Số điện thoại"
                  rules={[
                    {
                      required: true,
                      message: 'Số điện thoại không được trống',
                    },
                    {
                      pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                      message: 'Số điện thoại không hợp lệ',
                    },
                  ]}
                />
                <ProFormDatePicker width={'md'} name="date" placeholder={'Ngày sinh'} />
                <ProFormRadio.Group
                  width={'md'}
                  name="gender"
                  options={[
                    {
                      label: <p style={{ width: 64 }}>Male</p>,
                      value: 'MALE',
                    },
                    {
                      label: <p style={{ width: 64 }}>Female</p>,
                      value: 'FEMALE',
                    },
                  ]}
                />
                <ProFormText.Password
                  name="password"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder="Mật khẩu"
                  rules={[
                    {
                      required: true,
                      message: 'Mật khẩu không được trống',
                    },
                  ]}
                />
                <ProFormText.Password
                  name="passwordConfirm"
                  fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={styles.prefixIcon} />,
                  }}
                  placeholder="Mật khẩu xác nhận"
                  rules={[
                    {
                      required: true,
                      message: 'Mật khẩu xác nhận không được trống',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('Mật khẩu xác nhận không khớp'));
                      },
                    }),
                  ]}
                />
              </div>
              <Divider style={{ margin: '12px 0' }} />
              <div style={{ margin: '12px 0' }}>
                <p style={{ paddingRight: '4px', margin: 0 }}>
                  Bạn đã có tài khoản, nhưng chưa được kích hoạt?{' '}
                </p>
                <a
                  onClick={() => {
                    history.push('/re-active');
                  }}
                >
                  Kích hoạt ngay
                </a>
              </div>
            </>
          )}
        </LoginForm>
      </div>
    </div>
  );
};

export default Login;
