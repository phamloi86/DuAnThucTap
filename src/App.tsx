import { useRoutes } from "react-router-dom";
import ListProducts from "./components/admin/ListProducts";
import AdminLayout from "./layout/admin";
import Dashboard from "./components/admin/Dashboard";
import AddProducts from "./components/admin/AddProducts";
import EditProducts from "./components/admin/EditProducts";
import Home from "./components/client/Home";

export default function App() {
  const routes = useRoutes([
    {path: '/admin',element: <AdminLayout />,children: [
      { path: '', element: <Dashboard /> },
      { path: 'products', element: <ListProducts /> },
      { path: 'addproducts', element: <AddProducts /> },
      { path: 'editproducts/:id', element: <EditProducts /> },
      ],
    },
    // {path:'',element:<ClientLayout/>, children :[
    //   {path:'', element:<Home/>},
    // ]}
    {path:'',element:<Home/>}
  ])
  return routes;
}