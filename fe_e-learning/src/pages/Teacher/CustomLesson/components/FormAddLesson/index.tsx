import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Collapse, Form, Input, Space, Tooltip } from 'antd';
import React, { useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const { Panel } = Collapse;

interface Props {
  addLesson: (values: any) => Promise<boolean>;
}

const FormAddLesson: React.FC<Props> = ({ addLesson }) => {
  useEffect(() => {}, []);
  const [form] = Form.useForm();

  return (
    <Form
      name="dynamic_form_nest_item"
      onFinish={(values: any) => {
        addLesson(values).then((res) => {
          form.setFieldsValue({
            lessons: [],
          });
        });
      }}
      style={{ maxWidth: 600 }}
      autoComplete="off"
      form={form}
    >
      <Form.List name="lessons">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{
                  display: 'flex',
                  marginBottom: 8,
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
                align="baseline"
              >
                <div className="lesson-content">
                  <Collapse className="lesson-content" collapsible="icon" defaultActiveKey={['1']}>
                    <Panel
                      header={
                        <>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ flex: '0 0 98%' }}>
                              <Form.Item
                                {...restField}
                                name={[name, 'name']}
                                rules={[{ required: true, message: 'Missing name' }]}
                              >
                                <Input.TextArea
                                  className="lesson-header"
                                  placeholder="Tên bài giảng"
                                />
                              </Form.Item>
                            </div>
                            <div className="icon-sub" onClick={() => remove(name)}>
                              <Tooltip title="Xóa bài">
                                <MinusCircleOutlined />
                              </Tooltip>
                            </div>
                          </div>
                        </>
                      }
                      key="1"
                    >
                      <p className="lesson-desc">
                        <Form.Item
                          {...restField}
                          name={[name, 'description']}
                          rules={[{ required: true, message: 'Missing description name' }]}
                        >
                          <ReactQuill theme="snow" style={{ width: '77vw' }} />
                        </Form.Item>
                      </p>
                    </Panel>
                  </Collapse>
                </div>
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                Thêm bài học
              </Button>
              <Button type="primary" htmlType="submit">
                Lưu cài đặt
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form>
  );
};

export default FormAddLesson;
