import React, { useEffect, useState } from "react";
import { Card, Col, Descriptions, Row, Table, Typography, Spin } from "antd";
import { useParams } from "react-router-dom";
import axios from "axios";

const DetailCart: React.FC = () => {
  const { id } = useParams();

  // State để lưu dữ liệu từ API
  const [orderData, setOrderData] = useState<any>(null);
  const [userInfo, setUserInfo] = useState<any>(null);
  const [receiverInfo, setReceiverInfo] = useState<any>(null);
  const [orderItems, setOrderItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Gọi API lấy thông tin người đặt, người nhận và danh sách sản phẩm
    const fetchData = async () => {
      try {
        setLoading(true);

        // Lấy danh sách user (giả sử API trả về danh sách user)
        const userResponse = await axios.get("http://localhost:3000/users");
        if (userResponse.data.length > 0) {
          setUserInfo(userResponse.data[0]); // Người đặt hàng
          setReceiverInfo(userResponse.data[1] || userResponse.data[0]); // Người nhận hàng
        }

        // Lấy danh sách sản phẩm (giả sử API trả về danh sách sản phẩm)
        const productResponse = await axios.get("http://localhost:3000/products");
        const products = productResponse.data.map((item: any, index: number) => ({
          key: index + 1,
          name: item.name,
          price: `${item.price} VND`,
          quantity: item.quantity || 1,
          total: `${(item.price * (item.quantity || 1)).toLocaleString()} VND`,
        }));
        setOrderItems(products);

        // Giả lập thông tin đơn hàng
        setOrderData({
          orderId: id,
          orderDate: "2025-03-21",
          status: "Đã giao",
          totalAmount: `${products.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString()} VND`,
          shippingFee: "50,000 VND",
          paymentMethod: "Chuyển khoản",
        });

        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <Spin size="large" style={{ display: "block", textAlign: "center", marginTop: 50 }} />;
  }

  return (
    <div style={{ padding: 20 }}>
      <Typography.Title level={3}>Chi tiết đơn hàng #{orderData?.orderId}</Typography.Title>

      {/* Bố cục 3 cột */}
      <Row gutter={[16, 16]}>
        {/* Cột 1: Thông tin đơn hàng */}
        <Col span={8}>
          <Card title="Thông tin đơn hàng">
            <Descriptions column={1}>
              <Descriptions.Item label="Mã đơn hàng">{orderData?.orderId}</Descriptions.Item>
              <Descriptions.Item label="Ngày đặt hàng">{orderData?.orderDate}</Descriptions.Item>
              <Descriptions.Item label="Trạng thái">{orderData?.status}</Descriptions.Item>
              <Descriptions.Item label="Tổng tiền">{orderData?.totalAmount}</Descriptions.Item>
              <Descriptions.Item label="Phí vận chuyển">{orderData?.shippingFee}</Descriptions.Item>
              <Descriptions.Item label="Thanh toán">{orderData?.paymentMethod}</Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        {/* Cột 2: Thông tin người đặt hàng */}
        <Col span={8}>
          <Card title="Thông tin người đặt hàng">
            <Descriptions column={1}>
              <Descriptions.Item label="Họ tên">{userInfo?.username}</Descriptions.Item>
              <Descriptions.Item label="Email">{userInfo?.email}</Descriptions.Item>
              <Descriptions.Item label="Số điện thoại">{userInfo?.phone}</Descriptions.Item>
              <Descriptions.Item label="Địa chỉ">{userInfo?.address}</Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        {/* Cột 3: Thông tin người nhận hàng */}
        <Col span={8}>
          <Card title="Thông tin người nhận hàng">
            <Descriptions column={1}>
              <Descriptions.Item label="Họ tên">{receiverInfo?.username}</Descriptions.Item>
              <Descriptions.Item label="Email">{receiverInfo?.email}</Descriptions.Item>
              <Descriptions.Item label="Số điện thoại">{receiverInfo?.phone}</Descriptions.Item>
              <Descriptions.Item label="Địa chỉ">{receiverInfo?.address}</Descriptions.Item>
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
