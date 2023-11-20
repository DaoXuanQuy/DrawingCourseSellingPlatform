import React from 'react';
import { Breadcrumb } from 'antd';
import { history } from '@umijs/max';

interface Route {
  name: string;
  path: string;
}
interface Props {
  subNav: Route[];
}
const BreadcrumbCustom: React.FC<Props> = ({ subNav }) => (
  <Breadcrumb style={{ marginBottom: 20 }}>
    {subNav.map((route) => {
      return (
        <Breadcrumb.Item
          onClick={() => {
            history.push(route.path);
          }}
        >
          {route.name}
        </Breadcrumb.Item>
      );
    })}
  </Breadcrumb>
);

export default BreadcrumbCustom;
