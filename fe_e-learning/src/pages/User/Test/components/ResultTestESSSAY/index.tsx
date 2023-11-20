import { CarryOutOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import './index.less';

interface Props {
  result: API.SubmitAnswersResponse;
  totalScore?: number;
  onOk?: () => void;
  onCancel?: () => void;
  isOpen: boolean;
}

export default (props: Props): JSX.Element => {
  const { result, isOpen, onOk, onCancel, totalScore } = props;

  const checkPass = (score?: number, maxScorre?: number) => {
    if (maxScorre === undefined) {
      return false;
    }
    return (score || 0) / maxScorre >= 0.5;
  };
  const handleOk = () => {
    if (onOk !== undefined) {
      onOk();
    }
  };
  const handleCancel = () => {
    if (onCancel !== undefined) {
      onCancel();
    }
  };
  return (
    <>
      <Modal
        className="modal-result"
        title={
          <div style={{ fontSize: 20 }}>
            <CarryOutOutlined /> Kết quả
          </div>
        }
        open={isOpen}
        cancelText="Hủy"
        onCancel={handleCancel}
        okText="Xác nhận"
        onOk={handleOk}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontSize: '5rem',
              lineHeight: '5rem',
              color: true ? '#52c41a' : '#ff4d4f',
              margin: '8px 0',
            }}
          >
            {true ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
          </div>
          <div style={{ margin: '8px 0' }}>
            {`Nộp bài kiểm tra thành công. Kết quả làm bài đã được lưu.`}
          </div>
        </div>
      </Modal>
    </>
  );
};
