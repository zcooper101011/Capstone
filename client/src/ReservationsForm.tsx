import { Formik } from "formik";
import * as Yup from 'yup';
import axios, { AxiosResponse } from 'axios';
import { SnackbarProvider } from "notistack";
import { useEffect, useState } from "react";
import { Reservations, Rooms, Users } from "./Interfaces/Database";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { isWithinRange } from "./utils";
import DateTimePickerField from "./DateTimePickerField/DateTimePickerField";



interface Props {
    onSubmit: any
    reservations?:Reservations;
    doesValidate?: boolean;
}
const ReservationsForm: React.FC<Props> = ({ onSubmit, reservations, doesValidate }) => {

    const [rooms, setRooms] = useState<Rooms[]>([])
    const [users, setUsers] = useState<Users[]>([])
    useEffect(function () {
        async function handleLoad() {
            try {
                const roomResponse: AxiosResponse<Rooms[]> = await axios.get("/rooms")
                console.log("roomsResponse", roomResponse)
                setRooms(roomResponse.data)
                const usersResponse: AxiosResponse<Users[]> = await axios.get("/users")
                console.log("usersResponse", usersResponse)
                setUsers(usersResponse.data)
            } catch (error) {
                console.log("err", error)
            }
        }
        handleLoad()
    }, [])


    return (
        <div>
            <SnackbarProvider />
            <div className="container">
                <Formik
                    initialValues={{
                        userId: reservations?.UserId || "",
                        startTime: reservations?.StartTime || "",
                        roomId: reservations?.RoomId || "",
                    }}
                    validationSchema={!doesValidate ? Yup.mixed() : Yup.object().shape({
                        userId: Yup.string().required('User ID is Required'),
                        roomId: Yup.string().required('Room ID is Required'),
                        startTime: Yup.mixed().test(
                            "isValidPassword",
                            "Time must be between 7:00 am and 5:00pm",
                            function (value: any | undefined) {
                              if (!value) {
                                return false;
                              }
                              return isWithinRange((value as Date).toISOString().split('T')[1]);
                            }
                          )
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
                                        <Form.Label>User Name</Form.Label>
                                        <Form.Control
                                            as="select"
                                            value={values.userId}
                                            onChange={handleChange}
                                            name="userId"
                                            isValid={touched.userId && !errors.userId}
                                            isInvalid={!!errors.userId}
                                        >
                                            <option value={""}></option>
                                            {users.map((element, index) => {
                                                return <option key={index} value={element.UserId}>{element.UserName}</option>
                                            })}
                                        </Form.Control>
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.userId}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group
                                        as={Col}
                                        sm={12}
                                        md="6"
                                        controlId="validationFormik02"
                                        className="mt-4"
                                    >
                                        <Form.Label>Room Number</Form.Label>
                                        <Form.Control
                                            as="select"
                                            value={values.roomId}
                                            onChange={handleChange}
                                            name="roomId"
                                            isValid={touched.roomId && !errors.roomId}
                                            isInvalid={!!errors.roomId}
                                        >
                                            <option value={""}></option>
                                            {rooms.map((element, index) => {
                                                return <option key={index} value={element.RoomId}>{element.RoomNumber}</option>
                                            })}
                                        </Form.Control>
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.roomId}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group
                                        as={Col}
                                        sm={12}
                                        md="6"
                                        controlId="validationFormik02"
                                        className="mt-4"
                                    >
                                        <Form.Label>StartTime</Form.Label>
                                        <DateTimePickerField  maxDetail="hour" minDate={new Date()} name="startTime" />
                                        
                                        
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

export default ReservationsForm
