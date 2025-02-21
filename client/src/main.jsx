import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from "./redux/store";
import { Provider } from "react-redux";

import { Route, RouterProvider, createRoutesFromElements } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import Register from './pages/Auth/Register.jsx';
import Reset from './pages/Auth/Reset';
import Login from './pages/Auth/Login';
import PrivateRoute from "./components/PrivateRoute";
import Profile from './pages/User/Profile';
import AdminRoute from './pages/Admin/AdminRoute.jsx';
import UserList from './pages/Admin/UserList.jsx';
import AdminDashboard from './pages/Admin/AdminDashboard.jsx';
import CategoryList from './pages/Admin/CategoryList.jsx';
import ProductList from './pages/Admin/ProductList.jsx';
import ProductUpdate from './pages/Admin/ProductUpdate.jsx';
import AllProducts from './pages/Admin/AllProducts.jsx';
import Home from './pages/Home.jsx';
import Favorites from './pages/Products/Favorites.jsx';
import ProductDetails from './pages/Products/ProductDetails.jsx';
import Shop from './pages/Shop.jsx';
import Cart from './pages/Cart.jsx';
import OrderList from './pages/Admin/OrderList.jsx';
import Shipping from './pages/Orders/Shipping.jsx';
import PlaceOrder from './pages/Orders/PlaceOrder.jsx';
import Order from './pages/Orders/Order.jsx';
import PaymentSuccess from './pages/Payment/PaymentSuccess.jsx';
import PaymentFailed from './pages/Payment/PaymentFailed.jsx';
import PaymentCancel from './pages/Payment/PaymentCancel.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path='/reset' element={<Reset />} />

      <Route index={true} path="/" element={<Home />} />
      <Route path="/favorite" element={<Favorites />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/cart" element={<Cart />} />

      <Route path='' element={<PrivateRoute />}>
        <Route path='/profile' element={<Profile />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/order/:id" element={<Order />} />
        <Route path="/payment/success/:tran_id" element={<PaymentSuccess />} />
        <Route path="/payment/fail/:tran_id" element={<PaymentFailed />} />
        <Route path="/payment/cancel/:tran_id" element={<PaymentCancel />} />
      </Route>

      <Route path="/admin" element={<AdminRoute />} >
        <Route path='userlist' element={<UserList />} />
        <Route path='dashboard' element={<AdminDashboard />} />
        <Route path='categorylist' element={<CategoryList />} />
        <Route path="allproductslist" element={<AllProducts />} />
        <Route path="productlist" element={<ProductList />} />
        <Route path="product/update/:_id" element={<ProductUpdate />} />
        <Route path='orderlist' element={<OrderList />}></Route>
      </Route>

    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
