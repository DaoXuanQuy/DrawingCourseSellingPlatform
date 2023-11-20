import ImageUpload from '@/components/ImageUpload';
import { ProForm, ProFormDigit, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { Card, Divider, Form, message, Modal, UploadFile } from 'antd';
import { useEffect, useState } from 'react';
import { createCourse } from '@/services/api/CourseController';
import { upload } from '@/services/api/FileStorageController';

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isRender?: boolean;
  setIsRender?: (isRender: boolean) => void;
}

export default (props: Props) => {
  const { isOpen, setIsOpen } = props;
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {}, []);

  return (
    <Modal
      open={isOpen}
      onCancel={() => {
        setIsOpen(false);
      }}
      onOk={() => {
        form
          .validateFields()
          .then((data) => {
            upload({ file: '' }, fileList[0].originFileObj as File).then((res) => {
              if (res.code === 0) {
                createCourse({
                  avatar: res.data?.url,
                  courseName: data.courseName,
                  description: data.description,
                  title: data.title,
                  price: data.price,
                }).then((res) => {
                  if (res.code === 0) {
                    message.success('Add course success');
                  } else {
                    message.error(`Add course failed: ${res.message}`);
                  }
                });
              } else {
                message.error(`Add course failed: ${res.message}`);
              }
            });
          })
          .catch((err) => {});
      }}
      closable={false}
      title={'Add Course'}
    >
      <Card>
        <ProForm form={form} submitter={false} title={'Add Course'}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: '0 0 0.8' }}>
              <ImageUpload fileList={fileList} setFileList={setFileList} />
            </div>
          </div>
          <Divider />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <ProFormText
              name="title"
              label="Title"
              placeholder="Title"
              rules={[
                {
                  required: true,
                  message: 'Please enter title!',
                },
              ]}
            />
            <ProFormText
              name="courseName"
              label="Course Name"
              placeholder="Course Name"
              rules={[
                {
                  required: true,
                  message: 'Please enter course name!',
                },
              ]}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <ProFormDigit
              label="Price"
              name="price"
              min={1}
              max={100000000}
              placeholder="Price"
              rules={[
                {
                  required: true,
                  message: 'Please enter price!',
                },
              ]}
            />
          </div>
          <ProForm.Group>
            <ProFormTextArea
              width={'xl'}
              name="description"
              label="Description"
              placeholder="Description"
            />
          </ProForm.Group>
        </ProForm>
      </Card>
    </Modal>
  );
};
