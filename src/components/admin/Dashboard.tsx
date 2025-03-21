import React from "react";
import { Card, Row, Col, Statistic } from "antd";
import { Bar } from "react-chartjs-2";
import {
  DollarCircleOutlined,
  ShoppingCartOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";
import "chart.js/auto";

const DashBoard: React.FC = () => {
  // Dữ liệu giả lập
  const revenue = 50000000; // Tổng doanh thu
  const stock = 150; // Số lượng hàng tồn
  const soldOrders = 320; // Đơn hàng đã bán

  const labels = ["15/03", "16/03", "17/03", "18/03", "19/03"];
  const data = [10000000, 12000000, 15000000, 9000000, 11000000];

  const chartData = {
    labels,
    datasets: [
      {
        label: "Doanh Thu (VND)",
        data,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ padding: 24 }}>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card>
            <Statistic
              title="Tổng Doanh Thu"
              value={revenue}
              suffix="VNĐ"
              prefix={<DollarCircleOutlined style={{ color: "#1890ff" }} />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Số lượng hàng còn"
              value={stock}
              prefix={<DatabaseOutlined style={{ color: "#ff4d4f" }} />}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="Đơn hàng đã bán"
              value={soldOrders}
              prefix={<ShoppingCartOutlined style={{ color: "#52c41a" }} />}
            />
          </Card>
        </Col>
      </Row>

      <Card style={{ marginTop: 20 }}>
        <h3>Doanh Thu 5 Ngày Gần Nhất</h3>
        <Bar data={chartData} />
      </Card>
    </div>
  );
};

export default DashBoard;
