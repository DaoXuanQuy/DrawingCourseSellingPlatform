import { LikeOutlined } from '@ant-design/icons';
import { Form, Input, Modal, Rate } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './index.less';
interface Props {
  courseId: string;
  isOpen: boolean;
  setIsOpen?: (e: boolean) => void;
  handleReview?: (value: API.CreateReviewRequest) => Promise<void>;
}

export default (props: Props): JSX.Element => {
  const { isOpen, setIsOpen, handleReview, courseId } = props;
  const [form] = Form.useForm();

  const handleOk = () => {
    form.validateFields().then((value) => {
      if (handleReview !== undefined) {
        const reviewReq: API.CreateReviewRequest = {
          courseId: courseId,
          content: value.content,
          subject: value.subject,
          star: value.start,
        };
        handleReview(reviewReq).then((v) => {
          form.resetFields();
        });
      }
    });
  };

  return (
    <div className="modal-review">
      <Modal
        title={
          <div>
            <LikeOutlined style={{ fontSize: '20px', color: '#1890ff' }} /> Đánh giá khóa học
          </div>
        }
        open={isOpen}
        onOk={handleOk}
        onCancel={() => {
          if (setIsOpen !== undefined) {
            setIsOpen(false);
          }
        }}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            name={'subject'}
            label="Tiêu đề"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập tiêu đề đánh giá',
              },
            ]}
          >
            <Input style={{ borderRadius: '6px', fontWeight: 'bold' }} placeholder="Tiếu đề" />
          </Form.Item>
          <Form.Item
            name={'content'}
            label="Nội dung"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập nội dung đánh giá',
              },
            ]}
          >
            <ReactQuill />
          </Form.Item>
          <Form.Item
            className="start"
            label={<div>Đánh giá</div>}
            style={{ display: 'flex' }}
            name="start"
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn sao đánh giá',
              },
            ]}
          >
            <Rate />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
