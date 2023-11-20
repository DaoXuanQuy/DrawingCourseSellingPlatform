import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import { PAGE_SIZE } from '@/constant';
import {
  createModel2,
  getInfoListWithFilterPaging2,
} from '@/services/api/PORTALForumPostController';
import { getDetailById } from '@/services/api/PORTALForumTopicController';
import { ClockCircleOutlined, UserOutlined } from '@ant-design/icons';
import { useParams } from '@umijs/max';
import { Divider, Empty, Pagination, PaginationProps, Spin } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import CommentPost from './CommentPost';
import DetailPost from './DetailPost';
import './index.less';

export default (): JSX.Element => {
  const [current, setCurrent] = useState(1);
  const { topicId, categoryId } = useParams();
  const [topic, setTopic] = useState<API.TopicInfo>({});
  const [post, setPost] = useState<API.PageResponseDataPostInfo>({});
  const [isReload, setIsReload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (topicId) {
      setIsLoading(true);
      getInfoListWithFilterPaging2({
        topicId: Number(topicId),
        page: current - 1,
        size: PAGE_SIZE,
      })
        .then((res) => {
          setPost(res.data || {});
        })
        .finally(() => setIsLoading(false));
    }
  }, [current, topicId, isReload]);
  useEffect(() => {
    if (topicId) {
      getDetailById({ id: topicId }).then((res) => {
        setTopic(res.data || {});
      });
    }
  }, [topicId]);

  const onChange: PaginationProps['onChange'] = (page) => {
    setCurrent(page);
  };
  return (
    <Spin spinning={isLoading} wrapperClassName="spin-container">
      <div className="container-vertical" style={{ flex: 1 }}>
        <BreadcrumbCustom
          subNav={[
            {
              name: 'Trang chủ',
              path: '/',
            },
            {
              path: '/forums',
              name: 'Diễn đàn',
            },
            {
              path: `/forums/${categoryId}`,
              name: 'Topics',
            },
            {
              path: ``,
              name: 'Bài viết ',
            },
          ]}
        />
        <div className="container-vertical">
          <div style={{ color: '#23497c', fontSize: '20px', fontWeight: 'bold' }}>
            {topic.title || '--'}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div>
                <UserOutlined />
              </div>
              <div>{topic.user?.firstName + ' ' + topic.user?.lastName}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div>
                <ClockCircleOutlined />
              </div>
              <div>
                {topic.createDate ? moment(topic.createDate).format('HH:mm:ss DD/MM/YYYY') : '--'}
              </div>
            </div>
          </div>
        </div>
        <Divider style={{ margin: '8px 0' }} />
        {post.data && post.data?.length > 0 ? (
          <>
            <div style={{ flex: 1 }} className="container-vertical">
              {post.data
                ?.sort((o1, o2) => (o1?.ordinal || 0) - (o2?.ordinal || 0))
                .map((data) => {
                  return (
                    <>
                      <DetailPost
                        postId={data.id}
                        avatar={data.user?.avatar}
                        lastName={data.user?.lastName}
                        firstName={data.user?.firstName}
                        content={data.content}
                        action={data.currentUserReactionType}
                        isDisLike={data.currentUserReactionType === 2}
                        isLike={data.currentUserReactionType === 1}
                        isReload={isReload}
                        setIsReload={setIsReload}
                        totalLike={data.like}
                        totalDisLike={data.dislike}
                      />
                    </>
                  );
                })}
            </div>
            <div>
              <CommentPost
                onComment={(e) => {
                  return new Promise((resolve, reject) => {
                    if (topicId) {
                      createModel2({ topicId: Number(topicId), content: e }).then((res) => {
                        if (res.code === 0) {
                          setIsReload(!isReload);
                          resolve();
                        }
                      });
                    }
                  });
                }}
              />
            </div>
            <div style={{ alignSelf: 'end' }}>
              <Pagination
                current={current}
                onChange={onChange}
                total={post.total}
                pageSize={PAGE_SIZE}
              />
            </div>
          </>
        ) : (
          <Empty description="Không có dữ liệu" />
        )}
      </div>
    </Spin>
  );
};
