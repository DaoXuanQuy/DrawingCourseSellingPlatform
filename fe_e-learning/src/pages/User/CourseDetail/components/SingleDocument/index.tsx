import { GET_IMAGE } from '@/constant';
import { decreaseProgress, increaseProgress } from '@/services/api/CourseController';
import { FileTextOutlined } from '@ant-design/icons';
import { Checkbox, Divider } from 'antd';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import 'react-quill/dist/quill.snow.css';
import './index.less';

interface Props {
  document: API.DocumentDto;
  key?: string | number;
  setDocuments?: (documents: API.DocumentDto[]) => void;
  documents?: API.DocumentDto[];
  setIsReload?: (reload: boolean) => void;
  isReload?: boolean;
}

export default (props: Props): JSX.Element => {
  const { document, key, setDocuments, documents, setIsReload, isReload } = props;
  const [checked, setChecked] = useState(document.done);
  useEffect(() => {}, [document]);

  const handleCheckDone = (isDone: boolean) => {
    if (documents !== undefined && setDocuments !== undefined) {
      const index = documents?.findIndex((data) => data.id === document.id);
      documents[index] = { ...documents[index], done: isDone };
      setDocuments(documents);
    }
  };

  return (
    <>
      <div key={key} className="single-document">
        <Divider />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ flex: 1, width: 100 }}>
            {document.documentType === 'VIDEO' ? (
              <>
                <div
                  className="custom-center"
                  style={{ justifyContent: 'start', marginBottom: 12 }}
                >
                  <div className="document-desc">Video tham khảo: {document.documentName}</div>
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
                </div>
              </>
            ) : (
              <>
                <div
                  className="custom-center"
                  style={{ justifyContent: 'start', marginBottom: 12 }}
                >
                  <div className="document-desc">{document.documentName}</div>
                </div>
                <div
                  className="ql-editor"
                  style={{ padding: 0, marginLeft: '20px', wordBreak: 'break-word' }}
                >
                  <div dangerouslySetInnerHTML={{ __html: document.content || '' }} />
                </div>
              </>
            )}
          </div>
          <div>
            <div>
              <Checkbox
                checked={checked}
                onChange={(e) => {
                  const checked: boolean = e.target.checked;
                  if (document.id) {
                    setChecked(checked);
                    handleCheckDone(checked);
                    if (checked) {
                      increaseProgress({ id: document.id, type: 'DOCUMENT' });
                    } else {
                      decreaseProgress({ id: document.id, type: 'DOCUMENT' });
                    }
                    if (isReload !== undefined && setIsReload !== undefined) {
                      setIsReload(!isReload);
                    }
                  }
                }}
                style={{ color: '#1677ff' }}
              >
                Đã xong
              </Checkbox>
            </div>
          </div>
        </div>
        <Divider />
      </div>
    </>
  );
};
