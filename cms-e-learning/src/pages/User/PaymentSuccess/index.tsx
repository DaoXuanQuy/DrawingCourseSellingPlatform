import React, { useEffect, useState } from 'react';
import { Button, Result } from 'antd';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import { history, useParams } from '@umijs/max';
import { getDetailCourse } from '@/services/api/CourseController';

const PaymentSuccess: React.FC = () => {
  const [course, setCourse] = useState<API.CourseEntity>({});
  const { courseId } = useParams();
  const location = history.location;

  useEffect(() => {
    if (location?.state === undefined) {
      history.push('/welcome');
    } else {
      getDetailCourse({ id: courseId || '' }).then((res) => {
        if (res.code === 0) {
          setCourse(res.data || {});
        } else {
          history.push('/not-found');
        }
      });
    }
  }, [courseId]);
  return (
    <>
      <BreadcrumbCustom
        subNav={[
          { name: 'Home', path: './welcome' },
          { name: 'Courses', path: './courses' },
          { name: 'Payment Success', path: '' },
        ]}
      />
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Result
          status="success"
          title={`Successfully Purchased Course: ${course.title}!`}
          subTitle={`Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait.`}
          extra={[
            <Button
              type="primary"
              key="console"
              onClick={() => {
                history.push('/welcome');
              }}
            >
              Go Home
            </Button>,
          ]}
        />
      </div>
    </>
  );
};

export default PaymentSuccess;
