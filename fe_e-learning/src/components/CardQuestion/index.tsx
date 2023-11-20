import { useModel } from '@umijs/max';
import { Radio, RadioChangeEvent, Space } from 'antd';
import { useEffect, useState } from 'react';
import './questionStyle.less';

interface Props {
  stt: number;
  question: API.QuestionEntity;
  disabled: boolean;
}
const CardQuestion: React.FC<Props> = ({ question, stt, disabled }) => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [isRender, setIsRender] = useState(false);

  const checkChooesNotExist = (
    listChoose: API.SubmitChoose[],
    dataCheck: API.QuestionEntity,
  ): number => {
    for (let i = 0; i < listChoose.length; i++) {
      if (listChoose[i].questionId === dataCheck.id) {
        return i;
      }
    }
    return -1;
  };

  const choosed = (question: API.QuestionEntity, chooses: API.SubmitChoose[]): string => {
    // console.log('chooses: ', chooses);
    for (let i = 0; i < chooses.length; i++) {
      if (chooses[i].questionId === question.id) {
        console.log(`${i}: ${chooses[i].questionId}: ${chooses[i].choose}`);
        return chooses[i].choose || '';
      }
    }
    return '';
  };

  const onChangeRadio = (e: RadioChangeEvent): void => {
    let chooses: API.SubmitChoose[] = initialState?.listChoose || [];
    if (chooses?.length === 0) {
      chooses.push({
        userId: initialState?.currentUser?.user?.id || '',
        choose: e.target.value,
        questionId: question.id || -1,
      });
    }
    console.log(chooses);
    const idIfExist: number = checkChooesNotExist(chooses, question);
    if (idIfExist !== -1) {
      chooses[idIfExist].choose = e.target.value;
    } else {
      chooses.push({
        userId: initialState?.currentUser?.user?.id || '',
        choose: e.target.value,
        questionId: question.id || -1,
      });
    }
    setIsRender(!isRender);
    setInitialState((s) => ({ ...s, listChoose: chooses }));
  };

  useEffect(() => {}, []);

  return (
    <>
      <div className="question-container">
        <div className="question-content">
          <p className="question-name">
            {stt}: {question.questionName}
          </p>
          <Radio.Group
            value={choosed(question, initialState?.listChoose || [])}
            onChange={onChangeRadio}
            disabled={disabled}
          >
            <Space direction="vertical">
              <Radio value={'A'} style={{ fontSize: 15, lineHeight: '18px', fontWeight: 400 }}>
                A: {question.optionA}
              </Radio>
              <Radio value={'B'} style={{ fontSize: 15, lineHeight: '18px', fontWeight: 400 }}>
                B: {question.optionB}
              </Radio>
              <Radio value={'C'} style={{ fontSize: 15, lineHeight: '18px', fontWeight: 400 }}>
                C: {question.optionC}
              </Radio>
              <Radio value={'D'} style={{ fontSize: 15, lineHeight: '18px', fontWeight: 400 }}>
                C: {question.optionD}
              </Radio>
            </Space>
          </Radio.Group>
        </div>
      </div>
    </>
  );
};

export default CardQuestion;
