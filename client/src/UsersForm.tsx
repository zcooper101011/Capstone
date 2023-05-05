import { Formik } from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import { useEffect, useState } from "react";
import { UserType, Users } from "./Interfaces/Database";
import { SnackbarProvider } from "notistack";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { isValidPassword } from "./utils";


interface Props {
    onSubmit: any
    users?: Users;
    doesValidate?: boolean;
}
const UsersForm: React.FC<Props> = ({ onSubmit, users, doesValidate }) => {

    const [userTypes, setUserTypes] = useState<UserType[]>([])
    useEffect(function () {
        async function handleLoad() {
            try {
                const userTypeResponse = await axios.get("/usertypes")
                console.log("userTypeResponse", userTypeResponse)
                setUserTypes(userTypeResponse.data)
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
                    // Initial form values. Empty Strings, due to form starting out empty
                    initialValues={{
                        userFirstName: users?.UserFirstName || "",
                        userLastName: users?.UserLastName || "",
                        userPassword: "",
                        username: users?.UserName || "",
                        userEmail: users?.UserEmail || "",
                        userTypeId: users?.UserTypeId || "",
                    }}
                    // Prevent user from submitting data unless it matches the exact validation schema listed
                    validationSchema={!doesValidate ? Yup.mixed() : Yup.object().shape({
                        userFirstName: Yup.string().required('First Name is Required'),
                        userLastName: Yup.string().required('Last Name is Required'),
                        userPassword: Yup
                            .string()
                            .test(
                                "isValidPassword",
                                "The password must be at least 6 characters",
                                function (value: string | undefined) {
                                    if (!value) {
                                        return false;
                                    }
                                    return isValidPassword(value)
                                }
                            )
                            .required(),
                        username: Yup.string().required('username is Required'),
                        userEmail: Yup.string().email('Invalid email').required('Email Required'),
                        userTypeId: Yup.string().required('Please select an option'),
                    })
                    }
                    // Function thats called when form is submitted
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
                                            name="userFirstName"
                                            value={values.userFirstName}
                                            onChange={handleChange}
                                            isValid={touched.userFirstName && !errors.userFirstName}
                                            isInvalid={!!errors.userFirstName}
                                        />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.userFirstName}
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
                                            name="userLastName"
                                            value={values.userLastName}
                                            onChange={handleChange}
                                            isValid={touched.userLastName && !errors.userLastName}
                                            isInvalid={!!errors.userLastName}
                                        />

                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.userLastName}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group
                                        as={Col}
                                        sm={12}
                                        md="6"
                                        controlId="validationFormik04"
                                        className="mt-4"
                                    >
                                        <Form.Label>UserName</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="username"
                                            value={values.username}
                                            onChange={handleChange}
                                            isValid={touched.username && !errors.username}
                                            isInvalid={!!errors.username}
                                        />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.username}
                                        </Form.Control.Feedback>
                                    </Form.Group>
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
                                            name="userEmail"
                                            value={values.userEmail}
                                            onChange={handleChange}
                                            isValid={touched.userEmail && !errors.userEmail}
                                            isInvalid={!!errors.userEmail}
                                        />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.userEmail}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
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
                                            name="userPassword"
                                            value={values.userPassword}
                                            onChange={handleChange}
                                            isValid={touched.userPassword && !errors.userPassword}
                                            isInvalid={!!errors.userPassword}
                                        />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.userPassword}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group
                                        as={Col}
                                        sm={12}
                                        md="6"
                                        controlId="validationFormik04"
                                        className="mt-4"
                                    >
                                        <Form.Label>User Type</Form.Label>
                                        <Form.Control
                                            as="select"
                                            value={values.userTypeId}
                                            onChange={handleChange}
                                            name="userTypeId"
                                            isValid={touched.userTypeId && !errors.userTypeId}
                                            isInvalid={!!errors.userTypeId}
                                        >
                                            <option value={""}></option>
                                            {userTypes.map((element, index) => {
                                                return <option key={index} value={element.UserTypeId}>{element.TypeName}</option>
                                            })}
                                        </Form.Control>
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.userTypeId}
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

export default UsersForm
