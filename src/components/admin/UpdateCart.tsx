import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Form, Input, Select, Button } from "antd";
import { useOrders } from "./OrderContext"; // Import context

const { Option } = Select;

const UpdateCart: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { orders, updateOrder } = useOrders();

  const order = orders.find((o) => o.id === Number(id));
  const [formData, setFormData] = useState(order);

  const handleChange = (key: string, value: any) => {
    if (formData) {
      setFormData({ ...formData, [key]: value });
    }
  };

  const handleSubmit = () => {
    if (formData) {
      updateOrder(formData);
      console.log("Updated Order:", formData);
      navigate("/admin/cart");
    }
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
          <Form.Item label="Trạng thái đơn hàng">
            <Select value={formData.orderStatus} onChange={(value) => handleChange("orderStatus", value)}>
              <Option value={1}>Chưa xác nhận</Option>
              <Option value={2}>Đã xác nhận</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Lưu thay đổi</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default UpdateCart;
