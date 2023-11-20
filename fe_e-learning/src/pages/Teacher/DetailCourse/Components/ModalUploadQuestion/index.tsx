import React, { useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';

const { Dragger } = Upload;

interface Props {
  setFile: (questions: File) => void;
}

const ModalUploadQuestion: React.FC<Props> = ({ setFile }) => {
  const props: UploadProps = {
    name: 'file',
    accept: '.xlsx',
    // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      console.log(info);
      setFile(info.file.originFileObj as File);
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };
  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Click or drag file to this area to upload</p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
        band files. <strong>Accept only file extend .xlsx</strong>
      </p>
    </Dragger>
  );
};

export default ModalUploadQuestion;
