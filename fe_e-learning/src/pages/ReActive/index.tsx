import { reActive } from '@/services/api/AuthController';
import { MailOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText, SubmitterProps } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { message, Tabs } from 'antd';
import React, { useEffect } from 'react';
import styles from './index.less';

const ReActive: React.FC = () => {
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
            const res = await reActive(values as API.ReActiveRequest);
            if (res.code === 0) {
              message.success('Kích hoạt tài khoản thành công!');
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
                key: 'reActive',
                label: 'Kích hoạt tài khoản',
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
                  message: 'Email không được để trống',
                },
                {
                  type: 'email',
                  message: 'Email không hợp lệ',
                },
              ]}
            />
          </>
        </LoginForm>
      </div>
    </div>
  );
};

export default ReActive;
