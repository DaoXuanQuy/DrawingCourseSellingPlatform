import { Upload } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import React, { useEffect } from 'react';

interface Props {
  fileList: UploadFile[];
  setFileList: (fileList: UploadFile[]) => void;
}

const ImageCard: React.FC<Props> = ({ fileList, setFileList }) => {
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
    <Upload
      style={{ margin: 6, width: '240px !important', height: '240px !important' }}
      listType="picture-card"
      fileList={fileList}
      onChange={onChange}
      onPreview={onPreview}
    >
      {fileList.length < 1 && '+ Upload'}
    </Upload>
  );
};

export default ImageCard;
