import { history } from '@umijs/max';
import { Breadcrumb, Modal, Skeleton } from 'antd';
import React from 'react';

interface Route {
  name: string;
  path: string;
  isConfirm?: boolean;
  title?: React.ReactNode;
  content?: React.ReactNode;
  onConfirm?: () => void;
}
interface Props {
  subNav: Route[];
  isLoading?: boolean;
}
const BreadcrumbCustom: React.FC<Props> = ({ subNav, isLoading }) => (
  <Breadcrumb style={{ marginBottom: 20 }}>
    {isLoading ? (
      <>
        <Skeleton.Input active={isLoading} size={'default'} block={false} />
      </>
    ) : (
      <>
        {subNav.map((route, index) => {
          return (
            <Breadcrumb.Item
              key={`${route}-${index}`}
              onClick={() => {
                if (route?.isConfirm) {
                  Modal.confirm({
                    title: route.title,
                    content: route.content,
                    okText: 'Xác nhận',
                    cancelText: 'Hủy',
                    onOk: () => {
                      if (route.onConfirm !== undefined) {
                        route.onConfirm();
                      }
                      history.push(route.path);
                    },
                  });
                } else {
                  if (route.path !== '') {
                    history.push(route.path);
                  }
                }
              }}
            >
              {route.name}
            </Breadcrumb.Item>
          );
        })}
      </>
    )}
  </Breadcrumb>
);

export default BreadcrumbCustom;
