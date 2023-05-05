import { Formik } from "formik";
import * as Yup from 'yup';
import { SnackbarProvider } from "notistack";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Inventory } from "./Interfaces/Database";

interface Props {
    onSubmit:any
    inventory?:Inventory;
    doesValidate?:boolean;
}
const InventoryForm: React.FC<Props> = ({onSubmit, inventory, doesValidate}) => {

    return (
        <div>
            <SnackbarProvider />
            <div className="container">
                <Formik
                    initialValues={{
                        inventoryName: inventory?.InventoryName || "",
                        inventoryDescription: inventory?.InventoryDescription || "",
                        inventoryQuantity: inventory?.InventoryQuantity || "",
                    }}
                    validationSchema={!doesValidate ? Yup.mixed() : Yup.object().shape({
                        inventoryName: Yup.string().required('Last Name is Required'),
                        inventoryDescription: Yup.string().required('Password is Required'),
                        inventoryQuantity: Yup.string().required('username is Required'),
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
                                        <Form.Label>Inventory Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="inventoryName"
                                            value={values.inventoryName}
                                            onChange={handleChange}
                                            isValid={touched.inventoryName && !errors.inventoryName}
                                            isInvalid={!!errors.inventoryName}
                                        />

                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.inventoryName}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group
                                        as={Col}
                                        sm={12}
                                        md="6"
                                        controlId="validationFormik02"
                                        className="mt-4"
                                    >
                                        <Form.Label>Quantity</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="inventoryQuantity"
                                            value={values.inventoryQuantity}
                                            onChange={handleChange}
                                            isValid={touched.inventoryQuantity && !errors.inventoryQuantity}
                                            isInvalid={!!errors.inventoryQuantity}
                                        />

                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.inventoryQuantity}
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
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="inventoryDescription"
                                            value={values.inventoryDescription}
                                            onChange={handleChange}
                                            isValid={touched.inventoryDescription && !errors.inventoryDescription}
                                            isInvalid={!!errors.inventoryDescription}
                                        />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.inventoryDescription}
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

export default InventoryForm
