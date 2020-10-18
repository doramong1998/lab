import React, { useEffect, useState } from "react";
import {
  PageHeader,
  Tabs,
  Button,
  Statistic,
  Descriptions,
  message,
} from "antd";
import { withRouter } from "react-router-dom";
import axios from "axios";
import ChangePass from "./ChangePass";
import md5 from "md5";
import Avatar from "antd/lib/avatar/avatar";
import Anhdeptrai from "../utils/image.JPG";
const { TabPane } = Tabs;

const renderContent = (data) => (
  <Descriptions size="small" column={2}>
    <Descriptions.Item>
      {" "}
      <Avatar
        src={Anhdeptrai}
        size="large"
        style={{ width: "100px", height: "100px", marginTop: "20px" }}
      ></Avatar>
    </Descriptions.Item>
    <Descriptions.Item></Descriptions.Item>
    <Descriptions.Item label="User">
      {data ? data.username : ""}
    </Descriptions.Item>
    <Descriptions.Item label="Gmail">
      {data ? data.email : ""}
    </Descriptions.Item>
    <Descriptions.Item label="Address">
      {data ? data.address : ""}
    </Descriptions.Item>
    <Descriptions.Item label="Phone Number">
      {data ? data.phoneNumber : ""}
    </Descriptions.Item>
    <Descriptions.Item label="Permisson">
      {data ? data.permisson : ""}
    </Descriptions.Item>
  </Descriptions>
);

const extraContent = (data) => (
  <div
    style={{
      display: "flex",
      width: "max-content",
      justifyContent: "flex-end",
    }}
  >
    <Statistic title="Số sách đang mượn" value={999} />
  </div>
);

const Content = ({ children, extra }) => {
  return (
    <div className="content">
      <div className="main">{children}</div>
      <div className="extra">{extra}</div>
    </div>
  );
};

const Home = (props) => {
  const { history } = props;
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState(null);
  const [dataRent, setDataRent] = useState(null);
  const [dataBook, setDataBook] = useState(null);
  useEffect(() => {
    let idLogin = localStorage.getItem("idLogin");
    if (!idLogin) {
      history.push("/login");
    } else {
      axios
        .get(
          `https://5f77ec2bd5c9cb00162378c7.mockapi.io/bai4/taikhoan/${idLogin}`
        )
        .then((res) => {
          setData(res.data);
        });
      axios
        .get(`https://5f77ec2bd5c9cb00162378c7.mockapi.io/bai4/manager`)
        .then((res) => {
          setDataRent(res.data);
        });
      axios
        .get(`https://5f77ec2bd5c9cb00162378c7.mockapi.io/bai4/books`)
        .then((res) => {
          setDataBook(res.data);
        });
    }
  }, [history]);

  const onLogout = () => {
    localStorage.removeItem("idLogin");
    history.push("/login");
  };

  const changeNewPass = async (values) => {
    if (md5(values.oldPassword) === data.password) {
      let result = await axios.put(
        `https://5f77ec2bd5c9cb00162378c7.mockapi.io/bai4/taikhoan/${data.id}`,
        { ...data, password: md5(values.newPassword) }
      );
      if (result.data) {
        message.success("Thay đổi mật khẩu thành công!");
        setVisible(false);
      }
    } else message.error("Đổi mật khẩu thất bại!");
  };
  console.log(data);
  return (
    <>
      <PageHeader
        className="site-page-header-responsive"
        style={{ background: "#a4b0be" }}
        title="Thông tin"
        subTitle="Đây chỉ là thông tin ảo"
        extra={[
          <Button key="2" type="primary" onClick={() => setVisible(true)}>
            Đổi mật khẩu
          </Button>,
          <Button key="1" type="danger" onClick={onLogout}>
            Đăng xuất
          </Button>,
        ]}
        footer={
          <Tabs defaultActiveKey="1">
            <TabPane tab="Thư viện" key="1">

            </TabPane>
            <TabPane tab="Cá nhân" key="2">
              Đéo có
            </TabPane>
            {data && data.permisson === 'admin' && <TabPane tab="Quản lý" key="3">
              Đéo có
            </TabPane>}
          </Tabs>
        }
      >
        <Content extra={extraContent()}>{renderContent(data)}</Content>
        <ChangePass
          visible={visible}
          onCancel={() => setVisible(false)}
          onCreate={changeNewPass}
        />
      </PageHeader>
    </>
  );
};

export default withRouter(Home);
