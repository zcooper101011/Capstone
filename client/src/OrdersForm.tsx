import { Accordion, Button, Card, Col, Container, ListGroup, Modal, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { MenuItems, MenuType } from "./Interfaces/Database";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { useAppSelector } from "./redux/hooks";


const OrdersForm: React.FC<{}> = () => {
    const userData = useAppSelector((state) => state.userData)
    const [menuTypes, setMenuTypes] = useState<MenuType[]>([])
    const [menuItemResponses, setMenuItemResponses] = useState<AxiosResponse<MenuItems[]>[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [showCartModal, setShowCartModal] = useState<boolean>(false)
    const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(false)
    const [order, setOrder] = useState<MenuItems[]>([])
    function calculateTotal(menuitems: MenuItems[]) {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',

            // These options are needed to round to whole numbers if that's what you want.
            //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
            //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
        });
        let total = 0
        for (let menuItem of menuitems) {
            total = parseFloat(menuItem.MenuItemPrice) + total
        }
        return formatter.format(total)
    }
    useEffect(function () {

        async function handleLoad() {
            try {
                const menuTypesResponse: AxiosResponse<any[]> = await axios.get("/menutypes")
                console.log("menuTypesResponse", menuTypesResponse)
                setMenuTypes(menuTypesResponse.data)
                let menuItemResponses = await Promise.all(menuTypesResponse.data.map(type => axios.get("/menuitems/getByMenuTypeId", { params: { menuTypeId: type.MenuTypeId } })))
                console.log(menuItemResponses)
                setMenuItemResponses(menuItemResponses)
                setIsLoading(false)
            } catch (error) {
                console.log("err", error)
            }
        }
        handleLoad()
    }, [])
    useEffect(() => { console.log(order) }, [order])
    return (
        <div id="Orders">
            {isLoading ? (<div><div>
                Is Currently Loading
            </div>
            </div>) : (<div>
                <SnackbarProvider />
                <Container fluid>
                    <Button variant="outline-primary" className="my-4" type="button" onClick={() => {
                        console.log(order)
                        setShowCartModal(true)
                    }} >
                        Order <FontAwesomeIcon icon={faShoppingCart} />
                    </Button>
                    <Accordion>
                        {menuTypes.map((Type, index) => {
                            return (
                                <Accordion.Item eventKey={index.toString()} key={index}>
                                    <Accordion.Header>{Type.MenuTypeName}</Accordion.Header>
                                    <Accordion.Body>
                                                    <Container fluid>
                                                        <Row>
                                        {menuItemResponses[index].data.map((menuItem, index) => {
                                            return (
                                             
                                                            <Col sm="6" md="4">
                                                                <Card className="my-2">
                                                                    <Card.Body>
                                                                        <Card.Title>{menuItem.MenuItemName}</Card.Title>
                                                                        <Card.Text>
                                                                            ${parseFloat(menuItem.MenuItemPrice).toFixed(2)}
                                                                        </Card.Text>
                                                                        <Card.Text>
                                                                            {menuItem.MenuItemDescription}
                                                                        </Card.Text>
                                                                        <Button variant="primary" className="w-100" type="button" onClick={() => {
                                                                            setOrder([...order, menuItem])
                                                                            enqueueSnackbar('added item to order!', { variant: 'success', anchorOrigin: { vertical: "top", horizontal: "right" } })
                                                                        }}>Add to cart</Button>
                                                                    </Card.Body>
                                                                </Card>
                                                            </Col>
                                             
                                            )
                                        })}
                                        </Row>
                                    </Container>
                                    </Accordion.Body>
                                </Accordion.Item>
                            )
                        })}
                    </Accordion>
                    {showCartModal && (
                        <Modal size="lg" show={showCartModal} onHide={() => { setShowCartModal(false) }}>
                            <Modal.Header closeButton>
                                <Modal.Title>Cart</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div>
                                    <ListGroup as="ul" >
                                        {order.map((item, index) => {
                                            return (
                                                <ListGroup.Item
                                                    key={index}
                                                    as="li"
                                                    className="d-flex justify-content-between align-items-start"
                                                >
                                                    <div className="ms-2 me-auto">
                                                        <div className="fw-bold">{item.MenuItemName}</div>
                                                        {item.MenuItemDescription}
                                                    </div>
                                                    <div>
                                                        ${parseFloat(item.MenuItemPrice).toFixed(2)}
                                                    </div>
                                                </ListGroup.Item>
                                            )
                                        })}
                                        <ListGroup.Item
                                            as="li"
                                            className="d-flex justify-content-between align-items-start"
                                        >
                                            <div className="ms-2 me-auto">
                                                <div className="fw-bold">Total</div>
                                            </div>
                                            <div>
                                                {calculateTotal(order)}
                                            </div>

                                        </ListGroup.Item>
                                    </ListGroup>
                                    <Button variant="success" className="my-4" type="button" onClick={async () => {
                                        try {
                                            console.log(order)
                                            let response = await axios.post("/orders", { order, customerId:null, userId:userData.userId })
                                            console.log("response", response)
                                            setShowCartModal(false)
                                            setShowConfirmationModal(true)

                                        } catch (err) {
                                            console.log(err)
                                            enqueueSnackbar('error has occured when creating order', { variant: 'error', anchorOrigin: { vertical: "top", horizontal: "right" } })
                                        }
                                    }}>Confirm Order
                                    </Button>
                                </div>
                            </Modal.Body>
                        </Modal>

                    )}
                    {showConfirmationModal && (
                        <Modal size="lg" show={showConfirmationModal} onHide={() => { setShowConfirmationModal(false) }}>
                            <Modal.Header closeButton>
                                <Modal.Title>Cart</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div>
                                    <div>
                                        Your Order has been Confirmed!
                                    </div>
                                    <Button variant="success" className="my-4" type="button" onClick={() => {
                                        setShowConfirmationModal(false)
                                    }}>OK!
                                    </Button>
                                </div>
                            </Modal.Body>
                        </Modal>

                    )}
                </Container>
            </div>)}
        </div>
    );
}

export default OrdersForm;
