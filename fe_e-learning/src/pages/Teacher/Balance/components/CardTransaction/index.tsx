import { WITHDRAW_STATUS } from '@/constant';
import { Divider, Tag } from 'antd';
import moment from 'moment';
import './index.less';

interface Props {
  withdraw: API.WithdrawResponse;
  type: 'IN' | 'OUT';
}

export default (props: Props): JSX.Element => {
  const { withdraw, type } = props;
  return (
    <>
      <div className="card-transaction">
        <div className="content">
          <div>
            <img
              src={type === 'IN' ? '/icons/transaction-in.svg' : '/icons/transaction-out.svg'}
              alt=""
            />
          </div>
          <div>
            <div className="title">Nội dung giao dịch</div>
            <div className="date">{moment(withdraw.time).format('HH:MM:SS DD/MM/YYYY')}</div>
            <div className="trans-no">Mã giao dịch: {withdraw.txnNumber}</div>
          </div>
        </div>
        <div className="info-amount">
          <div className={type === 'IN' ? 'amount-in' : 'amount-out'}>
            {type === 'IN'
              ? `+ ${withdraw.amount?.toLocaleString()} ₫`
              : `- ${withdraw.amount?.toLocaleString()} ₫`}
          </div>
          <div className="status">
            <Tag color={WITHDRAW_STATUS[`${withdraw.status}`].color}>
              {WITHDRAW_STATUS[`${withdraw.status}`].label}
            </Tag>
          </div>
        </div>
      </div>
      <Divider style={{ margin: 0 }} />
    </>
  );
};
