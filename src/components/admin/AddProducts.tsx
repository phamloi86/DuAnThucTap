import { IproductForm } from "../../interfaces/product";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Card, Form, Input, Button, Typography, Select, message } from "antd";
import { useEffect, useState } from "react";

const { Title } = Typography;
const { Option } = Select;

const AddProducts = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IproductForm>({
    defaultValues: {
      inStock: true, // Mặc định là "Còn hàng"
    },
  });

  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3000/categories")
      .then((res) => setCategories(res.data))
      .catch(() => message.error("Lỗi khi tải danh mục!"));
  }, []);

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

        {/* Chọn danh mục */}
        <Form.Item label="Danh mục sản phẩm">
          <Controller
            name="categoryId"
            control={control}
            rules={{ required: "Vui lòng chọn danh mục" }}
            render={({ field }) => (
              <Select {...field} placeholder="Chọn danh mục">
                {categories.map((cat) => (
                  <Option key={cat.id} value={cat.id}>
                    {cat.name}
                  </Option>
                ))}
              </Select>
            )}
          />
        </Form.Item>

        {/* Trạng thái còn hàng */}
        <Form.Item label="Trạng thái">
          <Controller
            name="inStock"
            control={control}
            render={({ field }) => (
              <Select {...field} placeholder="Chọn trạng thái">
                <Option value={true}>Còn hàng</Option>
                <Option value={false}>Hết hàng</Option>
              </Select>
            )}
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