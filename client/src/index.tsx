import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import Menu from './Frontend/Menu/Menu';
import About from './Frontend/About/About';
import Contact from './Frontend/Contact/Contact';
import Gallery from './Frontend/Gallery/Gallery';
import Login from './Login';
import ManageMenuItems from './ManageMenuItems';
import ManageCustomers from './ManageCustomers';
import ManageInventory from './ManageInventory';
import ManageMenuTypes from './ManageMenuTypes';
import ManageReservations from './ManageReservations';
import ManageRooms from './ManageRooms';
import ManageUsers from './ManagerUsers';
import ManageUserTypes from './ManageUserTypes';
import ProtectedComponent from './ProtectedComponent';
import OrdersPage from './Frontend/Orders/OrdersPage';
import OrderHistory from './OrderHistory';
import InsertOrders from './InsertOrders';
import { Provider } from 'react-redux';
import { store } from './redux/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/admin" element={<ProtectedComponent element={<HomePage/>} permission='Can View HomePage'/>} />
            <Route path="/admin/customers" element={<ProtectedComponent element={<ManageCustomers/>} permission='Manage Customers'/>} />
            <Route path="/admin/users" element={<ProtectedComponent element={<ManageUsers/>} permission='Manage Users'/>} />
            <Route path="/admin/inventory" element={<ProtectedComponent element={<ManageInventory/>} permission='Manage Inventory'/>} />
            <Route path="/admin/menuitems" element={<ProtectedComponent element={<ManageMenuItems/>} permission='Manage Menu Items'/>} />
            <Route path="/admin/menutypes" element={<ProtectedComponent element={<ManageMenuTypes/>} permission='Manage Menu Types'/>} />
            <Route path="/admin/reservations" element={<ProtectedComponent element={<ManageReservations/>} permission='Manage Reservations'/>} />
            <Route path="/admin/rooms" element={<ProtectedComponent element={<ManageRooms/>} permission='Manage Rooms'/>} />
            <Route path="/admin/orders" element={<ProtectedComponent element={<InsertOrders/>} permission='Create Orders'/>} />
            <Route path="/admin/orders/history" element={<ProtectedComponent element={<OrderHistory/>} permission='View Order History'/>} />
            <Route path="/admin/usertypes" element={<ProtectedComponent element={<ManageUserTypes/>} permission='Manage User Types'/>} />
            <Route path="/admin/login" element={<Login />} />
                    
        </Routes>
      </BrowserRouter>
      </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();