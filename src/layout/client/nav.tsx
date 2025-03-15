import { useEffect, useState } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import type { Icategory } from "../../interfaces/category";

const Nav = () => {
  const [categories, setCategories] = useState<Icategory[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/categories");
        setCategories(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh mục:", error);
      }
    };
    fetchCategories();
  }, []);

  // Xây dựng danh mục cha và con
  const categoryMap = new Map<number, Icategory[]>();
  categories.forEach((category) => {
    if (!category.parentId) {
      categoryMap.set(category.id, []);
    } else {
      categoryMap.get(category.parentId)?.push(category);
    }
  });

  const menuItems = Array.from(categoryMap.keys()).map((parentId) => {
    const parent = categories.find((cat) => cat.id === parentId);
    if (!parent) return null;

    return {
      key: parent.id,
      label: <Link to={`/category/${parent.slug}`} style={{ color: 'black' }}>{parent.name}</Link>,
      children: categoryMap.get(parent.id)?.map((sub) => ({
        key: sub.id,
        label: <Link to={`/category/${sub.slug}`} style={{ color: 'black' }}>{sub.name}</Link>
      }))
    };
  }).filter(Boolean);

  return (
    <Menu mode="horizontal" style={{ justifyContent: "flex-start", background: "#F5DEB3" }} items={menuItems} />
  );
};

export default Nav;