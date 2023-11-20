import { getDocumentForStudent } from '@/services/api/DocumentController';
import { studentGetExamByLesson } from '@/services/api/ExamController';
import { Spin, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import SingleDocument from '../SingleDocument';
import SingleExam from '../SingleExam';
import './index.less';

interface Props {
  lessonId: string;
  courseId: string;
  handleFinsh: (documents: API.DocumentDto[], exams: API.ExamResponse[]) => void;
}

export default (props: Props): JSX.Element => {
  const { lessonId, handleFinsh } = props;

  const [documents, setDocuments] = useState<API.DocumentDto[]>([]);
  const [exams, setExams] = useState<API.ExamResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isReload, setIsReload] = useState<boolean>(false);

  const getAllDocument = () => {
    setIsLoading(true);
    getDocumentForStudent({ lessonId: lessonId })
      .then((res) => {
        if (res.code === 0) {
          setDocuments(res.data?.documents || []);
        }
      })
      .finally(() => setIsLoading(false));
  };

  const getExamsByLesson = () => {
    setIsLoading(true);
    studentGetExamByLesson({ lessonId: lessonId, page: 0, size: 999 })
      .then((res) => {
        if (res.code === 0) {
          setExams(res.data?.exams || []);
        }
      })
      .finally(() => setIsLoading(false));
  };
  useEffect(() => {
    getAllDocument();
    getExamsByLesson();
  }, [lessonId]);

  useEffect(() => {
    if (handleFinsh !== undefined) {
      handleFinsh(documents, exams);
    }
  }, [exams, documents, isReload]);

  return (
    <>
      <Spin spinning={isLoading}>
        <div className="single-lesson custom-center" style={{ justifyContent: 'space-between' }}>
          <div>Tài liệu: </div>
          <div className="icon-sub">
            <Tooltip title="Thêm Tài liệu"></Tooltip>
          </div>
        </div>
        {documents.map((document, key) => {
          return (
            <SingleDocument
              documents={documents}
              setDocuments={setDocuments}
              document={document}
              key={key}
              isReload={isReload}
              setIsReload={setIsReload}
            />
          );
        })}
        <div className="single-lesson custom-center" style={{ justifyContent: 'space-between' }}>
          <div>Bài kiểm tra: </div>
        </div>
        {exams.map((exam, key) => {
          return (
            <SingleExam
              exams={exams}
              setExams={setExams}
              exam={exam}
              key={key}
              isReload={isReload}
              setIsReload={setIsReload}
            />
          );
        })}
      </Spin>
    </>
  );
};
