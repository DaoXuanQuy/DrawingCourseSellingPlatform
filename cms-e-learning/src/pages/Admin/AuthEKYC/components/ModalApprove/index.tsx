import { approveRequestRoleTeacher } from '@/services/api/teacherController';
import { message, Modal } from 'antd';

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  teacher: API.TeacherDto;
  isRender: boolean;
  setIsRender: (isRender: boolean) => void;
}

const ModalApprove: React.FC<Props> = ({ isOpen, setIsOpen, teacher, isRender, setIsRender }) => {
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
          approveRequestRoleTeacher({ teacherId: teacher.id })
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
        <div className="text">Bạn có xác nhật duyệt giáo viên này không ?</div>
      </Modal>
    </>
  );
};
export default ModalApprove;
