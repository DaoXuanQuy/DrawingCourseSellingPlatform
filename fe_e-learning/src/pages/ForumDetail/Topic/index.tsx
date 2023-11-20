import { GET_IMAGE } from '@/constant';
import { history } from '@umijs/max';
import { Avatar, Divider } from 'antd';
import moment from 'moment';
import './index.less';

interface Props {
  topicId?: string;
  title?: string;
  name?: string;
  date?: string;
  avatar?: string;
  categoryId?: string;
}

export default (props: Props): JSX.Element => {
  const { topicId, title, name, date, avatar, categoryId } = props;
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'start', gap: '8px' }}>
        <div>
          <Avatar size={'large'} src={avatar ? GET_IMAGE.getUrl(avatar) : '/icons/Liveness.png'} />
        </div>
        <div className="topic-single container-vertical">
          <div
            className="title"
            onClick={() => {
              history.push(`/forums/${categoryId}/topic/${topicId}`, title);
            }}
          >
            {title}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div className="name">{name || '--'}</div>
            <div className="date">{date ? moment(date).format('DD/MM/YYYY') : '--'}</div>
          </div>
        </div>
      </div>
      <Divider style={{ margin: '8px 0' }} />
    </>
  );
};
