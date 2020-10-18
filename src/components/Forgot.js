import React from "react";
import "../css/index.css";
import { Modal, Form, Input, } from "antd";

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="QUÊN MẬT KHẨU"
      okText="Xác nhận"
      cancelText="Đóng"
      bodyStyle={{padding:'10px'}}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            // console.log("Validate Failed:", info);
          });
      }}
    >
      <Form form={form} layout="vertical" name="form_in_modal">
        <Form.Item
          name="infomation"
          label="Nhập thông tin để lấy lại mật khẩu"
          rules={[
            {
              required: true,
              message: "Cần phải nhập mail hoặc số điện thoại!",
            },
          ]}
        >
          <Input placeholder="Mail hoặc số điện thoại..." />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default CollectionCreateForm;
