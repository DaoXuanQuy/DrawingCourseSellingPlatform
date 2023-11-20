import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Divider,
  Form,
  Input,
  InputNumber,
  message,
  Radio,
  Select,
  Tooltip,
} from 'antd';
import React, { useEffect, useState } from 'react';
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

const FormAddQuestion: React.FC<Props> = ({ addQuestion, questionNoStart }) => {
  const [totalOption, setTotalOption] = useState(0);
  useEffect(() => {}, []);
  const [form] = Form.useForm();

  const options = [
    {
      label: 'Chọn đáp án duy nhất',
      value: 'ONLY_ONE',
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

  const handleChange = (value: any, index: any) => {
    const fieldsValue = form.getFieldsValue();
    const { questions } = fieldsValue;

    if (value === 'ONLY_ONE') {
      questions[index].options = undefined;
      form.setFieldsValue({ questions });
    } else if (value === 'MULTIPLE_SELECT') {
      questions[index].options = undefined;
      form.setFieldsValue({ questions });
    } else {
      questions[index].options = undefined;
      form.setFieldsValue({ questions });
    }
  };

  const handleAddFill = (index: number) => {
    const values = form.getFieldsValue();
    const { questions } = values;
    if (questions?.at(index)?.questionName) {
      var regex = /(?<=\>)([^<>]+)(?=<)/g;
      const matches: string[] = questions?.at(index)?.questionName?.match(regex);
      var regex = /\[(\d+)\]/g;
      var matchesNumber = questions?.at(index)?.questionName?.match(regex);
      const numbers: number[] = matchesNumber?.map((item: any) => parseInt(item?.match(/\d+/)![0]));

      let nextNumber = numbers ? Math.max(...numbers) + 1 : 1;

      questions[index] = {
        ...questions[index],
        questionName: questions
          ?.at(index)
          ?.questionName?.replace(
            matches[matches.length - 1],
            matches[matches.length - 1] + ` [${nextNumber}]`,
          ),
      };
    } else {
      questions[index] = {
        ...questions[index],
        questionName: `[1]`,
      };
    }

    form.setFieldsValue({ questions });
  };

  return (
    <Form
      name="dynamic_form_nest_item"
      onFinish={(values) => {
        let canCreate = true;
        let questionList: API.QuestionInfo[] = [];
        if (values?.questions?.length > 0) {
          values.questions.forEach((data: any, index: number) => {
            let fillCorrects: API.FillCorrectInfo[] = [];
            if (data.questionType === 'FILL') {
              console.log(data);

              if (data.options === undefined || data?.options.length <= 0) {
                message.error(
                  `Câu hỏi ${questionNoStart + index} không hợp lệ, vui lòng kiểm tra lại`,
                );
                canCreate = false;
                return;
              }
            }
            let options: API.CreateOptionRequest[] = [];

            // nếu là fill thì lấy danh sách placeholder theo regex và check với số lượng đáp án
            const regex = /\[\d\]/g;
            let matches: any = [];
            if (data?.questionType === 'FILL') {
              matches = data.questionName?.match(regex);
              const count = matches ? matches.length : 0;

              if (count !== data.options.length) {
                message.error(
                  `Câu hỏi ${questionNoStart + index} không hợp lệ, vui lòng kiểm tra lại`,
                );
                canCreate = false;
                return;
              }
            }
            if (data?.options.length > 0) {
              const corrects: number[] = data.options[0].correct;
              data.options.forEach((option: any, optionsIndex: number) => {
                if (data.questionType === 'ONLY_ONE') {
                  options.push({
                    optionName: option?.optionName,
                    correct: data.options[0].correct === optionsIndex,
                  });
                } else if (data.questionType === 'MULTIPLE_SELECT') {
                  options.push({
                    optionName: option?.optionName,
                    correct: corrects?.includes(optionsIndex),
                  });
                } else {
                  const regex = /\[\d\]/;
                  const match = matches[optionsIndex].match(regex);
                  const digit = match[0].match(/\d/)[0];
                  fillCorrects.push({ answer: option?.optionName, index: digit });
                }
              });
            }
            questionList.push({
              questionNo: questionNoStart + index,
              questionName: data.questionName,
              questionType: data.questionType,
              point: data.point || 0,
              fillCorrects: fillCorrects,
              options: options,
            });
            console.log('questionList: ', questionList);
          });
        }
        if (canCreate) {
          addQuestion(questionList).then((res) => {
            form.setFieldsValue({
              questions: [],
            });
          });
        }
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
                  style={{ width: '15%' }}
                  label="Loại câu hỏi"
                  name={[field.name, 'questionType']}
                  rules={[
                    {
                      required: true,
                      message: 'Loại câu hỏi không được trống',
                    },
                  ]}
                  initialValue={'ONLY_ONE'}
                >
                  <Select
                    placeholder="Chọn loại câu hỏi"
                    options={options}
                    onChange={(e) => {
                      // setQuestionType(e);
                      handleChange(e, index);
                    }}
                  />
                </Form.Item>
                <div style={{ position: 'relative' }}>
                  <Form.Item
                    label={
                      <>
                        {`Câu ${questionNoStart + index}`}
                        {form.getFieldValue(['questions', index])?.questionType === 'FILL' ? (
                          <span>
                            - Đáp án điền cần nhập theo mẫu sau: [STT] - ví dụ: vị trí điền thứ nhất
                            là [1]{' '}
                            <Button onClick={() => handleAddFill(index)} type="primary">
                              thêm vị trí điền
                            </Button>
                          </span>
                        ) : (
                          ''
                        )}
                      </>
                    }
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
                      top: 0,
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
                <div style={{ marginLeft: '20px' }}>
                  <Form.List name={[field.name, 'options']}>
                    {(optionFields, optionMeta) => (
                      <>
                        {optionFields.map((optionField, optionIndex) => (
                          <div className="options-content" key={optionField.key}>
                            <div style={{ position: 'relative' }}>
                              <Form.Item
                                label={`Đáp án ${optionIndex + 1}`}
                                name={[optionField.name, 'optionName']}
                                initialValue=""
                              >
                                {form.getFieldValue(['questions', index])?.questionType ===
                                'FILL' ? (
                                  <Input.TextArea />
                                ) : (
                                  <ReactQuill
                                    modules={{
                                      toolbar: [[{ list: 'ordered' }, { list: 'bullet' }]],
                                    }}
                                  />
                                )}
                              </Form.Item>
                              <div
                                style={{
                                  position: 'absolute',
                                  top: 0,
                                  right: 0,
                                  fontSize: 20,
                                  margin: 4,
                                  cursor: 'pointer',
                                }}
                                onClick={() => {
                                  optionMeta.remove(optionIndex);
                                  setTotalOption(totalOption - 1);
                                }}
                              >
                                <Tooltip title="Xóa câu trả lời">
                                  <MinusCircleOutlined />
                                </Tooltip>
                              </div>
                            </div>
                          </div>
                        ))}
                        <Form.Item style={{ marginTop: 8 }}>
                          <Button
                            type="dashed"
                            onClick={() => {
                              optionMeta.add();
                              setTotalOption(totalOption + 1);
                            }}
                            icon={<PlusOutlined />}
                          >
                            {form.getFieldValue(['questions', index])?.questionType !== 'FILL'
                              ? 'Thêm câu trả lời'
                              : 'Đáp án cần điền'}
                          </Button>
                        </Form.Item>
                        {totalOption > 0 && (
                          <>
                            {form.getFieldValue(['questions', index])?.questionType !== 'FILL' ? (
                              <Form.Item
                                label="Chọn đáp án đúng:"
                                name={[optionFields[0]?.name, 'correct']}
                              >
                                {form.getFieldValue(['questions', index])?.questionType ===
                                'MULTIPLE_SELECT' ? (
                                  <Checkbox.Group
                                    options={optionFields.map((option, optionIndex) => ({
                                      label: `Đáp án ${optionIndex + 1}`,
                                      value: optionIndex,
                                    }))}
                                    onChange={(checkedValues) => {}}
                                  />
                                ) : (
                                  <Radio.Group
                                    onChange={(e) => {}}
                                    options={optionFields.map((option, optionIndex) => ({
                                      label: `Đáp án ${optionIndex + 1}`,
                                      value: optionIndex,
                                    }))}
                                  />
                                )}
                              </Form.Item>
                            ) : (
                              <></>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </Form.List>
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

export default FormAddQuestion;
