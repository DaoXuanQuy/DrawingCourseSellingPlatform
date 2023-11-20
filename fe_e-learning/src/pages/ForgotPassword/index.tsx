import { forgotPassword } from '@/services/api/AuthController';
import { MailOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText, SubmitterProps } from '@ant-design/pro-components';
import { FormattedMessage, history, SelectLang } from '@umijs/max';
import { message, Tabs } from 'antd';
import React, { useEffect } from 'react';
import styles from './index.less';

const ForgotPassword: React.FC = () => {
  const submitter: SubmitterProps<any> = {
    searchConfig: {
      submitText: 'Gửi mail',
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
          logo={<img alt="logo" src="/icons/Logo.png" />}
          title="E-Learning"
          subTitle={<p style={{ fontSize: '16px' }}>Wellcome to E-Learning</p>}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            const res = await forgotPassword(values as API.ForgotPasswordRequest);

            if (res.code === 0) {
              message.success('Vui lòng kiểm trả email để tiến hành cài lại mật khẩu.');
            } else {
              message.error(`${res.message}, vui lòng thử lại sau!`);
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
                key: 'forgotPassword',
                label: 'Quên mật khẩu',
              },
            ]}
          />
          <>
            <ProFormText
              name="email"
              fieldProps={{
                size: 'large',
                prefix: <MailOutlined className={styles.prefixIcon} />,
              }}
              placeholder="Email"
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="login.username.required"
                      defaultMessage="Email required!"
                    />
                  ),
                },
                {
                  type: 'email',
                  message: 'Email invalid',
                },
              ]}
            />
          </>
        </LoginForm>
      </div>
    </div>
  );
};

export default ForgotPassword;
