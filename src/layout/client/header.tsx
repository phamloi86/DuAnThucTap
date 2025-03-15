import { Layout, Input, Button, Row, Col, Typography, Avatar, Dropdown, Menu } from "antd";
import { UserOutlined, SearchOutlined, LogoutOutlined, LoginOutlined, UserAddOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAuth } from "../../components/auth/AuthContext";

const { Header } = Layout;
const { Text } = Typography;

const HeaderClient = () => {
  const { user, logout } = useAuth();

  const userMenu = (
    <Menu>
      <Menu.Item key="logout" onClick={logout} icon={<LogoutOutlined />}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  return (
    <Header style={{ background: "#222", padding: "0 24px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
      <Row justify="space-between" align="middle">
        {/* Logo */}
        <Col>
          <Link to="/">
            <Text strong style={{ fontSize: "20px", color: "#D4AF37" }}>GoldShop</Text>
          </Link>
        </Col>

        {/* Thanh tìm kiếm */}
        <Col flex="auto" style={{ margin: "0 20px" }}>
          <Input
            prefix={<SearchOutlined style={{ color: "#D4AF37" }} />}
            placeholder="Tìm kiếm vàng, trang sức..."
            style={{ width: "100%", maxWidth: 500, borderRadius: "6px" }}
          />
        </Col>

        {/* Nếu đã đăng nhập */}
        {user ? (
          <Col>
            <Dropdown overlay={userMenu} trigger={["click"]}>
              <Button type="text" style={{ color: "#D4AF37" }}>
                <Avatar size="large" icon={<UserOutlined />} />
                <Text style={{ marginLeft: 8, color: "#D4AF37" }}>{user.username}</Text>
              </Button>
            </Dropdown>
          </Col>
        ) : (
          // Nếu chưa đăng nhập
          <Col>
            <Link to="/login">
              <Button icon={<LoginOutlined />} type="text" style={{ marginRight: 10, color: "#D4AF37" }}>
                Đăng nhập
              </Button>
            </Link>
            <Link to="/register">
              <Button icon={<UserAddOutlined />} style={{ background: "#D4AF37", color: "#222", fontWeight: "bold" }}>
                Đăng ký
              </Button>
            </Link>
          </Col>
        )}
      </Row>
    </Header>
  );
};

export default HeaderClient;
