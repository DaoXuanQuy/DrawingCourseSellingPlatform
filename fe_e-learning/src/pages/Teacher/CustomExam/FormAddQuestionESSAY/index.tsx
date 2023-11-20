import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Form, InputNumber, Tooltip } from 'antd';
import React, { useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface Props {
  addQuestion: (values: any) => Promise<boolean>;
  questionNoStart: number;
}

var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote', 'code-block'],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
  [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
  [{ direction: 'rtl' }], // text direction

  [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ['clean'], // remove formatting button
];
export { toolbarOptions };

const FormAddQuestionESSAY: React.FC<Props> = ({ addQuestion, questionNoStart }) => {
  useEffect(() => {}, []);
  const [form] = Form.useForm();

  return (
    <Form
      name="dynamic_form_nest_item"
      onFinish={(values) => {
        console.log(values);

        let questionList: API.QuestionInfo[] = [];
        if (values?.questions?.length > 0) {
          values.questions.forEach((data: any, index: number) => {
            questionList.push({
              questionNo: questionNoStart + index,
              questionName: data.questionName,
              questionType: 'ESSAY',
              point: data.point || 0,
            });
          });
        }
        addQuestion(questionList).then((res) => {
          form.setFieldsValue({
            questions: [],
          });
        });
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
                <div style={{ position: 'relative' }}>
                  <Form.Item
                    label={<>{`Câu ${questionNoStart + index}`}</>}
                    name={[field.name, 'questionName']}
                    rules={[
                      {
                        required: true,
                        message: 'Câu hỏi không được trống',
                      },
                    ]}
                  >
                    <ReactQuill modules={{ toolbar: toolbarOptions }} />
                  </Form.Item>
                  <Form.Item
                    style={{ width: '15%' }}
                    label="Điểm cho câu hỏi"
                    name={[field.name, 'point']}
                    rules={[
                      {
                        required: true,
                        message: 'Điểm câu hỏi không được trống',
                      },
                    ]}
                  >
                    <InputNumber min={0} max={10} placeholder="Nhập điểm câu hỏi" />
                  </Form.Item>
                  <div
                    style={{
                      position: 'absolute',
                      top: '15%',
                      right: 0,
                      fontSize: 20,
                      margin: 4,
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      remove(field.name);
                    }}
                  >
                    <Tooltip title="Xóa câu hỏi">
                      <MinusCircleOutlined />
                    </Tooltip>
                  </div>
                </div>
                <Divider />
              </div>
            ))}
            <Form.Item style={{ marginTop: 8 }}>
              <Button
                type="dashed"
                onClick={() => {
                  add();
                }}
                icon={<PlusOutlined />}
              >
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

export default FormAddQuestionESSAY;
