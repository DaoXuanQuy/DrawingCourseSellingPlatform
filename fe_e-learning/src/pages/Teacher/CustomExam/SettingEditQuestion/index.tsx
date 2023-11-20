import { deleteQuestionById } from '@/services/api/QuestionController';
import { SettingOutlined } from '@ant-design/icons';
import { Dropdown, message, Modal, Space, Tooltip } from 'antd';
import { useContext } from 'react';
import { QuestionContext } from '..';

interface Props {
  isEdit?: boolean;
  setIsEdit?: (isEdit: boolean) => void;
  question: API.QuestionResponse;
  onSave?: () => void;
}

export default (props: Props): JSX.Element => {
  const { isEdit, setIsEdit, question, onSave } = props;
  const context = useContext(QuestionContext);

  return (
    <div className="icon-sub">
      <Tooltip title="Cài đặt bài học">
        <Dropdown
          placement="bottomRight"
          menu={{
            items: [
              {
                key: '0',
                label: (
                  <p
                    className="lesson-action"
                    onClick={() => {
                      if (isEdit) {
                        if (onSave !== undefined) onSave();
                      } else if (setIsEdit !== undefined) {
                        setIsEdit(true);
                      }
                    }}
                  >
                    {isEdit ? 'Lưu' : 'Chỉnh sửa'}
                  </p>
                ),
              },
              {
                key: '1',
                danger: true,
                label: (
                  <p
                    className="lesson-action"
                    onClick={() => {
                      if (isEdit) {
                        if (setIsEdit !== undefined) setIsEdit(false);
                      } else {
                        Modal.confirm({
                          title: `Xác nhận xóa câu hỏi ${question.questionNo}?`,
                          okText: 'Xác nhận',
                          cancelText: 'Hủy',
                          onOk: () => {
                            if (question.id) {
                              deleteQuestionById({ id: question.id }).then((res) => {
                                if (res.code === 0) {
                                  message.success('Xóa câu hỏi thành công', 3);
                                  context.setIsReload();
                                } else {
                                  message.error(res.message, 3);
                                }
                              });
                            }
                          },
                        });
                      }
                    }}
                  >
                    {isEdit ? 'Hủy' : 'Xóa'}
                  </p>
                ),
              },
            ],
          }}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <SettingOutlined />
            </Space>
          </a>
        </Dropdown>
      </Tooltip>
    </div>
  );
};
