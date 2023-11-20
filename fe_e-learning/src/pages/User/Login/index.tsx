import { login } from '@/services/api/AuthController';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {
  LoginForm,
  ProFormCheckbox,
  ProFormText,
  SubmitterProps,
} from '@ant-design/pro-components';
import { history, useModel } from '@umijs/max';
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

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      flushSync(() => {
        setInitialState((data: any) => ({
          ...data,
          currentUser: userInfo,
          isLogined: true,
        }));
      });
    }
  };

  const handleSubmit = async (values: API.LoginRequest) => {
    try {
      // 登录
      const msg = await login({ username: values.username, password: values.password });
      if (msg?.code === 0) {
        localStorage.setItem('user_accessToken', msg.data?.token || '');
        localStorage.setItem('user_refreshToken', msg.data?.refreshToken || '');
        message.success('Đăng nhập thành công');
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
      message.error('Đăng nhập thất bại');
    }
  };
  const {} = userLoginState;

  const submitter: SubmitterProps<any> = {
    searchConfig: {
      submitText: 'Đăng nhập',
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
          logo={<img alt="logo" src="icons/Logo.png" />}
          title="E-Learning"
          subTitle={<p style={{ fontSize: '16px' }}>Wellcome to E-Learning</p>}
          initialValues={{
            autoLogin: true,
          }}
          actions={[
            // <FormattedMessage
            //   key="loginWith"
            //   id="pages.login.loginWith"
            //   defaultMessage="Đăng nhập với"
            // />,
            // <FacebookOutlined key="AlipayCircleOutlined" className={styles.icon} />,
            // <GoogleCircleFilled key="TaobaoCircleOutlined" className={styles.icon} />,
            <p>
              Bạn chưa có tài khoản? <a onClick={() => history.push('/register')}>Đăng ký ngay</a>
            </p>,
          ]}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginRequest);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'login',
                label: 'Đăng nhập',
              },
            ]}
          />

          {userLoginState.code !== 0 && message.error(userLoginState.message)}
          {type === 'login' && (
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder="Email"
                rules={[
                  {
                    required: true,
                    message: 'Tên đăng nhập không được trống',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder="Password"
                rules={[
                  {
                    required: true,
                    message: 'Mật khẩu không được trống',
                  },
                ]}
              />
            </>
          )}
          {type === 'login' && (
            <div
              style={{
                marginBottom: 24,
              }}
            >
              <ProFormCheckbox noStyle name="autoLogin">
                Lưu mật khẩu
              </ProFormCheckbox>
              <a
                style={{
                  float: 'right',
                }}
                onClick={() => {
                  history.push('/forgot-password');
                }}
              >
                Quên mật khẩu
              </a>
            </div>
          )}
        </LoginForm>
      </div>
    </div>
  );
};

export default Login;
