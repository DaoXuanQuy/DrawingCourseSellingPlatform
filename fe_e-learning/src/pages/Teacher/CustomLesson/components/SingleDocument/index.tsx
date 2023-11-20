import { DISPLAY_STATUS, GET_IMAGE } from '@/constant';
import { deleteDocument, displayDocument, updateDocument } from '@/services/api/DocumentController';
import { FileTextOutlined, SettingOutlined, UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Divider,
  Dropdown,
  Input,
  message,
  Modal,
  Space,
  Tag,
  Upload,
  UploadFile,
  UploadProps,
} from 'antd';
import { useContext, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { RenderContext } from '../..';
import './index.less';

interface Props {
  document: API.DocumentDto;
  key?: string | number;
}

export default (props: Props): JSX.Element => {
  const { document, key } = props;
  const { handleRender } = useContext(RenderContext);
  const [isEditDocument, setIsEditDocument] = useState<boolean>(false);
  const [fileList, setFileList] = useState<UploadFile[]>([
    { uid: document.id || '', url: document.documentUrl, name: document.documentName || 'file' },
  ]);
  const [updateDocumentReq, setUpdateDocumentReq] = useState<API.UpdateDocumentRequest>({
    id: document.id || '',
    documentName: document.documentName || '',
    documentType: document.documentType || 'FILE',
    content: document.content,
    videoUrl: document.documentUrl,
    description: document.description,
  });
  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  useEffect(() => {}, [document]);

  const handleDisplay = (id: string, status: 'HIDE' | 'VISIBLE') => {
    displayDocument({
      documentId: id,
      status: status,
    }).then((res) => {
      if (res.code === 0) {
        message.success(
          status === 'HIDE' ? 'Ẩn tài liệu thành công' : 'Hiển thị tài liệu thành công',
          3,
        );
        if (handleRender !== undefined) {
          handleRender();
        }
      }
    });
  };
  return (
    <>
      <div key={key} className="single-document">
        <Divider />
        {isEditDocument ? (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ flex: 1 }}>
              <div className="lesson-content">
                <div
                  className="custom-center"
                  style={{
                    justifyContent: 'start',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                  }}
                >
                  <div style={{ margin: '6px 0', width: '100%' }}>
                    <Input
                      style={{ width: '25%', height: 40 }}
                      placeholder="Tên tài liệu"
                      defaultValue={updateDocumentReq.documentName}
                      onChange={(e) => {
                        setUpdateDocumentReq({
                          ...updateDocumentReq,
                          documentName: e.target.value,
                        });
                      }}
                    />
                  </div>
                  {updateDocumentReq.documentType === 'FILE' ? (
                    <div style={{ margin: '6px 0' }}>
                      <Upload
                        multiple={false}
                        maxCount={1}
                        onChange={onChange}
                        defaultFileList={fileList}
                      >
                        <Button icon={<UploadOutlined />}>Nhấn chọn file...</Button>
                      </Upload>
                    </div>
                  ) : updateDocumentReq.documentType === 'TEXT' ? (
                    <div style={{ margin: '6px 0', width: '100%', wordBreak: 'break-word' }}>
                      <ReactQuill
                        theme="snow"
                        defaultValue={updateDocumentReq.content}
                        onChange={(e) => {
                          setUpdateDocumentReq({ ...updateDocumentReq, content: e });
                        }}
                      />
                    </div>
                  ) : (
                    <>
                      <div style={{ margin: '6px 0', width: '100%' }}>
                        <Input
                          style={{ width: '25%' }}
                          placeholder="URL Video"
                          defaultValue={updateDocumentReq.videoUrl}
                          onChange={(e) => {
                            setUpdateDocumentReq({
                              ...updateDocumentReq,
                              videoUrl: e.target.value,
                            });
                          }}
                        />
                      </div>
                      {document.documentUrl ? (
                        <ReactPlayer
                          className="react-player"
                          url={updateDocumentReq.videoUrl}
                          style={{ maxWidth: '480px', maxHeight: '300px' }}
                          controls={true}
                        />
                      ) : (
                        <></>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="icon-sub">
              <Dropdown
                placement="bottomRight"
                menu={{
                  items: [
                    {
                      key: '0',
                      label: (
                        <p
                          className="lesson-action"
                          onClick={() => {
                            Modal.confirm({
                              title: `Xác nhận cập nhật tài liệu: ${document.documentName} ?`,
                              okText: 'Xác nhận',
                              cancelText: 'Hủy',
                              onOk: () => {
                                let file: File | undefined = undefined;
                                if (fileList.length > 0) {
                                  file = fileList[0].originFileObj as File;
                                }

                                updateDocument(updateDocumentReq, file).then((res) => {
                                  if (res.code === 0) {
                                    message.success('Cập nhật tài liệu thành công', 3);
                                    setIsEditDocument(false);
                                    if (handleRender !== undefined) {
                                      handleRender();
                                    }
                                  }
                                });
                              },
                            });
                          }}
                        >
                          Lưu cập nhật
                        </p>
                      ),
                    },
                    {
                      key: '1',
                      danger: true,
                      label: (
                        <p
                          className="lesson-action"
                          onClick={() => {
                            setIsEditDocument(false);
                          }}
                        >
                          Hủy
                        </p>
                      ),
                    },
                  ],
                }}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <SettingOutlined />
                  </Space>
                </a>
              </Dropdown>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ flex: '0 0 98%' }}>
              {document.documentType === 'VIDEO' ? (
                <>
                  <div
                    className="custom-center"
                    style={{ justifyContent: 'start', marginBottom: 12 }}
                  >
                    <div className="document-desc">Video tham khảo: {document.documentName}</div>
                    <div className="cusom-tag">
                      <Tag
                        style={{ fontSize: 16, padding: '4px 10px' }}
                        color={DISPLAY_STATUS[document.displayStatus || 'HIDE'].type}
                      >
                        {DISPLAY_STATUS[document.displayStatus || 'HIDE'].nameVi}
                      </Tag>
                    </div>
                  </div>
                  <ReactPlayer
                    className="react-player"
                    url={document.documentUrl}
                    style={{ maxWidth: '480px', maxHeight: '300px' }}
                    controls={true}
                  />
                </>
              ) : document.documentType === 'FILE' ? (
                <>
                  <div className="custom-center" style={{ justifyContent: 'start' }}>
                    <div className="document-icon">
                      <FileTextOutlined />
                    </div>
                    <div className="document-link">
                      <a href={GET_IMAGE.getUrl(document.documentUrl)} target="_blank">
                        {document.documentName}
                      </a>
                    </div>
                    <div className="cusom-tag">
                      <Tag
                        style={{ fontSize: 16, padding: '4px 10px' }}
                        color={DISPLAY_STATUS[document.displayStatus || 'HIDE'].type}
                      >
                        {DISPLAY_STATUS[document.displayStatus || 'HIDE'].nameVi}
                      </Tag>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="custom-center"
                    style={{ justifyContent: 'start', marginBottom: 12 }}
                  >
                    <div className="document-desc">{document.documentName}</div>
                    <div className="cusom-tag">
                      <Tag
                        style={{ fontSize: 16, padding: '4px 10px' }}
                        color={DISPLAY_STATUS[document.displayStatus || 'HIDE'].type}
                      >
                        {DISPLAY_STATUS[document.displayStatus || 'HIDE'].nameVi}
                      </Tag>
                    </div>
                  </div>
                  <div
                    className="ql-editor"
                    style={{
                      padding: 0,
                      marginLeft: '20px',
                      width: '100%',
                      wordBreak: 'break-word',
                    }}
                  >
                    <div dangerouslySetInnerHTML={{ __html: document.content || '' }} />
                  </div>
                </>
              )}
            </div>
            <div className="icon-sub">
              <Dropdown
                placement="bottomRight"
                menu={{
                  items: [
                    {
                      key: '0',
                      label: (
                        <p
                          className="lesson-action"
                          onClick={() => {
                            setIsEditDocument(true);
                          }}
                        >
                          Cập nhật
                        </p>
                      ),
                    },
                    {
                      key: '1',
                      label: (
                        <p
                          className="lesson-action"
                          onClick={() => {
                            handleDisplay(document.id || '', 'VISIBLE');
                          }}
                        >
                          Hiển thị
                        </p>
                      ),
                    },
                    {
                      key: '2',
                      label: (
                        <p
                          className="lesson-action"
                          onClick={() => {
                            handleDisplay(document.id || '', 'HIDE');
                          }}
                        >
                          Ẩn
                        </p>
                      ),
                    },
                    {
                      key: '3',
                      danger: true,
                      label: (
                        <p
                          className="lesson-action"
                          onClick={() => {
                            Modal.confirm({
                              title: `Xác nhận xóa tài liệu: ${document.documentName} ?`,
                              okText: 'Xác nhận',
                              cancelText: 'Hủy',
                              onOk: () => {
                                deleteDocument({ id: document.id || '' }).then((res) => {
                                  if (res.code === 0) {
                                    message.success('Xóa tài liệu thành công', 3);
                                    if (handleRender !== undefined) {
                                      handleRender();
                                    }
                                  }
                                });
                              },
                            });
                          }}
                        >
                          Xóa
                        </p>
                      ),
                    },
                  ],
                }}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <SettingOutlined />
                  </Space>
                </a>
              </Dropdown>
            </div>
          </div>
        )}
        <Divider />
      </div>
    </>
  );
};
