import React from "react";
import "../css/index.css";
import { Modal, Form, Input, } from "antd";

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="THAY ĐỔI MẬT KHẨU"
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
          name="oldPassword"
          label="Mật khẩu cũ"
          rules={[
            {
              required: true,
              message: "Cần nhập mật khẩu cũ!",
            },
          ]}
        >
          <Input.Password placeholder="Mật khẩu cũ" />
        </Form.Item>
      <Form.Item
          name="newPassword"
          label="Mật khẩu mới"
          rules={[
            {
              required: true,
              message: "Cần nhập mật khẩu!",
            },
            {
                min: 8,
                max: 18,
                message: "Mật khẩu mới cần có 8 - 18 kí tự !",
            },
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Mật khẩu mới" />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Nhập lại mật khẩu"
          dependencies={["newPassword"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Cần nhập lại mật khẩu mới!",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("Nhập lại chưa chính xác!");
              },
            }),
          ]}
        >
          <Input.Password placeholder="Nhập lại mật khẩu" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default CollectionCreateForm;