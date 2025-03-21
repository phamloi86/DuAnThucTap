import React, { useEffect, useState } from "react";
import { Card, Table, Button, Space, Tag } from "antd";
import { Link, useNavigate } from "react-router-dom";

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
  6: "Hoàn thành đơn hàng",
  7: "Hủy đơn hàng"
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

const CartAdmin: React.FC = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    fetch("http://localhost:3000/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Lỗi khi lấy danh sách đơn hàng:", err));
  }, []);

  const columns = [
    { title: "STT", dataIndex: "id", key: "id" },
    { title: "Mã đơn hàng", dataIndex: "orderCode", key: "orderCode" },
    { title: "Ngày đặt", dataIndex: "orderDate", key: "orderDate" },
    { 
      title: "Phương thức thanh toán", 
      dataIndex: "paymentMethod", 
      key: "paymentMethod", 
      render: (method: number) => paymentMethodMap[method] 
    },
    { 
      title: "Trạng thái thanh toán", 
      dataIndex: "paymentStatus", 
      key: "paymentStatus", 
      render: (status: number) => paymentStatusMap[status] 
    },
    { 
      title: "Trạng thái đơn hàng", 
      dataIndex: "orderStatus", 
      key: "orderStatus", 
      render: getStatusTag 
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_: any, record: any) => (
        <Space>
          <Link to={`/admin/updatecart/${record.id}`}>
            <Button type="primary">✏ Chỉnh sửa</Button>
          </Link>
          <Link to={`/admin/detailcart/${record.id}`}>
          <Button style={{ backgroundColor: "#50c878", borderColor: "#50c878" }} type="default">
            Chi tiết
          </Button>
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>Quản lý đơn hàng</h1>
      <Card>
        <Table columns={columns} dataSource={orders} rowKey="id" pagination={{ pageSize: 5 }} />
      </Card>
    </div>
  );
};

export default CartAdmin;
