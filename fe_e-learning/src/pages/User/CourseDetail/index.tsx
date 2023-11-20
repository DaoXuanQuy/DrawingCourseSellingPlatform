import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import { getDetailCourse } from '@/services/api/CourseController';
import { studentGetLessonsByCourse } from '@/services/api/LessonController';
import { createReview } from '@/services/api/ReviewController';
import { useParams } from '@umijs/max';
import { Button, Collapse, Empty, message, Space, Spin } from 'antd';
import { createContext, useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import CheckFinsh from './components/CheckFinsh';
import ReviewCourse from './components/ReviewCourse';
import SingleLesson from './components/SingleLesson';
import './style.less';
const { Panel } = Collapse;

// const ReactMarkdown = require('react-markdown/with-html');v
interface CourseContext {
  course?: API.CourseDto;
}
const CourseContext = createContext<CourseContext>({});

const CourseDetail: React.FC = () => {
  const { courseId } = useParams();
  const [isReload, setIsReload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [course, setCourse] = useState<API.CourseDto>();
  const [listLesson, setListLesson] = useState<API.LessonResponse[]>([]);
  const [isFinsh, setIsFinsh] = useState(false);
  const [isOpenReview, setIsOpenReview] = useState(false);

  const getAllLesson = () => {
    setIsLoading(true);
    studentGetLessonsByCourse({ courseId: courseId || '' })
      .then((res) => {
        if (res.code === 0) {
          setListLesson(res.data?.lessons || []);
        }
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getDetailCourse({ id: courseId || '' }).then((res) => {
      if (res.code === 0) {
        setCourse(res.data?.course);
      }
    });
  }, [courseId]);

  useEffect(() => {
    getAllLesson();
  }, [listLesson.length, isReload]);

  const handleFinsh = (documents: API.DocumentDto[], exams: API.ExamResponse[]) => {
    let documentFinsh = true;
    let examFinsh = true;
    documents.forEach((data) => {
      if (data.done === false) {
        documentFinsh = false;
        return;
      }
    });
    exams.forEach((data) => {
      if (data.done == false) {
        examFinsh = false;
        return;
      }
    });

    setIsFinsh(documentFinsh && examFinsh);
  };

  return (
    <>
      <CourseContext.Provider value={{ course: course }}>
        <div className="lesson-header">
          <div>
            <BreadcrumbCustom
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
                  path: '',
                },
              ]}
            />
          </div>
          <div>
            <Button onClick={() => setIsOpenReview(true)} type="link">
              Đánh giá khóa học
            </Button>
          </div>
        </div>
        <Spin spinning={isLoading}>
          {listLesson.length > 0 ? (
            <div className="custom-lesson">
              {listLesson.map((lesson) => {
                return (
                  <>
                    <Space
                      key={lesson.id}
                      style={{
                        display: 'flex',
                        marginBottom: 8,
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                      }}
                      align="baseline"
                    >
                      <div className="lesson-content" key={lesson.id}>
                        <Collapse
                          className="lesson-content"
                          collapsible="icon"
                          defaultActiveKey={['1']}
                        >
                          <Panel
                            header={
                              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div className=" custom-center" style={{ justifyContent: 'start' }}>
                                  <div className="lesson-header">{lesson.name}</div>
                                </div>
                                <div>
                                  <CheckFinsh isDisable={true} isChecked={isFinsh} />
                                </div>
                              </div>
                            }
                            key="1"
                          >
                            <div className="ql-editor" style={{ padding: 0, marginLeft: '20px' }}>
                              <div dangerouslySetInnerHTML={{ __html: lesson.description || '' }} />
                            </div>
                            <div className="documents">
                              <SingleLesson
                                handleFinsh={handleFinsh}
                                lessonId={lesson.id || ''}
                                courseId={courseId || ''}
                              />
                            </div>
                          </Panel>
                        </Collapse>
                      </div>
                    </Space>
                  </>
                );
              })}
            </div>
          ) : (
            <Empty description="Không có dữ liệu" />
          )}
        </Spin>
      </CourseContext.Provider>
      <ReviewCourse
        courseId={courseId || ''}
        isOpen={isOpenReview}
        setIsOpen={setIsOpenReview}
        handleReview={(data: API.CreateReviewRequest) => {
          console.log(data);
          return new Promise<void>((resolve, reject) => {
            createReview(data).then((res) => {
              if (res.code === 0) {
                message.success('Đánh giá thành công, xin chân thành cảm ơn bạn.', 3);
                setIsOpenReview(false);
                resolve();
              } else {
                message.error(res.message, 3);
                reject();
              }
            });
          });
        }}
      />
    </>
  );
};
export { CourseContext };
export default CourseDetail;
