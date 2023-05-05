import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import logo from "./footerlogo.png";

const PageTemplate: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    return (
        <div className="PageTemplateContainer">
            <div className="Navigation">
            <img src={logo} alt="" />
            <Link to = "/admin/customers">Customers</Link>
            <Link to = "/admin/inventory">Inventory</Link>
            <Link to = "/admin/menuitems">Menu Items</Link>
            <Link to = "/admin/menutypes">Menu Types</Link>
            <Link to = "/admin/orders">Create Orders</Link>
            <Link to = "/admin/orders/history">Order History</Link>
            <Link to = "/admin/reservations">Reservations</Link>
            <Link to = "/admin/rooms">Rooms</Link>
            <Link to = "/admin/users">Users</Link>
            <Link to = "/admin/usertypes">User Types</Link>
            </div>
            <br></br>
            <div className="w-100">{children}</div>
        </div>
    );
};
export default PageTemplate