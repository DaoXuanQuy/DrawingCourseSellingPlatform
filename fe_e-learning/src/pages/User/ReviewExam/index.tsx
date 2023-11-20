import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import { PAGE_SIZE } from '@/constant';
import { getSubmitAnswerByExamResult } from '@/services/api/AnswerController';
import { getExamResult } from '@/services/api/ExamResultController';
import { history, useParams } from '@umijs/max';
import { Divider, Empty, Pagination, PaginationProps, Row, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { StateExam } from '../CourseDetail/components/SingleExam';
import QuesstionFill from './components/QuesstionFill';
import QuesstionOnly from './components/QuesstionOnly';
import QuestionESSAY from './components/QuestionESSAY';
import QuestionMulti from './components/QuestionMulti';

export default (): JSX.Element => {
  const { course, exam } = history.location.state as StateExam;
  const { examId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [examResult, setExamResult] = useState<API.GetDetailExamResultResponse>();
  const [answerReview, setAnswerReview] = useState<API.GetSubmitAnswerByExamResultResponse>();
  const [current, setCurrent] = useState(1);
  const [paginate, setPaginate] = useState<API.Paginate>();

  const onChange: PaginationProps['onChange'] = (page) => {
    setCurrent(page);
  };

  useEffect(() => {
    if (examId) {
      setIsLoading(true);
      getExamResult({ examId: examId })
        .then((res) => {
          if (res.data && res.code === 0) {
            setExamResult(res.data);
            if (res.data.id) {
              getSubmitAnswerByExamResult({
                examResultId: res.data.id,
                page: current - 1,
                size: PAGE_SIZE,
              }).then((res) => {
                if (res.data) {
                  setAnswerReview(res.data);
                  setPaginate(res.data.paginate);
                }
              });
            }
          }
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

  useEffect(() => {
    if (examResult?.id) {
      getSubmitAnswerByExamResult({
        examResultId: examResult.id,
        page: current - 1,
        size: PAGE_SIZE,
      }).then((res) => {
        if (res.data) {
          setAnswerReview(res.data);
          setPaginate(res.data.paginate);
        }
      });
    }
  }, [current]);
  return (
    <>
      <div className="container-vertical" style={{ flex: 1 }}>
        <BreadcrumbCustom
          isLoading={course ? false : true}
          subNav={[
            {
              name: 'Trang chủ',
              path: '/',
            },
            {
              name: 'Khóa học của tôi',
              path: '/portal/courses/my-courses',
            },
            {
              name: `Khóa học: ${course?.courseName}`,
              path: `/portal/courses/my-courses/${course?.id}`,
            },
            {
              name: 'Xem bài kiểm tra',
              path: '',
            },
          ]}
        />

        <div style={{ flex: 1 }}>
          <Spin spinning={isLoading}>
            {answerReview?.answers ? (
              <>
                <div>
                  {exam?.examType === 'QUIZ'
                    ? answerReview.answers
                        ?.sort((o1, o2) => o1.question?.questionNo - o2.question?.questionNo)
                        .map((data, index) => {
                          if (data.question?.questionType === 'FILL') {
                            return (
                              <>
                                <QuesstionFill
                                  answer={data.answer || {}}
                                  question={data.question || {}}
                                />
                                <Divider style={{ margin: 6 }} />
                              </>
                            );
                          } else if (data.question?.questionType === 'MULTIPLE_SELECT') {
                            return (
                              <>
                                <QuestionMulti
                                  answer={data.answer || {}}
                                  question={data.question || {}}
                                />
                                <Divider style={{ margin: 6 }} />
                              </>
                            );
                          } else {
                            return (
                              <>
                                <QuesstionOnly
                                  answer={data.answer || {}}
                                  question={data.question || {}}
                                />
                                <Divider style={{ margin: 6 }} />
                              </>
                            );
                          }
                        })
                    : answerReview.answers
                        ?.sort((o1, o2) => o1.question?.questionNo - o2.question?.questionNo)
                        .map((data, index) => {
                          return (
                            <>
                              <QuestionESSAY
                                answer={data.answer || {}}
                                question={data.question || {}}
                              />
                              <Divider style={{ margin: 6 }} />
                            </>
                          );
                        })}
                </div>
              </>
            ) : (
              <Empty description="Không có dữ liệu" />
            )}
          </Spin>
        </div>
        <Row style={{ justifyContent: 'flex-end' }}>
          <Pagination
            current={current}
            onChange={onChange}
            total={paginate?.total}
            pageSize={PAGE_SIZE}
          />
        </Row>
      </div>
    </>
  );
};
