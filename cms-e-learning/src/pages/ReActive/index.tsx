import { FacebookOutlined, GoogleCircleFilled, MailOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText, SubmitterProps } from '@ant-design/pro-components';
import { FormattedMessage, history, SelectLang } from '@umijs/max';
import { Divider, Tabs, message } from 'antd';
import React, { useEffect } from 'react';
import styles from './index.less';
import { reActive } from '@/services/api/AuthController';

const ReActive: React.FC = () => {
  const submitter: SubmitterProps<any> = {
    searchConfig: {
      submitText: 'Send mail',
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
            const res = await reActive(values as API.ReActiveRequest);
            if (res.code === 0) {
              message.success('Re-active mail success, please check mail to active again!');
            } else {
              message.error(`Re-active mail error: ${res.message}, please try again!`);
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
                key: 'reActive',
                label: 'Re-Active Email',
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

export default ReActive;
