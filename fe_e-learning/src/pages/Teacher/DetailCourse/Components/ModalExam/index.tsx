import { ProForm, ProFormDigit, ProFormText } from '@ant-design/pro-components';
import { Card, Form, message, Modal } from 'antd';
import { createExam, updateExam } from '@/services/api/ExamController';
import { useEffect } from 'react';
interface Props {
  isOpen: boolean;
  setIsOpen: Function;
  courseId?: string;
  exam?: API.ExamInfo;
}
export default (props: Props) => {
  const { isOpen, setIsOpen, courseId, exam } = props;
  const [form] = Form.useForm();

  const addExam = async (params: API.AddExamRequest): Promise<API.ResponseBaseAddExamResponse> => {
    return await createExam(params);
  };

  useEffect(() => {
    if (exam) {
      form.setFieldsValue({
        examName: exam.examName,
        timeMinute: exam.timeMinute,
        totalQuestion: exam.questionTotal,
      });
    }
  });
  return (
    <>
      <Modal
        open={isOpen}
        onCancel={() => {
          setIsOpen(false);
          form.resetFields();
        }}
        onOk={() => {
          if (exam) {
            form
              .validateFields()
              .then((data) => {
                updateExam({
                  id: exam.id || -1,
                  examName: data.examName,
                  timeMinute: data.timeMinute,
                  questionTotal: data.totalQuestion,
                }).then((res) => {
                  if (res.code === 0) {
                    message.success({
                      content: 'Update exam success',
                    });
                    setIsOpen(false);
                    form.resetFields();
                  } else {
                    message.error({
                      content: `Update exam error: ${res.message}`,
                    });
                  }
                });
              })
              .catch((err) => {});
          } else {
            form
              .validateFields()
              .then((data) => {
                addExam({
                  courseId: courseId || '',
                  examName: data.examName,
                  timeMinute: data.timeMinute,
                  questionTotal: data.totalQuestion,
                }).then((res) => {
                  if (res.code === 0) {
                    message.success({
                      content: 'Add exam success',
                    });
                    setIsOpen(false);
                    form.resetFields();
                  } else {
                    message.error({
                      content: `Add exam error: ${res.message}`,
                    });
                  }
                });
              })
              .catch((err) => {});
          }
        }}
        closable={false}
        title={'Add Exam'}
      >
        <Card>
          <ProForm onFinish={async (values) => console.log(values)} submitter={false} form={form}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <div style={{ flexGrow: 1 }}>
                <ProFormText
                  name="examName"
                  label="Exam Name"
                  placeholder="Exam Name"
                  rules={[{ required: true, message: 'Please enter exam name!' }]}
                />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ flexGrow: 0.5 }}>
                <ProFormDigit
                  label="Total Question"
                  name="totalQuestion"
                  min={0}
                  initialValue={0}
                  max={100000000}
                  placeholder="totalQuestion"
                />
              </div>
              <div style={{ flexGrow: 0.5 }}>
                <ProFormDigit
                  label="Time Minute"
                  name="timeMinute"
                  initialValue={0}
                  min={0}
                  max={100000000}
                  placeholder="Time minute"
                />
              </div>
            </div>
          </ProForm>
        </Card>
      </Modal>
    </>
  );
};
