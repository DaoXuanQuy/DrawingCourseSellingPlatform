import { EXAM_STATUS, EXAM_TYPE } from '@/constant';
import { deleteExam, updateExam } from '@/services/api/ExamController';
import {
  FieldTimeOutlined,
  FileTextOutlined,
  RedoOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { history } from '@umijs/max';
import {
  Button,
  Col,
  Divider,
  Dropdown,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Row,
  Space,
  Tag,
  Tooltip,
} from 'antd';
import { useContext, useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { RenderContext } from '../..';

interface Props {
  exam: API.ExamResponse;
  key?: string | number;
}

export default (props: Props): JSX.Element => {
  const { exam, key } = props;
  const { handleRender, course } = useContext(RenderContext);
  const [isEditExam, setIsEditExam] = useState<boolean>(false);
  useEffect(() => {}, [exam]);
  const [form] = Form.useForm();

  const handleDisplay = (id: string, status: 'ACTIVE' | 'INACTIVE') => {
    updateExam({
      id: id,
      status: status,
    }).then((res) => {
      if (res.code === 0) {
        message.success(
          status === 'INACTIVE' ? 'Ẩn bài kiểm tra thành công' : 'Hiển thị bài kiểm tra thành công',
          3,
        );
        if (handleRender !== undefined) {
          handleRender();
        }
      }
    });
  };
  return (
    <>
      <div key={key} className="single-document">
        <Divider />
        {isEditExam ? (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ flex: '0 0 98%' }}>
              <Space
                key={key}
                style={{
                  display: 'flex',
                  marginBottom: 8,
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
                align="baseline"
              >
                <Form autoComplete="off" form={form} layout="vertical">
                  <div className="lesson-content">
                    <div style={{ display: 'flex', justifyContent: 'start' }}>
                      <div
                        className="custom-center"
                        style={{
                          justifyContent: 'start',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          flex: '0 0 100%',
                        }}
                      >
                        <div style={{ display: 'flex', width: '60%', margin: '4px 0' }}>
                          <div style={{ margin: 4, flex: '0 0 50%' }}>
                            <Form.Item
                              name="examName"
                              rules={[
                                { required: true, message: 'Tên tài liệu không được để trống' },
                              ]}
                              label="Tên bài kiểm tra"
                              initialValue={exam.examName}
                            >
                              <Input placeholder="Tên tài liệu" />
                            </Form.Item>
                          </div>
                          <div style={{ margin: 4, flex: '0 0 15%' }}>
                            <Form.Item
                              name="timeMinute"
                              label="Thời gian (Phút)"
                              rules={[
                                {
                                  required: true,
                                  message: 'Thời gian làm bài không được để trống',
                                },
                              ]}
                              initialValue={exam.timeMinute}
                            >
                              <InputNumber min={1} max={180} />
                            </Form.Item>
                          </div>
                          {exam.examType === EXAM_TYPE.QUIZ.value ? (
                            <div style={{ margin: 4, flex: '0 0 15%' }}>
                              <Form.Item
                                name="testAttempts"
                                initialValue={exam.testAttempts}
                                label="Số lần làm lại"
                              >
                                <InputNumber min={1} max={180} />
                              </Form.Item>
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Form>
              </Space>
            </div>
            <div className="icon-sub">
              <Tooltip title="Cài đặt Tài liệu">
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
                              Modal.confirm({
                                title: `Xác nhận cập nhật tài liệu: ${exam.examName} ?`,
                                okText: 'Xác nhận',
                                cancelText: 'Hủy',
                                onOk: () => {
                                  form.validateFields().then((data) => {
                                    console.log(data);
                                    updateExam({ ...data, id: exam.id }).then((res) => {
                                      if (res.code === 0) {
                                        message.success(
                                          'Cập nhật thông tin bài kiểm tra thành công',
                                          3,
                                        );
                                        setIsEditExam(false);
                                        if (handleRender !== undefined) {
                                          handleRender();
                                        }
                                      } else {
                                        message.error(res.message, 3);
                                      }
                                    });
                                  });
                                },
                              });
                            }}
                          >
                            Lưu cập nhật
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
                              setIsEditExam(false);
                            }}
                          >
                            Hủy
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
          </div>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ flex: '0 0 98%' }}>
              <>
                <div className="custom-center" style={{ justifyContent: 'start' }}>
                  <Row gutter={24} style={{ width: '60%' }}>
                    <Col span={18}>
                      <div
                        className="custom-center"
                        style={{
                          minWidth: '30%',
                          fontSize: 16,
                          gap: 8,
                          justifyContent: 'start',
                          cursor: 'pointer',
                        }}
                      >
                        <Row gutter={[16, 16]} style={{ width: '100%' }}>
                          <Col
                            xs={24}
                            sm={24}
                            md={24}
                            lg={8}
                            xl={8}
                            xxl={8}
                            onClick={() => history.push(`/courses/exam/${exam.id}`, course)}
                          >
                            <div className="custom-center" style={{ justifyContent: 'start' }}>
                              <div style={{ color: '#1890ff', fontSize: 16, minWidth: '40%' }}>
                                <FileTextOutlined />
                                {exam.examName}
                              </div>
                            </div>
                          </Col>
                          <Col xs={24} sm={24} md={24} lg={16} xl={16} xxl={16}>
                            <div
                              className="custom-center"
                              style={{ justifyContent: 'start', gap: 8, width: '100%' }}
                            >
                              <div> {EXAM_TYPE[exam.examType || 'QUIZ'].label}</div>
                              <div>
                                <Tooltip title="Thời gian làm bài">
                                  <FieldTimeOutlined style={{ marginRight: 8 }} /> {exam.timeMinute}{' '}
                                  phút
                                </Tooltip>
                              </div>
                              <div>
                                <Tooltip title="Số lần làm lại">
                                  <RedoOutlined /> {exam.testAttempts} lần
                                </Tooltip>
                              </div>
                              {exam.examType === 'ESSAY' ? (
                                <div style={{ zIndex: 99 }}>
                                  <Button
                                    type="link"
                                    onClick={() => {
                                      history.push(`/courses/exam/grading/${exam.id}`, course);
                                    }}
                                  >
                                    Chấm điểm
                                  </Button>
                                </div>
                              ) : (
                                <></>
                              )}
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                    <Col span={6}>
                      <div className="cusom-tag">
                        <Tag
                          style={{ fontSize: 16, padding: '4px 10px' }}
                          color={EXAM_STATUS[exam.status || 'HIDE'].type}
                        >
                          {EXAM_STATUS[exam.status || 'HIDE'].nameVi}
                        </Tag>
                      </div>
                    </Col>
                  </Row>
                </div>
              </>
            </div>
            <div className="icon-sub">
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
                            setIsEditExam(true);
                          }}
                        >
                          Cập nhật
                        </p>
                      ),
                    },
                    {
                      key: '1',
                      label: (
                        <p
                          className="lesson-action"
                          onClick={() => {
                            handleDisplay(exam.id || '', 'ACTIVE');
                          }}
                        >
                          Hiển thị
                        </p>
                      ),
                    },
                    {
                      key: '2',
                      label: (
                        <p
                          className="lesson-action"
                          onClick={() => {
                            handleDisplay(exam.id || '', 'INACTIVE');
                          }}
                        >
                          Ẩn
                        </p>
                      ),
                    },
                    {
                      key: '3',
                      danger: true,
                      label: (
                        <p
                          className="lesson-action"
                          onClick={() => {
                            Modal.confirm({
                              title: `Xác nhận xóa bài kiểm tra: ${exam.examName} ?`,
                              okText: 'Xác nhận',
                              cancelText: 'Hủy',
                              onOk: () => {
                                deleteExam({ id: exam.id || '' }).then((res) => {
                                  if (res.code === 0) {
                                    message.success('Xóa bài kiểm tra thành công', 3);
                                    if (handleRender !== undefined) {
                                      handleRender();
                                    }
                                  }
                                });
                              },
                            });
                          }}
                        >
                          Xóa
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
            </div>
          </div>
        )}
        <Divider />
      </div>
    </>
  );
};
