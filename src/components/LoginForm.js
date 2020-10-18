import React, { useState, useEffect } from "react";
import "../css/index.css";
import { Form, Input, Button, Checkbox, Card, message, Modal } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Register from "./Register";
import Forgot from "./Forgot";
import axios from "axios";
import md5 from 'md5';
import { withRouter } from "react-router-dom";
const NormalLoginForm = (props) => {
  const [visible, setVisible] = useState(false);
  const [visibleForgot, setVisibleForgot] = useState(false);
  const [data, setData] = useState(null);
  const { history } = props;
  useEffect(() => {
    axios
      .get(`https://5f77ec2bd5c9cb00162378c7.mockapi.io/bai4/taikhoan`)
      .then((res) => {
        setData(res.data);
      });
  }, [visible]);
  const onFinish = (values) => {
    axios
      .get(`https://5f77ec2bd5c9cb00162378c7.mockapi.io/bai4/taikhoan`, {
        params: { username: values.username },
      })
      .then((res) => {
        if (res.data[0].password === md5(values.password)) {
          message.success("Đăng nhập thành công!");
          localStorage.setItem("idLogin", res.data[0].id);
          history.push("/");
        } else {
          message.error("Đăng nhập thất bại!");
        }
      }).catch((errors) => message.error('Đăng nhập thất bại!'));
  };
  const onCreateData = async (values) => {
    let createData = {
      address: values.address,
      email: values.email,
      id: data.length + 1,
      password: md5(values.password),
      phoneNumber: values.phoneNumber,
      username: values.username,
    };
    let result = await axios.post(
      `https://5f77ec2bd5c9cb00162378c7.mockapi.io/bai4/taikhoan`,
      createData
    );
    if (result.data) {
      message.success("Đăng kí thành công!");
    } else message.success("Đăng kí không thành công!");
    setVisible(false);
  };

  const onForgot = (values) => {
    axios
      .get(`https://5f77ec2bd5c9cb00162378c7.mockapi.io/bai4/taikhoan`, {
        params: { email: values.infomation, phoneNumber: values.infomation },
      })
      .then((res) => {
        if (res.data) {
          axios.put(`https://5f77ec2bd5c9cb00162378c7.mockapi.io/bai4/taikhoan/${res.data[0].id}`,{...res.data[0], password: md5('Huy@at130624') }).then((res) =>
            Modal.info({
              title: "Đã gửi mật khẩu về email/số điện thoại của bạn!",
              content: <div>Mật khẩu mới: Huy@at130624</div>,
              onOk() {},
            })
          )
        } else message.error("Không tìm thấy thông tin người dùng!");
      }).catch((errors) => message.error("Không tìm thấy thông tin người dùng!"));
    setVisibleForgot(false);
  };

  return (
    <Card
      className="container_login"
      title={<h2 style={{ textAlign: "center" }}>ĐĂNG NHẬP</h2>}
    >
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Cần nhập tài khoản!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Tài khoản"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Cần nhập mật khẩu!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Mật khẩu"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Ghi nhớ</Checkbox>
          </Form.Item>
          <span
            className="login-form-forgot"
            style={{ color: "#1890ff", cursor: "pointer" }}
            onClick={() => setVisibleForgot(true)}
          >
            Quên mật khẩu
          </span>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Đăng nhập
          </Button>
          Hoặc{" "}
          <span
            style={{ color: "#1890ff", cursor: "pointer" }}
            onClick={() => setVisible(true)}
          >
            đăng kí ngay!
          </span>
        </Form.Item>
      </Form>
      <Register
        visible={visible}
        onCancel={() => setVisible(false)}
        onCreate={onCreateData}
      />
      <Forgot
        visible={visibleForgot}
        onCancel={() => setVisibleForgot(false)}
        onCreate={onForgot}
      />
    </Card>
  );
};

export default withRouter(NormalLoginForm);
