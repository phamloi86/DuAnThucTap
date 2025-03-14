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

export default function App() {
  const routes = useRoutes([
    {path: '/admin',element: <AdminLayout />,children: [
      { path: '', element: <Dashboard /> },
      //sản phẩm
      { path: 'products', element: <ListProducts /> },
      { path: 'addproducts', element: <AddProducts /> },
      { path: 'editproducts/:id', element: <EditProducts /> },
      //Danh mục
      { path: 'category', element: <ListCategory /> },
      { path: 'addcategory', element: <AddCategory /> },
      { path: 'editcategory/:id', element: <EditCategory /> },
      //người dùng
      { path: 'users', element: <ListUser /> },
      { path: 'addusers', element: <AddUser /> },
      { path: 'editusers/:id', element: <EditUser /> },
      ],
    },
    // {path:'',element:<ClientLayout/>, children :[
    //   {path:'', element:<Home/>},
    // ]}
    {path:'',element:<Home/>}
  ])
  return routes;
}