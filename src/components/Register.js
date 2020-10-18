import React from "react";
import "../css/index.css";
import { Modal, Form, Input, Row, Col } from "antd";

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="ĐĂNG KÍ"
      okText="Tạo tài khoản"
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
          name="username"
          label="Tên đăng nhập"
          rules={[
            {
              required: true,
              message: "Cần phải nhập tên đăng nhập!",
            },
          ]}
        >
          <Input placeholder="Tên đăng nhập" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Mật khẩu"
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
          <Input.Password placeholder="Mật khẩu" />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Nhập lại mật khẩu"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Cần nhập lại mật khẩu!",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("Nhập lại chưa chính xác!");
              },
            }),
          ]}
        >
          <Input.Password placeholder="Nhập lại mật khẩu" />
        </Form.Item>
        <Row gutter={10}>
          <Col span={12}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  type:'email',
                  message: "Cần phải nhập email!",
                },
              ]}
            >
              <Input placeholder="Nhập email" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="phoneNumber" label="Số điện thoại">
              <Input placeholder="Nhập số điện thoại" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="address" label="Địa chỉ">
          <Input.TextArea rows={2} placeholder="Địa chỉ" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default CollectionCreateForm;
