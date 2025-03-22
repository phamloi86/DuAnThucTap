import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Form, Input, Select, Button, DatePicker, message } from "antd";
import dayjs from "dayjs";

const { Option } = Select;

const UpdateCart: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    fetch(`http://localhost:3000/orders/${id}`)
      .then((res) => res.json())
      .then((data) => setFormData(data))
      .catch((err) => console.error("Lỗi khi lấy đơn hàng:", err));
  }, [id]);

  if (!formData) {
    return <div>Không tìm thấy đơn hàng</div>;
  }

  const handleChange = (key: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:3000/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          trang_thai_thanh_toan: formData.paymentStatus, // Cập nhật trạng thái thanh toán
        }),
      });

      if (response.ok) {
        message.success("Cập nhật đơn hàng thành công!");
        navigate("/admin/cart");
      } else {
        message.error("Cập nhật thất bại, vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật đơn hàng:", error);
      message.error("Đã có lỗi xảy ra!");
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <Card title={`Chỉnh sửa đơn hàng: ${formData.orderCode}`}>
        <Form layout="vertical" onFinish={handleSubmit}>
          {/* Mã đơn hàng */}
          <Form.Item label="Mã đơn hàng">
            <Input value={formData.orderCode} disabled />
          </Form.Item>

          {/* Ngày đặt hàng */}
          <Form.Item label="Ngày đặt hàng">
            <DatePicker
              value={dayjs(formData.orderDate)}
              onChange={(date) =>
                handleChange("orderDate", date?.format("YYYY-MM-DD"))
              }
              format="YYYY-MM-DD"
            />
          </Form.Item>

          {/* Phương thức thanh toán */}
          <Form.Item label="Phương thức thanh toán">
            <Select
              value={formData.paymentMethod}
              onChange={(value) => handleChange("paymentMethod", value)}
            >
              <Option value={1}>Chuyển khoản</Option>
              <Option value={2}>Tiền mặt</Option>
              <Option value={3}>Thẻ tín dụng</Option>
            </Select>
          </Form.Item>

          {/* Trạng thái thanh toán */}
          <Form.Item label="Trạng thái thanh toán">
            <Select
              value={formData.paymentStatus}
              onChange={(value) => handleChange("paymentStatus", value)}
            >
              <Option value={1}>Chưa thanh toán</Option>
              <Option value={2}>Đã thanh toán</Option>
            </Select>
          </Form.Item>

          {/* Trạng thái đơn hàng */}
          <Form.Item label="Trạng thái đơn hàng">
            <Select
              value={formData.orderStatus}
              onChange={(value) => handleChange("orderStatus", value)}
            >
              <Option value={1}>Chưa xác nhận</Option>
              <Option value={2}>Đã xác nhận</Option>
              <Option value={3}>Đang giao</Option>
              <Option value={4}>Đã giao</Option>
              <Option value={5}>Giao thành công</Option>
              <Option value={6}>Giao thất bại</Option>
            </Select>
          </Form.Item>

          {/* Nút Lưu */}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Lưu thay đổi
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default UpdateCart;
