import { useState } from 'react';
import { Layout, Menu, Dropdown, Button } from 'antd';
import { Link } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';

const { Sider } = Layout;

const SidebarAdmin = () => {
    const productMenu = (
        <Menu>
            <Menu.Item>
                <Link to="/admin/products">Danh sách</Link>
            </Menu.Item>
            <Menu.Item>
                <Link to="/admin/addproducts">Thêm mới</Link>
            </Menu.Item>
        </Menu>
    );

    const orderMenu = (
        <Menu>
            <Menu.Item>
                <Link to="/admin/orders">Danh sách</Link>
            </Menu.Item>
            <Menu.Item>
                <Link to="/admin/addorders">Thêm mới</Link>
            </Menu.Item>
        </Menu>
    );

    const categoryMenu = (
        <Menu>
            <Menu.Item>
                <Link to="/admin/category">Danh sách</Link>
            </Menu.Item>
            <Menu.Item>
                <Link to="/admin/addcategory">Thêm mới</Link>
            </Menu.Item>
        </Menu>
    );

    return (
        <Sider width={250} className="h-screen bg-white p-4 shadow-md">
            <Menu mode="vertical" className="text-center" defaultSelectedKeys={['1']}>
                <Menu.Item key="1" className="font-bold">
                    <Link to="/admin" >Dashboard</Link>
                </Menu.Item>
                <Menu.Item key="2" className="font-bold">
                    <Dropdown overlay={productMenu} trigger={["click"]}>
                        <Button type="text">Sản phẩm <DownOutlined /></Button>
                    </Dropdown>
                </Menu.Item>
                <Menu.Item key="3" className="font-bold">
                    <Dropdown overlay={orderMenu} trigger={["click"]}>
                        <Button type="text">Đơn hàng <DownOutlined /></Button>
                    </Dropdown>
                </Menu.Item>
                <Menu.Item key="4" className="font-bold">
                    <Dropdown overlay={categoryMenu} trigger={["click"]}>
                        <Button type="text">Danh mục <DownOutlined /></Button>
                    </Dropdown>
                </Menu.Item>
            </Menu>
        </Sider>
    );
};

export default SidebarAdmin;
