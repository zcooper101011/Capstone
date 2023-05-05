import { Formik } from "formik";
import * as Yup from 'yup';
import {  SnackbarProvider } from "notistack";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { MenuType } from "./Interfaces/Database";

interface Props {
    onSubmit:any
    menutypes?:MenuType;
    doesValidate?:boolean;
}
const MenuTypeForm: React.FC<Props> = ({onSubmit, menutypes, doesValidate}) => {

    return (
        <div>
            <SnackbarProvider/>
        <div className="container">
            <Formik
                initialValues={{
                    menuTypeName: menutypes?.MenuTypeName || "",
                    menuTypeDescription: menutypes?.MenuTypeDescription || "",
                }}
                validationSchema={!doesValidate ? Yup.mixed() : Yup.object().shape({
                    menuTypeName: Yup.string().required('Type Name is Required'),
                    menuTypeDescription: Yup.string().required('Description is Required'),
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
                                        <Form.Label>Type Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="menuTypeName"
                                            value={values.menuTypeName}
                                            onChange={handleChange}
                                            isValid={touched.menuTypeName && !errors.menuTypeName}
                                            isInvalid={!!errors.menuTypeName}
                                        />

                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.menuTypeName}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group
                                        as={Col}
                                        sm={12}
                                        md="6"
                                        controlId="validationFormik02"
                                        className="mt-4"
                                    >
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="menuTypeDescription"
                                            value={values.menuTypeDescription}
                                            onChange={handleChange}
                                            isValid={touched.menuTypeDescription && !errors.menuTypeDescription}
                                            isInvalid={!!errors.menuTypeDescription}
                                        />

                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.menuTypeDescription}
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

export default MenuTypeForm
