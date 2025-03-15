import { Button, Typography, Carousel, Image } from "antd";
import { useAuth } from "../../components/auth/AuthContext";

const { Title } = Typography;

const banners = [
  "https://insieutoc.vn/wp-content/uploads/2021/02/mau-banner-dep-mau-vang.jpg",
  "https://theme.hstatic.net/200000061680/1000549213/14/ms_banner_img4.jpg?v=1363",
  "https://nuu.edu.vn/wp-content/uploads/huong-dan-ban-vang-bac-da-quy-kim-cuong-online-internet.jpg",
  "https://i.ytimg.com/vi/4LbTb92bfRk/maxresdefault.jpg",
];

const Home = () => {
  const { user, logout } = useAuth();

  return (
    <div style={{ textAlign: "center", marginTop: "20px", padding: "0 20px" }}>
      {/* Banner chạy tự động */}
      <Carousel autoplay autoplaySpeed={5000} effect="fade" style={{ maxWidth: "1000px", margin: "auto", borderRadius: "10px", overflow: "hidden" }}>
        {banners.map((src, index) => (
          <div key={index}>
            <Image src={src} alt={`Banner ${index + 1}`} preview={false} style={{ width: "100%", borderRadius: "10px" }} />
          </div>
        ))}
      </Carousel>

      {/* Nội dung trang */}
      <div style={{ marginTop: "30px" }}>
        <Title level={2}>Chào mừng đến với trang chủ</Title>
        {user ? (
          <div>
            <p>Xin chào, {user.username}</p>
            <Button type="primary" onClick={logout}>
              Đăng xuất
            </Button>
          </div>
        ) : (
          <p>
            Vui lòng <a href="/register">Đăng ký</a> Hoặc <a href="/login">Đăng nhập</a> để tiếp tục.
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
