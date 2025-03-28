import { useEffect, useState } from "react";
import axios from "axios";
import { Carousel, Image, Card, Button, Tag, Spin, Row, Col } from "antd";
import { HeartOutlined, ShoppingCartOutlined, EyeOutlined } from "@ant-design/icons";
import { Iproduct } from "../../interfaces/product";

const banners = [
  "https://insieutoc.vn/wp-content/uploads/2021/02/mau-banner-dep-mau-vang.jpg",
  "https://theme.hstatic.net/200000061680/1000549213/14/ms_banner_img4.jpg?v=1363",
  "https://nuu.edu.vn/wp-content/uploads/huong-dan-ban-vang-bac-da-quy-kim-cuong-online-internet.jpg",
  "https://i.ytimg.com/vi/4LbTb92bfRk/maxresdefault.jpg",
];

const Home = () => {
  const [products, setProducts] = useState<Iproduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios.get("http://localhost:3000/products")
      .then(response => {
        console.log("Dữ liệu API:", response.data);
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else if (response.data && Array.isArray(response.data.products)) {
          setProducts(response.data.products);
        } else {
          setProducts([]);
        }
      })
      .catch(error => {
        console.error("Lỗi khi lấy dữ liệu:", error);
        setProducts([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "20px", padding: "0 20px" }}>
      {/* Banner chạy tự động */}
      <Carousel autoplay autoplaySpeed={3000} effect="fade" style={{ maxWidth: "1000px", margin: "auto" }}>
        {banners.map((src, index) => (
          <div key={index}>
            <Image src={src} alt={`Banner ${index + 1}`} preview={false} style={{ width: "100%", height: "300px", objectFit: "cover", borderRadius: "10px" }} />
          </div>
        ))}
      </Carousel>

      {/* Hiển thị loading nếu dữ liệu chưa tải xong */}
      {loading ? (
        <Spin size="large" style={{ marginTop: "20px" }} />
      ) : (
        <Row gutter={[20, 20]} style={{ marginTop: "20px" }} justify="center">
          {products.length > 0 ? (
            products.map((product) => (
              <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  style={{
                    width: "100%",
                    borderRadius: "10px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.2s",
                  }}
                  cover={
                    <div style={{ padding: "10px", display: "flex", justifyContent: "center" }}>
                      <Image 
                        src={product.image} 
                        alt={product.name} 
                        preview={false} 
                        style={{ width: "200px", height: "200px", objectFit: "cover", borderRadius: "8px" }}
                      />
                    </div>
                  }
                  actions={[
                    <HeartOutlined key="wishlist" style={{ fontSize: "18px", color: "#ff4d4f" }} />, 
                    <ShoppingCartOutlined key="cart" style={{ fontSize: "18px", color: "#1890ff" }} />, 
                    <EyeOutlined key="view" style={{ fontSize: "18px", color: "#52c41a" }} />
                  ]}
                >
                  <div style={{ textAlign: "center" }}>
                    {product.inStock !== undefined && (
                      <Tag color={product.inStock ? "green" : "red"} style={{ fontSize: "14px", fontWeight: "bold" }}>
                        {product.inStock ? "Còn hàng" : "Hết hàng"}
                      </Tag>
                    )}
                    <h3 style={{ fontSize: "16px", fontWeight: "bold", marginTop: "8px" }}>{product.name}</h3>
                    <p style={{ fontSize: "14px", color: "#666" }}>{product.description || "Không có mô tả"}</p>
                    <div>
                      <span style={{ color: "red", fontSize: "18px", fontWeight: "bold" }}>{Number(product.price).toLocaleString()} VND</span>
                    </div>
                    <Button type="primary" icon={<ShoppingCartOutlined />} style={{ marginTop: "10px", borderRadius: "5px" }}>
                      Thêm vào giỏ
                    </Button>
                  </div>
                </Card>
              </Col>
            ))
          ) : (
            <p style={{ fontSize: "16px", fontWeight: "bold", color: "#888" }}>Không có sản phẩm nào để hiển thị!</p>
          )}
        </Row>
      )}
    </div>
  );
};

export default Home;
