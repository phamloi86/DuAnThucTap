import React, { useState } from "react";
import { Layout, Input, Typography, Avatar, Row, Col } from "antd";
import { UserOutlined, SearchOutlined } from "@ant-design/icons";

const { Header } = Layout;
const { Text } = Typography;

const HeaderAdmin = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Header style={{ background: "#fff", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)", padding: "0 24px" }}>
      <Row justify="space-between" align="middle">
        {/* Logo */}
        <Col>
          <Text strong style={{ fontSize: "18px" }}>Duongphph53276</Text>
        </Col>

        {/* Ô tìm kiếm */}
        <Col>
          <Input
            prefix={<SearchOutlined style={{ color: "rgba(0,0,0,0.45)" }} />}
            placeholder="Tìm kiếm sản phẩm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: 350 }}
          />
        </Col>

        {/* Chào Admin + Avatar */}
        <Col style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Text>Welcome Admin!</Text>
          <Avatar size="large" icon={<UserOutlined />} />
        </Col>
      </Row>
    </Header>
  );
};

export default HeaderAdmin;
