import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Iproduct } from "../../interfaces/product";
import { Icategory } from "../../interfaces/category";
import axios from "axios";
import { Table, Button, Typography, Modal, Space, Image } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;
const { Title } = Typography;

const ListProducts = () => {
  const [products, setProducts] = useState<Iproduct[]>([]);
  const [categories, setCategories] = useState<Icategory[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("http://localhost:3000/products");
      setProducts(data);
    };

    const fetchCategories = async () => {
      const { data } = await axios.get("http://localhost:3000/categories");
      setCategories(data);
    };

    fetchProducts();
    fetchCategories();
  }, []);

  const removeItem = async (id: number | string) => {
    confirm({
      title: "Bạn chắc chưa ???",
      icon: <ExclamationCircleOutlined />,
      onOk: async () => {
        await axios.delete(`http://localhost:3000/products/${id}`);
        setProducts(products.filter((item) => item.id !== id));
      },
    });
  };

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (image: string) => <Image width={80} src={image} alt="Product" />,
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price: number) => <span style={{ color: "green", fontWeight: "bold" }}>{price} đ</span>,
    },
    {
      title: "Danh mục",
      dataIndex: "categoryId",
      key: "category",
      render: (categoryId: number) => {
        const category = categories.find((cat) => cat.id === categoryId);
        return category ? category.name : "Không có danh mục";
      },
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      render: (desc: string) => desc || "Chưa có mô tả",
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_: any, record: Iproduct) => (
        <Space>
          <Button danger onClick={() => removeItem(record.id)}>🗑 Xóa</Button>
          <Link to={`/admin/editproducts/${record.id}`}>
            <Button type="primary">✏ Cập nhật</Button>
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: "1200px", margin: "auto", padding: "24px", background: "white", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", marginTop: "24px" }}>
      <Title level={2} style={{ textAlign: "center" }}>Danh sách sản phẩm</Title>
      <div style={{ textAlign: "center", marginBottom: "16px" }}>
        <Link to="/admin/addproducts">
          <Button type="link" style={{ fontSize: "16px", fontWeight: "bold" }}>➕ Thêm sản phẩm mới</Button>
        </Link>
      </div>
      <Table dataSource={products} columns={columns} rowKey="id" bordered />
    </div>
  );
};

export default ListProducts;
