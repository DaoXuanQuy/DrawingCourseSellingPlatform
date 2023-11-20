import { CaretRightOutlined } from '@ant-design/icons';
import 'react-quill/dist/quill.snow.css';

interface Props {
  question: API.QuestionResponse;
  answer: API.AnswerResponse;
}

export default (props: Props): JSX.Element => {
  const { question, answer } = props;

  const fillQuestion = (question: API.QuestionResponse, answer: API.AnswerResponse): string => {
    let result: string | undefined = question.questionName;
    const regex = /\[\d\]/g;
    const matches = result?.match(regex);

    if (matches && matches?.length > 0) {
      question.fillCorrects?.forEach((data, index) => {
        const fillAnswer: API.FillAnswerResponse | undefined = answer.fillAnswers
          ?.filter((d) => d.id === data.id)
          ?.at(0);
        result = result?.replace(
          matches[index],
          `<input type=${data.type === 'NUMBER' ? 'number' : 'text'} id=${
            data.id
          } class="input-fill" disabled ${
            fillAnswer?.answer !== undefined ? `value=${fillAnswer?.answer}` : ''
          } />`,
        );
      });
    }
    return result || '';
  };
  return (
    <>
      <form>
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
              style={{
                width: '100%',
              }}
              className="long-text ql-editor"
              dangerouslySetInnerHTML={{
                __html:
                  `<div style="display:flex; align-items:center; gap:6px"><p>Câu ${
                    question?.questionNo
                  } - (${question?.point}đ): <div>${fillQuestion(
                    question,
                    answer,
                  )}</div></p></div>` || '',
              }}
            />
          </div>
        </div>
        <div className="options" style={{ marginLeft: 20 }}>
          {question.fillCorrects
            ?.sort((o1, o2) => o1.index - o2.index)
            .map((data, index) => {
              return (
                <div
                  key={data.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'start',
                  }}
                >
                  <div>
                    <CaretRightOutlined />
                  </div>
                  <div>{`Từ điền ${index + 1}: ${data.answer}`}</div>
                </div>
              );
            })}
        </div>
      </form>
    </>
  );
};
