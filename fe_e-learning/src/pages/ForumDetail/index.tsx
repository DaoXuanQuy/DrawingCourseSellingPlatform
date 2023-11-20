import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import { getInfoListWithFilterPaging } from '@/services/api/PORTALForumTopicController';
import { WechatOutlined } from '@ant-design/icons';
import { history, useParams } from '@umijs/max';
import { Empty, Pagination, PaginationProps, Spin } from 'antd';
import { useEffect, useState } from 'react';
import './index.less';
import Topic from './Topic';

const PAGE_SIZE = 10;
export default (): JSX.Element => {
  const { categoryId } = useParams();

  const [topic, setTopic] = useState<API.PageResponseDataTopicInfo>({});
  const [current, setCurrent] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (categoryId) {
      setIsLoading(true);
      getInfoListWithFilterPaging({
        categoryId: categoryId,
        page: current - 1,
        size: PAGE_SIZE,
      })
        .then((res) => {
          setTopic(res.data || {});
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

  const onChange: PaginationProps['onChange'] = (page) => {
    setCurrent(page);
  };
  return (
    <Spin spinning={isLoading} wrapperClassName="spin-container">
      <div className="container-vertical" style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
                path: '',
                name: 'Topics',
              },
            ]}
          />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: '14px',
              gap: '8px',
              cursor: 'pointer',
            }}
            onClick={() => history.push(`/forums/${categoryId}/create`)}
          >
            <div style={{ fontSize: '26px' }}>
              <WechatOutlined />
            </div>
            <div>Tạo bài viết</div>
          </div>
        </div>
        {topic.data && topic.data?.length > 0 ? (
          <>
            <div style={{ flex: 1 }}>
              <div>
                {topic.data?.map((data) => {
                  return (
                    <Topic
                      title={data.title}
                      topicId={data.id}
                      avatar={data.user?.avatar}
                      date={data.createDate}
                      name={data.user?.firstName + ' ' + data.user?.lastName}
                      categoryId={categoryId}
                    />
                  );
                })}
              </div>
            </div>
            <div style={{ alignSelf: 'end' }}>
              <Pagination
                current={current}
                onChange={onChange}
                total={topic.total}
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
