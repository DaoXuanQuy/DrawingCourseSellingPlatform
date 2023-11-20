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
        key={question?.id}
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
              className="long-text ql-editor"
              dangerouslySetInnerHTML={{
                __html:
                  `<div style="display:flex; align-items:start; gap:6px"><p>Câu ${question?.questionNo} - (${question?.point}đ): <div>${question?.questionName}</div></p></div>` ||
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
              className="long-text"
              dangerouslySetInnerHTML={{
                __html:
                  `<div style="display:flex; align-items:start; gap:6px"><p><strong>Trả lời:</strong> <div>${
                    answer?.fillAnswer || ''
                  }</div></p></div>` || '',
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
