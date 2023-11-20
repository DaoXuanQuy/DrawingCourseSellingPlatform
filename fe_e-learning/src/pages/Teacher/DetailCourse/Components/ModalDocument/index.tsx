import { createDocument, updateDocument } from '@/services/api/DocumentController';
import { ProForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { Card, Form, message, Modal } from 'antd';
import { useEffect } from 'react';

interface Props {
  isOpen: boolean;
  setIsOpen: Function;
  courseId?: string;
  document?: API.DocumentInfo;
}
export default (props: Props) => {
  const { isOpen, setIsOpen, courseId, document } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    if (document) {
      form.setFieldsValue({
        name: document.documentName,
        description: document.description,
        content: document.content,
        file: document.file,
      });
    }
  }, [document]);
  return (
    <>
      <Modal
        open={isOpen}
        onCancel={() => {
          setIsOpen(false);
        }}
        onOk={() => {
          if (document) {
            form.validateFields().then((data) => {
              updateDocument({
                id: document.id || -1,
                content: data.content,
                description: data.description,
                documentName: data.name,
                file: data.file,
              }).then((res) => {
                if (res.code === 0) {
                  message.success({
                    content: 'Update document success',
                  });
                  setIsOpen(false);
                  form.resetFields();
                } else {
                  message.error({
                    content: `Update document error: ${res.message}`,
                  });
                }
              });
            });
          } else {
            form.validateFields().then((data) => {
              createDocument({
                courseId: courseId || '',
                content: data.content,
                description: data.description,
                documentName: data.name,
                file: data.file,
              }).then((res) => {
                if (res.code === 0) {
                  message.success({
                    content: 'Add document success',
                  });
                  setIsOpen(false);
                  form.resetFields();
                } else {
                  message.error({
                    content: `Add document error: ${res.message}`,
                  });
                }
              });
            });
          }
        }}
        closable={false}
        title={'Add Exam'}
      >
        <Card>
          <ProForm onFinish={async (values) => console.log(values)} submitter={false} form={form}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ flexGrow: 1 }}>
                <ProFormText
                  label="Name"
                  name="name"
                  placeholder="name"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter document name!',
                    },
                  ]}
                />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ flexGrow: 1 }}>
                <ProFormTextArea
                  label="Content"
                  name="content"
                  placeholder="content"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter content!',
                    },
                  ]}
                />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ flexGrow: 1 }}>
                <ProFormText
                  label="File Url"
                  name="file"
                  placeholder="file"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter file url!',
                    },
                  ]}
                />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ flexGrow: 1 }}>
                <ProFormTextArea
                  label="Description"
                  name="description"
                  placeholder="description"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter description!',
                    },
                  ]}
                />
              </div>
            </div>
          </ProForm>
        </Card>
      </Modal>
    </>
  );
};
