import React, { useEffect, useState } from "react";
import { Button, Table, message, Form, Modal, Input, InputNumber,Radio } from "antd";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const Library = (props) => {
  const [data, setData] = useState(null);
  const [visible, setVisible] = useState(null);
  const [dataEdit, setDataEdit] = useState(null);
  const [form] = Form.useForm();
  useEffect(() => {
    axios
      .get(`https://5f77ec2bd5c9cb00162378c7.mockapi.io/bai4/taikhoan`)
      .then((res) => {
        setData(res.data);
      });
  }, []);

  const onDelete = (id) => {
    axios
      .delete(`https://5f77ec2bd5c9cb00162378c7.mockapi.io/bai4/taikhoan/${id}`)
      .then((res) => {
        message.success("Xóa tài khoản thành công!");
        axios
          .get(`https://5f77ec2bd5c9cb00162378c7.mockapi.io/bai4/taikhoan`)
          .then((res) => {
            setData(res.data);
          });
      });
  };

  const onEdit = (values) => {
    axios
      .put(
        `https://5f77ec2bd5c9cb00162378c7.mockapi.io/bai4/taikhoan/${dataEdit.id}`,
        { ...dataEdit, username: values.username, email: values.email, phoneNumber: values.phoneNumber , address: values.address , permisson: values.permisson }
      )
      .then((res) => {
        message.success("Sửa thông tin tài khoản thành công!");
        setVisible(false);
        axios
          .get(`https://5f77ec2bd5c9cb00162378c7.mockapi.io/bai4/taikhoan`)
          .then((res) => {
            setData(res.data);
          });
      });
  };

//   const onCreate = (values) => {
//     axios
//       .post(
//         `https://5f77ec2bd5c9cb00162378c7.mockapi.io/bai4/taikhoan`,
//         { name: values.name, number: values.number }
//       )
//       .then((res) => {
//         message.success("Tạo mới tài khoản thành công!");
//         setVisible(false);
//         axios
//           .get(`https://5f77ec2bd5c9cb00162378c7.mockapi.io/bai4/taikhoan`)
//           .then((res) => {
//             setData(res.data);
//           });
//       });
//   };

  const columns = [
    {
      title: "Tài khoản",
      dataIndex: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      align: "center",
    },
    {
        title: "Số điện thoại",
        dataIndex: "phoneNumber",
        align: "center",
      },
      {
        title: "Địa chỉ",
        dataIndex: "address",
        align: "center",
      },
      {
        title: "Quyền hạn",
        dataIndex: "permisson",
        align: "center",
      },
    {
      title: "Xử lý",
      align: "center",
      render: (data, index, row) => {
          return (
            <>
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={() => {
                  setDataEdit(data);
                  setVisible(true);
                }}
              >
                Sửa
              </Button>
              &nbsp;
              <Button
                type="danger"
                icon={<DeleteOutlined />}
                onClick={() => onDelete(data.id)}
              >
                Xóa
              </Button>
            </>
          );
      },
    },
  ];
  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        scroll={{ y: 530 }}
      />{" "}
      <Modal
        visible={visible}
        title= "Sửa thông tin tài khoản"
        okText="Xác nhận"
        cancelText="Hủy"
        destroyOnClose
        onCancel={() => setVisible(false)}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onEdit(values)
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{
            username: dataEdit ? dataEdit.username : "",
            email: dataEdit ? dataEdit.email : "",
            permisson: dataEdit ? dataEdit.permisson : "",
            address: dataEdit ? dataEdit.address : "",
            phoneNumber: dataEdit ? dataEdit.phoneNumber : 0,
          }}
        >
          <Form.Item
            name="username"
            label="Tên tài khoản"
            rules={[
              {
                required: true,
                message: "Cần nhập tên tài khoản!",
              },
            ]}
          >
            <Input disabled/>
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                type:'email',
                required: true,
                message: "Cần nhập email của tài khoản!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Số điện thoại"
            rules={[
              {
                required: true,
                message: "Cần nhập số điện thoại của tài khoản!",
              },
            ]}
          >
            <InputNumber style={{width:'100%'}} />
          </Form.Item>
          <Form.Item
            name="address"
            label="Địa chỉ"
          >
            <Input.TextArea rows={2} />
          </Form.Item>
          <Form.Item name="permisson" label="Quyền hạn">
        <Radio.Group>
          <Radio value="admin">Quản trị viên</Radio>
          <Radio value="student">Sinh viên</Radio>
          <Radio value="teacher">Giáo viên</Radio>
        </Radio.Group>
      </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default withRouter(Library);
