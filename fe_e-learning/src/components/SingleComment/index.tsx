import { GET_IMAGE } from '@/constant';
import { AntDesignOutlined } from '@ant-design/icons';
import { Avatar, Rate } from 'antd';
import 'react-quill/dist/quill.snow.css';
import './index.less';
interface Props {
  avatar: string;
  username: string;
  rate: number;
  description: string;
}

export default (props: Props): JSX.Element => {
  const { avatar, username, rate, description } = props;
  return (
    <div className="comment">
      <div className="avatar">
        <Avatar
          size={{ xs: 40, sm: 40, md: 40, lg: 40, xl: 40, xxl: 40 }}
          icon={<AntDesignOutlined />}
          src={GET_IMAGE.getUrl(avatar)}
        />
      </div>
      <div className="content">
        <div className="user">{username}</div>
        <div className="rate">
          <Rate style={{ fontSize: 14 }} value={rate} />
        </div>
        <div className="detail ql-editor">
          <div style={{ padding: 0 }}>
            <div dangerouslySetInnerHTML={{ __html: description || '' }} />
          </div>
        </div>
      </div>
    </div>
  );
};
