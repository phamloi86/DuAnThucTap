import React from "react";
import { Card, CardContent } from "../ui/Cart";
import { Button } from "../ui/Button";
import { Table } from "../ui/Table"; // Import Table component

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

// Chuyển đổi dữ liệu orders thành mảng 2D
const tableData = orders.map((order, index) => [
  index + 1,
  order.orderCode,
  order.orderDate,
  order.paymentMethod === 1 ? "Chuyển khoản" : order.paymentMethod === 2 ? "Tiền mặt" : "Thẻ tín dụng",
  order.paymentStatus === 1 ? "Chưa thanh toán" : "Đã thanh toán",
  order.orderStatus === 1
    ? "Chưa xác nhận"
    : order.orderStatus === 2
    ? "Đã xác nhận"
    : order.orderStatus === 3
    ? "Đang giao"
    : order.orderStatus === 4
    ? "Đã giao"
    : order.orderStatus === 5
    ? "Giao thành công"
    : "Giao thất bại",
  <div>
    <Button className="mr-2">Chỉnh sửa</Button>
    <Button className="bg-red-600 text-white">Xóa</Button>
  </div>,
]);

const headers = ["STT", "Mã đơn hàng", "Ngày đặt", "Phương thức thanh toán", "Trạng thái thanh toán", "Trạng thái đơn hàng", "Hành động"];

const OrderManagement: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Quản lý đơn hàng</h1>
      <Card>
        <CardContent>
          {/* Sử dụng Table component thay vì viết table trực tiếp */}
          <Table headers={headers} data={tableData} />
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderManagement;
