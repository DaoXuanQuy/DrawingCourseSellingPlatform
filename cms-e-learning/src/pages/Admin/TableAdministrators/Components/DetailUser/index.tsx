import ImageUpload from '@/components/ImageUpload';
import {
  getAllProvinces,
  getDistrictsByProvince,
  getWardsByProvince,
} from '@/services/api/AddressController';
import { upload } from '@/services/api/FileStorageController';
import { updateInfo, updateInfoById } from '@/services/api/UserController';
import { ProForm, ProFormDatePicker, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { Button, Card, Divider, Form, message, Modal, Spin, UploadFile } from 'antd';
import React, { Suspense, useEffect, useState } from 'react';

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  user: API.UserEntity;
  type?: string;
}
interface OptionSelect {
  value: number;
  label: string;
}

export default (props: Props) => {
  const { isOpen, setIsOpen, user, type } = props;
  const [form] = Form.useForm();
  const [provinces, setProvinces] = useState<OptionSelect[]>([]);
  const [districts, setDistricts] = useState<OptionSelect[]>([]);
  const [wards, setwards] = useState<OptionSelect[]>([]);
  const [imageUrl, setImageUrl] = useState(user?.avatar);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    setFileList([
      {
        uid: '-1',
        url: user.avatar,
        name: 'avatar',
      },
    ]);
    getAllProvinces().then((res) => {
      const result: OptionSelect[] = [];
      res.data?.provinces?.map((data) => {
        result.push({
          value: data.code || -1,
          label: data.name || '',
        });
      });
      setProvinces(result);
    });
    if (user.city) {
      getDistrictsByProvince({ provinceCode: Number(user.city) }).then((res) => {
        const result: OptionSelect[] = [];
        res.data?.districts?.map((data) => {
          result.push({
            value: data.code || -1,
            label: data.name || '',
          });
        });
        setDistricts(result);
      });
    }
    if (user.district) {
      getWardsByProvince({ districtCode: Number(user.district) }).then((res) => {
        const result: OptionSelect[] = [];
        res.data?.wards?.map((data) => {
          result.push({
            value: data.code || -1,
            label: data.name || '',
          });
        });
        setwards(result);
      });
    }
    form.setFieldsValue({
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      gender: user.gender,
      email: user.email,
      birthday: user.birthday !== undefined ? new Date(user.birthday) : new Date(),
      city: user.city ? Number(user.city) : null,
      district: user.district ? Number(user.district) : null,
      wards: user.wards ? Number(user.wards) : null,
      streetName: user.streetName,
      homeNumber: user.homeNumber,
    });
  }, [user]);
  return (
    <Modal
      open={isOpen}
      onCancel={() => {
        setIsOpen(false);
      }}
      onOk={() => {
        form.validateFields().then((data) => {
          updateInfoById(
            { id: user.id || '' },
            {
              firstName: data.firstName,
              lastName: data.lastName,
              birthday: data.birthday,
              gender: data.gender,
              homeNumber: data.homeNumber,
              streetName: data.streetName,
              wards: data.wards,
              district: data.district,
              city: data.city,
            },
          ).then((res) => {
            console.log('res update info: ', res);
            if (res.code === 0) {
              message.success('Update info success');
              setIsOpen(false);
            } else {
              message.error(`Update info error: ${res.message}`);
            }
          });
        });
      }}
      closable={false}
      title={'Update Info'}
    >
      <Card>
        <ProForm
          form={form}
          onFinish={async (values) => console.log(values)}
          submitter={false}
          title={'Update Info'}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: '0 0 0.8' }}>
              <ImageUpload fileList={fileList} setFileList={setFileList} />
            </div>
            <Button
              onClick={() => {
                if (fileList.length > 0) {
                  upload({ file: '' }, fileList[0].originFileObj as File).then((res) => {
                    if (res.code === 0) {
                      setImageUrl(res.data?.url || '');
                      updateInfoById(
                        { id: user.id || '' },
                        {
                          ...user,
                          avatar: res.data?.url,
                        },
                      ).then((res) => {
                        if (res.code === 0) {
                          message.success('Upload avatar success');
                        }
                      });
                    } else {
                      message.error('Upload avatar failed');
                    }
                  });
                }
              }}
              style={{ marginLeft: '20px' }}
              type="primary"
            >
              Upload
            </Button>
          </div>
          <Divider />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <ProFormText name="firstName" label="First Name" placeholder="First Name" />
            <ProFormText name="lastName" label="Last Name" placeholder="Last Name" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <ProFormText name="email" label="Email" placeholder="Email" />
            <ProFormText name="phone" label="Phone" placeholder="Phone" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <ProFormSelect
              placeholder={'Select gender'}
              options={[
                {
                  value: 'MALE',
                  label: 'Male',
                },
                {
                  value: 'FEMALE',
                  label: 'Female',
                },
              ]}
              width={200}
              name="gender"
              label="Gender"
              initialValue={user.gender}
            />
            {type !== 'person' ? (
              <ProFormSelect
                width={200}
                placeholder={'Select role'}
                options={[
                  {
                    value: 'ADMIN',
                    label: 'Admin',
                  },
                  {
                    value: 'STUDENT',
                    label: 'Student',
                  },
                  {
                    value: 'TEACHER',
                    label: 'Teacher',
                  },
                ]}
                name="role"
                label="Role"
              />
            ) : (
              ''
            )}
          </div>
          <ProForm.Group>
            <ProFormDatePicker
              width={200}
              placeholder="Birthday"
              label="Birthday"
              name="birthday"
            />
          </ProForm.Group>
          <Divider />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <ProFormSelect
              showSearch
              placeholder={'Select City'}
              options={[...provinces]}
              width={200}
              name="city"
              label="City"
              fieldProps={{
                onChange: (data) => {
                  getDistrictsByProvince({ provinceCode: data }).then((res) => {
                    const result: OptionSelect[] = [];
                    res.data?.districts?.map((data) => {
                      result.push({
                        value: data.code || -1,
                        label: data.name || '',
                      });
                    });
                    setDistricts(result);
                  });
                },
              }}
            />
            <ProFormSelect
              showSearch
              placeholder={'Select District'}
              options={[...districts]}
              width={200}
              name="district"
              label="District"
              fieldProps={{
                onChange: (data) => {
                  getWardsByProvince({ districtCode: data }).then((res) => {
                    const result: OptionSelect[] = [];
                    res.data?.wards?.map((data) => {
                      result.push({
                        value: data.code || -1,
                        label: data.name || '',
                      });
                    });
                    setwards(result);
                  });
                },
              }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <ProFormSelect
              showSearch
              placeholder={'Select Wards'}
              options={[...wards]}
              width={200}
              name="wards"
              label="Wards"
            />
            <ProFormText
              name={'streetName'}
              placeholder={'Street name'}
              width={200}
              label="Street name"
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <ProFormText
              name={'homeNumber'}
              placeholder={'House number'}
              width={200}
              label="House number"
            />
          </div>
        </ProForm>
      </Card>
    </Modal>
  );
};
