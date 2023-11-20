import { GET_IMAGE } from '@/constant';
import { UserOutlined } from '@ant-design/icons';
import Field from '@ant-design/pro-field';
import { Divider, Rate, Row } from 'antd';
import 'antd/dist/antd.css';
import { history } from 'umi';
import './style.less';

interface Props {
  type: string;
  course: API.CourseDto;
  star?: number;
}
const CardCourse: React.FC<Props> = (props) => {
  const handleOnclick = (): void => {
    if (type === 'register') {
      history.push(`/portal/courses/register/${course.id}`, course.star);
    } else {
      history.push(`/portal/courses/my-courses/${course.id}`);
    }
  };
  const { type, course, star } = props;
  return (
    <>
      <div className="container" onClick={handleOnclick}>
        <div className="header">
          <div className="image">
            <img
              src={course.imageUrl ? GET_IMAGE.getUrl(course.imageUrl) : '/icons/Logo.png'}
              alt=""
              style={{
                width: '100px',
                height: '100px',
                objectFit: 'cover',
                borderRadius: '6px',
              }}
            />
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyItems: 'center',
            width: '100%',
            flex: 1,
          }}
        >
          <div className="content">
            <p className="heading">{course.courseName}</p>
            <p className="description">Giáo viên: {course.teacherName}</p>
          </div>
          <div className="footer">
            {type === 'register' ? (
              <>
                <div
                  className="custom-center"
                  style={{
                    flex: 1,
                    // justifyContent: 'space-between',
                    width: '70%',
                    gap: '8px',
                    flexDirection: 'column',
                  }}
                >
                  <div>
                    <UserOutlined />: {course.studentsCount}
                  </div>
                  <Row
                    className="description"
                    style={{ color: '#495057', display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    <div>
                      {`Giá: ${(
                        (course?.price || 0) *
                        (1 - (course.discountPercentage || 0) / 100)
                      ).toLocaleString()} VND`}
                    </div>
                    {course?.discountPercentage && course.discountPercentage > 0 ? (
                      <div
                        style={{
                          textDecoration: 'line-through',
                          color: '#6a6f73',
                          fontSize: '12px',
                        }}
                      >
                        {course.price?.toLocaleString()}
                      </div>
                    ) : (
                      <></>
                    )}
                  </Row>
                </div>
                <Divider style={{ margin: 8 }} />
                <div>
                  <Rate
                    className="custom-rate"
                    style={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '16px',
                    }}
                    disabled
                    defaultValue={star ? star : course.star}
                  />
                </div>
              </>
            ) : (
              <div style={{ width: '100%' }}>
                <Field
                  text={course.progressPercent}
                  valueType="progress"
                  mode={'read'}
                  plain={false}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CardCourse;
