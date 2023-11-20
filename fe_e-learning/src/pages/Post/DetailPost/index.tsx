import { GET_IMAGE, PAGE_SIZE } from '@/constant';
import {
  createModel1,
  deleteModel1,
  getInfoListWithFilterPaging1,
} from '@/services/api/PORTALForumReactionController';
import { DislikeOutlined, LikeOutlined } from '@ant-design/icons';
import { Avatar, Col, Row, Tooltip } from 'antd';
import { memo, useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';

interface Props {
  postId?: string;
  avatar?: string;
  firstName?: string;
  lastName?: string;
  content?: string;
  isLike?: boolean;
  isDisLike?: boolean;
  action?: number;
  isReload?: boolean;
  setIsReload?: (e: boolean) => void;
  totalLike?: number;
  totalDisLike?: number;
}

const DetailPost = (props: Props): JSX.Element => {
  const {
    postId,
    avatar,
    firstName,
    lastName,
    content,
    isDisLike,
    isLike,
    action,
    setIsReload,
    isReload,
    totalLike,
    totalDisLike,
  } = props;

  const [like, setLike] = useState(isLike);
  const [dislike, setDisLike] = useState(isDisLike);
  const [actionState, setActionState] = useState(action);
  const [likeReactions, setLikeReactions] = useState<API.PageResponseDataReactionInfo>();
  const [disLikeReactions, setDisLikeReactions] = useState<API.PageResponseDataReactionInfo>();

  const handleReload = () => {
    if (setIsReload !== undefined) {
      setIsReload(!isReload);
    }
  };
  useEffect(() => {
    setDisLike(isDisLike);
    setLike(isLike);
    setActionState(action);
  }, [isLike, isDisLike, action]);

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
            <div className="actions">
              <div
                className="icon"
                onClick={() => {
                  if (postId) {
                    if (actionState === 1 && like) {
                      deleteModel1({ id: postId }).then((res) => {
                        if (res.code === 0) {
                          setLike(false);
                          setActionState(0);
                        }
                      });
                    } else {
                      createModel1({ postId: postId, reactionType: 'LIKE' }).then((res) => {
                        if (res.code === 0) {
                          setLike(true);
                          setDisLike(false);
                          setActionState(1);
                        }
                      });
                    }
                  }
                }}
                onMouseEnter={() => {
                  if (postId) {
                    getInfoListWithFilterPaging1({
                      postId: postId,
                      reactionType: 'LIKE',
                      page: 0,
                      size: PAGE_SIZE,
                    }).then((res) => {
                      setLikeReactions(res.data);
                    });
                  }
                }}
              >
                <Tooltip
                  title={
                    <div className="container-vertical">
                      {likeReactions?.data && likeReactions?.data.length > 0 ? (
                        <>
                          {likeReactions?.data?.map((like) => {
                            return (
                              <div style={{ display: 'flex', alignItems: 'center' }}>
                                {`${like.firstName} ${like.lastName}`}
                              </div>
                            );
                          })}
                          {(likeReactions?.totalPage || 0) > 1 ? (
                            <div style={{ display: 'flex', alignItems: 'center' }}>{`${
                              (likeReactions?.total || 0) - (likeReactions?.pageSize || 0)
                            } người khác`}</div>
                          ) : (
                            ''
                          )}
                        </>
                      ) : (
                        'Thích'
                      )}
                    </div>
                  }
                >
                  <LikeOutlined style={{ color: like ? '#1890ff' : '' }} />
                </Tooltip>
                <div className="total-reaction">{totalLike}</div>
              </div>
              <div
                className="icon"
                onClick={() => {
                  if (postId) {
                    if (actionState === 2 && dislike) {
                      deleteModel1({ id: postId }).then((res) => {
                        if (res.code === 0) {
                          setDisLike(false);
                          setActionState(0);
                        }
                      });
                    } else {
                      createModel1({ postId: postId, reactionType: 'DISLIKE' }).then((res) => {
                        if (res.code === 0) {
                          setDisLike(true);
                          setLike(false);
                          setActionState(2);
                        }
                      });
                    }
                  }
                }}
                onMouseEnter={() => {
                  if (postId) {
                    getInfoListWithFilterPaging1({
                      postId: postId,
                      reactionType: 'DISLIKE',
                      page: 0,
                      size: PAGE_SIZE,
                    }).then((res) => {
                      setDisLikeReactions(res.data);
                    });
                  }
                }}
              >
                <Tooltip
                  title={
                    <div className="container-vertical">
                      {disLikeReactions?.data && disLikeReactions?.data.length > 0 ? (
                        <>
                          {disLikeReactions?.data?.map((like) => {
                            return (
                              <div style={{ display: 'flex', alignItems: 'center' }}>
                                {`${like.firstName} ${like.lastName}`}
                              </div>
                            );
                          })}
                          {(disLikeReactions?.totalPage || 0) > 1 ? (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              {`và ${
                                (disLikeReactions?.total || 0) - (disLikeReactions?.pageSize || 0)
                              } người khác...`}
                            </div>
                          ) : (
                            ''
                          )}
                        </>
                      ) : (
                        'Không thích'
                      )}
                    </div>
                  }
                >
                  <DislikeOutlined style={{ color: dislike ? '#1890ff' : '' }} />
                </Tooltip>
                <div className="total-reaction">{totalDisLike}</div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

const DetailPostMemo = memo(DetailPost);

export default DetailPost;
