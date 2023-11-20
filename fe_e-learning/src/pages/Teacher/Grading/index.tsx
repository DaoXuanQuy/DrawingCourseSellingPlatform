import BreadcrumbCustom from '@/components/BreadcrumbCustom';
import { EXAM_TEST_STATUS, PAGE_SIZE } from '@/constant';
import { teacherGetDetailExam } from '@/services/api/ExamController';
import { getUngradedExams } from '@/services/api/ExamResultController';
import { SearchOutlined } from '@ant-design/icons';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { history, useParams } from '@umijs/max';
import { Button, message, Select, Space, Tag } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';

type Grading = {
  course: API.CourseDto;
  action: 'VIEW' | 'GRADING';
};
export { Grading };

export default (): JSX.Element => {
  const { examId } = useParams();

  const [exam, setExam] = useState<API.ExamResponse>();
  const [isLoadingExam, setIsLoadingExam] = useState(false);
  const [isReload, setIsReload] = useState(false);
  const course: API.CourseDto = history.location.state as API.CourseDto;

  const columns: ProColumns<API.UngradedExamResponse>[] = [
    {
      title: 'Tên người làm',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      width: '15%',
      search: false,
    },
    {
      title: 'Số câu đúng',
      dataIndex: 'correctTotal',
      key: 'correctTotal',
      align: 'center',
      width: '15%',
      search: false,
    },
    {
      title: 'Tổng điểm',
      dataIndex: 'score',
      key: 'score',
      align: 'center',
      width: '15%',
      search: false,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: '15%',
      render: (_, record) => {
        return (
          <Space>
            <Tag
              style={{ width: '130%' }}
              color={
                record.status !== undefined && record.status !== null
                  ? EXAM_TEST_STATUS[record.status]?.color
                  : 'processing'
              }
            >
              {record.status !== undefined && record.status !== null
                ? EXAM_TEST_STATUS[record.status]?.label
                : '--'}
            </Tag>
          </Space>
        );
      },
      renderFormItem: () => {
        return (
          <Select
            options={[
              { value: '', label: 'Tất cả' },
              {
                value: EXAM_TEST_STATUS.CREATE.value,
                label: EXAM_TEST_STATUS.CREATE.label,
              },
              {
                value: EXAM_TEST_STATUS.WAITING.value,
                label: EXAM_TEST_STATUS.WAITING.label,
              },
              {
                value: EXAM_TEST_STATUS.COMPLETE.value,
                label: EXAM_TEST_STATUS.COMPLETE.label,
              },
            ]}
            defaultValue={{ value: '', label: 'Tất cả' }}
          />
        );
      },
    },
    {
      title: 'Thời gian bắt đầu',
      dataIndex: 'createTime',
      key: 'createTime',
      align: 'center',
      width: '15%',
      search: false,
      render: (_, r) => {
        return <>{moment(r.createTime).format('HH:mm:ss DD/MM/YYYY')}</>;
      },
    },
    {
      title: 'Thời gian nộp bài',
      dataIndex: 'submitTime',
      key: 'submitTime',
      align: 'center',
      width: '15%',
      search: false,
      render: (_, r) => {
        return <>{moment(r.submitTime).format('HH:mm:ss DD/MM/YYYY')}</>;
      },
    },
    {
      title: 'Hành động',
      key: 'option',
      valueType: 'option',
      align: 'center',
      render: (text, row) => [
        <div
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}
        >
          {row.status === 'COMPLETE' ? (
            <Button
              type="link"
              size={'middle'}
              onClick={() =>
                history.push(`/courses/exam/grading/detail/${row.id}`, {
                  course: course,
                  action: 'VIEW',
                } as Grading)
              }
            >
              Xem bài làm
            </Button>
          ) : (
            <Button
              type="link"
              size={'middle'}
              onClick={() =>
                history.push(`/courses/exam/grading/detail/${row.id}`, {
                  course: course,
                  action: 'GRADING',
                } as Grading)
              }
            >
              Chấm bài
            </Button>
          )}
        </div>,
      ],
    },
  ];

  useEffect(() => {
    console.log('course: ', course);
    setIsLoadingExam(true);
    if (examId) {
      teacherGetDetailExam({ id: examId })
        .then((res) => {
          setExam(res.data);
        })
        .finally(() => setIsLoadingExam(false));
    }
  }, [examId]);
  return (
    <>
      <BreadcrumbCustom
        isLoading={isLoadingExam}
        subNav={[
          {
            name: 'Trang chủ',
            path: '/',
          },
          {
            name: 'Quản lí khóa học',
            path: '/courses',
          },
          {
            name: 'Chi tiết khóa học',
            path: `/courses/${course?.id}`,
          },
          {
            name: `Cài đặt khóa học: ${course?.courseName}`,
            path: `/courses/lessons/${course?.id}`,
          },
          {
            name: `Chấm bài: ${exam?.examName}`,
            path: ``,
          },
        ]}
      />

      <ProTable<API.UngradedExamResponse, API.getUngradedExamsParams & { isReload: boolean }>
        params={{ isReload }}
        columns={columns}
        rowKey="key"
        className="table-grading"
        options={{ search: true }}
        expandable={{ showExpandColumn: true }}
        search={{
          optionRender: (searchConfig) => [
            <Button
              type="primary"
              onClick={() => {
                searchConfig.form?.submit();
              }}
              icon={<SearchOutlined />}
            >
              Tìm Kiếm
            </Button>,
          ],
          layout: 'vertical',
          span: 4,
          labelWidth: 'auto',
        }}
        headerTitle="Danh sách khóa học"
        pagination={{
          showTotal: (total, [start, end]) => <p>{`${start}-${end}/${total}`}</p>,
          pageSize: PAGE_SIZE,
        }}
        toolBarRender={false}
        onSubmit={(params) => {
          console.log(params);
        }}
        rowClassName={'custom-row'}
        onLoadingChange={() => {}}
        request={async (params) => {
          if (examId) {
            const response = await getUngradedExams({
              examId: examId,
              status: params.status,
              page: params.current ? params.current - 1 : 0,
              size: params.pageSize,
            });
            let resData: API.UngradedExamResponse[] = [];
            let total: number = 0;
            if (response?.code === 0) {
              resData = response.data?.ungradedExams ? response.data.ungradedExams : [];
              total = response.data?.paginate?.total || 0;
            } else {
              message.error(response.message, 3);
            }
            return {
              data: resData,
              total: total,
            };
          }
          return {
            data: [],
            total: 0,
          };
        }}
      />
    </>
  );
};
