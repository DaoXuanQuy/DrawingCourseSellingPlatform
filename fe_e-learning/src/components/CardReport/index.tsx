import './index.less';

interface Props {
  name: string;
  total: number;
  color: string;
}
const CardReport: React.FC<Props> = ({ name, total, color }) => {
  return (
    <div className="report-container">
      <div className="report-body">
        <div className="report-content">
          <p className="heading">{name}</p>
          <p className="total" style={{ color: color }}>
            {total}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardReport;
