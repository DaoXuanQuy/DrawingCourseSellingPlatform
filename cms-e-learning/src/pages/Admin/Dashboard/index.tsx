import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import CardReport from '@/components/CardReport';
import ChartReport, { DataType } from '@/components/ChartReport';
import { cmsGetCardsInfo, cmsGetStatistic } from '@/services/api/StatisticController';
import { Col, DatePicker, Divider, Row, Tabs } from 'antd';
import { useEffect, useState } from 'react';
import './index.less';

const { RangePicker } = DatePicker;
const Dashboard: React.FC = () => {
  const [cardReport, setCardReport] = useState<API.CmsGetCardsInfoResponse>();
  const [dataChart, setDataChart] = useState<DataType[]>([]);
  const [tab, setTab] = useState('all');
  const [filter, setFilter] = useState<[string, string] | [undefined, undefined]>([
    undefined,
    undefined,
  ]);

  useEffect(() => {
    cmsGetCardsInfo({}).then((res) => {
      if (res.code === 0) {
        setCardReport(res.data);
      }
    });
  }, [filter]);

  useEffect(() => {
    cmsGetStatistic({}).then((res) => {
      if (res.code === 0) {
        if (res.data?.statistics && res.data?.statistics?.length > 0) {
          let dataTmp: DataType[] = [];
          res.data?.statistics?.forEach((data) => {
            if (tab === 'all') {
              dataTmp.push({
                label: 'Khóa học',
                date: data.date || '',
                total: data.countCourses || 0,
              });
              dataTmp.push({
                label: 'Người dùng',
                date: data.date || '',
                total: data.countUsers || 0,
              });
            } else if (tab === 'course') {
              dataTmp.push({
                label: 'Khóa học',
                date: data.date || '',
                total: data.countCourses || 0,
              });
            } else if (tab === 'user') {
              dataTmp.push({
                label: 'Người dùng',
                date: data.date || '',
                total: data.countUsers || 0,
              });
            }
          });
          setDataChart(dataTmp);
        }
      }
    });
  }, [filter, tab]);

  return (
    <>
      <BreadcrumbCustom
        subNav={[
          {
            name: 'Trang chủ',
            path: '',
          },
        ]}
      />
      <div style={{ margin: '0 40px' }}>
        <Row gutter={[16, 16]} style={{ margin: '10px 0' }}>
          <Col span={8}>
            <RangePicker
              style={{ borderRadius: '6px' }}
              placeholder={['Từ ngày', 'Đến ngày']}
              onChange={(_, dataString) => {
                setFilter(dataString);
              }}
            />
          </Col>
          {/* <Col span={4}>
            <Button type="primary" icon={<SearchOutlined />} style={{ borderRadius: '6px' }}>
              Tìm kiếm
            </Button>
          </Col> */}
        </Row>

        <Divider />
        <Row gutter={[16, 16]}>
          <Col span={6} className="dashboard-l2">
            <CardReport name="Học sinh" color="#5F87ED" total={cardReport?.totalUsers || 0} />
          </Col>
          <Col span={6} className="dashboard-l2">
            <CardReport name="Giáo viên" color="#4BCEAF" total={cardReport?.totalTeacher || 0} />
          </Col>
          <Col span={6} className="dashboard-l2">
            <CardReport name="Khóa học" color="#F1637E" total={cardReport?.totalCourses || 0} />
          </Col>
          <Col span={6} className="dashboard-l2">
            <CardReport
              name="Giao dịch"
              color="#FFAD1E"
              total={cardReport?.totalSuccessInvoices || 0}
            />
          </Col>
        </Row>
        <Divider />

        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Tabs
              defaultActiveKey="1"
              type="card"
              size="small"
              items={[
                {
                  key: 'all',
                  label: 'Tất cả',
                  children: (
                    <Row gutter={[16, 16]}>
                      <Col span={24}>
                        <ChartReport data={dataChart} />
                      </Col>
                    </Row>
                  ),
                },
                {
                  key: 'course',
                  label: 'Khóa học',
                  children: (
                    <Row gutter={[16, 16]}>
                      <Col span={24}>
                        <ChartReport data={dataChart} />
                      </Col>
                    </Row>
                  ),
                },
                {
                  key: 'user',
                  label: 'Người dùng',
                  children: (
                    <Row gutter={[16, 16]}>
                      <Col span={24}>
                        <ChartReport data={dataChart} />
                      </Col>
                    </Row>
                  ),
                },
              ]}
              onChange={(e) => {
                setTab(e);
              }}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};
export default Dashboard;
