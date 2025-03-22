import React, { createContext, useContext, useState, ReactNode } from "react";

interface Order {
  id: number;
  orderCode: string;
  orderDate: string;
  paymentMethod: number;
  paymentStatus: number;
  orderStatus: number;
}

// Danh sách đơn hàng mặc định
const initialOrders: Order[] = [
  { id: 1, orderCode: "DH001", orderDate: "2025-03-17", paymentMethod: 1, paymentStatus: 1, orderStatus: 2 },
  { id: 2, orderCode: "DH002", orderDate: "2025-03-16", paymentMethod: 2, paymentStatus: 2, orderStatus: 3 },
];

// Định nghĩa Context
interface OrderContextType {
  orders: Order[];
  updateOrder: (updatedOrder: Order) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

// Provider để bọc App
export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const updateOrder = (updatedOrder: Order) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => (order.id === updatedOrder.id ? updatedOrder : order))
    );
  };

  return (
    <OrderContext.Provider value={{ orders, updateOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

// Hook để sử dụng OrderContext
export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrderProvider");
  }
  return context;
};
