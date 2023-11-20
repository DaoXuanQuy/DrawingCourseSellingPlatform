import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import { PAGE_SIZE } from '@/constant';
import {
  checkBankAccount,
  getAllBanks,
  getLinkedAccount,
  linkBankAccount,
  unlinkBankAccount,
} from '@/services/api/BankAccountController';
import { teacherGetAllWithdrawInvoice } from '@/services/api/InvoiceController';
import { getBalance, withDraw } from '@/services/api/teacherController';
import { DollarOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  Divider,
  Empty,
  Input,
  InputNumber,
  message,
  Modal,
  Pagination,
  Row,
  Select,
  Spin,
} from 'antd';
import { PaginationProps } from 'antd/es/pagination';
import { useEffect, useState } from 'react';
import { FaMoneyBillAlt } from 'react-icons/fa';
import CardTransaction from './components/CardTransaction';
import './index.less';

export default (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpenDetail, setIsModalOpenDetail] = useState(false);
  const [banks, setBanks] = useState<API.BankResponse[]>([]);
  const [accountName, setAccountName] = useState<string>();
  const [accountNo, setAccountNo] = useState<string>();
  const [bin, setBin] = useState<string>();
  const [isLoadingLink, setIsLoadingLink] = useState(false);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [isReload, setIsReload] = useState(false);
  const [isReloadBalance, setIsReloadBalance] = useState(false);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [accountLinked, setAccountLinked] = useState<API.LinkedAccountResponse>();
  const [isLoadingWithdraw, setIsLoadingWithdraw] = useState(false);
  const [isOpenModalWithdraw, setIsOpenModalWithdraw] = useState(false);
  const [amountWithdraw, setAmountWithdraw] = useState<number | null>();
  const [withdrawList, setWithdrawList] = useState<API.WithdrawResponse[]>([]);
  const [paginate, setPaginate] = useState<API.Paginate>();
  const [current, setCurrent] = useState(1);

  const showModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    setIsLoading(true);
    getLinkedAccount()
      .then((res) => {
        if (res.data?.accountName && res.data.accountNo && res.data.bank)
          setAccountLinked(res.data);
      })
      .finally(() => setIsLoading(false));
    setIsLoading(true);
    teacherGetAllWithdrawInvoice({ page: current - 1, size: PAGE_SIZE })
      .then((res) => {
        if (res.code === 0) {
          setWithdrawList(res.data?.invoices || []);
          setPaginate(res.data?.paginate);
        }
      })
      .finally(() => setIsLoading(false));
  }, [isReload]);

  useEffect(() => {
    setIsLoading(true);
    getBalance()
      .then((res) => {
        if (res.code === 0) {
          setCurrentBalance(res.data?.balance || 0);
        }
      })
      .finally(() => setIsLoading(false));
  }, [isReloadBalance]);

  useEffect(() => {
    setIsLoading(true);
    teacherGetAllWithdrawInvoice({ page: current - 1, size: PAGE_SIZE })
      .then((res) => {
        if (res.code === 0) {
          setWithdrawList(res.data?.invoices || []);
          setPaginate(res.data?.paginate);
        }
      })
      .finally(() => setIsLoading(false));
  }, [current, isReloadBalance]);

  const onChange: PaginationProps['onChange'] = (page) => {
    console.log(page);
    setCurrent(page);
  };

  return (
    <Spin spinning={isLoading} wrapperClassName="spin-container">
      <div className="container-vertical" style={{ flex: 1 }}>
        <BreadcrumbCustom
          subNav={[
            {
              name: 'Trang chủ',
              path: '/',
            },
            {
              path: '',
              name: 'Quản lí số dư',
            },
          ]}
        />
        <div className="balance-container">
          <div className="card-balance">
            <Row gutter={24}>
              <Col
                xs={24}
                sm={24}
                md={24}
                lg={24}
                xl={6}
                xxl={5}
                className="card-bank"
                onClick={() => {
                  if (accountLinked === undefined) {
                    showModal();
                    getAllBanks({}).then((res) => {
                      if (res.code === 0) {
                        setBanks(res.data?.banks || []);
                      }
                    });
                  } else {
                    setIsModalOpenDetail(true);
                  }
                }}
              >
                {accountLinked ? (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'start',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      padding: '8px 16px',
                      width: '100%',
                    }}
                  >
                    <div
                      style={{
                        color: '#212633',
                        fontStyle: 'normal',
                        fontWeight: '500',
                        fontSize: '16px',
                        lineHeight: '20px',
                      }}
                    >
                      {accountLinked.accountName}
                    </div>
                    <div style={{ width: '100%' }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'start',
                          height: '100%',
                          gap: '6px',
                        }}
                      >
                        <div style={{ width: '24px' }}>
                          <img src={accountLinked.bank?.logo} alt="" />
                        </div>
                        <div
                          id="bank-name"
                          style={{
                            color: '#434A5E',
                            fontStyle: 'normal',
                            fontWeight: '400',
                            fontSize: '14px',
                            lineHeight: '20px',
                            overflow: 'hidden',
                          }}
                        >
                          <div
                            style={{
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {`${accountLinked.bank?.commonName} - ${accountLinked.bank?.name}`}
                          </div>
                          <div>{accountLinked.accountNo}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="add-bank-button">
                    <div className="icon-add">
                      <PlusOutlined />
                    </div>
                    <p>Liên kết TK ngân hàng</p>
                  </div>
                )}
              </Col>

              <Col xs={24} sm={24} md={24} lg={24} xl={6} xxl={6} className="account-blance">
                <div>
                  <div className="title">Số dư hiện có</div>
                  <div className="balance">{currentBalance.toLocaleString()} ₫</div>
                </div>
                <div className="button-payoo" onClick={() => setIsOpenModalWithdraw(true)}>
                  <div className="icon">
                    <FaMoneyBillAlt />
                  </div>
                  <div>Rút tiền</div>
                </div>
              </Col>
            </Row>
          </div>

          <div className="transactions">
            <div className="header">
              <div className="name">Lịch sử nhận - rút</div>
              {/* <div className="export">Xuất Excel</div> */}
            </div>
            {withdrawList?.length > 0 ? (
              <>
                <Row gutter={24}>
                  <Col xs={24} sm={18} md={16} lg={14} xl={10} xxl={6} className="container">
                    {withdrawList.map((data) => (
                      <CardTransaction withdraw={data} type="OUT" />
                    ))}
                  </Col>
                </Row>
                <div className="bottom">
                  <Pagination
                    pageSize={paginate?.pageSize || 0}
                    current={current}
                    defaultCurrent={1}
                    total={paginate?.total}
                    onChange={onChange}
                  />
                </div>
              </>
            ) : (
              <div style={{ padding: '40px' }}>
                <Empty description="Không có dữ liệu" />
              </div>
            )}
          </div>
        </div>
        {/**
         * modal them ngan hang
         */}
        <Modal
          wrapClassName="modal-bank"
          centered={true}
          title={
            <>
              <div>Thêm liên kết ngân hàng</div>
            </>
          }
          onCancel={() => setIsModalOpen(false)}
          onOk={() => setIsModalOpen(false)}
          open={isModalOpen}
          footer={[
            <Button
              loading={isLoadingLink}
              className="footer-button"
              onClick={() => {
                if (bin && accountNo) {
                  setIsLoadingLink(true);
                  linkBankAccount({
                    bin: bin,
                    accountNo: accountNo,
                    accountName: accountName,
                  })
                    .then((res) => {
                      if (res.code === 0) {
                        message.success('Liên kết tài khoản thành công', 3);
                        setIsModalOpen(false);
                        setIsReload(!isReload);
                      } else {
                        message.error('Liên kết tài khoản không thành công', 3);
                      }
                    })
                    .catch((e) => {
                      message.error('Liên kết tài khoản không thành công', 3);
                    })
                    .finally(() => setIsLoadingLink(false));
                }
              }}
            >
              Liên kết
            </Button>,
          ]}
        >
          <div className="form-add-bank">
            <div className="single-input">
              <Select
                showSearch
                placeholder="Chọn ngân hàng liên kết"
                optionFilterProp="children"
                filterOption={(input, option) => {
                  const elementBank = document.getElementById('bank-name');
                  const result =
                    elementBank?.innerText.toLowerCase().includes(input.toLowerCase()) || false;
                  console.log(result);

                  return result;
                }}
                options={banks?.map((bank) => {
                  return {
                    label: (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'start',
                          height: '100%',
                          gap: '6px',
                        }}
                      >
                        <div style={{ width: '24px' }}>
                          <img src={bank.logo} alt="" />
                        </div>
                        <div id="bank-name">{bank.commonName}</div>
                      </div>
                    ),
                    value: bank.benId,
                  };
                })}
                className="select-bank"
                onSelect={(e) => setBin(e)}
              />
            </div>
            <div className="single-input" style={{ position: 'relative' }}>
              <Input
                className="input-form-bank"
                placeholder="Số tài khoản"
                onChange={(e) => setAccountNo(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    if (accountNo && bin) {
                      setIsLoading(true);
                      checkBankAccount({ accountNo: accountNo, bin: bin })
                        .then((res) => {
                          if (res.code === 0) {
                            setAccountName(res.data?.bankAccountName);
                          }
                        })
                        .finally(() => setIsLoading(false));
                    }
                  }
                }}
              />
              <Button
                className="button-check"
                onClick={() => {
                  if (accountNo && bin) {
                    setIsLoading(true);
                    checkBankAccount({ accountNo: accountNo, bin: bin })
                      .then((res) => {
                        if (res.code === 0) {
                          setAccountName(res.data?.bankAccountName);
                        } else {
                          message.error('Số tài khoản không hơp lệ, vui lòng thử lại', 3);
                        }
                      })
                      .finally(() => setIsLoading(false));
                  }
                }}
                loading={isLoading}
              >
                Kiểm tra
              </Button>
            </div>
            <div className="single-input" style={{ position: 'relative' }}>
              <Input
                className={`input-form-bank ${accountName ? 'check-success' : ''}`}
                placeholder="Tên tài khoản"
                value={accountName}
                disabled={accountName !== undefined}
              />
              {accountName ? <span className="label-account">Tên tài khoản</span> : <></>}
            </div>
          </div>
        </Modal>

        {/**
         * modal chi tiết tài khoản nhận tiền
         */}
        <Modal
          wrapClassName="modal-bank-detail"
          centered={true}
          title={
            <>
              <div>Chi tiết tài khoản nhận tiền</div>
            </>
          }
          onCancel={() => setIsModalOpenDetail(false)}
          onOk={() => setIsModalOpenDetail(false)}
          open={isModalOpenDetail}
          footer={[
            <Button
              loading={isLoadingDetail}
              className="footer-button"
              onClick={() => {
                setIsLoadingDetail(true);
                unlinkBankAccount({
                  bin: accountLinked?.bank?.benId,
                  accountName: accountLinked?.accountName,
                  accountNo: accountLinked?.accountNo,
                })
                  .then((res) => {
                    if (res.code === 0) {
                      setAccountLinked(undefined);
                      setIsModalOpenDetail(false);
                      message.success('Hủy liên kết tài khoản thành công', 3);
                    }
                  })
                  .finally(() => {
                    setIsLoadingDetail(false);
                  });
              }}
            >
              Hủy Liên kết
            </Button>,
          ]}
        >
          <div className="form-add-bank">
            <div className="content">
              <div className="label">Số tài khoản</div>
              <div className="value">{accountLinked?.accountNo}</div>
            </div>
            <Divider />
            <div className="content">
              <div className="label">Tên tài khoản</div>
              <div className="value">{accountLinked?.accountName}</div>
            </div>
            <Divider />
            <div className="content">
              <div className="label">Ngân hàng</div>
              <div className="value">{accountLinked?.bank?.name}</div>
            </div>
          </div>
        </Modal>

        {/**
         * modal rút tiền
         */}
        <Modal
          wrapClassName="modal-withdraw"
          centered={true}
          title={
            <>
              <div>Rút tiền vào tài khoản</div>
            </>
          }
          onCancel={() => {
            setIsOpenModalWithdraw(false);
            setAmountWithdraw(null);
          }}
          onOk={() => {
            setIsOpenModalWithdraw(false);
            setAmountWithdraw(null);
          }}
          closable={false}
          open={isOpenModalWithdraw}
          footer={[
            <Button
              loading={isLoadingWithdraw}
              className="footer-button"
              onClick={() => {
                setIsLoadingWithdraw(true);
                if (amountWithdraw != null) {
                  withDraw({
                    amount: amountWithdraw,
                  })
                    .then((res) => {
                      if (res.code === 0) {
                        setIsOpenModalWithdraw(false);
                        setAmountWithdraw(null);
                        setIsReloadBalance(!isReloadBalance);
                        message.success('Rút tiền vào tài khoản thành công', 3);
                      } else {
                        message.error(res.message, 3);
                      }
                    })
                    .finally(() => {
                      setIsLoadingWithdraw(false);
                    });
                }
              }}
            >
              Rút Tiền
            </Button>,
          ]}
        >
          <div className="form-withdraw">
            <InputNumber
              onChange={(e) => {
                setAmountWithdraw(e);
              }}
              min={0}
              prefix={<DollarOutlined style={{ fontSize: '20px' }} />}
              width={'100%'}
              value={amountWithdraw}
              placeholder="Số tiền cần rút"
            />
          </div>
        </Modal>
      </div>
    </Spin>
  );
};
