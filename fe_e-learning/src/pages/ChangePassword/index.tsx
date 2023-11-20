import { changePassword } from '@/services/api/UserController';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { Button, Form, message } from 'antd';
import './index.less';

const ChangePassword: React.FC = () => {
  const [form] = Form.useForm();
  const onFinish = () => {
    form.validateFields().then((data) => {
      changePassword({
        passwordCurrent: data.password,
        passwordNew: data.newPassword,
        passwordConfirm: data.confirmPassword,
      }).then((res) => {
        if (res.code === 0) {
          message.success('Change password success');
          form.resetFields();
        } else {
          message.error(`Change password error: ${res.message}`);
        }
      });
    });
  };
  return (
    <>
      <div className="password-container">
        <ProForm submitter={false} form={form}>
          <ProFormText.Password
            width={'lg'}
            placeholder="Password"
            label="Password"
            name={'password'}
            rules={[
              {
                required: true,
                message: 'Please enter your password!',
              },
            ]}
          />
          <ProFormText.Password
            width={'lg'}
            placeholder="New Password"
            label="New Password"
            name={'newPassword'}
            rules={[
              {
                required: true,
                message: 'Please enter new password!',
              },
              {
                pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                message:
                  'Password must be at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character',
              },
            ]}
          />
          <ProFormText.Password
            width={'lg'}
            placeholder="Confirm Password"
            label="Confirm Password"
            name={'confirmPassword'}
            rules={[
              {
                required: true,
                message: 'Please enter confirm password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('The two passwords that you entered do not match!'),
                  );
                },
              }),
            ]}
          />
          <Button type="primary" onClick={onFinish}>
            Change
          </Button>
        </ProForm>
      </div>
    </>
  );
};

export default ChangePassword;
