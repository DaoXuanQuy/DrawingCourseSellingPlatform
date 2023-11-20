import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import { DISPLAY_STATUS } from '@/constant';
import { getDetailCourse } from '@/services/api/CourseController';
import {
  createLesson,
  deleteLesson,
  displayLesson,
  getLessonsByCourse,
  updateLesson,
} from '@/services/api/LessonController';
import { SettingOutlined } from '@ant-design/icons';
import { useParams } from '@umijs/max';
import { Collapse, Dropdown, Input, message, Modal, Space, Spin, Tag } from 'antd';
import { createContext, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import FormAddLesson from './components/FormAddLesson';
import SingleLesson from './components/SingleLesson';
import './style.less';
const { Panel } = Collapse;

// const ReactMarkdown = require('react-markdown/with-html');v
interface RenderContext {
  handleRender?: () => void;
  isRender?: boolean;
  course?: API.CourseDto;
}
const RenderContext = createContext<RenderContext>({});

const CustomLesson: React.FC = () => {
  const { courseId } = useParams();
  const [isReload, setIsReload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditLesson, setIsEditLesson] = useState(false);
  const [course, setCourse] = useState<API.CourseDto>();
  const [listLesson, setListLesson] = useState<API.LessonResponse[]>([]);
  const [updateLessonReq, setUpdateLessonReq] = useState<API.UpdateLessonRequest>();

  const handleRender = () => {
    console.log('trang thai trc đo:', isReload);
    setIsReload(!isReload);
  };

  const getAllLesson = () => {
    setIsLoading(true);
    getLessonsByCourse({ courseId: courseId || '' })
      .then((res) => {
        if (res.code === 0) {
          setListLesson(res.data?.lessons || []);
        }
      })
      .finally(() => setIsLoading(false));
  };

  const handleDeleteLesson = (id: string | undefined) => {
    setIsLoading(true);
    deleteLesson({ id: id || '' })
      .then((res) => {
        if (res.code === 0) {
          message.success('Xóa bài giảng thành công', 3);
          setIsReload(!isReload);
        }
      })
      .finally(() => setIsLoading(false));
  };

  const handleDisplayLesson = (lessonId: string | undefined, status: 'HIDE' | 'VISIBLE') => {
    setIsLoading(true);
    displayLesson({ lessonId: lessonId || '', status: status })
      .then((res) => {
        if (res.code === 0) {
          message.success(
            status === 'HIDE' ? 'Ẩn bài giảng thành công' : 'Hiển thị bài giảng thành công',
            3,
          );
          setIsReload(!isReload);
        } else {
          message.error(res.message, 3);
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

  return (
    <>
      <RenderContext.Provider
        value={{ handleRender: handleRender, isRender: isReload, course: course }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="lesson-header">
            <div>
              <BreadcrumbCustom
                subNav={[
                  {
                    name: 'Trang chủ',
                    path: '/',
                  },
                  {
                    name: 'Quản lí khóa học',
                    path: '/courses',
                  },
                  {
                    name: 'Chi tiết khóa học',
                    path: `/courses/${courseId}`,
                  },
                  {
                    name: `Cài đặt khóa học: ${course?.courseName}`,
                    path: '',
                  },
                ]}
              />
            </div>
          </div>
          <Spin spinning={isLoading}>
            <div className="custom-lesson" style={{ flex: 1 }}>
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
                        width: '100% !important',
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
                              isEditLesson ? (
                                <>
                                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div style={{ flex: '0 0 98%' }}>
                                      <Input.TextArea
                                        className="lesson-header"
                                        placeholder="Tên bài giảng"
                                        defaultValue={lesson.name}
                                        onChange={(e) => {
                                          setUpdateLessonReq({
                                            ...updateLessonReq,
                                            id: lesson.id || '',
                                            name: e.target.value,
                                          });
                                        }}
                                      />
                                    </div>
                                    <div className="icon-sub">
                                      <Dropdown
                                        placement="bottomRight"
                                        menu={{
                                          items: [
                                            {
                                              key: '0',
                                              label: (
                                                <p
                                                  className="lesson-action"
                                                  onClick={() => {
                                                    if (updateLessonReq !== undefined) {
                                                      updateLesson(updateLessonReq).then((res) => {
                                                        if (res.code === 0) {
                                                          message.success(
                                                            'Cập nhật thông tin khóa học thành công',
                                                            3,
                                                          );
                                                          setIsReload(!isReload);
                                                          setIsEditLesson(false);
                                                        } else {
                                                          message.success(res.message, 3);
                                                        }
                                                      });
                                                    }
                                                  }}
                                                >
                                                  Lưu chỉnh sửa
                                                </p>
                                              ),
                                            },
                                            {
                                              key: '1',
                                              danger: true,
                                              label: (
                                                <p
                                                  className="lesson-action"
                                                  onClick={() => {
                                                    setIsEditLesson(false);
                                                  }}
                                                >
                                                  Hủy
                                                </p>
                                              ),
                                            },
                                          ],
                                        }}
                                      >
                                        <a onClick={(e) => e.preventDefault()}>
                                          <Space>
                                            <SettingOutlined />
                                          </Space>
                                        </a>
                                      </Dropdown>
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                  <div
                                    className=" custom-center"
                                    style={{ justifyContent: 'start' }}
                                  >
                                    <div className="lesson-header">{lesson.name}</div>
                                    <div className="cusom-tag">
                                      <Tag
                                        style={{ fontSize: 16, padding: '4px 10px' }}
                                        color={DISPLAY_STATUS[lesson.displayStatus || 'HIDE'].type}
                                      >
                                        {DISPLAY_STATUS[lesson.displayStatus || 'HIDE'].nameVi}
                                      </Tag>
                                    </div>
                                  </div>
                                  <div className="icon-sub">
                                    <Dropdown
                                      placement="bottomRight"
                                      menu={{
                                        items: [
                                          {
                                            key: '0',
                                            label: (
                                              <p
                                                className="lesson-action"
                                                onClick={() => setIsEditLesson(true)}
                                              >
                                                Chỉnh sửa
                                              </p>
                                            ),
                                          },
                                          {
                                            key: '1',
                                            label: (
                                              <p
                                                className="lesson-action"
                                                onClick={() => {
                                                  Modal.confirm({
                                                    title: `Xác nhận hiển thị bài giảng: ${lesson.name} ?`,
                                                    okText: 'Xác nhận',
                                                    cancelText: 'Hủy',
                                                    onOk: () => {
                                                      handleDisplayLesson(lesson.id, 'VISIBLE');
                                                    },
                                                  });
                                                }}
                                              >
                                                Hiển thị
                                              </p>
                                            ),
                                          },
                                          {
                                            key: '3',
                                            label: (
                                              <p
                                                className="lesson-action"
                                                onClick={() => {
                                                  Modal.confirm({
                                                    title: `Xác nhận ẩn bài giảng: ${lesson.name} ?`,
                                                    okText: 'Xác nhận',
                                                    cancelText: 'Hủy',
                                                    onOk: () => {
                                                      handleDisplayLesson(lesson.id, 'HIDE');
                                                    },
                                                  });
                                                }}
                                              >
                                                Ẩn
                                              </p>
                                            ),
                                          },
                                          {
                                            key: '4',
                                            danger: true,
                                            label: (
                                              <p
                                                className="lesson-action"
                                                onClick={() => {
                                                  Modal.confirm({
                                                    title: `Xác nhận xóa bài giảng: ${lesson.name} ?`,
                                                    okText: 'Xác nhận',
                                                    cancelText: 'Hủy',
                                                    onOk: () => {
                                                      handleDeleteLesson(lesson.id);
                                                    },
                                                  });
                                                }}
                                              >
                                                Xóa{' '}
                                              </p>
                                            ),
                                          },
                                        ],
                                      }}
                                    >
                                      <a onClick={(e) => e.preventDefault()}>
                                        <Space>
                                          <SettingOutlined />
                                        </Space>
                                      </a>
                                    </Dropdown>
                                  </div>
                                </div>
                              )
                            }
                            key="1"
                          >
                            {isEditLesson ? (
                              <p className="lesson-desc">
                                <ReactQuill
                                  onChange={(e) => {
                                    setUpdateLessonReq({
                                      ...updateLessonReq,
                                      id: lesson.id || '',
                                      description: e,
                                    });
                                  }}
                                  theme="snow"
                                  style={{ width: '77vw' }}
                                  defaultValue={lesson.description}
                                />
                              </p>
                            ) : (
                              <div className="ql-editor" style={{ padding: 0, marginLeft: '20px' }}>
                                <div
                                  dangerouslySetInnerHTML={{ __html: lesson.description || '' }}
                                />
                              </div>
                            )}
                            <div className="documents">
                              <SingleLesson lessonId={lesson.id || ''} courseId={courseId || ''} />
                            </div>
                          </Panel>
                        </Collapse>
                      </div>
                    </Space>
                  </>
                );
              })}

              <FormAddLesson
                addLesson={(values) => {
                  return new Promise((resolve, rejected) => {
                    if (values?.lessons?.length > 0) {
                      values.lessons.forEach((data: any) => {
                        const lesson: API.CreateLessonRequest = {
                          ...data,
                          courseId: courseId || '',
                        };
                        createLesson(lesson)
                          .then((res) => {
                            if (res.code !== 0) {
                              rejected(new Error('Lỗi'));
                            } else {
                              getAllLesson();
                            }
                          })
                          .catch((err) => rejected(err));
                      });
                      handleRender();
                      resolve(true);
                    }
                  });
                }}
              />
            </div>
          </Spin>
        </div>
      </RenderContext.Provider>
    </>
  );
};
export { RenderContext };
export default CustomLesson;
