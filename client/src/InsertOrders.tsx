
import axios, { AxiosResponse } from 'axios';
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import { Customer, Users } from "./Interfaces/Database";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import OrdersPage from "./Frontend/Orders/OrdersPage";
import PageTemplate from "./PageTemplate";
import OrdersForm from './OrdersForm';

const InsertOrders: React.FC<{}> = () => {

    const [customers, setCustomers] = useState<Customer[]>([])
    const [users, setUsers] = useState<Users[]>([])
    useEffect(function () {
        async function handleLoad() {
            try {
                const customersResponse: AxiosResponse<Customer[]> = await axios.get("/customers")
                console.log("customersResponse", customersResponse)
                setCustomers(customersResponse.data)
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
        <div className="w100">
            <PageTemplate>
                <SnackbarProvider />
                <Container fluid>
                    <OrdersForm />
                </Container>
            </PageTemplate>
        </div>
    );
}

export default InsertOrders
