import { Formik } from "formik";
import * as Yup from 'yup';
import { SnackbarProvider } from "notistack";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { UserType } from "./Interfaces/Database";

interface Props {
    onSubmit:any
    usertype?:UserType;
    doesValidate?:boolean;
}
const UserTypesForm: React.FC<Props> = ({onSubmit, usertype, doesValidate}) => {

    let options = [
        "Can View HomePage",
        "Create Orders",
        "Manage Inventory",
        "Manage Users",
        "Manage User Types",
        "Manage Menu Items",
        "Manage Menu Types",
        "Manage Reservations",
        "Manage Rooms",
        "Manage Customers",
        "View Order History"
    ];
    return (
        <div>
            <SnackbarProvider />
            <div className="container">
                <Formik
                    initialValues={{
                        typeName:  usertype?.TypeName || "",
                        typeDescription: usertype?.TypeDescription || "",
                        typePermissions: usertype?.TypePermissions || "",
                    }}
                    validationSchema={!doesValidate? Yup.mixed() : Yup.object().shape({
                        typeName: Yup.string().required('Type Name is Required'),
                        typeDescription: Yup.string().required('Description is Required'),
                        typePermissions: Yup.array(Yup.string().required()).min(1).required('Permissions are required'),
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
                            <Container>
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
                                            name="typeName"
                                            value={values.typeName}
                                            onChange={handleChange}
                                            isValid={touched.typeName && !errors.typeName}
                                            isInvalid={!!errors.typeName}
                                        />

                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.typeName}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group
                                        as={Col}
                                        sm={12}
                                        md="6"
                                        controlId="validationFormik02"
                                        className="mt-4"
                                    >
                                        <Form.Label>Type Description</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="typeDescription"
                                            value={values.typeDescription}
                                            onChange={handleChange}
                                            isValid={touched.typeDescription && !errors.typeDescription}
                                            isInvalid={!!errors.typeDescription}
                                        />

                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.typeDescription}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group
                                        as={Col}
                                        sm={12}
                                        md="12"
                                        controlId="validationFormik03"
                                        className="mt-4"
                                    >
                                        <Form.Label>Permissions</Form.Label>
                                        <Form.Control
                                            as="select"
                                            multiple
                                            value={values.typePermissions}
                                            onChange={handleChange}
                                            name="typePermissions"
                                            isValid={touched.typePermissions && !errors.typePermissions}
                                            isInvalid={!!errors.typePermissions}
                                        >
                                            {options.map((option) => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </Form.Control>
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.typePermissions?.toString()}
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

export default UserTypesForm
