import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import { GET_IMAGE, STATUS_EKYC } from '@/constant';
import {
  getAllProvincesV2,
  getDistrictsByProvinceV2,
  getWardsByDistrictV2,
} from '@/services/api/AddressController';
import { detectIdCard, updateEkyc as callUpdateEkyc } from '@/services/api/ekycController';
import { createRequestRoleTeacher, getTeacherInfo } from '@/services/api/teacherController';
import { getInfo } from '@/services/api/UserController';
import { Button, Card, Col, Image, message, Row, Tag, UploadFile } from 'antd';
import { useEffect, useState } from 'react';
import EkycItem from './components/ekycItem';
import ImageCard from './components/image/ImageCard';
import './index.less';

const Identification: React.FC = () => {
  const [imageFront, setImageFront] = useState<UploadFile[]>([]);
  const [imageBack, setImageBack] = useState<UploadFile[]>([]);
  const [ekyc, setEkyc] = useState<API.EkycDTO>();
  const [currentUser, setUserCurrent] = useState<API.UserResponse>();
  const [loading, setLoading] = useState(false);
  const [isReload, setIsReload] = useState(false);
  const [isEdit, setIsEdit] = useState({
    fullname: false,
    birthday: false,
    gender: false,
    province: false,
    district: false,
    ward: false,
    address: false,
    hometown: false,
    national: false,
    cardNo: false,
    issueBy: false,
    issueDate: false,
  });
  const [provinces, setProvinces] = useState<API.ProvinceModel[] | []>();
  const [districts, setDistricts] = useState<API.DistrictModel[] | []>();
  const [wards, setWards] = useState<API.WardModel[] | []>();
  const [updateEkyc, setUpdateEkyc] = useState<API.UpdateEkycRequest>();
  const [hasEdit, setHasEdit] = useState<boolean>(false);
  const [teacherInfo, setTeacherInfo] = useState<API.TeacherDto>();

  useEffect(() => {
    getInfo().then((res) => {
      if (res.code === 0) {
        setUserCurrent(res.data);
      }
    });
    getTeacherInfo().then((res) => {
      if (res.code === 0 && res.data) {
        setTeacherInfo(res.data.teacher);
        setEkyc(res.data.teacher?.ekyc);
        let updateEkyc: API.UpdateEkycRequest = res.data?.teacher?.ekyc as API.UpdateEkycRequest;
        setUpdateEkyc({
          ...updateEkyc,
          fullName: res.data?.teacher?.ekyc?.name,
          gender: res.data?.teacher?.ekyc?.sex,
          cardNo: res.data?.teacher?.ekyc?.no,
          ekycId: res.data?.teacher?.ekyc?.id,
        });
        if (res.data.teacher?.ekyc) {
          setImageBack([
            {
              uid: '-1',
              name: 'image.png',
              url: GET_IMAGE.getUrl(res.data.teacher.ekyc.backUrl),
            },
          ]);
          setImageFront([
            {
              uid: '-1',
              name: 'image.png',
              url: GET_IMAGE.getUrl(res.data.teacher.ekyc.frontUrl),
            },
          ]);
        }
      }
    });
    getAllProvincesV2().then((res) => {
      if (res.code === 0) {
        setProvinces(res.data?.provinces || []);
      } else {
        console.error(res.message, 3);
      }
    });
  }, [isReload]);
  return (
    <>
      <BreadcrumbCustom
        subNav={[
          {
            name: 'Trang chủ',
            path: '/',
          },
          {
            path: '',
            name: 'Định danh giáo viên',
          },
        ]}
      />

      <Card
        type="inner"
        title={<div className="title-card">Thông tin cá nhân</div>}
        style={{ borderRadius: 8 }}
        className="card-ekyc"
      >
        <div
          className="custom-center"
          style={{ flexDirection: 'column', justifyContent: 'start ' }}
        >
          <Card
            type="inner"
            title={<div className="title-card">Hình ảnh</div>}
            style={{ borderRadius: 8 }}
            className="card-ekyc"
          >
            <div className="custom-center">
              {teacherInfo === undefined ||
              teacherInfo?.status === 'REJECTED' ||
              teacherInfo?.status === 'CREATE' ? (
                <>
                  <ImageCard fileList={imageFront} setFileList={setImageFront} />
                  <ImageCard fileList={imageBack} setFileList={setImageBack} />{' '}
                </>
              ) : (
                <>
                  <Image width={240} height={240} src={GET_IMAGE.getUrl(ekyc?.frontUrl)} />
                  <Image width={240} height={240} src={GET_IMAGE.getUrl(ekyc?.backUrl)} />
                </>
              )}
            </div>
            <Button
              loading={loading}
              disabled={teacherInfo !== undefined && !(teacherInfo?.status === 'REJECTED')}
              onClick={() => {
                setLoading(true);
                if (imageFront.length < 1 || imageBack.length < 1) {
                  message.warning('Tải đủ ảnh để định danh');
                  return;
                }
                detectIdCard(
                  { imageBack: '', imageFront: '' },
                  imageFront[0].originFileObj as File,
                  imageBack[0].originFileObj as File,
                ).then((res) => {
                  setLoading(false);
                  if (res.code === 0) {
                    setIsReload(!isReload);
                    setEkyc(res.data?.idCard);
                    let updateEkyc: API.UpdateEkycRequest = res.data
                      ?.idCard as API.UpdateEkycRequest;
                    setUpdateEkyc({
                      ...updateEkyc,
                      fullName: res.data?.idCard?.name,
                      gender: res.data?.idCard?.sex,
                      cardNo: res.data?.idCard?.no,
                      ekycId: res.data?.idCard?.id,
                    });
                    message.success('Cập nhật ảnh thành công', 3);
                  } else {
                    message.error('Cập nhật ảnh thất bại', 3);
                  }
                });
              }}
              style={{ marginTop: 12, float: 'right' }}
              type="primary"
            >
              Xác thực OCR
            </Button>
          </Card>
        </div>

        <div className="custome-info-ekyc" style={{ width: '100% !important', display: 'block' }}>
          <Card
            type="inner"
            title={<div className="title-card">Kết quả</div>}
            style={{ borderRadius: 8, marginTop: 16, width: '100% !important', display: 'block' }}
            className="card-ekyc"
            actions={[
              <Button
                type="primary"
                onClick={() => {
                  callUpdateEkyc(updateEkyc || {}).then((res) => {
                    if (res.code === 0) {
                      setHasEdit(false);
                      setIsReload(!isReload);
                      message.success('Lưu thông tin định danh thành công', 3);
                    } else {
                      message.error(res.message, 3);
                    }
                  });
                }}
              >
                Lưu cập nhật
              </Button>,
              <Button
                type="primary"
                onClick={() => {
                  if (hasEdit) {
                    message.warn('Vui lòng lưu cập nhật trước khi gửi yêu cầu định danh', 3);
                    return;
                  }
                  createRequestRoleTeacher({ ekycId: ekyc?.id }).then((res) => {
                    if (res.code === 0) {
                      message.success('Gửi yêu cầu định danh thành công', 3);
                      setIsReload(!isReload);
                    } else {
                      message.error(res.message, 3);
                    }
                  });
                }}
              >
                Gửi yêu cầu định danh
              </Button>,
            ]}
          >
            <Row gutter={24}>
              <Col span={12}>
                <div className="custom-row-ekyc">
                  <div className="custome-col">
                    <p className="text-headding">Thông tin cá nhân</p>
                  </div>
                </div>
                <div className="custom-row-ekyc">
                  <div className="custome-col">
                    <p className="text">Họ tên:</p>
                  </div>
                  <div className="custome-col">
                    <p className="text">
                      {currentUser ? `${currentUser?.firstName} ${currentUser?.lastName}` : '--'}
                    </p>
                  </div>
                </div>
                <div className="custom-row-ekyc">
                  <div className="custome-col">
                    <p className="text">Ngày sinh:</p>
                  </div>
                  <div className="custome-col">
                    <p className="text">{currentUser?.birthday || '--'}</p>
                  </div>
                </div>
                <div className="custom-row-ekyc">
                  <div className="custome-col">
                    <p className="text">Giới tính:</p>
                  </div>
                  <div className="custome-col">
                    <p className="text">{currentUser?.gender === 'MALE' ? 'Nam' : 'Nữ' || '--'}</p>
                  </div>
                </div>
                <div className="custom-row-ekyc">
                  <div className="custome-col">
                    <p className="text">Tỉnh - Thành phố:</p>
                  </div>
                  <div className="custome-col">
                    <p className="text">{currentUser?.province?.name || '--'}</p>
                  </div>
                </div>
                <div className="custom-row-ekyc">
                  <div className="custome-col">
                    <p className="text">Quận - Huyện:</p>
                  </div>
                  <div className="custome-col">
                    <p className="text">
                      {currentUser?.district
                        ? `${currentUser.district.prefix} ${currentUser.district.name}`
                        : '--'}
                    </p>
                  </div>
                </div>
                <div className="custom-row-ekyc">
                  <div className="custome-col">
                    <p className="text">Xã - Phường:</p>
                  </div>
                  <div className="custome-col">
                    <p className="text">
                      {currentUser?.ward
                        ? `${currentUser.ward.prefix} ${currentUser.ward.name}`
                        : '--'}
                    </p>
                  </div>
                </div>
                <div className="custom-row-ekyc">
                  <div className="custome-col">
                    <p className="text">Số nhà - Đường:</p>
                  </div>
                  <div className="custome-col">
                    <p className="text">
                      {`${currentUser?.homeNumber || '--'}, ${currentUser?.streetName || '--'}`}
                    </p>
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div className="custom-row-ekyc">
                  <div className="custome-col">
                    <p className="text-headding">Thông tin định danh</p>
                  </div>
                </div>
                <EkycItem
                  isOcr={
                    teacherInfo?.user?.isOrc &&
                    (teacherInfo.status === 'ACTIVE' || teacherInfo.status === 'BAN')
                  }
                  ekyc={updateEkyc}
                  itemName="Họ tên"
                  isEdit={isEdit.fullname}
                  setIsEdit={() => {
                    setHasEdit(true);
                    if (isEdit.fullname) {
                      setIsEdit({ ...isEdit, fullname: false });
                    } else {
                      setIsEdit({ ...isEdit, fullname: true });
                    }
                  }}
                  itemValue={updateEkyc?.fullName}
                  setValue={(value) => {
                    if (value) {
                      setUpdateEkyc({ ...updateEkyc, fullName: value });
                    }
                  }}
                />
                <EkycItem
                  isOcr={
                    teacherInfo?.user?.isOrc &&
                    (teacherInfo.status === 'ACTIVE' || teacherInfo.status === 'BAN')
                  }
                  ekyc={updateEkyc}
                  itemName="Ngày sinh"
                  isEdit={isEdit.birthday}
                  itemValue={updateEkyc?.birthday}
                  setIsEdit={() => {
                    setHasEdit(true);
                    if (isEdit.birthday) {
                      setIsEdit({ ...isEdit, birthday: false });
                    } else {
                      setIsEdit({ ...isEdit, birthday: true });
                    }
                  }}
                  isDate={true}
                  setValue={(value) => {
                    if (value) {
                      setUpdateEkyc({ ...updateEkyc, birthday: value });
                    }
                  }}
                />
                <EkycItem
                  isOcr={
                    teacherInfo?.user?.isOrc &&
                    (teacherInfo.status === 'ACTIVE' || teacherInfo.status === 'BAN')
                  }
                  ekyc={updateEkyc}
                  itemName="Giới tính"
                  isEdit={isEdit.gender}
                  itemValue={updateEkyc?.gender}
                  setIsEdit={() => {
                    setHasEdit(true);
                    if (isEdit.gender) {
                      setIsEdit({ ...isEdit, gender: false });
                    } else {
                      setIsEdit({ ...isEdit, gender: true });
                    }
                  }}
                  setValue={(value) => {
                    if (value) {
                      setUpdateEkyc({ ...updateEkyc, gender: value });
                    }
                  }}
                  isSelect={true}
                  optionSelect={[
                    { label: 'Nam', value: 'Nam' },
                    { label: 'Nữ', value: 'Nữ' },
                  ]}
                />
                <EkycItem
                  isOcr={
                    teacherInfo?.user?.isOrc &&
                    (teacherInfo.status === 'ACTIVE' || teacherInfo.status === 'BAN')
                  }
                  ekyc={updateEkyc}
                  itemName="Tỉnh - Thành phố"
                  isEdit={isEdit.province}
                  itemValue={updateEkyc?.province}
                  setIsEdit={() => {
                    setHasEdit(true);
                    if (isEdit.province) {
                      setIsEdit({ ...isEdit, province: false });
                    } else {
                      setIsEdit({ ...isEdit, province: true });
                    }
                  }}
                  setValue={(e) => {
                    if (e) {
                      let provinceModel: API.ProvinceModel | undefined = provinces?.filter(
                        (data) => data.id === e,
                      )[0];
                      setUpdateEkyc({
                        ...updateEkyc,
                        province: provinceModel ? provinceModel.name : undefined,
                      });
                      getDistrictsByProvinceV2({ provinceId: e || -1 }).then((res) => {
                        if (res.code === 0) {
                          setDistricts(res.data?.districts);
                        } else {
                          console.error(res.message, 3);
                        }
                      });
                    }
                  }}
                  isSelect={true}
                  optionSelect={
                    provinces
                      ? provinces.map((data) => {
                          return { value: data.id, label: data.name };
                        })
                      : []
                  }
                />
                <EkycItem
                  isOcr={
                    teacherInfo?.user?.isOrc &&
                    (teacherInfo.status === 'ACTIVE' || teacherInfo.status === 'BAN')
                  }
                  ekyc={updateEkyc}
                  itemName="Quận - Huyện"
                  isEdit={isEdit.district}
                  itemValue={updateEkyc?.district}
                  setIsEdit={() => {
                    setHasEdit(true);
                    if (isEdit.district) {
                      setIsEdit({ ...isEdit, district: false });
                    } else {
                      setIsEdit({ ...isEdit, district: true });
                    }
                  }}
                  setValue={(e) => {
                    if (e) {
                      let districtModel: API.DistrictModel | undefined = districts?.filter(
                        (data) => data.id === e,
                      )[0];
                      setUpdateEkyc({
                        ...updateEkyc,
                        district:
                          districtModel !== undefined
                            ? `${districtModel.prefix || ''} ${districtModel.name || ''}`
                            : undefined,
                      });
                      getWardsByDistrictV2({ districtId: e || -1 }).then((res) => {
                        if (res.code === 0) {
                          setWards(res.data?.wards);
                        } else {
                          console.error(res.message, 3);
                        }
                      });
                    }
                  }}
                  isSelect={true}
                  optionSelect={
                    districts
                      ? districts.map((data) => {
                          return { value: data.id, label: `${data.prefix} ${data.name}` };
                        })
                      : []
                  }
                />
                <EkycItem
                  isOcr={
                    teacherInfo?.user?.isOrc &&
                    (teacherInfo.status === 'ACTIVE' || teacherInfo.status === 'BAN')
                  }
                  ekyc={updateEkyc}
                  itemName="Xã - Phường"
                  isEdit={isEdit.ward}
                  itemValue={updateEkyc?.ward}
                  setIsEdit={() => {
                    setHasEdit(true);
                    if (isEdit.ward) {
                      setIsEdit({ ...isEdit, ward: false });
                    } else {
                      setIsEdit({ ...isEdit, ward: true });
                    }
                  }}
                  setValue={(e) => {
                    if (e) {
                      let wardModel: API.WardModel | undefined = wards?.filter(
                        (data) => data.id === e,
                      )[0];
                      setUpdateEkyc({
                        ...updateEkyc,
                        ward:
                          wardModel !== undefined
                            ? `${wardModel.prefix || ''} ${wardModel.name || ''}`
                            : undefined,
                      });
                    }
                  }}
                  isSelect={true}
                  optionSelect={
                    wards
                      ? wards.map((data) => {
                          return { value: data.id, label: `${data.prefix} ${data.name}` };
                        })
                      : []
                  }
                />

                <EkycItem
                  isOcr={
                    teacherInfo?.user?.isOrc &&
                    (teacherInfo.status === 'ACTIVE' || teacherInfo.status === 'BAN')
                  }
                  ekyc={updateEkyc}
                  itemName="Địa chỉ"
                  isEdit={isEdit.address}
                  itemValue={updateEkyc?.address}
                  setIsEdit={() => {
                    setHasEdit(true);
                    if (isEdit.address) {
                      setIsEdit({ ...isEdit, address: false });
                    } else {
                      setIsEdit({ ...isEdit, address: true });
                    }
                  }}
                  setValue={(e) => {
                    if (e) {
                      setUpdateEkyc({ ...updateEkyc, address: e });
                    }
                  }}
                />
                <EkycItem
                  isOcr={
                    teacherInfo?.user?.isOrc &&
                    (teacherInfo.status === 'ACTIVE' || teacherInfo.status === 'BAN')
                  }
                  ekyc={updateEkyc}
                  itemName="Quê quán"
                  isEdit={isEdit.hometown}
                  itemValue={updateEkyc?.hometown}
                  setIsEdit={() => {
                    setHasEdit(true);
                    if (isEdit.hometown) {
                      setIsEdit({ ...isEdit, hometown: false });
                    } else {
                      setIsEdit({ ...isEdit, hometown: true });
                    }
                  }}
                  setValue={(e) => {
                    if (e) {
                      setUpdateEkyc({ ...updateEkyc, address: e });
                    }
                  }}
                />
                <EkycItem
                  isOcr={
                    teacherInfo?.user?.isOrc &&
                    (teacherInfo.status === 'ACTIVE' || teacherInfo.status === 'BAN')
                  }
                  itemName="Quốc tịch"
                  itemValue={ekyc?.national}
                  setIsEdit={() => {
                    setHasEdit(true);
                  }}
                  setValue={(e) => {}}
                />
                <EkycItem
                  isOcr={
                    teacherInfo?.user?.isOrc &&
                    (teacherInfo.status === 'ACTIVE' || teacherInfo.status === 'BAN')
                  }
                  itemName="Loại giấy tờ"
                  itemValue={ekyc?.document}
                  setIsEdit={() => {
                    setHasEdit(true);
                  }}
                  setValue={(e) => {}}
                />
                <EkycItem
                  isOcr={
                    teacherInfo?.user?.isOrc &&
                    (teacherInfo.status === 'ACTIVE' || teacherInfo.status === 'BAN')
                  }
                  ekyc={updateEkyc}
                  itemName="Số CCCD/CMND"
                  isEdit={isEdit.cardNo}
                  itemValue={updateEkyc?.cardNo}
                  setIsEdit={() => {
                    setHasEdit(true);
                    if (isEdit.cardNo) {
                      setIsEdit({ ...isEdit, cardNo: false });
                    } else {
                      setIsEdit({ ...isEdit, cardNo: true });
                    }
                  }}
                  setValue={(e) => {
                    if (e) {
                      setUpdateEkyc({ ...updateEkyc, cardNo: e });
                    }
                  }}
                />
                <EkycItem
                  isOcr={
                    teacherInfo?.user?.isOrc &&
                    (teacherInfo.status === 'ACTIVE' || teacherInfo.status === 'BAN')
                  }
                  ekyc={updateEkyc}
                  itemName="Nơi cấp"
                  isEdit={isEdit.issueBy}
                  itemValue={updateEkyc?.issueBy}
                  setIsEdit={() => {
                    setHasEdit(true);
                    if (isEdit.issueBy) {
                      setIsEdit({ ...isEdit, issueBy: false });
                    } else {
                      setIsEdit({ ...isEdit, issueBy: true });
                    }
                  }}
                  setValue={(e) => {
                    if (e) {
                      setUpdateEkyc({ ...updateEkyc, issueBy: e });
                    }
                  }}
                />
                <EkycItem
                  isOcr={
                    teacherInfo?.user?.isOrc &&
                    (teacherInfo.status === 'ACTIVE' || teacherInfo.status === 'BAN')
                  }
                  ekyc={updateEkyc}
                  itemName="Ngày cấp"
                  isEdit={isEdit.issueDate}
                  itemValue={updateEkyc?.issueDate}
                  setIsEdit={() => {
                    setHasEdit(true);
                    if (isEdit.issueDate) {
                      setIsEdit({ ...isEdit, issueDate: false });
                    } else {
                      setIsEdit({ ...isEdit, issueDate: true });
                    }
                  }}
                  isDate={true}
                  setValue={(e) => {
                    if (e) {
                      setUpdateEkyc({ ...updateEkyc, issueDate: e });
                    }
                  }}
                />
                <div className="custom-row-ekyc">
                  <div className="custome-col">
                    <p className="text">Trạng thái định danh:</p>
                  </div>
                  <div className="custome-col">
                    <Tag
                      className="text-tag"
                      color={STATUS_EKYC[teacherInfo?.status || 'DEFAULT'].type}
                    >
                      {STATUS_EKYC[teacherInfo?.status || 'DEFAULT'].nameVi}
                    </Tag>
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        </div>
      </Card>
    </>
  );
};

export default Identification;
