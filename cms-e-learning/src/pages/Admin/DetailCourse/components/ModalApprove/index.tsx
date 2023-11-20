import { approveCourse } from '@/services/api/CourseController';
import { message, Modal } from 'antd';

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  courseId: string;
  isRender: boolean;
  setIsRender: (isRender: boolean) => void;
}

const ModalApprove: React.FC<Props> = ({ isOpen, setIsOpen, courseId, isRender, setIsRender }) => {
  const [messageApi, contextHolder] = message.useMessage();
  return (
    <>
      {contextHolder}
      <Modal
        className="modal-confirm"
        style={{ maxWidth: '400px' }}
        open={isOpen}
        closable={false}
        onCancel={() => setIsOpen(false)}
        centered={true}
        onOk={() => {
          approveCourse({ id: courseId })
            .then((res) => {
              if (res.code === 0) {
                messageApi.success('Duyệt yêu cầu thành công!', 3);
                setIsRender(!isRender);
                setIsOpen(false);
              } else {
                messageApi.error(res.message, 3);
              }
            })
            .catch((err) => messageApi.error(err, 3));
        }}
      >
        <div className="text-headding" style={{ textAlign: 'center' }}>
          Xác nhận duyệt
        </div>
        <div className="text">Bạn có xác nhật duyệt khóa học này không ?</div>
      </Modal>
    </>
  );
};
export default ModalApprove;
