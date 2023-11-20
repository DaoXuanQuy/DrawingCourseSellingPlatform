import { DeleteFilled, EditFilled, QuestionCircleFilled } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { message, Modal, Tooltip } from 'antd';
import { useState } from 'react';
import ModalDocument from '../ModalDocument';
import { deleteDocument } from '@/services/api/DocumentController';

interface Props {
  documentsData?: API.DocumentInfo[];
}

export default (props: Props) => {
  const { documentsData } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [documentSelect, setDocumentSelect] = useState<API.DocumentInfo>({});
  const columns: ProColumns<API.DocumentInfo>[] = [
    {
      title: 'Document Name',
      dataIndex: 'documentName',
      key: 'documentName',
      width: '20%',
    },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
      width: '20%',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: '20%',
    },
    {
      title: 'File URL',
      dataIndex: 'file',
      key: 'file',
      width: '20%',
      render: (text) => (
        <a href={`${text}`} target="_blank">
          {text}
        </a>
      ),
    },
    {
      title: 'Create At',
      dataIndex: 'createAt',
      key: 'createAt',
      width: '20%',
    },
    {
      title: 'Action',
      key: 'option',
      width: '12%',
      valueType: 'option',
      render: (text, data) => [
        <div
          style={{ cursor: 'pointer', color: '#1890ff', fontSize: '20px' }}
          key="1"
          onClick={() => {
            setIsOpen(true);
            setDocumentSelect(data);
          }}
        >
          <Tooltip title="Edit Document">
            <EditFilled />
          </Tooltip>
        </div>,
        <div
          style={{ cursor: 'pointer', color: '#ff4d4f', fontSize: '20px' }}
          key="2"
          onClick={() => {
            Modal.info({
              title: 'Delete document',
              icon: <QuestionCircleFilled />,
              content: (
                <p>
                  Are you sure to delete document <strong>{data.documentName}</strong>
                </p>
              ),
              okText: 'Ok',
              cancelText: 'Cancel',
              onOk: () => {
                deleteDocument({ id: data.id || -1 }).then((res) => {
                  if (res.code === 0) {
                    message.success('Delete document success');
                  } else {
                    message.success(`Delete document fail: ${res.message}`);
                  }
                });
              },
            });
          }}
        >
          <Tooltip title="Delete Document">
            <DeleteFilled />
          </Tooltip>
        </div>,
      ],
    },
  ];
  return (
    <>
      <ProTable<API.DocumentInfo, { keyWord?: string }>
        columns={columns}
        dataSource={documentsData}
        options={{
          search: true,
          setting: false,
          density: false,
        }}
        rowKey="key"
        search={false}
        dateFormatter="string"
        headerTitle="Table User"
        pagination={{
          showTotal: (total, [start, end]) => <p>{`${start}-${end}/${total}`}</p>,
          pageSize: 10,
        }}
      />
      <ModalDocument isOpen={isOpen} setIsOpen={setIsOpen} document={documentSelect} />
    </>
  );
};
