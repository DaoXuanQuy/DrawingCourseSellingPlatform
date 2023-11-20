import { ProForm, ProFormDigit, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { Card, Divider, Form, message, Modal, UploadFile, Button } from 'antd';
import { useEffect, useState } from 'react';
import { updateCourse } from '@/services/api/CourseController';
import ImageUpload from '@/components/ImageUpload';
import { upload } from '@/services/api/FileStorageController';

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isRender?: boolean;
  setIsRender?: (isRender: boolean) => void;
  course: API.CourseEntity;
}

export default (props: Props) => {
  const { isOpen, setIsOpen, course } = props;
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    setFileList([
      {
        uid: '-1',
        name: 'image',
        url: course.avatar,
      },
    ]);
    form.setFieldsValue({
      title: course.title,
      courseName: course.courseName,
      price: course.price,
      description: course.description,
    });
  }, [course]);

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
                updateCourse({
                  id: course.id || '',
                  courseName: data.courseName,
                  title: data.title,
                  description: data.description,
                  price: data.price,
                  avatar: res.data?.url,
                }).then((res) => {
                  if (res.code === 0) {
                    message.success({
                      content: 'Update course success!',
                    });
                    setIsOpen(false);
                    form.resetFields();
                  } else {
                    message.success({
                      content: `Update course error: ${res.message}`,
                    });
                  }
                });
              }
            });
          })
          .catch((err) => {});
      }}
      closable={false}
      title={'Update Course'}
    >
      <Card>
        <ProForm form={form} submitter={false} title={'Update Info'}>
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
