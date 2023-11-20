import ImageUpload from '@/components/ImageUpload';
import { GET_IMAGE } from '@/constant';
import { updateCourse } from '@/services/api/CourseController';
import { ProForm, ProFormDigit, ProFormText } from '@ant-design/pro-components';
import { Card, Divider, Form, message, Modal, UploadFile } from 'antd';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';

interface Props {
  isOpen: boolean;
  handleOpen: (e: boolean) => void;
  isRender?: boolean;
  setIsRender?: (isRender: boolean) => void;
  course?: API.CourseDto;
}

export default (props: Props) => {
  const { isOpen, handleOpen, isRender, setIsRender, course } = props;
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const intiData = () => {
    form.setFieldsValue({
      courseName: course?.courseName,
      description: course?.description,
      price: course?.price,
    });
    setFileList([
      {
        uid: '1',
        name: 'image.png',
        url: GET_IMAGE.getUrl(course?.imageUrl),
      },
    ]);
  };

  useEffect(() => {
    intiData();
  }, [course]);

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
            updateCourse(
              {
                id: course?.id || '',
                courseImage: undefined,
                courseName: data.courseName,
                description: data.description,
                price: data.price,
              },
              (fileList[0].originFileObj as File) === undefined
                ? undefined
                : (fileList[0].originFileObj as File),
            ).then((res) => {
              if (res.code === 0) {
                message.success('Cập nhật khóa học thành công');
                handleOpen(false);
                setIsRender !== undefined ? setIsRender(!isRender) : undefined;
              } else {
                message.error(res.message);
              }
            });
          })
          .catch((err) => {});
      }}
      closable={false}
      title={'Cập nhật khóa học'}
      cancelText="Hủy"
      okText="Cập nhật"
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
          <ProForm.Group>
            <ReactQuill style={{ width: '100%' }} />
          </ProForm.Group>
        </ProForm>
      </Card>
    </Modal>
  );
};
