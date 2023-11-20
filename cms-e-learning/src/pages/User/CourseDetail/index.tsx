import CardExam from '@/components/CardExam';
import { useParams } from '@umijs/max';
import { Empty, Pagination, PaginationProps } from 'antd';
import { useEffect, useState } from 'react';
import { getExamByCourse } from '@/services/api/CourseController';
import './detailStyle.less';
import BreadcrumbCustom from '@/components/BreadcrumbCustom';
const CourseDetail: React.FC = () => {
  const { courseId } = useParams();

  const [listExam, setListExam] = useState<API.ExamEntity[]>([]);
  const [pageSize, setPageSize] = useState(15);
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(1);

  const onChange: PaginationProps['onChange'] = (page: number, size: number) => {
    setCurrent(page);
    console.log('page: ', page);
  };
  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
    setPageSize(pageSize);
  };

  useEffect(() => {
    getExamByCourse({ courseId: courseId || '', page: current - 1, size: pageSize }).then((res) => {
      if (res.code === 0) {
        setListExam(res.data?.exams || []);
        setTotal(res.data?.paginate?.total || 1);
      }
    });
  }, [pageSize, current]);
  return (
    <>
      <BreadcrumbCustom
        subNav={[
          { name: 'Home', path: '/welcome' },
          { name: 'My Courses', path: '/my-courses' },
          { name: 'Course Detail', path: '' },
        ]}
      />
      <div className="wrapper">
        {listExam.map((exam) => {
          return <CardExam exam={exam} />;
        })}
      </div>
      {listExam.length > 0 ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Pagination
            showSizeChanger
            pageSize={pageSize}
            onShowSizeChange={onShowSizeChange}
            onChange={onChange}
            current={current}
            pageSizeOptions={[5, 10, 15, 20, 25]}
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

export default CourseDetail;
