import { ClockCircleFilled, QuestionCircleFilled } from '@ant-design/icons';
import { history, useModel } from '@umijs/max';
import './examStyle.less';

interface Props {
  exam: API.ExamEntity;
}
const CardExam: React.FC<Props> = ({ exam }) => {
  const { setInitialState } = useModel('@@initialState');
  const handleOnClick = (): void => {
    setInitialState((s) => ({
      ...s,
      exam: exam,
      timeExam: Date.now() + (exam.timeMinute || 0) * 60 * 1000,
      isSubmitExam: false,
      listChoose: [],
    }));
    history.push(`/my-courses/exam/${exam.id}`);
  };
  return (
    <div className="exam-container" onClick={handleOnClick}>
      <div className="wrapper-body">
        <div className="header">
          <p className="heading">
            Test {exam.id}: {exam.examName}
          </p>
        </div>
        <div className="content">
          <div className="content-body">
            <div>
              <QuestionCircleFilled />
              <p>{exam.questionTotal}</p>
            </div>
            <div>
              <ClockCircleFilled />
              <p>{exam.timeMinute} minutes</p>
            </div>
          </div>
        </div>
        <div className="exam-footer">
          <p>Create At: {exam.createAt}</p>
        </div>
      </div>
    </div>
  );
};

export default CardExam;
