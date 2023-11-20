import { deleteExam } from '@/services/api/ExamController';
import { createQuestionUsingExcel } from '@/services/api/QuestionController';
import {
  DeleteFilled,
  EditFilled,
  PlusCircleFilled,
  QuestionCircleFilled,
} from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { message, Modal, Tooltip } from 'antd';
import { useState } from 'react';
import ModalExam from '../ModalExam';
import ModalUploadQuestion from '../ModalUploadQuestion';

interface Props {
  examsData?: API.ExamInfo[];
}
export default (props: Props) => {
  const { examsData } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [examSelect, setExamSelect] = useState<API.ExamInfo>({});
  const [openModalQuestion, setOpenModalQuestion] = useState(false);
  const [file, setFile] = useState<File>();

  const columns: ProColumns<API.ExamInfo>[] = [
    {
      title: 'Exam Name',
      dataIndex: 'examName',
      key: 'examName',
      width: '22%',
    },
    {
      title: 'Question Total',
      dataIndex: 'questionTotal',
      key: 'questionTotal',
      width: '22%',
    },
    {
      title: 'Time',
      dataIndex: 'timeMinute',
      key: 'timeMinute',
      width: '22%',
    },
    {
      title: 'Create At',
      dataIndex: 'createAt',
      key: 'createAt',
      width: '22%',
    },
    {
      title: 'Action',
      key: 'option',
      width: '12%',
      valueType: 'option',
      render: (text, data) => [
        <div
          style={{ cursor: 'pointer', color: '#52c41a', fontSize: '20px' }}
          key="1"
          onClick={() => {
            setExamSelect(data);
            setOpenModalQuestion(true);
          }}
        >
          <Tooltip title="Add Question">
            <PlusCircleFilled />
          </Tooltip>
        </div>,
        <div
          style={{ cursor: 'pointer', color: '#1890ff', fontSize: '20px' }}
          key="1"
          onClick={() => {
            setExamSelect(data);
            setIsOpen(true);
          }}
        >
          <Tooltip title="Edit Exam">
            <EditFilled />
          </Tooltip>
        </div>,
        <div
          style={{ cursor: 'pointer', color: '#ff4d4f', fontSize: '20px' }}
          key="2"
          onClick={() => {
            Modal.info({
              title: 'Delete exam',
              icon: <QuestionCircleFilled />,
              content: (
                <p>
                  Are you sure to delete document <strong>{data.examName}</strong>
                </p>
              ),
              okText: 'Ok',
              cancelText: 'Cancel',
              onOk: () => {
                deleteExam({ id: data.id || -1 }).then((res) => {
                  if (res.code === 0) {
                    message.success('Delete exam success');
                  } else {
                    message.success(`Delete exam fail: ${res.message}`);
                  }
                });
              },
            });
          }}
        >
          <Tooltip title="Delete Exam">
            <DeleteFilled />
          </Tooltip>
        </div>,
      ],
    },
  ];
  return (
    <>
      <ProTable<API.ExamInfo, { keyWord?: string }>
        columns={columns}
        dataSource={examsData}
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
      <ModalExam isOpen={isOpen} setIsOpen={setIsOpen} exam={examSelect} />
      <Modal
        onOk={() => {
          console.log(examSelect);

          createQuestionUsingExcel({ examId: examSelect.id }, file)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
          console.log(file);
        }}
        closable={false}
        onCancel={() => setOpenModalQuestion(false)}
        open={openModalQuestion}
      >
        <ModalUploadQuestion setFile={setFile} />
      </Modal>
    </>
  );
};
