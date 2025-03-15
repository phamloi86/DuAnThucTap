import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import HeaderClient from "./client/header";
import FooterClient from "./client/footer";

const { Content } = Layout;

const ClientLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f5f5f5" }}>
      <HeaderClient />
      <Content style={{ flex: 1, padding: "24px", background: "#f5f5f5" }}>
        <Outlet />
      </Content>
      <FooterClient />
    </Layout>
  );
};

export default ClientLayout;
