import CardCourse from '@/components/CardCourse';
import { Empty, Pagination, PaginationProps } from 'antd';
import { getUnregisterCourse } from '@/services/api/UserController';
import './style.less';
import { useEffect, useState } from 'react';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';

const RegisterCourse: React.FC = () => {
  const [listCourse, setListCourse] = useState<API.CourseEntity[]>([]);
  const [pageSize, setPageSize] = useState(6);
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(1);

  const onChange: PaginationProps['onChange'] = (page: number, size: number) => {
    setCurrent(page);
  };
  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
    console.log(current, pageSize);
    setPageSize(pageSize);
    setCurrent(current || 1);
  };

  useEffect(() => {
    getUnregisterCourse({ page: current - 1, size: pageSize }).then((res) => {
      if (res.code === 0) {
        setListCourse(res.data?.courses || []);
        setTotal(res.data?.paginate?.total || 1);
      }
    });
  }, [pageSize, current]);

  return (
    <>
      <BreadcrumbCustom
        subNav={[
          { name: 'Home', path: '/welcome' },
          { name: 'Courses', path: '' },
        ]}
      />
      <div className="wrapper">
        {listCourse.map((data) => {
          return <CardCourse course={data} type="register" />;
        })}
      </div>
      {listCourse.length > 0 ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Pagination
            showSizeChanger
            pageSize={pageSize}
            onShowSizeChange={onShowSizeChange}
            onChange={onChange}
            current={current}
            pageSizeOptions={[3, 6, 9, 12]}
            total={total}
          />
        </div>
      ) : (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Empty />
        </div>
      )}
    </>
  );
};

export default RegisterCourse;
