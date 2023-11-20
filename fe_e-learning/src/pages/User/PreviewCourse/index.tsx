import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import CardCourse from '@/components/CardCourse';
import SingleComment from '@/components/SingleComment';
import { registerCourse, reviewCourse } from '@/services/api/CourseController';
import { getAllReviewByCourse } from '@/services/api/ReviewController';
import {
  BookOutlined,
  CheckCircleOutlined,
  QuestionCircleOutlined,
  RiseOutlined,
  TranslationOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { history, useParams } from '@umijs/max';
import {
  Button,
  Col,
  Collapse,
  Divider,
  message,
  Pagination,
  PaginationProps,
  Row,
  Select,
  Spin,
  Typography,
} from 'antd';
import { useEffect, useState } from 'react';
import './index.less';
const { Panel } = Collapse;
const PAGE_SIZE = 3;
const PreviewCourse: React.FC = () => {
  const { courseId } = useParams();
  const star = history.location.state as number;
  const [current, setCurrent] = useState(1);
  const [review, setReview] = useState<API.ReviewResponse[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [course, setCourse] = useState<API.ReviewCourseResponse>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingReview, setIsLoadingReview] = useState(false);
  const [paymentType, setPaymentType] = useState<'VNPAY' | 'UMEE_PAY'>('UMEE_PAY');

  const onChange: PaginationProps['onChange'] = (page) => {
    setCurrent(page);
  };

  useEffect(() => {
    if (courseId) {
      setIsLoading(true);
      reviewCourse({ id: courseId || '' })
        .then((res) => {
          if (res.code === 0) {
            setCourse(res.data || {});
          } else {
            history.push('/not-found');
          }
        })
        .finally(() => setIsLoading(false));
    }
  }, [courseId]);
  useEffect(() => {
    if (courseId) {
      setIsLoadingReview(true);
      getAllReviewByCourse({ id: courseId, page: current - 1, size: PAGE_SIZE })
        .then((res) => {
          if (res.data) {
            setReview(res.data.reviews || []);
            setTotal(res.data.paginate?.total || 0);
          }
        })
        .finally(() => setIsLoadingReview(false));
    }
  }, [current]);
  return (
    <>
      <BreadcrumbCustom
        subNav={[
          { name: 'Trang chủ', path: '/' },
          { name: 'Đăng ký khóa học', path: '/portal/courses' },
          { name: `Thông tin khóa học`, path: '' },
        ]}
      />
      <Spin spinning={isLoading}>
        <Row gutter={[16, 16]} className="layout">
          <Col xs={24} sm={24} md={24} lg={24} xl={18} xxl={18}>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <div>
                  <Typography.Title
                    style={{
                      margin: '0 0 5px 0',
                      fontSize: '35px',
                      fontWeight: '500',
                      lineHeight: '35px',
                    }}
                  >
                    {course.courseName}
                  </Typography.Title>
                </div>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={24} md={24} lg={24} xl={8} xxl={8}>
                <div>
                  <Typography.Title
                    style={{
                      margin: '20px 0',
                      fontSize: '22px',
                      fontWeight: '500',
                      lineHeight: '28px',
                    }}
                  >
                    Tổng quan
                  </Typography.Title>
                </div>
                <div
                  style={{
                    display: 'flex',
                    padding: '15px',
                    borderBottom: '1px solid rgba(0,0,0,0.1)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', width: '60%' }}>
                    <BookOutlined />
                    <Typography.Text style={{ marginLeft: '10px', fontSize: '14px' }}>
                      Số bài học
                    </Typography.Text>
                  </div>
                  <Typography.Text style={{ width: '40%' }}>
                    {course.lessons?.length}
                  </Typography.Text>
                </div>
                <div
                  style={{
                    display: 'flex',
                    padding: '15px',
                    borderBottom: '1px solid rgba(0,0,0,0.1)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', width: '60%' }}>
                    <QuestionCircleOutlined />
                    <Typography.Text style={{ marginLeft: '10px', fontSize: '14px' }}>
                      Số bài kiểm trả
                    </Typography.Text>
                  </div>
                  <Typography.Text style={{ width: '40%' }}>{course.examsCount}</Typography.Text>
                </div>
                <div
                  style={{
                    display: 'flex',
                    padding: '15px',
                    borderBottom: '1px solid rgba(0,0,0,0.1)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', width: '60%' }}>
                    <RiseOutlined />
                    <Typography.Text style={{ marginLeft: '10px', fontSize: '14px' }}>
                      Trình độ phù hợp
                    </Typography.Text>
                  </div>
                  <Typography.Text style={{ width: '40%' }}>Tất cả</Typography.Text>
                </div>
                <div
                  style={{
                    display: 'flex',
                    padding: '15px',
                    borderBottom: '1px solid rgba(0,0,0,0.1)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', width: '60%' }}>
                    <TranslationOutlined />
                    <Typography.Text style={{ marginLeft: '10px', fontSize: '14px' }}>
                      Ngôn ngữ
                    </Typography.Text>
                  </div>
                  <Typography.Text style={{ width: '40%' }}>Tiếng Việt</Typography.Text>
                </div>
                <div
                  style={{
                    display: 'flex',
                    padding: '15px',
                    borderBottom: '1px solid rgba(0,0,0,0.1)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', width: '60%' }}>
                    <UserOutlined />
                    <Typography.Text style={{ marginLeft: '10px', fontSize: '14px' }}>
                      Số người đăng ký
                    </Typography.Text>
                  </div>
                  <Typography.Text style={{ width: '40%' }}>{course.studentsCount}</Typography.Text>
                </div>
                <div
                  style={{
                    display: 'flex',
                    padding: '15px',
                    borderBottom: '1px solid rgba(0,0,0,0.1)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', width: '60%' }}>
                    <CheckCircleOutlined />
                    <Typography.Text style={{ marginLeft: '10px', fontSize: '14px' }}>
                      Đánh giá
                    </Typography.Text>
                  </div>
                  <Typography.Text style={{ width: '40%' }}>Có</Typography.Text>
                </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={24} xl={16} xxl={16}>
                <Typography.Title
                  style={{
                    margin: '20px 0',
                    fontSize: '22px',
                    fontWeight: '500',
                    lineHeight: '28px',
                  }}
                >
                  Mô tả khóa học
                </Typography.Title>
                <Typography.Text
                  style={{
                    marginBottom: '24px',
                    fontSize: '16px',
                    lineHeight: '24px',
                    fontWeight: '400',
                  }}
                >
                  <div className="ql-editor" style={{ padding: 0, height: 'fit-content' }}>
                    <div dangerouslySetInnerHTML={{ __html: course.description || '' }} />
                  </div>
                </Typography.Text>
                <Typography.Title
                  style={{
                    margin: '20px 0',
                    fontSize: '22px',
                    fontWeight: '500',
                    lineHeight: '28px',
                  }}
                >
                  Thông tin bài giảng
                </Typography.Title>
                <Collapse
                  style={{ borderRadius: 6 }}
                  // defaultActiveKey={[(course.lessons?.length || 1) - 1]}
                  onChange={(key: string | string[]) => {}}
                >
                  {course.lessons?.map((lesson, index) => {
                    return (
                      <Panel
                        header={
                          <div
                            style={{
                              fontSize: '22px',
                              fontWeight: '500',
                              margin: 0,
                            }}
                          >
                            {lesson.name}
                          </div>
                        }
                        key={index}
                      >
                        <div style={{ padding: 0, height: 'fit-content' }}>
                          <div dangerouslySetInnerHTML={{ __html: lesson.description || '' }} />
                        </div>
                      </Panel>
                    );
                  })}
                </Collapse>
              </Col>
            </Row>
          </Col>
          <Col
            lg={12}
            xl={6}
            xxl={6}
            xs={18}
            sm={12}
            md={12}
            className="sider"
            style={{
              // backgroundColor: '#f0f2f5',
              minWidth: '500px !important',
              maxWidth: '500px !important',
              width: '500px !important',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <CardCourse star={star} course={course} type="register" />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Select
                  style={{ width: '70%' }}
                  placeholder="Chọn phương thức thanh toán"
                  optionFilterProp="children"
                  onSelect={(e) => setPaymentType(e as 'VNPAY' | 'UMEE_PAY')}
                  defaultValue={{
                    label: (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'start',
                          height: '100%',
                          gap: '6px',
                        }}
                      >
                        <div style={{ width: '24px' }}>
                          <img
                            style={{ width: '100%', height: '100%' }}
                            src={'/icons/klb-pay.svg'}
                            alt=""
                          />
                        </div>
                        <div id="bank-name">Thanh toán KLB-PAY</div>
                      </div>
                    ),
                    value: 'UMEE_PAY',
                  }}
                  options={[
                    {
                      label: (
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'start',
                            height: '100%',
                            gap: '6px',
                          }}
                        >
                          <div style={{ width: '24px' }}>
                            <img
                              style={{ width: '100%', height: '100%' }}
                              src={'/icons/klb-pay.svg'}
                              alt=""
                            />
                          </div>
                          <div id="bank-name">Thanh toán KLB-PAY</div>
                        </div>
                      ),
                      value: 'UMEE_PAY',
                    },
                    {
                      label: (
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'start',
                            height: '100%',
                            gap: '6px',
                          }}
                        >
                          <div style={{ width: '24px' }}>
                            <img
                              style={{ width: '100%', height: '100%' }}
                              src={'/icons/vnpay.svg'}
                              alt=""
                            />
                          </div>
                          <div id="bank-name">Thanh toán VNPAY</div>
                        </div>
                      ),
                      value: 'VNPAY',
                    },
                  ]}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  type="primary"
                  size={'large'}
                  className="button-register"
                  onClick={() => {
                    setIsLoading(true);
                    registerCourse({ courseId: courseId || '', paymentType: paymentType })
                      .then((res) => {
                        if (res.code === 0) {
                          window.open(res.data?.paymentUrl);
                        } else {
                          message.error(res.message, 3);
                        }
                      })
                      .finally(() => setIsLoading(false));
                  }}
                >
                  <Typography.Title
                    style={{ fontSize: 20, fontWeight: 500, color: '#fff', margin: 0, padding: 0 }}
                  >
                    Đăng ký ngay
                  </Typography.Title>
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Spin>
      <Divider />
      <Spin spinning={isLoadingReview}>
        <div style={{ width: '100%' }} className="container-vertical">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
            <div style={{ flex: 0.4 }} className="container-vertical">
              <div className="container-vertical">
                {review.map((data) => {
                  return (
                    <SingleComment
                      avatar={data.avatar || ''}
                      username={data.fullname || ''}
                      rate={data.star || 0}
                      description={data.content || ''}
                    />
                  );
                })}
              </div>
              {review?.length > 0 ? (
                <div style={{ alignSelf: 'flex-end' }}>
                  <Pagination
                    current={current}
                    onChange={onChange}
                    total={total}
                    pageSize={PAGE_SIZE}
                  />
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </Spin>
    </>
  );
};

export default PreviewCourse;
