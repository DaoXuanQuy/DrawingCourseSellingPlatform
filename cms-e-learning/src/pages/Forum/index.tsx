import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import { getInfoListWithFilter } from '@/services/api/PORTALForumCategoryController';
import { history } from '@umijs/max';
import { Collapse, Divider } from 'antd';
import { useEffect, useState } from 'react';
import { MdOutlineForum } from 'react-icons/md';
import './index.less';

const { Panel } = Collapse;

export default (): JSX.Element => {
  const [categoriesRoot, setCategoriesRoot] = useState<API.CategoryInfo[]>([]);
  const [categories, setCategories] = useState<API.CategoryInfo[]>([]);

  useEffect(() => {
    getInfoListWithFilter().then((res) => {
      const root: API.CategoryInfo[] = [];
      const child: API.CategoryInfo[] = [];
      res.data?.data?.forEach((data) => {
        if (data.parentId) {
          child.push(data);
        } else {
          root.push(data);
        }
      });
      setCategoriesRoot(root);
      setCategories(child);
    });
  }, []);

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <BreadcrumbCustom
          subNav={[
            {
              name: 'Trang chủ',
              path: '/',
            },
            {
              path: '',
              name: 'Diễn đàn',
            },
          ]}
        />
      </div>
      <div className="container-vertical">
        {categoriesRoot?.map((root) => {
          const childs: API.CategoryInfo[] = categories?.filter(
            (data) => data.parentId === root.id,
          );
          return (
            <Collapse
              defaultActiveKey={['1']}
              collapsible="icon"
              expandIcon={() => <></>}
              className="category"
            >
              <Panel header={root?.title} key="1">
                {childs.map((child) => {
                  return (
                    <>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <div
                          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                          onClick={() => {
                            history.push(`/forums/categories/${child.id}`);
                          }}
                        >
                          <div style={{ fontSize: '30px' }}>
                            <MdOutlineForum />
                          </div>
                          <div style={{ cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>
                            {child.title}
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <div>
                            <span style={{ color: '#8f9193' }}>Topics:</span> {child.topic}
                          </div>
                          <div>
                            <span style={{ color: '#8f9193' }}>Messages:</span> {child.post}
                          </div>
                          <div></div>
                        </div>
                      </div>
                      <Divider style={{ margin: '0' }} />
                    </>
                  );
                })}
              </Panel>
            </Collapse>
          );
        })}
      </div>
    </>
  );
};
