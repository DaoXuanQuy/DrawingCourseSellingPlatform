import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import CardReport from '@/components/CardReport';
import ChartReport, { DataType } from '@/components/ChartReport';
import { teacherGetCardsInfo, teacherGetStatistic } from '@/services/api/StatisticController';
import { Col, DatePicker, Divider, Row } from 'antd';
import { useEffect, useState } from 'react';
import './index.less';

const { RangePicker } = DatePicker;
const Dashboard: React.FC = () => {
  const [cardReport, setCardReport] = useState<API.TeacherGetCardsInfoResponse>();
  const [dataChart, setDataChart] = useState<DataType[]>([]);
  const [filter, setFilter] = useState<[string, string] | [undefined, undefined]>([
    undefined,
    undefined,
  ]);

  useEffect(() => {
    teacherGetCardsInfo({}).then((res) => {
      if (res.code === 0) {
        setCardReport(res.data);
      }
    });
    teacherGetStatistic({ fromDate: filter[0], toDate: filter[1] }).then((res) => {
      if (res.code === 0) {
        if (res.data?.statistics && res.data?.statistics?.length > 0) {
          let dataTmp: DataType[] = [];
          res.data?.statistics?.forEach((data) => {
            dataTmp.push({ label: 'Doanh thu', date: data.date || '', total: data.revenue || 0 });
          });
          setDataChart(dataTmp);
        }
      }
    });
  }, [filter]);
  return (
    <>
      <BreadcrumbCustom
        subNav={[
          {
            name: 'Trang chủ',
            path: '/',
          },
          {
            name: 'Thống kê',
            path: '',
          },
        ]}
      />
      <div style={{ margin: '0 40px' }}>
        <Divider />
        <Row gutter={[16, 16]}>
          <Col span={6} className="dashboard-l2">
            <CardReport name="Khóa học" color="#5F87ED" total={cardReport?.totalCourses || 0} />
          </Col>
          <Col span={6} className="dashboard-l2">
            <CardReport name="Học sinh" color="#4BCEAF" total={cardReport?.totalStudents || 0} />
          </Col>
          <Col span={6} className="dashboard-l2">
            <CardReport
              name="Giao dịch"
              color="#F1637E"
              total={cardReport?.totalSuccessInvoices || 0}
            />
          </Col>
          <Col span={6} className="dashboard-l2">
            <CardReport name="Doanh thu" color="#FFAD1E" total={cardReport?.balance || 0} />
          </Col>
        </Row>
        <Divider />

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
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <ChartReport data={dataChart} />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default Dashboard;
