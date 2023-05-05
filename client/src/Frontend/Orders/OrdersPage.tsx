import { Col, Container, Row } from "react-bootstrap";
import Footer from "../Footer/Footer";
import FrontPage from "../FrontPage/FrontPage";
import "./orders.css";
import OrdersForm from "../../OrdersForm";

const description = "Our Ordering System makes it easy for everyone to grab lunch or dinnner. Order ahead and we'll have it ready for pickup!";


function OrdersPage() {
    return (
        <div id="Orders">
            <FrontPage title="Orders" description={description} />
            <div style={{marginBottom:"300px", "marginTop":"100px"}}>
           <OrdersForm/>
           </div>
            <Footer/>
        </div>
    );
}

export default OrdersPage;
