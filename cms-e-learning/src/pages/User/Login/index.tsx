import { loginCms } from '@/services/api/AuthController';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {
  LoginForm,
  ProFormCheckbox,
  ProFormText,
  SubmitterProps,
} from '@ant-design/pro-components';
import { FormattedMessage, history, SelectLang, useIntl, useModel } from '@umijs/max';
import { message, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import styles from './index.less';

const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<API.ResponseBaseAccessTokenResponseCustom>({
    code: 0,
  });
  const [type, setType] = useState<string>('login');
  const { initialState, setInitialState } = useModel('@@initialState');

  const intl = useIntl();

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      flushSync(() => {
        setInitialState((s) => ({
          ...s,
          currentUser: userInfo,
        }));
      });
    }
  };

  const handleSubmit = async (values: API.LoginCmsRequest) => {
    try {
      // 登录
      const msg = await loginCms({ phone: values.phone, password: values.password });
      if (msg?.code === 0) {
        const defaultLoginSuccessMessage = intl.formatMessage({
          id: 'pages.login.success',
          defaultMessage: 'Login Success',
        });
        localStorage.setItem('accessToken', msg.data?.token ?? "");
        localStorage.setItem('refreshToken', msg.data?.refreshToken ?? "");
        message.success(defaultLoginSuccessMessage);
        await fetchUserInfo();
        const urlParams = new URL(window.location.href).searchParams;
        history.push(urlParams.get('redirect') || '/');
        console.log(msg);

        return;
      }
      console.log(msg);
      // 如果失败去设置用户错误信息
      setUserLoginState(msg || {});
    } catch (error) {
      const defaultLoginFailureMessage = intl.formatMessage({
        id: 'pages.login.failure',
        defaultMessage: '登录失败，请重试！',
      });
      console.log(error);
      message.error(defaultLoginFailureMessage);
    }
  };
  const {} = userLoginState;

  const submitter: SubmitterProps<any> = {
    searchConfig: {
      submitText: type === 'login' ? 'Login' : 'Register',
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
          logo={<img alt="logo" src="icons/Logo.png" />}
          title="CMS E-Learning"
          subTitle={<p style={{ fontSize: '16px' }}>Wellcome to E-Learning</p>}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            type === 'login' ? await handleSubmit(values as API.LoginCmsRequest) : undefined;
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'login',
                label: intl.formatMessage({
                  id: 'login',
                  defaultMessage: 'Đăng Nhập',
                }),
              },
            ]}
          />

          {userLoginState.code !== 0 && message.error(userLoginState.message)}
          {type === 'login' && (
            <>
              <ProFormText
                name="phone"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={intl.formatMessage({
                  id: 'phone',
                  defaultMessage: 'Phone',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="login.username.required"
                        defaultMessage="Username required!"
                      />
                    ),
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={intl.formatMessage({
                  id: 'password',
                  defaultMessage: 'Password',
                })}
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
            </>
          )}
          {type === 'login' && (
            <div
              style={{
                marginBottom: 24,
                float: 'right',
              }}
            >
              <ProFormCheckbox noStyle name="autoLogin">
                <FormattedMessage id="rememberMe" defaultMessage="Lưu mật khẩu" />
              </ProFormCheckbox>
            </div>
          )}
        </LoginForm>
      </div>
    </div>
  );
};

export default Login;
