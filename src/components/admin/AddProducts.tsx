import { IproductForm } from "../../interfaces/product";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Card, Form, Input, Button, Typography, message } from "antd";

const { Title } = Typography;

const AddProducts = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IproductForm>();

  const onSubmit = async (data: IproductForm) => {
    try {
      await axios.post(`http://localhost:3000/products`, data);
      message.success("Thêm sản phẩm thành công!");
      navigate("/admin/products");
    } catch (error) {
      message.error("Thêm sản phẩm thất bại!");
    }
  };

  return (
    <Card title={<Title level={3} style={{ textAlign: "center" }}>Thêm Sản Phẩm Mới</Title>} style={{ maxWidth: 600, margin: "20px auto" }}>
      <Link to="/admin/products" style={{ display: "block", textAlign: "center", marginBottom: 16, color: "#1890ff" }}>
        Quay lại trang chủ
      </Link>
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        {/* Tên sản phẩm */}
        <Form.Item label="Tên sản phẩm" validateStatus={errors.name ? "error" : ""} help={errors.name?.message}>
          <Controller
            name="name"
            control={control}
            rules={{ required: "Cần có tên sản phẩm" }}
            render={({ field }) => <Input {...field} placeholder="Nhập tên sản phẩm" />}
          />
        </Form.Item>

        {/* Ảnh sản phẩm */}
        <Form.Item label="Ảnh sản phẩm">
          <Controller
            name="image"
            control={control}
            render={({ field }) => <Input {...field} placeholder="Nhập URL ảnh sản phẩm" />}
          />
        </Form.Item>

        {/* Giá sản phẩm */}
        <Form.Item label="Giá sản phẩm">
          <Controller
            name="price"
            control={control}
            render={({ field }) => <Input type="number" {...field} placeholder="Nhập giá sản phẩm" />}
          />
        </Form.Item>

        {/* Mô tả sản phẩm */}
        <Form.Item label="Mô tả sản phẩm">
          <Controller
            name="description"
            control={control}
            render={({ field }) => <Input.TextArea {...field} placeholder="Nhập mô tả sản phẩm" rows={4} />}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Thêm sản phẩm
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AddProducts;
