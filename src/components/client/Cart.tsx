import React from 'react';
import { Card, Button, List, Typography } from 'antd';

export interface Iproduct {
    id: string | number;
    name: string;
    image: string;
    price: number;
    category: string;
    description: string;
    inStock: boolean;
}

interface CartItemProps {
    product: Iproduct;
    quantity: number;
    onRemove: (id: string | number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ product, quantity, onRemove }) => {
    return (
        <List.Item>
            <Card style={{ width: 240 }}>
                <img src={product.image} alt={product.name} style={{ width: '100%' }} />
                <Typography.Title level={4}>{product.name}</Typography.Title>
                <Typography.Text>{product.description}</Typography.Text>
                <Typography.Text strong>{product.price.toLocaleString()} VND</Typography.Text>
                <div>
                    <Typography.Text>Số lượng: {quantity}</Typography.Text>
                    <Button type="link" onClick={() => onRemove(product.id)}>Xóa</Button>
                </div>
            </Card>
        </List.Item>
    );
};

interface CartProps {
    items: { product: Iproduct; quantity: number }[] | undefined;
    onRemove: (id: string | number) => void;
}

const Cart: React.FC<CartProps> = ({ items = [], onRemove }) => {
    const totalPrice = items.reduce((total, item) => total + item.product.price * item.quantity, 0);

    return (
        <div style={{ padding: '20px' }}>
            <Typography.Title level={2}>Giỏ Hàng</Typography.Title>
            {items.length === 0 ? (
                <Typography.Text>Giỏ hàng của bạn đang trống.</Typography.Text>
            ) : (
                <List
                    grid={{ gutter: 16, column: 3 }}
                    dataSource={items}
                    renderItem={(item) => (
                        <CartItem 
                            key={item.product.id}
                            product={item.product}
                            quantity={item.quantity}
                            onRemove={onRemove}
                        />
                    )}
                />
            )}
            <Typography.Title level={3}>Tổng cộng: {totalPrice.toLocaleString()} VND</Typography.Title>
            <Button type="primary" style={{ marginTop: '20px' }}>Thanh Toán</Button>
        </div>
    );
};

export default Cart;