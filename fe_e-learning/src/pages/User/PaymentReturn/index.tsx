import { history } from '@umijs/max';
// import { savePaymentVnPay } from '@/services/api/TransactionController';
import { useEffect } from 'react';

const PaymentReturn: React.FC = () => {
  const locaction = history.location;
  const vnp_Amount = new URLSearchParams(locaction.search).get('vnp_Amount');
  const vnp_BankCode = new URLSearchParams(locaction.search).get('vnp_BankCode');
  const vnp_BankTranNo = new URLSearchParams(locaction.search).get('vnp_BankTranNo');
  const vnp_CardType = new URLSearchParams(locaction.search).get('vnp_CardType');
  const vnp_OrderInfo = new URLSearchParams(locaction.search).get('vnp_OrderInfo');
  const vnp_PayDate = new URLSearchParams(locaction.search).get('vnp_PayDate');
  const vnp_ResponseCode = new URLSearchParams(locaction.search).get('vnp_ResponseCode');
  const vnp_TmnCode = new URLSearchParams(locaction.search).get('vnp_TmnCode');
  const vnp_TransactionNo = new URLSearchParams(locaction.search).get('vnp_TransactionNo');
  const vnp_TransactionStatus = new URLSearchParams(locaction.search).get('vnp_TransactionStatus');
  const vnp_TxnRef = new URLSearchParams(locaction.search).get('vnp_TxnRef');
  const vnp_SecureHash = new URLSearchParams(locaction.search).get('vnp_SecureHash');

  const courseId = vnp_OrderInfo?.split('|')[1];

  // useEffect(() => {
  //   if (vnp_TransactionStatus === '00') {
  //     savePaymentVnPay({
  //       vnp_Amount: vnp_Amount || '',
  //       vnp_BankCode: vnp_BankCode || '',
  //       vnp_BankTranNo: vnp_BankTranNo || '',
  //       vnp_CardType: vnp_CardType || '',
  //       vnp_OrderInfo: vnp_OrderInfo || '',
  //       vnp_PayDate: vnp_PayDate || '',
  //       vnp_ResponseCode: vnp_ResponseCode || '',
  //       vnp_SecureHash: vnp_SecureHash || '',
  //       vnp_TmnCode: vnp_TmnCode || '',
  //       vnp_TransactionNo: vnp_TransactionNo || '',
  //       vnp_TransactionStatus: vnp_TransactionStatus || '',
  //       vnp_TxnRef: vnp_TxnRef || '',
  //     }).then((res) => {
  //       if (res.code === 0) {
  //         history.push(`/courses/register/payment/success/${courseId}`, {
  //           status: 'success',
  //         });
  //       } else {
  //         history.push(`/courses/register/payment/error/${courseId}`, {
  //           status: 'error',
  //         });
  //       }
  //     });
  //   }
  // }, [locaction]);
  return <></>;
};

export default PaymentReturn;
