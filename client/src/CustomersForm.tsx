import { Formik } from "formik";
import * as Yup from 'yup';
import { SnackbarProvider } from "notistack";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Customer } from "./Interfaces/Database";

interface Props {
    onSubmit: any;
    customer?: Customer;
    doesValidate?: boolean;
}
const CustomersForm: React.FC<Props> = ({ onSubmit, customer, doesValidate }) => {

    return (
        <div>
            <SnackbarProvider />
            <div className="container">
                <Formik
                    initialValues={{
                        customerFirstName: customer?.CustomerFirstName || "",
                        customerLastName: customer?.CustomerLastName || "",
                        customerPassword: "",
                        customerEmail: customer?.CustomerEmail || ""
                    }}
                    validationSchema={!doesValidate ? Yup.mixed() : Yup.object().shape({
                        customerFirstName: Yup.string().required('First Name is Required'),
                        customerLastName: Yup.string().required('Last Name is Required'),
                        customerPassword: Yup.string().required('Password is Required'),
                        customerEmail: Yup.string().email('Invalid email').required('Email Required'),
                    })
                    }
                    onSubmit={async (values, { setSubmitting }) => {
                        console.log(
                            "SUBMITTED FORM VALUES WITHIN THE ON SUBMIT FUNCTION",
                            values
                        );
                        onSubmit(values)
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
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="customerFirstName"
                                            value={values.customerFirstName}
                                            onChange={handleChange}
                                            isValid={touched.customerFirstName && !errors.customerFirstName}
                                            isInvalid={!!errors.customerFirstName}
                                        />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.customerFirstName}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group
                                        as={Col}
                                        sm={12}
                                        md="6"
                                        controlId="validationFormik02"
                                        className="mt-4"
                                    >
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="customerLastName"
                                            value={values.customerLastName}
                                            onChange={handleChange}
                                            isValid={touched.customerLastName && !errors.customerLastName}
                                            isInvalid={!!errors.customerLastName}
                                        />

                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.customerLastName}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group
                                        as={Col}
                                        sm={12}
                                        md="6"
                                        controlId="validationFormik03"
                                        className="mt-4"
                                    >
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="customerEmail"
                                            value={values.customerEmail}
                                            onChange={handleChange}
                                            isValid={touched.customerEmail && !errors.customerEmail}
                                            isInvalid={!!errors.customerEmail}
                                        />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.customerEmail}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group
                                        as={Col}
                                        sm={12}
                                        md="6"
                                        controlId="validationFormik04"
                                        className="mt-4"
                                    >
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="customerPassword"
                                            value={values.customerPassword}
                                            onChange={handleChange}
                                            isValid={touched.customerPassword && !errors.customerPassword}
                                            isInvalid={!!errors.customerPassword}
                                        />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.customerPassword}
                                        </Form.Control.Feedback>
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
        </div>
    );
}

export default CustomersForm

