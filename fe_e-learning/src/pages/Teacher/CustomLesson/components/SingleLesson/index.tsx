import { createDocument, getDocuments } from '@/services/api/DocumentController';
import { createExam, getExamByLesson } from '@/services/api/ExamController';
import { Spin, Tooltip } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { RenderContext } from '../..';
import FormAddDocument from '../FormAddDocument';
import FormAddExam from '../FormAddExam';
import SingleDocument from '../SingleDocument';
import SingleExam from '../SingleExam';
import './index.less';

interface Props {
  lessonId: string;
  courseId: string;
}

export default (props: Props): JSX.Element => {
  const { lessonId, courseId } = props;
  const { handleRender, isRender } = useContext(RenderContext);

  const [documents, setDocuments] = useState<API.DocumentDto[]>([]);
  const [exams, setExams] = useState<API.ExamResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const getAllDocument = () => {
    setIsLoading(true);
    getDocuments({ lessonId: lessonId, courseId: courseId })
      .then((res) => {
        if (res.code === 0) {
          setDocuments(res.data?.documents || []);
        }
      })
      .finally(() => setIsLoading(false));
  };

  const getAllExam = () => {
    setIsLoading(true);
    getExamByLesson({ lessonId: lessonId, page: 0, size: 999 })
      .then((res) => {
        if (res.code === 0) {
          setExams(res.data?.exams || []);
        }
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getAllDocument();
    getAllExam();
  }, [documents.length, isRender]);

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
          return <SingleDocument document={document} key={key} />;
        })}
        <div style={{ margin: '10px 20px' }}>
          <FormAddDocument
            addDocument={(data) => {
              return new Promise((resolve, reject) => {
                if (data?.documents?.length > 0) {
                  data.documents.forEach((element: any) => {
                    let fileData: File | undefined = undefined;
                    if (element?.file?.file) {
                      fileData = element.file.file.originFileObj as File;
                    }

                    let request: API.AddDocumentRequest = {
                      ...element,
                      lessonId: lessonId,
                      file: fileData,
                    };
                    createDocument(request, fileData)
                      .then((res) => {
                        if (res.code === 0) {
                          getAllDocument();
                        } else {
                          reject(new Error('Lỗi'));
                        }
                      })
                      .catch((err) => reject(new Error(err)));
                  });
                  if (handleRender !== undefined) {
                    handleRender();
                  }
                  resolve(true);
                }
              });
            }}
          />
        </div>
        <div className="single-lesson custom-center" style={{ justifyContent: 'space-between' }}>
          <div>Bài kiểm tra: </div>
        </div>
        {exams
          .sort(
            (o1, o2) =>
              new Date(o1.createAt || new Date()).getTime() -
              new Date(o2.createAt || new Date()).getTime(),
          )
          .map((exam, key) => {
            return <SingleExam exam={exam} key={key} />;
          })}
        <div style={{ margin: '10px 20px' }}>
          <FormAddExam
            addExam={(data) => {
              return new Promise((resolve, reject) => {
                if (data?.exams?.length > 0) {
                  data.exams.forEach((element: any) => {
                    let request: API.AddExamRequest = {
                      ...element,
                      lessonId: lessonId,
                    };
                    createExam(request)
                      .then((res) => {
                        if (res.code === 0) {
                          getAllExam();
                        } else {
                          reject(new Error('Lỗi'));
                        }
                      })
                      .catch((err) => reject(new Error(err)));
                  });
                  if (handleRender !== undefined) {
                    handleRender();
                  }
                  resolve(true);
                }
              });
            }}
          />
        </div>
      </Spin>
    </>
  );
};
