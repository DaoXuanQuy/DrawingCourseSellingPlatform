import { updateQuestion } from '@/services/api/QuestionController';
import { Divider, Form, InputNumber, message } from 'antd';
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
                    const questionReq: API.UpdateQuestionRequest = {
                      id: question.id || '',
                      questionName: form.getFieldValue('questionName'),
                      questionNo: question.questionNo || -1,
                      questionType: question.questionType || 'ESSAY',
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
            </div>
          </div>
        </Form>
      ) : (
        <>
          <Divider style={{ margin: '8px 0' }} />
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
                    `<p>Câu ${question.questionNo} - (${question.point}đ):</p> ${question.questionName}` ||
                    '',
                }}
              />
            </div>
            <div style={{ cursor: 'pointer', marginLeft: 8 }}>
              <SettingEditQuestion question={question} isEdit={isEdit} setIsEdit={setIsEdit} />
            </div>
          </div>
        </>
      )}
    </>
  );
};
