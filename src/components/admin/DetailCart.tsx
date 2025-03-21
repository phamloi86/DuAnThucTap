import React from "react";
import { Card, Col, Descriptions, Row, Table, Typography } from "antd";
import { useParams } from "react-router-dom";

const DetailCart: React.FC = () => {
  const { id } = useParams();

  // Dữ liệu giả lập (Có thể thay bằng API sau này)
  const orderData = {
    orderId: id,
    orderDate: "2025-03-21",
    status: "Đã giao",
    totalAmount: "2,500,000 VND",
    shippingFee: "50,000 VND",
    paymentMethod: "Chuyển khoản",
  };

  const userInfo = {
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0123 456 789",
    address: "123 Đường ABC, Quận 1, TP. HCM",
  };

  const receiverInfo = {
    name: "Trần Thị B",
    email: "tranthib@example.com",
    phone: "0987 654 321",
    address: "456 Đường XYZ, Quận 2, TP. HCM",
  };

  const orderItems = [
    { key: 1, name: "Laptop ASUS", price: "20,000,000 VND", quantity: 1, total: "20,000,000 VND" },
    { key: 2, name: "Chuột Logitech", price: "500,000 VND", quantity: 1, total: "500,000 VND" },
  ];

  return (
    <div style={{ padding: 20 }}>
      <Typography.Title level={3}>Chi tiết đơn hàng #{orderData.orderId}</Typography.Title>

      {/* Bố cục 3 cột */}
      <Row gutter={[16, 16]}>
        {/* Cột 1: Thông tin đơn hàng */}
        <Col span={8}>
          <Card title="Thông tin đơn hàng">
            <Descriptions column={1}>
              <Descriptions.Item label="Mã đơn hàng">{orderData.orderId}</Descriptions.Item>
              <Descriptions.Item label="Ngày đặt hàng">{orderData.orderDate}</Descriptions.Item>
              <Descriptions.Item label="Trạng thái">{orderData.status}</Descriptions.Item>
              <Descriptions.Item label="Tổng tiền">{orderData.totalAmount}</Descriptions.Item>
              <Descriptions.Item label="Phí vận chuyển">{orderData.shippingFee}</Descriptions.Item>
              <Descriptions.Item label="Thanh toán">{orderData.paymentMethod}</Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        {/* Cột 2: Thông tin người đặt hàng */}
        <Col span={8}>
          <Card title="Thông tin người đặt hàng">
            <Descriptions column={1}>
              <Descriptions.Item label="Họ tên">{userInfo.name}</Descriptions.Item>
              <Descriptions.Item label="Email">{userInfo.email}</Descriptions.Item>
              <Descriptions.Item label="Số điện thoại">{userInfo.phone}</Descriptions.Item>
              <Descriptions.Item label="Địa chỉ">{userInfo.address}</Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        {/* Cột 3: Thông tin người nhận hàng */}
        <Col span={8}>
          <Card title="Thông tin người nhận hàng">
            <Descriptions column={1}>
              <Descriptions.Item label="Họ tên">{receiverInfo.name}</Descriptions.Item>
              <Descriptions.Item label="Email">{receiverInfo.email}</Descriptions.Item>
              <Descriptions.Item label="Số điện thoại">{receiverInfo.phone}</Descriptions.Item>
              <Descriptions.Item label="Địa chỉ">{receiverInfo.address}</Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>

      {/* Danh sách sản phẩm */}
      <Card title="Danh sách sản phẩm" style={{ marginTop: 24 }}>
        <Table
          dataSource={orderItems}
          columns={[
            { title: "STT", dataIndex: "key", key: "key" },
            { title: "Tên sản phẩm", dataIndex: "name", key: "name" },
            { title: "Đơn giá", dataIndex: "price", key: "price" },
            { title: "Số lượng", dataIndex: "quantity", key: "quantity" },
            { title: "Thành tiền", dataIndex: "total", key: "total" },
          ]}
          pagination={false}
        />
      </Card>
    </div>
  );
};

export default DetailCart;
