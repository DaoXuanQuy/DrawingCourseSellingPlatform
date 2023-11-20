import { setDiscountPercentage } from '@/services/api/CourseController';
import { Button, InputNumber, message, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { BiSolidDiscount } from 'react-icons/bi';
import './index.less';

interface Props {
  course: API.CourseDto;
  setIsOpen?: (isOpen: boolean) => void;
  isOpen?: boolean;
  isReload?: boolean;
  setIsReload?: (reload: boolean) => void;
}

export default (props: Props): JSX.Element => {
  const { setIsOpen, isOpen, course, isReload, setIsReload } = props;

  const [discount, setDiscount] = useState(0);
  useEffect(() => {
    if (course.discountPercentage) {
      setDiscount(course.discountPercentage);
    }
  }, [course]);
  return (
    <div className={'discount'}>
      <Modal
        wrapClassName="modal-withdraw "
        centered={true}
        title={
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div>
                <BiSolidDiscount
                  style={{ height: 'auto', fontSize: '20px', verticalAlign: 'middle' }}
                />
              </div>
              <div>Giảm giá</div>
            </div>
          </>
        }
        onCancel={() => {
          if (setIsOpen !== undefined) {
            setIsOpen(false);
          }
        }}
        onOk={() => {
          if (setIsOpen !== undefined) {
            setIsOpen(false);
          }
        }}
        closable={false}
        open={isOpen}
        footer={[
          <Button
            loading={false}
            className="footer-button"
            onClick={() => {
              if (course.id) {
                setDiscountPercentage({ courseId: course.id, discountPercentage: discount }).then(
                  (res) => {
                    if (res.code === 0) {
                      message.success('Cài đặt giảm giá thành công.', 3);
                      if (setIsOpen !== undefined) {
                        setIsOpen(false);
                      }
                      if (setIsReload !== undefined) {
                        setIsReload(!isReload);
                      }
                    } else {
                      message.error(res.message, 3);
                    }
                  },
                );
              }
            }}
          >
            Xác nhận
          </Button>,
        ]}
      >
        <div className="container-vertical">
          <div className="form-withdraw">
            <InputNumber
              onChange={(e) => {
                setDiscount(e || 0);
              }}
              min={0}
              prefix={
                <BiSolidDiscount
                  style={{ height: 'auto', fontSize: '20px', verticalAlign: 'middle' }}
                />
              }
              width={'100%'}
              value={discount}
              placeholder="Giảm giá (%)"
              max={100}
            />
          </div>
          <div>Thành tiền: {(course?.price || 0) * (1 - discount / 100)}</div>
        </div>
      </Modal>
    </div>
  );
};
