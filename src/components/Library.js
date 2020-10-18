import React, { useEffect, useState } from "react";
import { Button, Table, message, Form, Modal, Input, InputNumber } from "antd";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";

const Library = (props) => {
  const { permisson } = props;
  const [data, setData] = useState(null);
  const [visible, setVisible] = useState(null);
  const [dataEdit, setDataEdit] = useState(null);
  const [form] = Form.useForm();
  useEffect(() => {
    axios
      .get(`https://5f77ec2bd5c9cb00162378c7.mockapi.io/bai4/books`)
      .then((res) => {
        setData(res.data);
      });
  }, []);

  const onDelete = (id) => {
    axios
      .delete(`https://5f77ec2bd5c9cb00162378c7.mockapi.io/bai4/books/${id}`)
      .then((res) => {
        message.success("Xóa sách thành công!");
        axios
          .get(`https://5f77ec2bd5c9cb00162378c7.mockapi.io/bai4/books`)
          .then((res) => {
            setData(res.data);
          });
      });
  };

  const onEdit = (values) => {
    axios
      .put(
        `https://5f77ec2bd5c9cb00162378c7.mockapi.io/bai4/books/${dataEdit.id}`,
        {
          ...dataEdit,
          name: values.name,
          number: values.number,
          detail: values.detail,
          type: values.type,
        }
      )
      .then((res) => {
        message.success("Sửa thông tin sách thành công!");
        setVisible(false);
        axios
          .get(`https://5f77ec2bd5c9cb00162378c7.mockapi.io/bai4/books`)
          .then((res) => {
            setData(res.data);
          });
      });
  };

  const onCreate = (values) => {
    axios
      .post(`https://5f77ec2bd5c9cb00162378c7.mockapi.io/bai4/books`, {
        name: values.name,
        number: values.number,
        detail: values.detail,
      })
      .then((res) => {
        message.success("Tạo mới sách thành công!");
        setVisible(false);
        axios
          .get(`https://5f77ec2bd5c9cb00162378c7.mockapi.io/bai4/books`)
          .then((res) => {
            setData(res.data);
          });
      });
  };

  const columns = [
    {
      title:
        permisson === "admin" ? (
          <>
            Danh mục sách{" "}
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setDataEdit(null);
                setVisible(true);
              }}
            ></Button>
          </>
        ) : (
          "Tên sách"
        ),
      dataIndex: "name",
    },
    {
      title: "Số lượng",
      dataIndex: "number",
      align: "center",
    },
    {
      title: "Nội dung",
      dataIndex: "detail",
      align: "center",
    },
    {
      title: "Thể loại",
      dataIndex: "type",
      align: "center",
    },
    {
      title: "Xử lý",
      align: "center",
      render: (value, index, row) => {
        if (permisson !== "admin")
          return (
            <Button type="primary" icon={<PlusOutlined />}>
              Mượn sách
            </Button>
          );
        else
          return (
            <>
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={() => {
                  setDataEdit(value);
                  setVisible(true);
                }}
              >
                Sửa
              </Button>
              &nbsp;
              <Button
                type="danger"
                icon={<DeleteOutlined />}
                onClick={() => onDelete(value.id)}
              >
                Xóa
              </Button>
            </>
          );
      },
    },
  ];
  console.log(dataEdit)
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
        title={dataEdit ? "Sửa thông tin sách" : "Thêm sách mới"}
        okText="Xác nhận"
        cancelText="Hủy"
        destroyOnClose={true}
        onCancel={() => setVisible(false)}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              if (dataEdit) onEdit(values);
              else onCreate(values);
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
            name: dataEdit ? dataEdit.name : "",
            number: dataEdit ? dataEdit.number : 0,
            detail: dataEdit ? dataEdit.detail : "",
            type: dataEdit ? dataEdit.type : "",
          }}
        >
          <Form.Item
            name="name"
            label="Tên sách"
            rules={[
              {
                required: true,
                message: "Cần nhập tên sách!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="number" label="Số lượng">
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="detail" label="Nội dung">
            <Input.TextArea rows={2} />
          </Form.Item>
          <Form.Item name="type" label="Thể loại">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default withRouter(Library);
