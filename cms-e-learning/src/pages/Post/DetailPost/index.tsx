import { GET_IMAGE } from '@/constant';
import { Avatar, Col, Row } from 'antd';
import 'react-quill/dist/quill.snow.css';

interface Props {
  postId?: string;
  avatar?: string;
  firstName?: string;
  lastName?: string;
  content?: string;
}

export default (props: Props): JSX.Element => {
  const { postId, avatar, firstName, lastName, content } = props;
  return (
    <div className="detail-post" style={{ width: '100%' }}>
      <Row gutter={[24, 24]}>
        <Col className="user-post" xs={6} sm={6} md={6} lg={4} xl={4} xxl={4}>
          <div className="vertical-center">
            <Avatar
              src={avatar ? GET_IMAGE.getUrl(avatar) : '/icons/Liveness.png'}
              size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
            />
            <div>{firstName + ' ' + lastName}</div>
          </div>
        </Col>
        <Col className="content-post" xs={18} sm={18} md={18} lg={20} xl={20} xxl={20}>
          <div className="container-vertical" style={{ height: '100%' }}>
            <div className="ql-editor" style={{ flex: 1 }}>
              <div dangerouslySetInnerHTML={{ __html: content || '' }} />
            </div>
            {/* <div className="actions">
              <div
                className="icon"
                onClick={() => {
                  if (postId) {
                    createModel1({ postId: postId, reactionType: 'LIKE' });
                  }
                }}
              >
                <Tooltip title="Thích">
                  <LikeOutlined />
                </Tooltip>
              </div>
              <div
                className="icon"
                onClick={() => {
                  if (postId) {
                    createModel1({ postId: postId, reactionType: 'DISLIKE' });
                  }
                }}
              >
                <Tooltip title="Không thích">
                  <DislikeOutlined />
                </Tooltip>
              </div>
            </div> */}
          </div>
        </Col>
      </Row>
    </div>
  );
};
