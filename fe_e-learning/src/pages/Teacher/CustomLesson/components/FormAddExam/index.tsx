import { EXAM_TYPE } from '@/constant';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Select, Space, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';

import { InputNumber } from 'antd';
interface Props {
  addExam: (values: any) => Promise<boolean>;
}

const FormAddExam: React.FC<Props> = ({ addExam }) => {
  const [examType, setExamType] = useState<string>(EXAM_TYPE.QUIZ.value);
  const [form] = Form.useForm();
  useEffect(() => {}, []);
  return (
    <Form
      name="dynamic_form_nest_item"
      onFinish={(values: any) => {
        console.log(values);

        addExam(values).then((data) => {
          form.setFieldsValue({
            exams: [],
          });
        });
      }}
      autoComplete="off"
      form={form}
      layout="vertical"
    >
      <Form.List name="exams">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }, index) => (
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
                  <div style={{ display: 'flex', justifyContent: 'start' }}>
                    <div
                      className="custom-center"
                      style={{
                        justifyContent: 'start',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        flex: 1,
                      }}
                    >
                      <Row
                        gutter={[24, 24]}
                        style={{ display: 'flex', flex: 1, gap: 4, width: '100%' }}
                      >
                        <Col xs={24} sm={12} md={8} lg={6} xl={5} xxl={3}>
                          <Form.Item
                            {...restField}
                            name={[name, 'examType']}
                            label="Loại bài kiểm tra"
                          >
                            <Select
                              options={[EXAM_TYPE.ESSAY, EXAM_TYPE.QUIZ]}
                              placeholder="Loại bài kiểm tra"
                              onSelect={(e) => {
                                setExamType(e);
                              }}
                            />
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={12} xl={8} xxl={8}>
                          <Form.Item
                            {...restField}
                            name={[name, 'examName']}
                            rules={[
                              { required: true, message: 'Tên tài liệu không được để trống' },
                            ]}
                            label="Tên bài kiểm tra"
                          >
                            <Input placeholder="Tên tài liệu" />
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={6} xl={5} xxl={4}>
                          <Form.Item
                            {...restField}
                            name={[name, 'timeMinute']}
                            label="Thời gian (Phút)"
                            rules={[
                              { required: true, message: 'Thời gian làm bài không được để trống' },
                            ]}
                            initialValue={1}
                          >
                            <InputNumber min={1} max={180} />
                          </Form.Item>
                        </Col>
                        {form.getFieldsValue()?.exams[index]?.examType !== EXAM_TYPE.ESSAY.value ? (
                          <Col xs={24} sm={12} md={8} lg={6} xl={5} xxl={4}>
                            <Form.Item
                              {...restField}
                              name={[name, 'testAttempts']}
                              initialValue={1}
                              label="Số lần làm lại"
                            >
                              <InputNumber min={1} max={180} />
                            </Form.Item>
                          </Col>
                        ) : (
                          <></>
                        )}
                      </Row>
                    </div>
                    <div className="icon-sub" onClick={() => remove(name)}>
                      <Tooltip title="Xóa thêm bài kiểm tra">
                        <MinusCircleOutlined />
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                Thêm bài kiểm tra
              </Button>
              <Button style={{ marginLeft: 10 }} type="primary" htmlType="submit">
                Lưu
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form>
  );
};

export default FormAddExam;
