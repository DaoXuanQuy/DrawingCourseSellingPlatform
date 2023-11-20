import { CATEGORY } from '@/constant';
import { createModel3, updateModel3 } from '@/services/api/CMSForumCategoryController';
import { Form, Input, message, Modal, Select } from 'antd';
import { useEffect } from 'react';
interface Props {
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
  categoriesRoot?: API.CategoryDetail[];
  action?: 'ADD' | 'UPDATE';
  category?: API.CategoryDetail;
  isReload?: boolean;
  setIsReload?: (isReload: boolean) => void;
}

export default (props: Props): JSX.Element => {
  const { isOpen, setIsOpen, categoriesRoot, action, category, isReload, setIsReload } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    if (category !== undefined) {
      form.setFieldsValue({
        title: category.title,
        description: category.description,
        status: category.status,
        parentId: category.parentId,
      });
    }
  }, [category, action]);

  return (
    <>
      <Modal
        open={isOpen}
        okText="Xác nhận"
        cancelText="Hủy"
        closable={false}
        onOk={() => {
          if (action === 'ADD') {
            form.validateFields().then((data) => {
              createModel3(data as API.CreateCategoryRequest).then((res) => {
                if (res.code === 0) {
                  message.success('Tạo category thành công', 3);
                  form.resetFields();
                  if (setIsOpen !== undefined) {
                    setIsOpen(false);
                  }
                  if (setIsReload !== undefined) {
                    setIsReload(!isReload);
                  }
                }
              });
            });
          } else if (action === 'UPDATE') {
            form.validateFields().then((data) => {
              updateModel3({ ...data, id: category?.id }).then((res) => {
                if (res.code === 0) {
                  message.success('Cập nhật category thành công', 3);
                  form.resetFields();
                  if (setIsOpen !== undefined) {
                    setIsOpen(false);
                  }
                  if (setIsReload !== undefined) {
                    setIsReload(!isReload);
                  }
                }
              });
            });
          }
        }}
        onCancel={() => {
          if (setIsOpen !== undefined) {
            setIsOpen(false);
          }
          form.resetFields();
        }}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            className="text-input-cs"
            name={'title'}
            label="Tên category"
            rules={[
              {
                required: true,
                message: 'Tên category không được trống',
              },
            ]}
          >
            <Input placeholder={'Tên category'} maxLength={40} />
          </Form.Item>
          <Form.Item className="text-input-cs" name={'description'} label="Mô tả">
            <Input.TextArea placeholder="Mô tả" />
          </Form.Item>
          <Form.Item
            className="text-input-cs"
            name={'status'}
            label="Trạng thái"
            rules={[
              {
                required: true,
                message: 'Trạng category không được trống',
              },
            ]}
          >
            <Select
              placeholder="Chọn trạng thái"
              options={[
                { label: CATEGORY.ACTIVE.label, value: CATEGORY.ACTIVE.value },
                { label: CATEGORY.INACTIVE.label, value: CATEGORY.INACTIVE.value },
              ]}
            />
          </Form.Item>
          <Form.Item className="text-input-cs" name={'parentId'} label="Category nguồn">
            <Select
              placeholder="Chọn category nguồn"
              options={categoriesRoot?.map((data) => {
                return {
                  label: data.title,
                  value: data.id,
                };
              })}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
