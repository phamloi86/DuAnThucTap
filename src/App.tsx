import { useRoutes } from "react-router-dom";
import ListProducts from "./components/admin/ListProducts";
import AdminLayout from "./layout/admin";
import Dashboard from "./components/admin/Dashboard";
import AddProducts from "./components/admin/AddProducts";
import EditProducts from "./components/admin/EditProducts";
import Home from "./components/client/Home";
import ListCategory from "./components/admin/ListCategory";
import AddCategory from "./components/admin/AddCategory";
import EditCategory from "./components/admin/EditCategory";
import ListUser from "./components/admin/ListUser";
import AddUser from "./components/admin/AddUser";
import EditUser from "./components/admin/EditUser";
import Login from "./components/auth/Login";
import { AuthProvider } from "../src/components/auth/AuthContext";
import ProtectedRoute from "../src/components/auth/ProtectedRoute";
import Register from "./components/auth/Register";
import RegisterAdmin from "./components/auth/RegisterAdmin";
import ClientLayout from "./layout/client"; // Import layout mới
import Cart from "./components/client/Cart";
import GoldPriceTable from "./components/client/GoldPrice";
import CartAdmin from "./components/admin/CartAdmin";
import UpdateCart from "./components/admin/UpdateCart";

export default function App() {
  const routes = useRoutes([
    // Route Admin (Chỉ dành cho Admin)
    {
      path: "/admin",
      element: (
        <ProtectedRoute adminOnly>
          <AdminLayout />
        </ProtectedRoute>
      ),
      children: [
        { path: "/admin/updatecart/:id", element: <UpdateCart />},
        { path: "cart", element: <CartAdmin /> },
        { path: "", element: <Dashboard /> },
        { path: "products", element: <ListProducts /> },
        { path: "addproducts", element: <AddProducts /> },
        { path: "editproducts/:id", element: <EditProducts /> },
        { path: "category", element: <ListCategory /> },
        { path: "addcategory", element: <AddCategory /> },
        { path: "editcategory/:id", element: <EditCategory /> },
        { path: "users", element: <ListUser /> },
        { path: "addusers", element: <AddUser /> },
        { path: "editusers/:id", element: <EditUser /> },
      ],
    },

    // Route Client (Dành cho người dùng)
    {
      path: "/",
      element: <ClientLayout />, // Áp dụng layout client cho user
      children: [
        { path: "", element: <Home /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path:"cart", element:<Cart/> },
        { path:"goldprice", element:<GoldPriceTable/> }

      ],
    },

    // Route ẩn dành cho admin đăng ký
    { path: "/im_dev__do_u_know_that", element: <RegisterAdmin /> },
  ]);

  return <AuthProvider>{routes}</AuthProvider>;
}
