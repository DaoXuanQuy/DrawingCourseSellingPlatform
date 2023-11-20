import { resetPassword } from '@/services/api/AuthController';
import { LockOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText, SubmitterProps } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { message, Tabs } from 'antd';
import React, { useEffect } from 'react';
import styles from './index.less';

const ResetPassword: React.FC = () => {
  let location = history.location;
  const token = new URLSearchParams(location.search).get('token');
  const email = new URLSearchParams(location.search).get('email');

  const submitter: SubmitterProps<any> = {
    searchConfig: {
      submitText: 'Xác nhận',
    },
  };
  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          submitter={submitter}
          logo={<img alt="logo" src="/icons/Logo.png" />}
          title="E-Learning"
          subTitle={<p style={{ fontSize: '16px' }}>Wellcome to E-Learning</p>}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            const res = await resetPassword(
              { email: email || '', token: token || '' },
              values as API.ResetPasswordRequest,
            );
            if (res.code === 0) {
              message.success('Đặt lại mật khẩu thành công!');
            } else {
              message.error(`${res.message}, Vui lòng thử lại sau!`);
            }
          }}
          actions={[
            <p>
              Bạn đã có tài khoản? <a onClick={() => history.push('/login')}>Đăng nhập ngay</a>
            </p>,
          ]}
        >
          <Tabs
            centered
            items={[
              {
                key: 'resetPassword',
                label: 'Đặt mật khẩu',
              },
            ]}
          />
          <>
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              placeholder="Mật khẩu mới"
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
              placeholder="Xác nhận mật khẩu"
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
                    return Promise.reject(new Error('Mật khẩu xác nhận không trung khớp!'));
                  },
                }),
              ]}
            />
          </>
        </LoginForm>
      </div>
    </div>
  );
};

export default ResetPassword;
