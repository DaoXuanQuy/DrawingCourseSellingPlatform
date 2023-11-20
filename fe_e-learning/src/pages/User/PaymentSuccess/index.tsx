import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import { getDetailCourse } from '@/services/api/CourseController';
import { history, useParams } from '@umijs/max';
import { Button, Result, Spin } from 'antd';
import React, { useEffect, useState } from 'react';

const PaymentSuccess: React.FC = () => {
  const [course, setCourse] = useState<API.CourseDto>({});
  const { courseId } = useParams();
  const location = history.location;

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (location?.state === undefined) {
      history.push('/welcome');
    } else {
      setIsLoading(true);
      getDetailCourse({ id: courseId || '' })
        .then((res) => {
          if (res.code === 0) {
            setCourse(res.data?.course || {});
          } else {
            history.push('/not-found');
          }
        })
        .finally(() => setIsLoading(false));
    }
  }, [courseId]);
  return (
    <div className="container-vertical" style={{ flex: 1 }}>
      <BreadcrumbCustom
        subNav={[
          { name: 'Trang chủ', path: '/' },
          { name: 'Thanh toán thành công', path: '' },
        ]}
      />
      <div
        style={{
          flex: 1,
          height: '100%',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Spin spinning={isLoading}>
          <Result
            style={{ flex: 1 }}
            status="success"
            title={`Thanh toán thành công khóa học: ${course.courseName}!`}
            // subTitle={`Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait.`}
            extra={[
              <Button
                type="primary"
                key="console"
                onClick={() => {
                  history.push('/welcome');
                }}
              >
                Trở về trang chủ
              </Button>,
            ]}
          />
        </Spin>
      </div>
    </div>
  );
};

export default PaymentSuccess;
