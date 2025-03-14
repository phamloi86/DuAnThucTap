// src/components/auth/Login.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { useAuth } from "./AuthContext";
import bcrypt from "bcryptjs";

const { Title } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, login } = useAuth();

  // Kiểm tra nếu đã đăng nhập thì chuyển hướng
  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, [user, navigate]);

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const { data: users } = await axios.get("http://localhost:3000/users");
      const user = users.find((u: any) => u.email === values.email);

      if (!user) {
        message.error("Email không tồn tại!");
        setLoading(false);
        return;
      }

      const isMatch = await bcrypt.compare(values.password, user.password);
      if (!isMatch) {
        message.error("Mật khẩu không đúng!");
        setLoading(false);
        return;
      }

      if (user.isLocked && user.lockUntil) {
        const lockDate = new Date(user.lockUntil);
        const now = new Date();
        if (lockDate > now) {
          message.error(
            `Tài khoản của bạn bị khóa đến ${lockDate.toLocaleDateString("vi-VN")}`
          );
          setLoading(false);
          return;
        }
      }

      login(user);
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
      message.success("Đăng nhập thành công!");
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      message.error("Đăng nhập thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      title={<Title level={3} style={{ textAlign: "center" }}>Đăng Nhập</Title>}
      style={{ maxWidth: 400, margin: "50px auto", borderRadius: "8px" }}
    >
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Vui lòng nhập email!" }]}
        >
          <Input placeholder="Nhập email" />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
        >
          <Input.Password placeholder="Nhập mật khẩu" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Đăng nhập
          </Button>
        </Form.Item>

        <div style={{ textAlign: "center" }}>
          <a href="/register">Chưa có tài khoản? Đăng ký ngay</a>
        </div>
      </Form>
    </Card>
  );
};

export default Login;