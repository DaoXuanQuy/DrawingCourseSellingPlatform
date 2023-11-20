import BreadcrumbCustom from '@/components/BreadcrumbCustom';
// import { PAGE_SIZE } from '@/constant';
import { teacherGetDetailExam } from '@/services/api/ExamController';
import { createListQuestion, getQuestionByExamId } from '@/services/api/QuestionController';
import { history, useParams } from '@umijs/max';
import { Divider, message, Pagination, PaginationProps, Row, Spin } from 'antd';
import { createContext, useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import FormAddQuestion from './FormAddQuestion';
import FormAddQuestionESSAY from './FormAddQuestionESSAY';
import './index.less';
import QuestionEssay from './QuestionEssay';
import QuestionFill from './QuestionFill';
import QuestionMulti from './QuestionMulti';
import QuestionOnly from './QuestionOnly';

interface ModalContext {
  updateQuestion: (question: API.QuestionResponse) => void;
  setIsReload: () => void;
}

const QuestionContext = createContext<ModalContext>({
  updateQuestion: () => {},
  setIsReload: () => {},
});
export { QuestionContext };

const PAGE_SIZE = 10;
export default (): JSX.Element => {
  const { examId } = useParams();
  const course = history.location.state as API.CourseDto;

  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState<number>(0);
  const [isReload, setIsReload] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [exam, setExam] = useState<API.ExamResponse>();
  const [questions, setQuestions] = useState<API.QuestionResponse[]>([]);

  const handleUpdateQuestion = (question: API.QuestionResponse) => {
    const index = questions.findIndex((q) => q.id === question.id);
    if (index === -1) {
      return;
    }
    questions[index] = {
      ...question,
    };
    setQuestions(questions);
  };

  const handleReload = () => {
    setIsReload(!isReload);
  };

  const onChange: PaginationProps['onChange'] = (page) => {
    setCurrent(page);
  };

  useEffect(() => {
    teacherGetDetailExam({ id: examId || '' }).then((res) => setExam(res.data));
  }, [examId]);

  useEffect(() => {
    setIsLoading(true);
    getQuestionByExamId({
      examId: examId,
      page: current - 1,
      size: PAGE_SIZE,
      sort: 'questionNo,asc',
    })
      .then((res) => {
        if (res.code === 0) {
          setQuestions(res.data?.questions || []);
          setTotal(res.data?.paginate?.total || 0);
        }
      })
      .finally(() => setIsLoading(false));
  }, [current, isReload]);

  return (
    <QuestionContext.Provider
      value={{ updateQuestion: handleUpdateQuestion, setIsReload: handleReload }}
    >
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
            name: 'Cài đặt khóa học',
            path: `/courses/lessons/${course?.id}`,
          },
          {
            name: `Cài đặt bài kiểm tra`,
            path: '',
          },
        ]}
      />
      <div className="custom-exam">
        <Row>
          <div className="custom-center text-heading" style={{ width: '100%', gap: 16 }}>
            <div>{`${exam?.examName} - Thời gian: ${exam?.timeMinute} phút`}</div>
          </div>
        </Row>
        <Spin spinning={isLoading}>
          <>
            <div>
              {exam?.examType === 'QUIZ' ? (
                <>
                  {questions.map((question, index) => {
                    return (
                      <div className="single-question">
                        {question.questionType === 'FILL' ? (
                          <QuestionFill question={question} />
                        ) : question.questionType === 'ONLY_ONE' ? (
                          <QuestionOnly question={question} />
                        ) : question.questionType === 'MULTIPLE_SELECT' ? (
                          <QuestionMulti question={question} />
                        ) : (
                          <></>
                        )}
                      </div>
                    );
                  })}
                </>
              ) : (
                <>
                  {questions.map((question, index) => {
                    return (
                      <div className="single-question">
                        <QuestionEssay question={question} />
                      </div>
                    );
                  })}
                </>
              )}
              <Divider />
            </div>
            {PAGE_SIZE >= total || current === Math.ceil(total / PAGE_SIZE) ? (
              <>
                {exam?.examType === 'QUIZ' ? (
                  <FormAddQuestion
                    questionNoStart={(current - 1) * PAGE_SIZE + questions.length + 1}
                    addQuestion={(data) => {
                      return new Promise((resolve, rejected) => {
                        createListQuestion({ examId: examId || '', questions: data })
                          .then((res) => {
                            if (res.code === 0) {
                              message.success('Lưu cài đặt câu hỏi thành công', 3);
                              setIsReload(!isReload);
                              resolve(true);
                            } else {
                              rejected(new Error(res.message));
                            }
                          })
                          .catch((err) => rejected(err));
                      });
                    }}
                  />
                ) : (
                  <FormAddQuestionESSAY
                    questionNoStart={(current - 1) * PAGE_SIZE + questions.length + 1}
                    addQuestion={(data) => {
                      return new Promise((resolve, rejected) => {
                        createListQuestion({ examId: examId || '', questions: data })
                          .then((res) => {
                            if (res.code === 0) {
                              message.success('Lưu cài đặt câu hỏi thành công', 3);
                              setIsReload(!isReload);
                              resolve(true);
                            } else {
                              rejected(new Error(res.message));
                            }
                          })
                          .catch((err) => rejected(err));
                      });
                    }}
                  />
                )}
              </>
            ) : (
              <></>
            )}
          </>
        </Spin>
      </div>
      <Row style={{ justifyContent: 'flex-end' }}>
        <Pagination current={current} onChange={onChange} total={total} pageSize={PAGE_SIZE} />
      </Row>
    </QuestionContext.Provider>
  );
};
