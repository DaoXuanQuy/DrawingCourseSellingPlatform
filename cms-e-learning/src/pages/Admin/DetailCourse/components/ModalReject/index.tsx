import { rejectedCourse } from '@/services/api/CourseController';
import { WarningOutlined } from '@ant-design/icons';
import { message, Modal } from 'antd';
import './ekyc.less';

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  course: API.CourseDto;
  isRender: boolean;
  setIsRender: (isRender: boolean) => void;
}

const ModalReject: React.FC<Props> = ({ isOpen, setIsOpen, course, isRender, setIsRender }) => {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <>
      {contextHolder}
      <Modal
        open={isOpen}
        closable={false}
        onCancel={() => {
          setIsOpen(false);
        }}
        centered={true}
        className="modal-confirm"
        okText="Xác nhận"
        cancelText="Hủy"
        onOk={() => {
          if (course?.approveStatus === 'REJECTED') {
            messageApi.info('Yêu cầu đã được từ chối', 3);
            return;
          }
          rejectedCourse({
            id: course.id || '',
          })
            .then((res) => {
              if (res.code === 0) {
                setIsOpen(false);
                messageApi.success('Từ chối yêu cầu thành công!', 3);
                setIsRender(!isRender);
              } else {
                messageApi.error(res.message, 3);
              }
            })
            .catch((err) => {
              messageApi.error(err, 3);
            });
        }}
      >
        <>
          <div
            className="text-headding"
            style={{
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ fontSize: 60, color: '#FD3549' }}>
              <WarningOutlined />
            </div>
            <div>Từ chối duyệt khóa học</div>
          </div>
          <div className="text" style={{ textAlign: 'center' }}>
            Bạn có chắc chắn muốn từ chối duyệt khóa học này không ?
          </div>
        </>
      </Modal>
    </>
  );
};

export default ModalReject;
