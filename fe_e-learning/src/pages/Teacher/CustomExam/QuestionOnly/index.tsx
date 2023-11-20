import { updateQuestion } from '@/services/api/QuestionController';
import { Form, InputNumber, message, Radio } from 'antd';
import { useContext, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { QuestionContext } from '..';
import { toolbarOptions } from '../FormAddQuestion';
import SettingEditQuestion from '../SettingEditQuestion';
interface Props {
  question: API.QuestionResponse;
}

export default (props: Props): JSX.Element => {
  const { question } = props;
  const [form] = Form.useForm();

  const context = useContext(QuestionContext);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  useEffect(() => {
    form.setFieldsValue({
      questionName: question.questionName,
      point: question.point,
    });
  }, []);

  return (
    <>
      {isEdit ? (
        <Form
          style={{ width: '82vw' }}
          autoComplete="off"
          form={form}
          layout="vertical"
          className="question-edit"
        >
          <div className="question-content">
            <div style={{ position: 'relative' }}>
              <Form.Item
                label={`Câu ${question.questionNo}`}
                name={'questionName'}
                rules={[
                  {
                    required: true,
                    message: 'Câu hỏi không được trống',
                  },
                ]}
              >
                <ReactQuill modules={{ toolbar: toolbarOptions }} />
              </Form.Item>
              <div
                style={{ cursor: 'pointer', marginLeft: 8, position: 'absolute', top: 0, right: 0 }}
              >
                <SettingEditQuestion
                  onSave={() => {
                    console.log(form.getFieldsValue());
                    const options: API.CreateOptionRequest[] =
                      question.options?.map((option) => {
                        if (form.getFieldValue('correct') === option.id) {
                          return {
                            optionName: form.getFieldValue(option.id || ''),
                            correct: true,
                          } as API.CreateOptionRequest;
                        }
                        return {
                          optionName: form.getFieldValue(option.id || ''),
                          correct: false,
                        } as API.CreateOptionRequest;
                      }) || [];
                    const questionReq: API.UpdateQuestionRequest = {
                      id: question.id || '',
                      questionName: form.getFieldValue('questionName'),
                      questionNo: question.questionNo || -1,
                      questionType: question.questionType || 'ONLY_ONE',
                      options: options,
                      point: form.getFieldValue('point'),
                    };
                    updateQuestion(questionReq).then((res) => {
                      if (res.code === 0) {
                        message.success('Cập nhật câu hỏi thành công', 3);
                        setIsEdit(false);
                        context.updateQuestion(res?.data || {});
                        context.setIsReload();
                      } else {
                        message.error(res.message, 3);
                      }
                    });
                  }}
                  question={question}
                  isEdit={isEdit}
                  setIsEdit={setIsEdit}
                />
              </div>
            </div>
            <div style={{ marginLeft: '20px' }}>
              <Form.Item
                style={{ width: '15%' }}
                label="Điểm cho câu hỏi"
                name={'point'}
                rules={[
                  {
                    required: true,
                    message: 'Điểm câu hỏi không được trống',
                  },
                ]}
              >
                <InputNumber min={0} max={10} placeholder="Nhập điểm câu hỏi" />
              </Form.Item>
              {question.options?.map((option, optionIndex) => {
                return (
                  <Form.Item
                    label={`Đáp án ${optionIndex + 1}`}
                    name={option.id}
                    initialValue={option.optionName}
                  >
                    <ReactQuill
                      modules={{
                        toolbar: [[{ list: 'ordered' }, { list: 'bullet' }]],
                      }}
                    />
                  </Form.Item>
                );
              })}
              <Form.Item
                name={'correct'}
                initialValue={question.options?.filter((d) => d.correct).at(0)?.id}
              >
                <Radio.Group
                  onChange={(e) => {}}
                  options={question.options?.map((option, optionIndex) => ({
                    label: `Đáp án ${optionIndex + 1}`,
                    value: option.id,
                  }))}
                  defaultValue={question.options?.filter((d) => d.correct).at(0)?.id}
                />
              </Form.Item>
            </div>
          </div>
        </Form>
      ) : (
        <>
          <div
            key={question.id}
            style={{
              padding: 0,
              marginLeft: '20px',
              display: 'flex',
              fontWeight: '500',
              alignItems: 'flex-start',
            }}
            className="question-no-edit"
          >
            <div
              style={{
                flex: '0 0 95%',
                display: 'flex',
                overflow: 'auto',
                alignItems: 'flex-start',
              }}
            >
              <div
                className="long-text"
                dangerouslySetInnerHTML={{
                  __html:
                    `<p>Câu ${question.questionNo}:</p> ${question.questionName} (${question.point}đ)` ||
                    '',
                }}
              />
            </div>
            <div style={{ cursor: 'pointer', marginLeft: 8 }}>
              <SettingEditQuestion question={question} isEdit={isEdit} setIsEdit={setIsEdit} />
            </div>
          </div>
          <Radio.Group className="options question-no-edit">
            {question.options?.map((option, index) => {
              return (
                <Radio
                  style={{ width: 'fit-content', cursor: 'pointer' }}
                  value={option.optionName}
                >
                  <div
                    className="normal-text"
                    style={{ padding: 0, display: 'flex', cursor: 'pointer' }}
                  >
                    <div style={{ marginRight: 8, cursor: 'pointer' }}>{`Đáp án ${
                      index + 1
                    }:`}</div>
                    <div
                      className="long-text ql-editor"
                      style={{ cursor: 'pointer' }}
                      dangerouslySetInnerHTML={{
                        __html: option.optionName || '',
                      }}
                    />
                  </div>
                </Radio>
              );
            })}
          </Radio.Group>
        </>
      )}
    </>
  );
};
