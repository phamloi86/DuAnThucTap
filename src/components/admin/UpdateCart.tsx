import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Form, Input, Select, Button } from "antd";

const { Option } = Select;

interface Order {
  id: number;
  orderCode: string;
  orderDate: string;
  paymentMethod: number;
  paymentStatus: number;
  orderStatus: number;
}

const paymentMethods = [
  { value: 1, label: "Chuyển khoản" },
  { value: 2, label: "Tiền mặt" },
  { value: 3, label: "Thẻ tín dụng" },
];

const paymentStatuses = [
  { value: 1, label: "Chưa thanh toán" },
  { value: 2, label: "Đã thanh toán" },
];

const orderStatuses = [
  { value: 1, label: "Chưa xác nhận" },
  { value: 2, label: "Đã xác nhận" },
  { value: 3, label: "Đang giao" },
  { value: 4, label: "Đã giao" },
  { value: 5, label: "Giao thành công" },
  { value: 6, label: "Giao thất bại" },
];

const dummyOrders: Order[] = [
  { id: 1, orderCode: "DH001", orderDate: "2025-03-17", paymentMethod: 1, paymentStatus: 1, orderStatus: 2 },
  { id: 2, orderCode: "DH002", orderDate: "2025-03-16", paymentMethod: 2, paymentStatus: 2, orderStatus: 3 },
];

const UpdateCart: React.FC = () => {
const { id } = useParams<{ id: string }>(); // Lấy ID từ URL
  const navigate = useNavigate();
  const order = dummyOrders.find((o) => o.id === Number(id));

  const [formData, setFormData] = useState<Order | undefined>(order);

  const handleChange = (key: keyof Order, value: any) => {
    if (formData) {
      setFormData({ ...formData, [key]: value });
    }
  };

  const handleSubmit = () => {
    console.log("Updated Order:", formData);
    navigate("/orders"); // Điều hướng về trang danh sách đơn hàng
  };

  if (!formData) {
    return <div>Không tìm thấy đơn hàng</div>;
  }

  return (
    <div style={{ padding: 24 }}>
      <Card title={`Chỉnh sửa đơn hàng: ${formData.orderCode}`}>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Mã đơn hàng">
            <Input value={formData.orderCode} disabled />
          </Form.Item>
          <Form.Item label="Ngày đặt">
            <Input value={formData.orderDate} disabled />
          </Form.Item>
          <Form.Item label="Phương thức thanh toán">
            <Select value={formData.paymentMethod} onChange={(value) => handleChange("paymentMethod", value)}>
              {paymentMethods.map((method) => (
                <Option key={method.value} value={method.value}>
                  {method.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Trạng thái thanh toán">
            <Select value={formData.paymentStatus} onChange={(value) => handleChange("paymentStatus", value)}>
              {paymentStatuses.map((status) => (
                <Option key={status.value} value={status.value}>
                  {status.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Trạng thái đơn hàng">
            <Select value={formData.orderStatus} onChange={(value) => handleChange("orderStatus", value)}>
              {orderStatuses.map((status) => (
                <Option key={status.value} value={status.value}>
                  {status.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Lưu thay đổi</Button>
            <Button style={{ marginLeft: 8 }} onClick={() => navigate("/orders")}>Hủy</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default UpdateCart;
