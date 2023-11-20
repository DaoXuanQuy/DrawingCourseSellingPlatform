import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import { getDetailCourse } from '@/services/api/CourseController';
import { notifyVNPay } from '@/services/api/InvoiceController';
import { history, useParams, useSearchParams } from '@umijs/max';
import { Button, Result, Spin } from 'antd';
import React, { useEffect, useState } from 'react';

const PaymentVnPaySuccess: React.FC = () => {
  const [course, setCourse] = useState<API.CourseDto>({});
  const { courseId } = useParams();
  const location = history.location;
  const [search] = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (location?.state === undefined) {
      history.push('/welcome');
    } else {
      setIsLoading(true);
      getDetailCourse({ id: courseId || '' })
        .then((res) => {
          if (res.code === 0) {
            setCourse(res.data?.course || {});
          } else {
            history.push('/not-found');
          }
        })
        .finally(() => setIsLoading(false));
    }
  }, [courseId]);

  useEffect(() => {
    const vnp_Amount = search.get('vnp_Amount');
    const vnp_BankCode = search.get('vnp_BankCode');
    const vnp_BankTranNo = search.get('vnp_BankTranNo');
    const vnp_CardType = search.get('vnp_CardType');
    const vnp_OrderInfo = search.get('vnp_OrderInfo');
    const vnp_PayDate = search.get('vnp_PayDate');
    const vnp_ResponseCode = search.get('vnp_ResponseCode');
    const vnp_TmnCode = search.get('vnp_TmnCode');
    const vnp_TransactionNo = search.get('vnp_TransactionNo');
    const vnp_TransactionStatus = search.get('vnp_TransactionStatus');
    const vnp_TxnRef = search.get('vnp_TxnRef');
    const vnp_SecureHash = search.get('vnp_SecureHash');

    notifyVNPay({
      request: {
        vnp_Amount: vnp_Amount,
        vnp_BankCode: vnp_BankCode,
        vnp_BankTranNo: vnp_BankTranNo,
        vnp_CardType: vnp_CardType,
        vnp_OrderInfo: vnp_OrderInfo,
        vnp_PayDate: vnp_PayDate,
        vnp_ResponseCode: vnp_ResponseCode,
        vnp_TmnCode: vnp_TmnCode,
        vnp_TransactionNo: vnp_TransactionNo,
        vnp_TransactionStatus: vnp_TransactionStatus,
        vnp_TxnRef: vnp_TxnRef,
        vnp_SecureHash: vnp_SecureHash,
      },
    });
  });
  return (
    <div className="container-vertical" style={{ flex: 1 }}>
      <BreadcrumbCustom
        subNav={[
          { name: 'Trang chủ', path: '/' },
          { name: 'Thanh toán thành công', path: '' },
        ]}
      />
      <div
        style={{
          flex: 1,
          height: '100%',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Spin spinning={isLoading}>
          <Result
            style={{ flex: 1 }}
            status="success"
            title={`Thanh toán thành công khóa học: ${course.courseName}!`}
            // subTitle={`Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait.`}
            extra={[
              <Button
                type="primary"
                key="console"
                onClick={() => {
                  history.push('/welcome');
                }}
              >
                Trở về trang chủ
              </Button>,
            ]}
          />
        </Spin>
      </div>
    </div>
  );
};

export default PaymentVnPaySuccess;
