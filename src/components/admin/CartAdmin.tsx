import React from "react";
import { Card, Table, Button, Space, Tag } from "antd";

interface Order {
  id: number;
  orderCode: string;
  orderDate: string;
  paymentMethod: number;
  paymentStatus: number;
  orderStatus: number;
}

const orders: Order[] = [
  { id: 1, orderCode: "DH001", orderDate: "2025-03-17", paymentMethod: 1, paymentStatus: 1, orderStatus: 2 },
  { id: 2, orderCode: "DH002", orderDate: "2025-03-16", paymentMethod: 2, paymentStatus: 2, orderStatus: 3 },
];

const paymentMethodMap: Record<number, string> = {
  1: "Chuyển khoản",
  2: "Tiền mặt",
  3: "Thẻ tín dụng",
};

const paymentStatusMap: Record<number, string> = {
  1: "Chưa thanh toán",
  2: "Đã thanh toán",
};

const orderStatusMap: Record<number, string> = {
  1: "Chưa xác nhận",
  2: "Đã xác nhận",
  3: "Đang giao",
  4: "Đã giao",
  5: "Giao thành công",
  6: "Giao thất bại",
};

const getStatusTag = (status: number) => {
  const colorMap: Record<number, string> = {
    1: "default",
    2: "processing",
    3: "blue",
    4: "green",
    5: "success",
    6: "error",
  };
  return <Tag color={colorMap[status]}>{orderStatusMap[status]}</Tag>;
};

const columns = [
  { title: "STT", dataIndex: "id", key: "id" },
  { title: "Mã đơn hàng", dataIndex: "orderCode", key: "orderCode" },
  { title: "Ngày đặt", dataIndex: "orderDate", key: "orderDate" },
  { title: "Phương thức thanh toán", dataIndex: "paymentMethod", key: "paymentMethod", render: (method: number) => paymentMethodMap[method] },
  { title: "Trạng thái thanh toán", dataIndex: "paymentStatus", key: "paymentStatus", render: (status: number) => paymentStatusMap[status] },
  { title: "Trạng thái đơn hàng", dataIndex: "orderStatus", key: "orderStatus", render: getStatusTag },
  {
    title: "Hành động",
    key: "actions",
    render: () => (
      <Space>
        <Button type="primary">Chỉnh sửa</Button>
        <Button style={{backgroundColor: "#50c878", borderColor: "#50c878"}} type="default">Chi tiết</Button>
      </Space>
    ),
  },
];

const OrderManagement: React.FC = () => {
  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>Quản lý đơn hàng</h1>
      <Card>
        <Table columns={columns} dataSource={orders} rowKey="id" pagination={{ pageSize: 5 }} />
      </Card>
    </div>
  );
};

export default OrderManagement;
