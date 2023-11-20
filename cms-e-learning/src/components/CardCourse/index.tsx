import Field from '@ant-design/pro-field';
import { Rate } from 'antd';
import 'antd/dist/antd.css';
import { history } from 'umi';
import './style.less';

interface Props {
  type: string;
  course: API.CourseEntity;
}
const CardCourse: React.FC<Props> = (props) => {
  const handleOnclick = (): void => {
    if (type === 'register') {
      history.push(`/courses/register/${course.id}`);
    } else {
      history.push(`/my-courses/detail/${course.id}`);
    }
  };
  const { type, course } = props;
  return (
    <>
      <div className="container" onClick={handleOnclick}>
        <div className="header">
          <div className="image">
            <img src={course.avatar} alt="" style={{ maxWidth: '100px', borderRadius: '6px' }} />
          </div>
        </div>
        <div className="content">
          <p className="heading">{course.title}</p>
          <p className="description">{course.courseName} by Phan Thanh Tai</p>
        </div>
        <div className="footer">
          {type === 'register' ? (
            <>
              <div className="description" style={{ color: '#495057' }}>
                Price: ${course.price}
              </div>
              <Rate disabled defaultValue={2} />
            </>
          ) : (
            <div>
              <Field
                style={{ width: '200px' }}
                text="40"
                valueType="progress"
                mode={'read'}
                plain={false}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CardCourse;
