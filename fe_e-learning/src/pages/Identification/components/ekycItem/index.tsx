import { EditOutlined, SaveOutlined } from '@ant-design/icons';
import { DatePicker, Input, Select, Tooltip } from 'antd';
import { DefaultOptionType } from 'antd/lib/select';
import dayjs from 'dayjs';
import { useState } from 'react';

interface Props {
  ekyc?: API.EkycDTO;
  itemName: string;
  itemValue?: string;
  isEdit?: boolean;
  setIsEdit: () => void;
  setValue: (data: any) => void;
  isDate?: boolean;
  isSelect?: boolean;
  placeholader?: string;
  optionSelect?: DefaultOptionType[];
  isOcr?: boolean;
}
const EkycItem: React.FC<Props> = ({
  isEdit,
  setIsEdit,
  itemName,
  itemValue,
  isDate,
  setValue,
  isSelect,
  placeholader,
  optionSelect,
  ekyc,
  isOcr,
}) => {
  const [currentValue, setCurrentValue] = useState<any>();
  console.log(ekyc);
  console.log(isOcr);

  return (
    <>
      <div className="custom-row-ekyc">
        <div className="custome-col">
          <p className="text">{itemName}:</p>
        </div>
        <div className="custome-col">
          <div className="horizontal">
            {!isEdit ? (
              <p className="text">{itemValue || '--'}</p>
            ) : isDate ? (
              <DatePicker
                format={'DD/MM/YYYY'}
                defaultValue={dayjs(itemValue ? new Date(itemValue) : new Date())}
                onChange={(date, dateString) => {
                  setCurrentValue(dateString);
                }}
              />
            ) : isSelect ? (
              <Select
                showSearch
                filterOption={(input, option) =>
                  (option?.label?.toString() ?? '').toLowerCase().includes(input.toLowerCase())
                }
                style={{ width: 180 }}
                placeholder={placeholader}
                defaultValue={itemValue ? itemValue : undefined}
                options={optionSelect ? optionSelect : []}
                onSelect={(e) => {
                  setCurrentValue(e);
                }}
              />
            ) : (
              <Input
                defaultValue={itemValue}
                placeholder={placeholader ? placeholader : itemName}
                onChange={(e) => {
                  setCurrentValue(e.target.value);
                }}
              />
            )}
            {isOcr ? (
              <></>
            ) : (
              <div
                style={{ display: ekyc ? 'block' : 'none' }}
                className="icon"
                onClick={() => {
                  if (isEdit) {
                    setValue(currentValue);
                  }
                  setIsEdit();
                }}
              >
                {!isEdit ? (
                  <Tooltip title="Chỉnh sửa">
                    <EditOutlined />
                  </Tooltip>
                ) : (
                  <Tooltip title="Lưu">
                    <SaveOutlined />
                  </Tooltip>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EkycItem;
