import axios from "axios";
import { Formik } from "formik"
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';

const Login: React.FC<{}> = () => {
    const navigate = useNavigate()
    return (<div>
        <Formik
            validationSchema={Yup.object().shape({
                username: Yup.string().required('Username is Required'),
                password: Yup.string().required('Password is Required'),
            })
            }
            onSubmit={async (values, { setSubmitting }) => {
                console.log(
                    "SUBMITTED FORM VALUES WITHIN THE ON SUBMIT FUNCTION",
                    values
                );
                try {
                    const response = await axios.post("/login", values)
                    console.log("response", response)
                    sessionStorage.setItem('token',response.data.token)
                    navigate('/admin')
                    // enqueueSnackbar('Successfully inserted user type!', {variant:'success'})
                } catch (error) {
                    console.log("err", error)
                }
                setSubmitting(false);
            }}

            initialValues={{
                username: '',
                password: '',
            }}
        >
            {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                touched,
                isValid,
                errors,
            }) => (
                <Form noValidate onSubmit={handleSubmit}>
                    <Container>
                        <Row className="mb-3">
                            <Form.Group as={Col} sm="12" md="6" controlId="validationFormik01">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="username"
                                    value={values.username}
                                    onChange={handleChange}
                                    isValid={touched.username && !errors.username}
                                />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} sm="12" md="6" controlId="validationFormik02">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    isValid={touched.password && !errors.password}
                                />
                            </Form.Group>
                        </Row>
                    <Button type="submit">Login</Button>
                    </Container>
                </Form>
            )}
        </Formik>
    </div>)
}


export default Login