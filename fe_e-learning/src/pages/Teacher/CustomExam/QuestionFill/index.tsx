import { updateQuestion } from '@/services/api/QuestionController';
import { CaretRightOutlined } from '@ant-design/icons';
import { Form, Input, InputNumber, message } from 'antd';
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
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const context = useContext(QuestionContext);

  const fillQuestion = (question: API.QuestionResponse): string => {
    let result: string | undefined = question.questionName;
    const regex = /\[\d\]/g;
    const matches = result?.match(regex);

    if (matches && matches?.length > 0) {
      question.fillCorrects?.forEach((data, index) => {
        result = result?.replace(
          matches[index],
          `<input type=${data.type === 'NUMBER' ? 'number' : 'text'} id=${
            data.id
          } class="input-fill" />`,
        );
      });
    }
    return result || '';
  };
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
                label={`Câu ${question.questionNo} - Đáp án điền cần nhập theo mẫu sau: [STT] - ví dụ: vị trí điền thứ nhất là [1]`}
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
                    const fills: API.FillCorrectInfo[] =
                      question.fillCorrects?.map((fill) => {
                        return {
                          index: fill.index,
                          answer: form.getFieldValue(fill.id || ''),
                        } as API.FillCorrectInfo;
                      }) || [];
                    const questionReq: API.UpdateQuestionRequest = {
                      id: question.id || '',
                      questionName: form.getFieldValue('questionName'),
                      questionNo: question.questionNo || -1,
                      questionType: question.questionType || 'FILL',
                      fillCorrects: fills,
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
              {question.fillCorrects
                ?.sort((o1, o2) => o1.index - o2.index)
                .map((data, index) => {
                  return (
                    <Form.Item name={data.id} initialValue={data.answer}>
                      <Input.TextArea />
                    </Form.Item>
                  );
                })}
            </div>
          </div>
        </Form>
      ) : (
        <>
          <form>
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
                  className="long-text ql-editor"
                  dangerouslySetInnerHTML={{
                    __html:
                      `<p>Câu ${question.questionNo}:</p> ${fillQuestion(question)} (${
                        question.point
                      }đ)` || '',
                  }}
                />
              </div>
              <div style={{ cursor: 'pointer', marginLeft: 8 }}>
                <SettingEditQuestion question={question} isEdit={isEdit} setIsEdit={setIsEdit} />
              </div>
            </div>
            <div className="options question-no-edit">
              {question.fillCorrects
                ?.sort((o1, o2) => o1.index - o2.index)
                .map((data, index) => {
                  return (
                    <div
                      key={data.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'start',
                      }}
                    >
                      <div>
                        <CaretRightOutlined />
                      </div>
                      <div>{`Từ điền ${index + 1}: ${data.answer}`}</div>
                    </div>
                  );
                })}
            </div>
          </form>
        </>
      )}
    </>
  );
};
