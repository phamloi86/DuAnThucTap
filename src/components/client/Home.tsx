// src/components/client/Home.tsx
import { Button, Typography } from "antd";
import { useAuth } from "../../components/auth/AuthContext";

const { Title } = Typography;

const Home = () => {
  const { user, logout } = useAuth();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <Title level={2}>Chào mừng đến với trang chủ</Title>
      {user ? (
        <div>
          <p>Xin chào, {user.username} ({user.role})</p>
          <Button type="primary" onClick={logout}>
            Đăng xuất
          </Button>
        </div>
      ) : (
        <p>Vui lòng đăng nhập để tiếp tục.</p>
      )}
    </div>
  );
};

export default Home;