import { Formik } from "formik";
import * as Yup from 'yup';
import { SnackbarProvider } from "notistack";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Rooms } from "./Interfaces/Database";

interface Props {
    onSubmit:any
    rooms?:Rooms;
    doesValidate?: boolean;
}
const RoomsForm: React.FC<Props> = ({onSubmit, rooms, doesValidate}) => {

    return (
        <div>
            <SnackbarProvider/>
        <div className="container">
            <Formik
                initialValues={{
                    roomNumber:rooms?.RoomNumber || "",
                    roomDescription: rooms?.RoomDescription || "",
                }}
                validationSchema={!doesValidate ? Yup.mixed() : Yup.object().shape({
                    roomNumber: Yup.string().required('Room Number is Required'),
                    roomDescription: Yup.string().required('Description is Required'),
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
                                        <Form.Label>Room Number</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="roomNumber"
                                            value={values.roomNumber}
                                            onChange={handleChange}
                                            isValid={touched.roomNumber && !errors.roomNumber}
                                            isInvalid={!!errors.roomNumber}
                                        />

                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.roomNumber}
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
                                            name="roomDescription"
                                            value={values.roomDescription}
                                            onChange={handleChange}
                                            isValid={touched.roomDescription && !errors.roomDescription}
                                            isInvalid={!!errors.roomDescription}
                                        />

                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.roomDescription}
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

export default RoomsForm
