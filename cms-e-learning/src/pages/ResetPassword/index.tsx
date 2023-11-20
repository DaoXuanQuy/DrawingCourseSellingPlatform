import { FacebookOutlined, GoogleCircleFilled, LockOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText, SubmitterProps } from '@ant-design/pro-components';
import { FormattedMessage, history, SelectLang } from '@umijs/max';
import { Divider, Tabs, message } from 'antd';
import React, { useEffect } from 'react';
import styles from './index.less';
import { resetPassword } from '@/services/api/AuthController';

const ResetPassword: React.FC = () => {
  let location = history.location;
  const token = new URLSearchParams(location.search).get('token');
  const email = new URLSearchParams(location.search).get('email');

  const submitter: SubmitterProps<any> = {
    searchConfig: {
      submitText: 'Submit',
    },
  };
  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.lang} data-lang>
        {SelectLang && <SelectLang />}
      </div>
      <div className={styles.content}>
        <LoginForm
          submitter={submitter}
          logo={<img alt="logo" src="/icons/logo.png" />}
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
              message.success('Reset password success!');
            } else {
              message.error(`Reset password error: ${res.message}, please try again!`);
            }
          }}
          actions={[
            <FormattedMessage
              key="loginWith"
              id="pages.login.loginWith"
              defaultMessage="Login with"
            />,
            <FacebookOutlined key="AlipayCircleOutlined" className={styles.icon} />,
            <GoogleCircleFilled key="TaobaoCircleOutlined" className={styles.icon} />,
          ]}
        >
          <Tabs
            centered
            items={[
              {
                key: 'resetPassword',
                label: 'Reset Password',
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
              placeholder="New Password"
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="login.password.required"
                      defaultMessage="Password required"
                    />
                  ),
                },
              ]}
            />
            <ProFormText.Password
              name="passwordConfirm"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              placeholder="Confirm Password"
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="login.passwordConfirm.required"
                      defaultMessage="Password Confirm required"
                    />
                  ),
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('The two passwords that you entered do not match!'),
                    );
                  },
                }),
              ]}
            />
            <Divider style={{ margin: '12px 0' }} />
            <div style={{ margin: '12px 0' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  fontWeight: '500',
                  fontSize: '16px',
                }}
              >
                <p style={{ paddingRight: '4px', margin: 0 }}>Already have an account?</p>
                <a
                  onClick={() => {
                    history.push('/login');
                  }}
                >
                  Login
                </a>
              </div>
            </div>
          </>
        </LoginForm>
      </div>
    </div>
  );
};

export default ResetPassword;
