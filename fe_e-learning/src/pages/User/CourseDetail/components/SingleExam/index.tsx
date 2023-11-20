import { EXAM_TYPE } from '@/constant';
import { startDoExam } from '@/services/api/AnswerController';
import { decreaseProgress, increaseProgress } from '@/services/api/CourseController';
import { FieldTimeOutlined, FileTextOutlined, RedoOutlined, RiseOutlined } from '@ant-design/icons';
import { history } from '@umijs/max';
import { Button, Checkbox, Col, Divider, message, Modal, Row, Tooltip } from 'antd';
import { useContext, useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import { CourseContext } from '../..';

interface Props {
  exam: API.ExamResponse;
  key?: string | number;
  setExams?: (exams: API.ExamResponse[]) => void;
  exams?: API.ExamResponse[];
  setIsReload?: (reload: boolean) => void;
  isReload?: boolean;
}

interface StateExam {
  course?: API.CourseDto;
  codeExam?: string;
  exam?: API.ExamResponse;
}
export { StateExam };

export default (props: Props): JSX.Element => {
  const { exam, key, setExams, exams, setIsReload, isReload } = props;
  const [checked, setChecked] = useState(exam.done);

  const { course } = useContext(CourseContext);

  useEffect(() => {}, [exam]);

  const handleCheckDone = (isDone: boolean) => {
    if (exams !== undefined && setExams !== undefined) {
      const index = exams?.findIndex((data) => data.id === exam.id);
      exams[index] = { ...exams[index], done: isDone };
      setExams(exams);
    }
  };

  return (
    <>
      <div key={key} className="single-document">
        <Divider />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Row gutter={24} style={{ flex: 1, margin: 0 }}>
            <Col>
              <div
                className="custom-center"
                style={{
                  minWidth: '30%',
                  fontSize: 16,
                  gap: 8,
                  justifyContent: 'start',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  Modal.confirm({
                    title: 'Xác nhận làm kiểm tra',
                    content: `Bạn có chắc chắn thực hiện bài kiểm tra: ${exam.examName}`,
                    okText: 'Xác nhận',
                    cancelText: 'Hủy',
                    onOk: () => {
                      startDoExam({ examId: exam.id || '' }).then((res) => {
                        if (res.code === 0) {
                          const state: StateExam = {
                            course: course,
                            codeExam: res.data?.code,
                            exam: exam,
                          };
                          history.push(`/portal/courses/my-courses/exam/${exam.id}`, state);
                        } else {
                          message.error(res.message, 3);
                        }
                      });
                    },
                  });
                }}
              >
                <div className="custom-center" style={{ justifyContent: 'start' }}>
                  <div style={{ color: '#1890ff', fontSize: 16, minWidth: '40%' }}>
                    <FileTextOutlined />
                    {exam.examName}
                  </div>
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
                    <FieldTimeOutlined style={{ marginRight: 8 }} /> {exam.timeMinute} phút
                  </Tooltip>
                </div>
                <div>
                  <Tooltip title="Số lần làm lại">
                    <RedoOutlined />
                    {` ${exam.totalAttemptsCompleted}/${exam.testAttempts}`}
                  </Tooltip>
                </div>
                <div>
                  <Tooltip title="Điểm cao nhất">
                    <RiseOutlined />
                    {`${
                      exam.highestScore !== null && exam.highestScore !== undefined
                        ? exam.highestScore
                        : '--'
                    }điểm`}
                  </Tooltip>
                </div>
                <div>
                  <Button
                    type="link"
                    disabled={exam.totalAttemptsCompleted === 0}
                    onClick={() => {
                      const state: StateExam = {
                        course: course,
                        exam: exam,
                      };
                      history.push(`/portal/courses/my-courses/exam/preview/${exam.id}`, state);
                    }}
                  >
                    Xem lại
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
          <div>
            <div>
              <Checkbox
                checked={checked}
                onChange={(e) => {
                  const checked: boolean = e.target.checked;
                  if (exam.id) {
                    setChecked(checked);
                    handleCheckDone(checked);

                    if (checked) {
                      increaseProgress({ id: exam.id, type: 'EXAM' });
                    } else {
                      decreaseProgress({ id: exam.id, type: 'EXAM' });
                    }
                    if (isReload !== undefined && setIsReload !== undefined) {
                      setIsReload(!isReload);
                    }
                  }
                }}
                style={{ color: '#1677ff' }}
              >
                Đã xong
              </Checkbox>
            </div>
          </div>
        </div>
        <Divider />
      </div>
    </>
  );
};
