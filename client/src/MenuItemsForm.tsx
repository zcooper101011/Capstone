import { Formik } from "formik";
import * as Yup from 'yup';
import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from "react";
import { MenuItems, MenuType } from "./Interfaces/Database";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { SnackbarProvider } from "notistack";

interface Props {
    onSubmit:any
    menuitem?:MenuItems;
    doesValidate?:boolean;
} 
const MenuItemsForm: React.FC<Props> = ({onSubmit, menuitem, doesValidate}) => {

    const [menuTypes, setMenuTypes] = useState<MenuType[]>([])
    useEffect(function () {
        async function handleLoad() {
            try {
                const menuTypeResponse: AxiosResponse<MenuType[]> = await axios.get("/menutypes")
                console.log("menuTypeResponse", menuTypeResponse)
                setMenuTypes(menuTypeResponse.data)
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
                        menuTypeId: menuitem?.MenuTypeId || "",
                        menuItemName: menuitem?.MenuItemName || "",
                        menuItemPrice: menuitem?.MenuItemPrice || "",
                        menuItemDescription: menuitem?.MenuItemDescription || ""
                    }}
                    validationSchema={!doesValidate ? Yup.mixed() : Yup.object().shape({
                        menuTypeId: Yup.string().required('Menu Type is Required'),
                        menuItemName: Yup.string().required(' Item Name is Required'),
                        menuItemPrice: Yup.string().required('Item Price is Required'),
                        menuItemDescription: Yup.string().required('Description is Required'),
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
                                        <Form.Label>Item Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="menuItemName"
                                            value={values.menuItemName}
                                            onChange={handleChange}
                                            isValid={touched.menuItemName && !errors.menuItemName}
                                            isInvalid={!!errors.menuItemName}
                                        />

                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.menuItemName}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group
                                        as={Col}
                                        sm={12}
                                        md="6"
                                        controlId="validationFormik02"
                                        className="mt-4"
                                    >
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="menuItemPrice"
                                            value={values.menuItemPrice}
                                            onChange={handleChange}
                                            isValid={touched.menuItemPrice && !errors.menuItemPrice}
                                            isInvalid={!!errors.menuItemPrice}
                                        />

                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.menuItemPrice}
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
                                            name="menuItemDescription"
                                            value={values.menuItemDescription}
                                            onChange={handleChange}
                                            isValid={touched.menuItemDescription && !errors.menuItemDescription}
                                            isInvalid={!!errors.menuItemDescription}
                                        />
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.menuItemDescription}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group
                                        as={Col}
                                        sm={12}
                                        md="6"
                                        controlId="validationFormik04"
                                        className="mt-4"
                                    >
                                        <Form.Label>Item Type</Form.Label>
                                        <Form.Control
                                            as="select"
                                            value={values.menuTypeId}
                                            onChange={handleChange}
                                            name="menuTypeId"
                                            isValid={touched.menuTypeId && !errors.menuTypeId}
                                            isInvalid={!!errors.menuTypeId}
                                        >
                                            <option value={""}></option>
                                            {menuTypes.map((element, index) => {
                                                return <option key={index} value={element.MenuTypeId}>{element.MenuTypeName}</option>
                                            })}
                                        </Form.Control>
                                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.menuTypeId}
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

export default MenuItemsForm








// OLD Method for reference
// <select
// name="menuTypeId"
// value={values.menuTypeId}
// onChange={handleChange}
// onBlur={handleBlur}
// >
// <option value={""}></option>
// {menuTypes.map((element, index) => {
//     return <option key={index} value={element.MenuTypeId}>{element.MenuTypeName}</option>
// })}
// </select>