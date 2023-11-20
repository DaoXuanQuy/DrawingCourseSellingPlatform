import { GET_IMAGE } from '@/constant';
import TextEditor from '@/pages/CreatePost/components/TextEditor';
import { useModel } from '@umijs/max';
import { Avatar, Button, Col, Row } from 'antd';
import { useState } from 'react';
import { BsFillReplyFill } from 'react-icons/bs';
import 'react-quill/dist/quill.snow.css';

interface Props {
  onComment?: (e: string) => Promise<void>;
}

export default (props: Props): JSX.Element => {
  const { initialState } = useModel('@@initialState');
  const [content, setContent] = useState<string>('');

  const { onComment } = props;
  return (
    <div className="detail-post" style={{ width: '100%', height: 'auto' }}>
      <Row gutter={[24, 24]}>
        <Col className="user-post" xs={6} sm={6} md={6} lg={4} xl={4} xxl={4}>
          <div className="vertical-center">
            <Avatar
              src={
                initialState?.currentUser?.avatar
                  ? GET_IMAGE.getUrl(initialState.currentUser.avatar)
                  : '/icons/Liveness.png'
              }
              size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
            />
            <div>
              {initialState?.currentUser?.firstName + ' ' + initialState?.currentUser?.lastName}
            </div>
          </div>
        </Col>
        <Col className="content-post " xs={18} sm={18} md={18} lg={20} xl={20} xxl={20}>
          <div className="comment" style={{ flex: 1, height: 'fit-content' }}>
            <TextEditor
              value={content}
              onChange={(e) => {
                setContent(e);
              }}
            />
            <Button
              style={{ marginTop: '8px', borderRadius: '4px' }}
              type="primary"
              icon={<BsFillReplyFill />}
              onClick={() => {
                if (onComment !== undefined) {
                  onComment(content).then(() => {
                    setContent('');
                  });
                }
              }}
            >
              Bình luận
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};
