import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Select, Tooltip } from 'antd';
import React, { useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface Props {
  addLesson: (values: any) => Promise<boolean>;
}

const FormAddQuestion: React.FC<Props> = ({ addLesson }) => {
  useEffect(() => {}, []);
  const [form] = Form.useForm();

  const options = [
    {
      label: 'Chọn đáp án duy nhất',
      value: 'ONLY_ONE ',
    },
    {
      label: 'Điền chỗ trống',
      value: 'FILL',
    },
    {
      label: 'Chọn nhiều đáp án',
      value: 'MULTIPLE_SELECT',
    },
  ];

  return (
    <Form
      name="dynamic_form_nest_item"
      onFinish={(values) => {
        console.log(values);

        // Thực hiện các xử lý lưu dữ liệu
      }}
      style={{ width: '100%' }}
      autoComplete="off"
      form={form}
      layout="vertical"
    >
      <Form.List name="questions">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <div className="question-content" key={field.key}>
                <Form.Item
                  label="Loại câu hỏi"
                  style={{ width: '15%' }}
                  initialValue={{
                    label: 'Chọn đáp án duy nhất',
                    value: 'ONLY_ONE',
                  }}
                  name={[field.name, 'questionType']}
                >
                  <Select options={options} />
                </Form.Item>
                <Form.Item
                  style={{ position: 'relative' }}
                  label={`Câu hỏi ${index + 1}`}
                  name={[field.name, 'questionName']}
                >
                  <ReactQuill />
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      fontSize: 20,
                      margin: 4,
                      cursor: 'pointer',
                    }}
                    onClick={() => remove(field.name)}
                  >
                    <Tooltip title="Xóa câu hỏi">
                      <MinusCircleOutlined />
                    </Tooltip>
                  </div>
                </Form.Item>
                <div style={{ marginLeft: '20px' }}>
                  <Form.List name={[field.name, 'options']}>
                    {(optionFields, optionMeta) => (
                      <>
                        {optionFields.map((optionField, optionIndex) => (
                          <div className="options-content" key={optionField.key}>
                            <Form.Item
                              style={{ position: 'relative' }}
                              label={`Đáp án ${optionIndex + 1}`}
                              name={[optionField.name, 'optionName']}
                            >
                              <ReactQuill />
                              <div
                                style={{
                                  position: 'absolute',
                                  top: 0,
                                  right: 0,
                                  fontSize: 20,
                                  margin: 4,
                                  cursor: 'pointer',
                                }}
                                onClick={() => optionMeta.remove(optionIndex)}
                              >
                                <Tooltip title="Xóa câu trả lời">
                                  <MinusCircleOutlined />
                                </Tooltip>
                              </div>
                            </Form.Item>
                          </div>
                        ))}
                        <Form.Item style={{ marginTop: 8 }}>
                          <Button
                            type="dashed"
                            onClick={() => optionMeta.add()}
                            icon={<PlusOutlined />}
                          >
                            Thêm câu trả lời
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </div>
                <Divider />
              </div>
            ))}
            <Form.Item style={{ marginTop: 8 }}>
              <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                Thêm câu hỏi
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

export default FormAddQuestion;
