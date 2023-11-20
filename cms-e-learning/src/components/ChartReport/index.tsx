import { Area } from '@ant-design/plots';
import React, { useEffect, useState } from 'react';

interface DataType {
  label: string;
  date: string;
  total: number;
}
interface Props {
  data?: DataType[];
}
const ChartReport: React.FC<Props> = ({ data }) => {
  const [dataChart, setDataChart] = useState<DataType[]>([]);

  useEffect(() => {
    setDataChart(data !== undefined ? data : []);
  }, [data]);
  const config = {
    data: dataChart,
    xField: 'date',
    yField: 'total',
    seriesField: 'label',
  };

  return <Area {...config} />;
};
export { DataType };
export default ChartReport;
