import { Formik } from "formik";
import * as Yup from 'yup';
import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { SnackbarProvider } from "notistack";
import { Orders } from "./Interfaces/Database";
import PageTemplate from "./PageTemplate";
import { formatDateTime } from "./utils";
import DataTable, { TableColumn } from "react-data-table-component";
import OrdersForm from "./OrdersForm";
import DateTimePickerField from "./DateTimePickerField/DateTimePickerField";


const OrderHistory: React.FC<{}> = () => {

    const [showSearchModal, setShowSearchModal] = useState<boolean>(false)
    const [orders, setOrders] = useState<Orders[]>([])

    async function handleLoad() {
        try {
            const ordersResponse: AxiosResponse<Orders[]> = await axios.get("/orders")
            console.log("ordersResponse", ordersResponse)
            setOrders(ordersResponse.data)
        } catch (error) {
            console.log("err", error)
        }
    }
    useEffect(function () {

        handleLoad()
    }, [])

    const columns: TableColumn<any>[] = [
        {
            id: 'OrderId',
            name: "Order Id",
            selector: (row: any) => row.OrderId,
            sortable: true,
        },
        {
            id: 'UserId',
            name: "User Id",
            selector: (row: any) => row.UserName,
            sortable: true,
        },
        {
            id: 'CustomerId',
            name: "Customer Id",
            cell: (row, index, column, id) => {
                if (row.CustomerId) {
                    return <div>
                        {row.CustomerId}
                    </div>
                } else {
                    return <div>
                        Guest
                    </div>
                }
            },
            sortable: true,
        },
        {
            id: 'orderDateTime',
            name: "Order Date&Time",
            cell: (row, index, column, id) => {
                return <div> {formatDateTime(new Date(row.OrderDateTime))} </div>
            },
            sortable: true,
        },
    ];
    return (
        <PageTemplate>
            <SnackbarProvider />
            <div className="container">
                <h1>Order History</h1>
                <div className="mb-4">
                    <Button type="button" variant="primary" onClick={() => { setShowSearchModal(true) }}>
                        Click to Search Orders
                    </Button>
                </div>
                <div>
                    <Button type="button" variant="primary" onClick={async () => { await handleLoad() }}>
                        Reset Order History
                    </Button>
                </div>
                <DataTable
                    columns={columns}
                    data={orders}
                    pagination
                />

                {showSearchModal && (
                    <Modal size="lg" show={showSearchModal} onHide={() => { setShowSearchModal(false) }}>
                        <Modal.Header closeButton>
                            <Modal.Title>Search Customers</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <Formik
                                    initialValues={{
                                        userId: "",
                                        customerId: "",
                                        orderDateTime: ""
                                    }}
                                    validationSchema={Yup.mixed()
                                    }
                                    onSubmit={async (values, { setSubmitting }) => {
                                        console.log(
                                            "SUBMITTED FORM VALUES WITHIN THE ON SUBMIT FUNCTION",
                                            values
                                        );
                                        console.log("orders", orders)
                                        setOrders(
                                            [...orders].filter(e => (e.UserId?.toString() || "").includes(values.userId))
                                                .filter(e => (e.CustomerId?.toString() || "").includes(values.customerId))
                                                .filter(e => (e.OrderDateTime.split("T")[0] === values.orderDateTime))
                                            // .filter(e => e.OrderDateTime.includes(values.orderDateTime))
                                        )
                                        setSubmitting(false);
                                    }}
                                >
                                    {({
                                        values,
                                        errors,
                                        touched,
                                        handleChange,
                                        handleBlur,
                                        handleSubmit,
                                        isSubmitting,
                                    }) => (
                                        <Form onSubmit={handleSubmit} noValidate>
                                            <Container fluid>
                                                <Row>
                                                    <Form.Group
                                                        as={Col}
                                                        sm={12}
                                                        md="6"
                                                        controlId="validationFormik01"
                                                        className="mt-4"
                                                    >
                                                        <Form.Label>User Id</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            name="userId"
                                                            value={values.userId}
                                                            onChange={handleChange}
                                                            isValid={touched.userId && !errors.userId}
                                                            isInvalid={!!errors.userId}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group
                                                        as={Col}
                                                        sm={12}
                                                        md="6"
                                                        controlId="validationFormik02"
                                                        className="mt-4"
                                                    >
                                                        <Form.Label>Customer Id</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            name="customerId"
                                                            value={values.customerId}
                                                            onChange={handleChange}
                                                            isValid={touched.customerId && !errors.customerId}
                                                            isInvalid={!!errors.customerId}
                                                        />
                                                    </Form.Group>
                                                    <Form.Group
                                                        as={Col}
                                                        sm={12}
                                                        md="6"
                                                        controlId="validationFormik03"
                                                        className="mt-4"
                                                    >
                                                        <Form.Label>Order Date</Form.Label>
                                                        <Form.Control
                                                            type="date"
                                                            name="orderDateTime"
                                                            value={values.orderDateTime}
                                                            onChange={handleChange}
                                                            isValid={touched.orderDateTime && !errors.orderDateTime}
                                                            isInvalid={!!errors.orderDateTime}
                                                        />
                                                    </Form.Group>

                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <Button className="my-4" type="submit">
                                                            Submit
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </Container>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </Modal.Body>
                    </Modal>
                )}

            </div>
        </PageTemplate>
    );
}

export default OrderHistory

// {formatDateTime(new Date(order.OrderDateTime))}