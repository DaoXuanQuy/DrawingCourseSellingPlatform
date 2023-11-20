import { Checkbox } from 'antd';
import 'react-quill/dist/quill.snow.css';

interface Props {
  question: API.QuestionResponse;
  answer: API.AnswerResponse;
}

export default (props: Props): JSX.Element => {
  const { question, answer } = props;

  return (
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
            style={{
              width: '100%',
            }}
            className="long-text ql-editor"
            dangerouslySetInnerHTML={{
              __html:
                `<div style="display:flex; align-items:start; gap:6px"><p>Câu ${question?.questionNo} - (${question?.point}đ): <div>${question?.questionName}</div></p></div>` ||
                '',
            }}
          />
        </div>
      </div>
      <div className="container-vertical" style={{ gap: '0px' }}>
        {question.options?.map((option, index) => {
          return (
            <Checkbox
              value={option.optionName}
              style={{ marginLeft: '20px' }}
              disabled
              checked={(answer.options?.filter((d) => d === option.id)?.length || -1) > 0}
            >
              <div
                className="normal-text"
                style={{
                  padding: 0,
                  display: 'flex',
                  cursor: 'pointer',
                  color: '#000000d9',
                }}
              >
                <div
                  style={{
                    marginRight: 8,
                    cursor: 'pointer',
                  }}
                >{`Đáp án ${index + 1}:`}</div>
                <div
                  style={{ cursor: 'pointer', color: '#000000d9' }}
                  dangerouslySetInnerHTML={{
                    __html:
                      `<div style="display:flex; gap: 6px">${option.optionName}${
                        option.correct ? '<div>(Đúng)</div>' : '<div>(Sai)</div>'
                      }</div>` || '',
                  }}
                />
              </div>
            </Checkbox>
          );
        })}
      </div>
    </>
  );
};
