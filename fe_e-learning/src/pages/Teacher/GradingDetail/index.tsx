import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import { getSubmitAnswerByExamResult } from '@/services/api/AnswerController';
import { updateExam1 } from '@/services/api/ExamResultController';
import { history, useParams } from '@umijs/max';
import { Button, Divider, Empty, Form, InputNumber, message, Spin } from 'antd';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toolbarOptions } from '../CustomExam/FormAddQuestion';
import { Grading } from '../Grading';

export default (): JSX.Element => {
  const { course, action } = history.location.state as Grading;
  const { examUserId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [answerReview, setAnswerReview] = useState<API.GetSubmitAnswerByExamResultResponse>();

  const [form] = Form.useForm();

  useEffect(() => {
    if (examUserId) {
      setIsLoading(true);
      getSubmitAnswerByExamResult({ examResultId: examUserId, page: 0, size: 999 })
        .then((res) => {
          if (res.data) {
            setAnswerReview(res.data);
          }
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

  const handleSubmitGrading = () => {
    let totalScore = 0;
    let comments = '';
    let totalCorrect = 0;
    answerReview?.answers?.forEach((data) => {
      const score = form.getFieldValue(`score-${data.question?.id}`);
      if (score > 0) {
        totalCorrect++;
        totalScore += score;
      }
      const comment = form.getFieldValue(`comment-${data.question?.id}`);
      if (comment) {
        comments = comments + `Câu ${data.question?.questionNo}: ${comment} <br/>`;
      }
    });
    if (examUserId) {
      setIsLoading(true);
      updateExam1({
        id: examUserId,
        correctTotal: totalCorrect,
        score: totalScore,
        comment: comments,
      })
        .then((res) => {
          if (res.code === 0) {
            message.success('Chấm điểm thành công', 3);
            history.push(`/courses/lessons/${course.id}`);
          } else {
            message.error(res.message, 3);
          }
        })
        .catch((err) => message.error('Chấm điểm thất bại, vui lòng thử lại sau', 3))
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <Spin spinning={isLoading} wrapperClassName="spin-container">
      <div className="container-vertical" style={{ flex: 1 }}>
        <BreadcrumbCustom
          subNav={[
            {
              name: 'Trang chủ',
              path: '/',
            },
            {
              name: 'Quản lí khóa học',
              path: '/courses',
            },
            {
              name: 'Chi tiết khóa học',
              path: `/courses/${course?.id}`,
            },
            {
              name: `Cài đặt khóa học: ${course?.courseName}`,
              path: `/courses/lessons/${course?.id}`,
            },
            {
              name: `Chấm bài`,
              path: ``,
            },
          ]}
        />
        <div style={{ flex: 1 }}>
          {answerReview?.answers ? (
            <>
              <Form form={form} name="gradings" onFinish={handleSubmitGrading}>
                <div>
                  {answerReview.answers?.map((question, index) => {
                    return (
                      <>
                        <div
                          key={question.question?.id}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'start',
                            gap: '16px',
                          }}
                        >
                          <div
                            style={{
                              padding: 0,
                              marginLeft: '20px',
                              display: 'flex',
                              fontWeight: '500',
                              alignItems: 'flex-start',
                            }}
                          >
                            <div
                              style={{
                                flex: 1,
                                display: 'flex',
                                overflow: 'auto',
                                alignItems: 'flex-start',
                                width: '100%',
                              }}
                            >
                              <div
                                style={{
                                  width: '100%',
                                }}
                                className="long-text"
                                dangerouslySetInnerHTML={{
                                  __html:
                                    `<div style="display:flex; align-items:start; gap:6px"><p>Câu ${question.question?.questionNo} - (${question.question?.point}đ): <div>${question.question?.questionName}</div></p></div>` ||
                                    '',
                                }}
                              />
                            </div>
                          </div>
                          <div
                            style={{
                              padding: 0,
                              marginLeft: '20px',
                              display: 'flex',
                              fontWeight: '500',
                              alignItems: 'flex-start',
                            }}
                          >
                            <div
                              style={{
                                flex: 1,
                                display: 'flex',
                                overflow: 'auto',
                                alignItems: 'flex-start',
                                width: '100%',
                              }}
                            >
                              <div
                                style={{
                                  width: '100%',
                                }}
                                className="long-text ql-editor"
                                dangerouslySetInnerHTML={{
                                  __html:
                                    `<div style="display:flex; align-items:start; gap:6px"><p><strong>Trả lời:</strong> <div>${
                                      question.answer?.fillAnswer || ''
                                    }</div></p></div>` || '',
                                }}
                              />
                            </div>
                          </div>
                          {action === 'GRADING' ? (
                            <>
                              <div>
                                <Form.Item
                                  name={`score-${question.question?.id}`}
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Vui lòng nhập điểm',
                                    },
                                  ]}
                                >
                                  <InputNumber
                                    placeholder="Điểm"
                                    min={0}
                                    max={question.question?.point}
                                  />
                                </Form.Item>
                              </div>
                              <div>
                                <div>Chú thích</div>
                                <Form.Item name={`comment-${question.question?.id}`}>
                                  <ReactQuill
                                    modules={{ toolbar: toolbarOptions }}
                                    onChange={(e) => {}}
                                  />
                                </Form.Item>
                              </div>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                        <Divider style={{ margin: '16px 0' }} />
                      </>
                    );
                  })}
                </div>
                {action === 'GRADING' ? (
                  <Form.Item>
                    <div style={{ display: 'flex', justifyContent: 'end' }}>
                      <Button htmlType="submit" type="primary">
                        Chấm điểm
                      </Button>
                    </div>
                  </Form.Item>
                ) : (
                  <></>
                )}
              </Form>
            </>
          ) : (
            <Empty description="Không có dữ liệu" />
          )}
        </div>
      </div>
    </Spin>
  );
};
