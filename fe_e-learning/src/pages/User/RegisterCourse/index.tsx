import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import CardCourse from '@/components/CardCourse';
import { getUnregisterCourse } from '@/services/api/CourseController';
import { Col, Empty, Pagination, PaginationProps, Row, Spin } from 'antd';
import { useEffect, useState } from 'react';
import './style.less';

const PAGE_SIZE = 15;
const RegisterCourse: React.FC = () => {
  const [courses, setCourses] = useState<API.CourseDto[]>([]);
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getUnregisterCourse({ size: PAGE_SIZE, page: current - 1 })
      .then((res) => {
        if (res.code === 0) {
          setCourses(res.data?.courses || []);

          setTotal(res.data?.paginate?.total || 0);
        }
      })
      .finally(() => setIsLoading(false));
  }, [current]);

  const onChange: PaginationProps['onChange'] = (page) => {
    setCurrent(page);
  };

  return (
    <>
      <BreadcrumbCustom
        subNav={[
          { name: 'Trang chủ', path: '/' },
          { name: 'Danh sách khóa học', path: '' },
        ]}
      />

      <Spin spinning={isLoading}>
        {courses.length > 0 ? (
          <>
            <div className="row-course">
              <Row gutter={[24, 24]}>
                {courses.map((course, index) => {
                  return (
                    <Col key={index} xs={24} sm={12} md={8} lg={5} xl={5} xxl={5}>
                      <CardCourse type="register" course={course} />
                    </Col>
                  );
                })}
              </Row>
            </div>
            <Row style={{ justifyContent: 'flex-end' }}>
              <Pagination
                current={current}
                onChange={onChange}
                total={total}
                pageSize={PAGE_SIZE}
              />
            </Row>
          </>
        ) : (
          <Empty description="Không có dữ liệu" />
        )}
      </Spin>
    </>
  );
};

export default RegisterCourse;
