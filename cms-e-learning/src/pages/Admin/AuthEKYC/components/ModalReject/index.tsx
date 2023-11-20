import { rejectRequestRoleTeacher } from '@/services/api/teacherController';
import { WarningOutlined } from '@ant-design/icons';
import { Checkbox, Input, message, Modal } from 'antd';
import { useState } from 'react';
import './ekyc.less';

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  teacher: API.TeacherDto;
  isRender: boolean;
  setIsRender: (isRender: boolean) => void;
}

const ModalReject: React.FC<Props> = ({ isOpen, setIsOpen, teacher, isRender, setIsRender }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isChecked1, setIsChecked1] = useState<boolean>(false);
  const [isChecked2, setIsChecked2] = useState<boolean>(false);
  const [reasonDeny, setReasonDeny] = useState<String[]>([]);
  const [desReason, setDesReason] = useState<string>('');

  const { TextArea } = Input;

  return (
    <>
      {contextHolder}
      <Modal
        open={isOpen}
        closable={false}
        onCancel={() => {
          setIsOpen(false);
          setDesReason('');
          setReasonDeny([]);
          setIsChecked1(false);
          setIsChecked2(false);
        }}
        centered={true}
        className="modal-confirm"
        okText="Xác nhận"
        cancelText="Hủy"
        onOk={() => {
          if (teacher?.status === 'REJECTED') {
            messageApi.info('Yêu cầu đã được từ chối', 3);
            return;
          }
          rejectRequestRoleTeacher({
            teacherId: teacher.id,
            reason: reasonDeny as ('INVALID_ID_CARD' | 'BLUR_ID_CARD')[],
            descriptionReason: desReason,
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
            <div>Từ chối duyệt giáo viên</div>
          </div>
          <div className="text" style={{ textAlign: 'center' }}>
            Bạn có chắc chắn muốn từ chối duyệt giáo viên này không ? Vui lòng chọn hoặc nhập lí do
            từ chối
          </div>
          <div style={{ marginTop: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Checkbox
                checked={isChecked1}
                value={'INVALID_ID_CARD'}
                name="invalidIdCard"
                onChange={(e) => {
                  setIsChecked1(e.target.checked);
                  if (e.target.checked) {
                    if (reasonDeny.findIndex((data) => data === e.target.value) === -1) {
                      setReasonDeny([...reasonDeny, e.target.value]);
                    }
                  } else {
                    setReasonDeny(reasonDeny.filter((data) => data !== e.target.value));
                  }
                }}
              >
                CCCD/CMND không hợp lệ
              </Checkbox>
              <Checkbox
                value={'BLUR_ID_CARD'}
                name="blurIdCard"
                checked={isChecked2}
                onChange={(e) => {
                  setIsChecked2(e.target.checked);
                  if (e.target.checked) {
                    if (reasonDeny.findIndex((data) => data === e.target.value) === -1) {
                      setReasonDeny([...reasonDeny, e.target.value]);
                    }
                  } else {
                    setReasonDeny(reasonDeny.filter((data) => data !== e.target.value));
                  }
                }}
              >
                CCCD/CMND mờ
              </Checkbox>
            </div>
            <TextArea
              style={{ marginTop: 6 }}
              rows={3}
              placeholder="Lí do chi tiết"
              name="desReason"
              value={desReason}
              onChange={(e) => {
                setDesReason(e.target.value);
              }}
            />
          </div>
        </>
      </Modal>
    </>
  );
};

export default ModalReject;
