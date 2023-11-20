import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import { createModel } from '@/services/api/PORTALForumTopicController';
import { history, useParams } from '@umijs/max';
import { Button, Form, Input, message } from 'antd';
import TextEditor from './components/TextEditor';
import './index.less';

export default (): JSX.Element => {
  const { categoryId } = useParams();
  const [form] = Form.useForm();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <BreadcrumbCustom
        subNav={[
          {
            name: 'Trang chủ',
            path: '/',
          },
          {
            path: '/forums/categories',
            name: 'Diễn đàn',
          },
          {
            path: '',
            name: 'Thêm bài viết',
          },
        ]}
      />
      <div className="create-post" style={{ flex: 1 }}>
        <Form style={{ flex: 1 }} className="container-vertical" form={form}>
          <Form.Item
            name={'title'}
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tiêu đề',
              },
            ]}
          >
            <Input.TextArea
              style={{ fontSize: '20px', fontWeight: 'bold' }}
              placeholder="Tiêu đề bài viết"
            />
          </Form.Item>
          <div style={{ flex: 1 }} className="container-vertical">
            <Form.Item
              style={{ flex: 1 }}
              className="container-vertical"
              name={'firstPostContent'}
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập nội dung',
                },
              ]}
            >
              <TextEditor
                onChange={(e) => {
                  form.setFieldValue('firstPostContent', e);
                }}
              />
            </Form.Item>
          </div>
        </Form>
        <div>
          <Button
            type="primary"
            onClick={() => {
              if (categoryId) {
                createModel({ categoryId: categoryId, ...form.getFieldsValue() }).then((res) => {
                  if (res.code === 0) {
                    message.success('Tạo bài viết thành công', 3);
                    history.push(`/forums/${categoryId}`);
                  } else {
                    message.error(res.message, 3);
                  }
                });
              }
            }}
          >
            Thêm bài viết
          </Button>
        </div>
      </div>
    </div>
  );
};
