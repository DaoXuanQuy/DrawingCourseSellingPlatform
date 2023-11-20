import BreadcrumbCustom from '@/components/BreadcrumbCustom';
// import { PAGE_SIZE } from '@/constant';
import { toolbarOptions } from '@/pages/Teacher/CustomExam/FormAddQuestion';
import { WebSocketContext } from '@/pages/WebSocketProvider';
import { getCurrentAnswers, submitAnswers } from '@/services/api/AnswerController';
import { studentGetQuestionByExamId } from '@/services/api/QuestionController';
import { history, useLocation, useModel, useParams } from '@umijs/max';
import {
  Button,
  Checkbox,
  Divider,
  Empty,
  Form,
  Pagination,
  PaginationProps,
  Radio,
  Row,
  Skeleton,
  Spin,
  Statistic,
} from 'antd';
import { useContext, useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { StateExam } from '../CourseDetail/components/SingleExam';
import ResultTest from './components/ResultTest';
import ResultTestESSSAY from './components/ResultTestESSSAY';
import './index.less';

interface MessageExam {
  code: string;
  answers: API.SubmitAnswerRequest[];
}

const { Countdown } = Statistic;
const PAGE_SIZE = 10;
export default (): JSX.Element => {
  const { examId } = useParams();
  const refListAnswer = useRef<API.SubmitAnswerRequest[]>([]);

  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<API.QuestionResponse[]>([]);
  const [isDisable, setIsDisable] = useState<boolean>(false);
  const [openModalResult, setOpenModalResult] = useState<boolean>(false);
  const [result, setResult] = useState<API.SubmitAnswersResponse>({});
  const [listAnswer, setListAnswer] = useState<API.SubmitAnswerRequest[]>([]);
  const [timer, setTimer] = useState<number>();

  const location = useLocation();
  const examState = location.state as StateExam;
  const stompClient = useContext(WebSocketContext);
  const { initialState } = useModel('@@initialState');
  const { form } = Form.useForm();

  const onChange: PaginationProps['onChange'] = (page) => {
    setCurrent(page);
  };

  const handleUpdateOrSaveAnswer = (
    questionId: string,
    options: string[],
    fillAnswer: API.FillAnswerInfo,
  ) => {
    const index = listAnswer.findIndex((d) => d.questionId === questionId);
    if (index === -1) {
      listAnswer.push({
        questionId: questionId,
        options: options,
        fillAnswers: [fillAnswer],
      });
    } else {
      const fills: API.FillAnswerInfo[] = listAnswer[index].fillAnswers || [];
      const indexFill = fills?.findIndex((fill) => fill.id === fillAnswer.id);
      if (indexFill === -1) {
        fills?.push(fillAnswer);
      } else {
        fills[indexFill] = {
          ...fillAnswer,
        };
      }
      listAnswer[index] = {
        questionId: questionId,
        options: options,
        fillAnswers: fills,
      };
    }
    refListAnswer.current = listAnswer;
    setListAnswer(listAnswer);
  };

  const handleUpdateOrSaveAnswerESSAY = (questionId: string, answer: string) => {
    const index = listAnswer.findIndex((d) => d.questionId === questionId);
    if (index === -1) {
      listAnswer.push({
        questionId: questionId,
        fillAnswer: answer,
      });
    } else {
      listAnswer[index] = {
        questionId: questionId,
        fillAnswer: answer,
      };
    }
    refListAnswer.current = listAnswer;
    setListAnswer(listAnswer);
  };

  useEffect(() => {
    stompClient?.subscribe(
      '/user/' + initialState?.currentUser?.id + '/queue/messages',
      (message) => {
        const newMessage = JSON.parse(message.body);
        console.log('lưu đáp án: ', newMessage);
      },
    );
  }, [stompClient]);

  useEffect(() => {
    setIsLoading(true);
    studentGetQuestionByExamId({
      examId: examId || '',
      page: current - 1,
      size: PAGE_SIZE,
      sort: 'questionNo,asc',
    })
      .then((res) => {
        if (res.code === 0) {
          setQuestions(res.data?.questions || []);
          console.log(res.data?.questions);

          setTotal(res.data?.paginate?.total || 0);
        }
      })
      .finally(() => setIsLoading(false));
  }, [current]);

  useEffect(() => {
    getCurrentAnswers({ code: examState.codeExam || '' }).then((res) => {
      if (res.code === 0) {
        refListAnswer.current = res.data?.answers || [];
        setListAnswer(res.data?.answers || []);
        console.log(Math.ceil(((res.data?.timestamp || 0) - Date.now()) / 1000));

        setTimer(Math.ceil((res.data?.timestamp || 0) - Date.now()));
      } else {
        history.push(`/portal/courses/my-courses/${examState.course?.id}`);
      }
    });
  }, [examState.codeExam]);

  useEffect(() => {
    const intervalSave = setInterval(() => {
      if (examState.codeExam) {
        const message: MessageExam = {
          code: examState.codeExam,
          answers: refListAnswer.current,
        };
        stompClient?.send('/app/send-answers', {}, JSON.stringify(message));
        console.log(
          'gửi câu hỏi tới server: ',
          new Date().getTime().toLocaleString(),
          refListAnswer.current,
        );
      }
    }, 10000);

    return () => {
      clearInterval(intervalSave);
    };
  }, []);

  const fillQuestion = (question: API.QuestionResponse): string => {
    let result: string | undefined = question.questionName;
    const regex = /\[\d\]/g;
    const matches = result?.match(regex);

    let fills = listAnswer.filter((d) => d.questionId === question.id).at(0)?.fillAnswers;

    if (matches && matches?.length > 0) {
      question.fillCorrects
        ?.sort((q1, q2) => (q1.index || 0) - (q2.index || 0))
        ?.forEach((data, index) => {
          const fillVaule = fills?.filter((d) => d.id === data.id).at(0)?.answer;
          result = result?.replace(
            matches[index],
            `<input id=${data.id} type=${
              data.type === 'NUMBER' ? 'number' : 'text'
            } class="input-fill" ${fillVaule !== undefined ? `value=${fillVaule}` : ''} />`,
          );
        });
    }
    return result || '';
  };

  const handleSubmit = () => {
    setIsLoading(true);
    submitAnswers({ code: examState.codeExam, answers: listAnswer })
      .then((res) => {
        if (res.code === 0) {
          setResult(res.data || {});
          setOpenModalResult(true);
          localStorage.removeItem(examId || '');
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <Spin spinning={isLoading} wrapperClassName="spin-container">
        {examState.exam?.examType === 'QUIZ' ? (
          <ResultTest
            isOpen={openModalResult}
            result={result}
            totalScore={examState.exam?.examMaxScore}
            onOk={() => {
              setOpenModalResult(false);
              history.push(`/portal/courses/my-courses/${examState.course?.id}`);
            }}
            onCancel={() => {
              setOpenModalResult(false);
              history.push(`/portal/courses/my-courses/${examState.course?.id}`);
            }}
          />
        ) : (
          <ResultTestESSSAY
            isOpen={openModalResult}
            result={result}
            totalScore={examState.exam?.examMaxScore}
            onOk={() => {
              setOpenModalResult(false);
              history.push(`/portal/courses/my-courses/${examState.course?.id}`);
            }}
            onCancel={() => {
              setOpenModalResult(false);
              history.push(`/portal/courses/my-courses/${examState.course?.id}`);
            }}
          />
        )}
        <BreadcrumbCustom
          subNav={[
            {
              name: 'Trang chủ',
              path: '/',
              isConfirm: true,
              title: 'Xác nhận thoát kiểm tra',
              content: 'Bạn có chắc chắn thoát kiểm tra và lưu kết quả hiện tại?',
            },
            {
              name: 'Khóa học của tôi',
              path: '/portal/courses/my-courses',
              isConfirm: true,
              title: 'Xác nhận thoát kiểm tra',
              content: 'Bạn có chắc chắn thoát kiểm tra và lưu kết quả hiện tại?',
            },
            {
              name: `Chi tiết khóa học: ${examState.course?.courseName}`,
              path: `/portal/courses/my-courses/${examState.course?.id}`,
              isConfirm: true,
              title: 'Xác nhận thoát kiểm tra',
              content: 'Bạn có chắc chắn thoát kiểm tra và lưu kết quả hiện tại?',
            },
            {
              name: `Bài kiểm tra: ${examState.exam?.examName}`,
              path: '',
            },
          ]}
        />
        <div className="custom-exam-test">
          <Row>
            <div className="custom-center text-heading" style={{ width: '100%', gap: 16 }}>
              {examState.exam ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div>{examState.exam?.examName}</div>
                  <div>
                    {timer ? (
                      <Countdown
                        value={Date.now() + timer}
                        onFinish={() => {
                          setIsDisable(true);
                          handleSubmit();
                        }}
                      />
                    ) : (
                      <>
                        <Skeleton.Input size={'default'} />
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <>
                  <Skeleton.Input active={!isLoading} size={'default'} />
                </>
              )}
            </div>
          </Row>
          <Divider />
          {questions.length > 0 ? (
            <>
              <div>
                <form>
                  {examState.exam?.examType === 'QUIZ' ? (
                    <div className="test-quizz">
                      {questions.map((question, index) => {
                        return (
                          <div key={question.id} className="single-question">
                            {question.questionType === 'FILL' ? (
                              <>
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
                                      flex: '0 0 95%',
                                      display: 'flex',
                                      overflow: 'auto',
                                      alignItems: 'flex-start',
                                    }}
                                  >
                                    <div
                                      className="long-text ql-editor"
                                      onInput={(e) => {
                                        handleUpdateOrSaveAnswer(question.id || '', [], {
                                          answer: e.target.value,
                                          id: e.target.id,
                                        });
                                      }}
                                      dangerouslySetInnerHTML={{
                                        __html:
                                          `<p>Câu ${question.questionNo} - (${
                                            question.point
                                          }đ):</p> ${fillQuestion(question)}` || '',
                                      }}
                                    />
                                  </div>
                                </div>
                              </>
                            ) : question.questionType === 'ONLY_ONE' ? (
                              <>
                                <div
                                  key={question.id}
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
                                      flex: '0 0 95%',
                                      display: 'flex',
                                      overflow: 'auto',
                                      alignItems: 'flex-start',
                                    }}
                                  >
                                    <div
                                      className="long-text ql-editor"
                                      dangerouslySetInnerHTML={{
                                        __html:
                                          `<p>Câu ${question.questionNo} - (${question.point}đ):</p> ${question.questionName}` ||
                                          '',
                                      }}
                                    />
                                  </div>
                                </div>
                                <Radio.Group
                                  className="options"
                                  disabled={isDisable}
                                  onChange={(e) => {
                                    handleUpdateOrSaveAnswer(
                                      question.id || '',
                                      [e.target.value || ''],
                                      {},
                                    );
                                  }}
                                  defaultValue={
                                    question.id !== undefined
                                      ? listAnswer
                                          .filter((a) => a.questionId === question.id)
                                          .at(0)
                                          ?.options?.at(0)
                                      : null
                                  }
                                >
                                  {question.options?.map((option, index) => {
                                    return (
                                      <Radio
                                        style={{ width: 'fit-content', cursor: 'pointer' }}
                                        value={option.id}
                                      >
                                        <div
                                          className=" normal-text"
                                          style={{
                                            padding: 0,
                                            display: 'flex',
                                            cursor: 'pointer',
                                          }}
                                        >
                                          <div style={{ marginRight: 8, cursor: 'pointer' }}>
                                            {`Đáp án ${index + 1}:`}
                                          </div>
                                          <div
                                            className="long-text ql-editor"
                                            style={{ cursor: 'pointer' }}
                                            dangerouslySetInnerHTML={{
                                              __html: option.optionName || '',
                                            }}
                                          />
                                        </div>
                                      </Radio>
                                    );
                                  })}
                                </Radio.Group>
                              </>
                            ) : question.questionType === 'MULTIPLE_SELECT' ? (
                              <>
                                <div
                                  key={question.id}
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
                                      flex: '0 0 95%',
                                      display: 'flex',
                                      overflow: 'auto',
                                      alignItems: 'flex-start',
                                    }}
                                  >
                                    <div
                                      className="long-text ql-editor"
                                      dangerouslySetInnerHTML={{
                                        __html:
                                          `<p>Câu ${question.questionNo} - (${question.point}đ):</p> ${question.questionName}` ||
                                          '',
                                      }}
                                    />
                                  </div>
                                </div>
                                <Checkbox.Group
                                  className="options"
                                  disabled={isDisable}
                                  onChange={(e) => {
                                    const checkValues: string[] = e as string[];
                                    handleUpdateOrSaveAnswer(question.id || '', checkValues, {});
                                  }}
                                  defaultValue={
                                    question.id !== undefined
                                      ? listAnswer.filter((a) => a.questionId === question.id).at(0)
                                          ?.options
                                      : []
                                  }
                                >
                                  {question.options?.map((option, index) => {
                                    return (
                                      <Checkbox value={option.id}>
                                        <div
                                          className=" normal-text"
                                          style={{ padding: 0, display: 'flex' }}
                                        >
                                          <div style={{ marginRight: 8, cursor: 'pointer' }}>
                                            {`Đáp án ${index + 1}:`}
                                          </div>
                                          <div
                                            className="long-text ql-editor"
                                            style={{ cursor: 'pointer' }}
                                            dangerouslySetInnerHTML={{
                                              __html: option.optionName || '',
                                            }}
                                          />
                                        </div>
                                      </Checkbox>
                                    );
                                  })}
                                </Checkbox.Group>
                              </>
                            ) : (
                              <></>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'start',
                        gap: '16px',
                      }}
                      className="test-essay"
                    >
                      {questions.map((question, index) => {
                        return (
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'start',
                              gap: '16px',
                            }}
                          >
                            <div
                              key={question.id}
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
                                  flex: '0 0 95%',
                                  display: 'flex',
                                  overflow: 'auto',
                                  alignItems: 'flex-start',
                                }}
                              >
                                <div
                                  className="long-text ql-editor"
                                  dangerouslySetInnerHTML={{
                                    __html:
                                      `<p>Câu ${question.questionNo} - (${question.point}đ):</p> ${question.questionName}` ||
                                      '',
                                  }}
                                />
                              </div>
                            </div>
                            <div className="editor">
                              <ReactQuill
                                modules={{ toolbar: toolbarOptions }}
                                onChange={(e) => {
                                  handleUpdateOrSaveAnswerESSAY(question.id || '', e);
                                }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  <Divider />
                </form>
              </div>
            </>
          ) : (
            <>
              <Empty description="Không có dữ liệu" />
            </>
          )}
        </div>
        <Row style={{ justifyContent: 'flex-end' }}>
          <Button
            htmlType="submit"
            type="primary"
            style={{ marginRight: 12 }}
            onClick={handleSubmit}
          >
            Nộp bài
          </Button>
          <Pagination current={current} onChange={onChange} total={total} pageSize={PAGE_SIZE} />
        </Row>
      </Spin>
    </>
  );
};
