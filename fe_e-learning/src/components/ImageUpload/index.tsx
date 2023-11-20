import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import React, { useEffect } from 'react';

interface Props {
  fileList: UploadFile[];
  setFileList: (fileList: UploadFile[]) => void;
  width?: number | string;
  height?: number | string;
}

const ImageUpload: React.FC<Props> = ({ fileList, setFileList, width, height }) => {
  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  useEffect(() => {}, [fileList]);

  return (
    <ImgCrop>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onChange={onChange}
        onPreview={onPreview}
        style={{
          width: width ? `${width} !important` : '',
          height: height ? `${height} !important` : '',
        }}
      >
        {fileList.length < 1 && '+ Thêm ảnh'}
      </Upload>
    </ImgCrop>
  );
};

export default ImageUpload;
