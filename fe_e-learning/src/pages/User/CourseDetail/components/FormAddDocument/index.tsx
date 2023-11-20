import { DOCUMENT_TYPE } from '@/constant';
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, Space, Tooltip, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface Props {
  addDocument: (values: any) => Promise<boolean>;
}

const FormAddDocument: React.FC<Props> = ({ addDocument }) => {
  const [documentType, setDocumentType] = useState<string>('FILE');
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);
  const [form] = Form.useForm();
  useEffect(() => {}, []);
  return (
    <Form
      name="dynamic_form_nest_item"
      onFinish={(values: any) => {
        console.log(values);

        addDocument(values).then((data) => {
          form.setFieldsValue({
            documents: [],
          });
        });
      }}
      autoComplete="off"
      form={form}
    >
      <Form.List name="documents">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{
                  display: 'flex',
                  marginBottom: 8,
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
                align="baseline"
              >
                <div className="lesson-content">
                  <div style={{ display: 'flex', justifyContent: 'start' }}>
                    <div
                      className="custom-center"
                      style={{
                        justifyContent: 'start',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        flex: '0 0 100%',
                      }}
                    >
                      <Form.Item
                        {...restField}
                        name={[name, 'documentType']}
                        style={{ width: '100%' }}
                        initialValue={documentType}
                      >
                        <Select
                          style={{ width: 80, margin: '6px 0' }}
                          options={[
                            { label: 'File', value: DOCUMENT_TYPE.FILE },
                            { label: 'Video', value: DOCUMENT_TYPE.VIDEO },
                            { label: 'Text', value: DOCUMENT_TYPE.TEXT },
                          ]}
                          defaultValue={documentType}
                          onSelect={(e) => setDocumentType(e)}
                        />
                      </Form.Item>
                      <div style={{ margin: '6px 0', width: '100%' }}>
                        <Form.Item
                          {...restField}
                          name={[name, 'documentName']}
                          style={{ width: '100%' }}
                          rules={[{ required: true, message: 'Tên tài liệu không được để trống' }]}
                        >
                          <Input style={{ width: '25%', height: 40 }} placeholder="Tên tài liệu" />
                        </Form.Item>
                      </div>
                      {documentType === 'FILE' ? (
                        <div style={{ margin: '6px 0' }}>
                          <Form.Item
                            {...restField}
                            name={[name, 'file']}
                            style={{ width: '100%' }}
                            rules={[{ required: true, message: 'File không được để trống' }]}
                          >
                            <Upload multiple={false} maxCount={1}>
                              <Button icon={<UploadOutlined />}>Nhấn chọn file...</Button>
                            </Upload>
                          </Form.Item>
                        </div>
                      ) : documentType === 'TEXT' ? (
                        <div style={{ margin: '6px 0', width: '100%' }}>
                          <Form.Item
                            {...restField}
                            name={[name, 'content']}
                            rules={[{ required: true, message: 'Nội dung không được để trông' }]}
                            style={{ width: '100%' }}
                          >
                            <ReactQuill theme="snow" style={{ width: '50vw' }} />
                          </Form.Item>
                        </div>
                      ) : (
                        <>
                          <div style={{ margin: '6px 0', width: '100%' }}>
                            <Form.Item
                              {...restField}
                              name={[name, 'videoUrl']}
                              rules={[{ required: true, message: 'URL không được để trống' }]}
                            >
                              <Input
                                style={{ width: '25%' }}
                                placeholder="URL Video"
                                onChange={(e) => setPreviewUrl(e.target.value)}
                              />
                            </Form.Item>
                          </div>
                          {previewUrl ? (
                            <ReactPlayer
                              className="react-player"
                              url={previewUrl}
                              style={{ maxWidth: '480px', maxHeight: '300px' }}
                              controls={true}
                            />
                          ) : (
                            <></>
                          )}
                        </>
                      )}
                    </div>
                    <div className="icon-sub" onClick={() => remove(name)}>
                      <Tooltip title="Xóa thêm tài liệu">
                        <MinusCircleOutlined />
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                Thêm tài liệu
              </Button>
              <Button style={{ marginLeft: 10 }} type="primary" htmlType="submit">
                Lưu
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form>
  );
};

export default FormAddDocument;
