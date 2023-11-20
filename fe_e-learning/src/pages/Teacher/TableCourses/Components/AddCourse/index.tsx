import ImageUpload from '@/components/ImageUpload';
import { createCourse } from '@/services/api/CourseController';
import { ProForm, ProFormDigit, ProFormText } from '@ant-design/pro-components';
import { Card, Divider, Form, message, Modal, UploadFile } from 'antd';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import './index.less';

interface Props {
  isOpen: boolean;
  handleOpen: (e: boolean) => void;
  isRender?: boolean;
  setIsRender?: (isRender: boolean) => void;
}

export default (props: Props) => {
  const { isOpen, handleOpen, isRender, setIsRender } = props;
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {}, []);

  return (
    <Modal
      open={isOpen}
      onCancel={() => {
        handleOpen(false);
      }}
      onOk={() => {
        form
          .validateFields()
          .then((data) => {
            createCourse(
              {
                courseImage: '',
                courseName: data.courseName,
                description: data.description,
                price: data.price,
              },
              fileList[0].originFileObj as File,
            ).then((res) => {
              if (res.code === 0) {
                message.success('Thêm khóa học thành công');
                handleOpen(false);
                setIsRender !== undefined ? setIsRender(!isRender) : undefined;
              } else {
                message.error(`Thêm khóa học thất bại: ${res.message}`);
              }
            });
          })
          .catch((err) => {});
      }}
      closable={false}
      title={'Thêm khóa học'}
      cancelText="Hủy"
      okText="Thêm"
      className="add-course"
    >
      <Card>
        <ProForm form={form} submitter={false} title={'Thêm khóa học'}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: '0 0 0.8' }}>
              <ImageUpload fileList={fileList} setFileList={setFileList} />
            </div>
          </div>
          <Divider />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <ProFormText
              name="courseName"
              label="Tên khóa học"
              placeholder="Tên khóa học"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên khóa học!',
                },
              ]}
            />
            <ProFormDigit
              label="Giá"
              name="price"
              min={1}
              max={100000000}
              placeholder="Giá"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập giá khóa học!',
                },
              ]}
            />
          </div>
          <ProForm.Item name="description" label="Mô tả">
            <ReactQuill style={{ width: '100%' }} />
          </ProForm.Item>
        </ProForm>
      </Card>
    </Modal>
  );
};
