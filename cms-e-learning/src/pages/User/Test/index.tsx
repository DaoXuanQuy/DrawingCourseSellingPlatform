import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import CardQuestion from '@/components/CardQuestion';
// import { submitChoose } from '@/services/api/ChooseResultController';
import { getQuestionByExamId } from '@/services/api/QuestionController';
import { CheckCircleFilled, ClockCircleFilled, ReadFilled, SignalFilled } from '@ant-design/icons';
import { useModel, useParams } from '@umijs/max';
import { Button, Empty, Modal, Pagination, PaginationProps, Statistic } from 'antd';
import { useEffect, useState } from 'react';
import './testStyle.less';

const { Countdown } = Statistic;
const TestExam: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const { examId } = useParams();
  const [questions, setQuestions] = useState<API.QuestionEntity[]>([]);
  const [pageSize, setPageSize] = useState(5);
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(1);
  const [disabled, setDisabled] = useState(false);
  const [examResult, setExamResult] = useState<API.ExamResultEntity>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewResult, setIsViewResult] = useState(false);

  const onChange: PaginationProps['onChange'] = (page: number, size: number) => {
    setCurrent(page);
    console.log('page: ', page);
  };
  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
    setPageSize(pageSize);
  };
  const onSubmitExam = () => {
    setInitialState((s) => ({ ...s, isSubmitExam: true }));
    setDisabled(true);
    // submitChoose({ examId: Number(examId), chooses: initialState?.listChoose }).then((res) => {
    //   if (res.code === 0) {
    //     getByExamId({ examId: Number(examId) }).then((res) => {
    //       // alert('kết quả kiểm tra: ' + res.data?.examResult?.score);
    //       console.log('kết quả kiểm tra: ', res);
    //       setExamResult(res.data?.examResult || {});
    //       setIsModalOpen(true);
    //       setIsViewResult(true);
    //     });
    //   }
    // });
  };

  const handleOk = (): void => {
    setIsModalOpen(false);
  };

  const handleCancel = (): void => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getQuestionByExamId({ examId: Number(examId), page: current - 1, size: pageSize }).then(
      (res) => {
        if (res.code === 0) {
          setQuestions(res.data?.questions || []);
          setTotal(res.data?.paginate?.total || 0);
        }
      },
    );
    console.log(initialState);
  }, [pageSize, current, examId, initialState]);
  console.log(initialState);
  return (
    <>
      <BreadcrumbCustom
        subNav={[
          { name: 'Home', path: '/welcome' },
          { name: 'My Courses', path: '/my-courses' },
          { name: 'Course Detail', path: `/my-courses/detail/${examId}` },
          { name: 'Exam', path: '' },
        ]}
      />
      <div className="question-header">
        <p className="test-name">
          Test {initialState?.exam?.id}: {initialState?.exam?.examName}
        </p>
        <div className="test-time">
          <ClockCircleFilled />
          <Countdown
            style={{ fontSize: 16, marginLeft: 6 }}
            format="HH:mm:ss"
            value={initialState?.timeExam}
            onFinish={() => {
              console.log(initialState);
              setDisabled(true);
            }}
          />
        </div>
      </div>
      <div className="wrapper">
        {questions.map((question, index) => {
          return (
            <CardQuestion
              disabled={disabled}
              question={question}
              stt={(current - 1) * pageSize + index + 1}
            />
          );
        })}
      </div>
      {questions.length > 0 ? (
        <>
          <div className="submit">
            <Button
              style={{
                minWidth: 120,
                margin: '0 6px',
                cursor: isViewResult ? 'not-allowed' : 'pointer',
              }}
              type="primary"
              ghost
              onClick={() => {
                if (!initialState?.isSubmitExam) {
                  onSubmitExam();
                  setInitialState((s) => ({ ...s, isSubmitExam: true }));
                }
              }}
            >
              Submit test
            </Button>
            {isViewResult ? (
              <Button
                style={{ minWidth: 120, margin: '0 6px' }}
                type="primary"
                ghost
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                View Result
              </Button>
            ) : (
              ''
            )}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Pagination
              showSizeChanger
              pageSize={pageSize}
              onShowSizeChange={onShowSizeChange}
              onChange={onChange}
              current={current}
              pageSizeOptions={[5, 10, 15, 20, 25]}
              total={total}
            />
          </div>
        </>
      ) : (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Empty />
        </div>
      )}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ReadFilled style={{ marginRight: '6px', fontSize: '20px' }} />
            Finished Exam
          </div>
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        closable={false}
      >
        <p style={{ textAlign: 'center', fontSize: '16px' }}>Exam Result</p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            marginTop: '20px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '16px',
            }}
          >
            <CheckCircleFilled style={{ marginRight: '6px', fontSize: '20px' }} />
            <p style={{ margin: 0 }}>{examResult.correctTotal} Question</p>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '16px',
            }}
          >
            <SignalFilled style={{ marginRight: '6px', fontSize: '20px' }} />
            <p style={{ margin: 0 }}>{examResult.score} Point</p>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default TestExam;
