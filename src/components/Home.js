import React, { useEffect, useState } from "react";
import { Tabs, message, Layout, Menu } from "antd";
import { withRouter } from "react-router-dom";
import axios from "axios";
import ChangePass from "./ChangePass";
import md5 from "md5";
import Avatar from "antd/lib/avatar/avatar";
import Anhdeptrai from "../utils/image.JPG";
import Library from "./Library";
import Admin from "./Admin";
import { LogoutOutlined, KeyOutlined } from "@ant-design/icons";
const { TabPane } = Tabs;
const { Sider, Content } = Layout;
const renderContent = (data) => (
  <div style={{ marginTop: "10px" }}>
    <p>Họ và tên: Trần Quang Huy </p>
    <p>STT: 17 </p>
    <p>MSSV: AT130624 </p>
    <p>Username: {data ? data.username : ""}</p>
  </div>
);

const Home = (props) => {
  const { history } = props;
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState(null); 
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
  return (
    <Layout>
      <Sider
        theme="light"
      >
        <div className="logo" style={{ textAlign: "center" }}>
          <Avatar
            src={Anhdeptrai}
            size="large"
            style={{ width: "50px", height: "50px", marginTop: "20px" }}
          ></Avatar>
          { renderContent(data)}
        </div>
        <Menu theme="light" mode="inline" style={{ marginTop: "10px" }}>
          <Menu.Divider></Menu.Divider>
          <Menu.Item
            key="1"
            icon={<KeyOutlined />}
            onClick={() => setVisible(true)}
          >
            Đổi mật khẩu
          </Menu.Item>
          <Menu.Item key="2" icon={<LogoutOutlined />} onClick={onLogout}>
            Đăng xuất
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
      
      </Layout>
        <Content style={{width:'85vw', overflow:'auto'}}>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Thư viện" key="1">
                <Library permisson={data ? data.permisson : ""} />
              </TabPane>
              <TabPane tab="Cá nhân" key="2">
                Chưa làm
              </TabPane>
              {data && data.permisson === "admin" && (
                <TabPane tab="Quản lý" key="3">
                  <Admin permisson={data ? data.permisson : ""} />
                </TabPane>
              )}
            </Tabs>

            <ChangePass
              visible={visible}
              onCancel={() => setVisible(false)}
              onCreate={changeNewPass}
            />
        </Content>
    </Layout>
  );
};

export default withRouter(Home);
