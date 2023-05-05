import axios, { AxiosResponse } from 'axios';
import PageTemplate from "./PageTemplate";
import { useEffect, useState } from "react";
import { Button, Modal, OverlayTrigger } from "react-bootstrap";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { Customer } from "./Interfaces/Database";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import DeleteTooltip from "./DeleteToolTip";
import UpdateTooltip from "./UpdateToolTip";
import CustomersForm from "./CustomersForm";
import DataTable, { TableColumn } from "react-data-table-component";

const ManageCustomers: React.FC<{}> = () => {

    const [customers, setCustomers] = useState<Customer[]>([])
    const [showInsertCustomerModal, setShowInsertCustomerModal] = useState<boolean>(false)
    const [showDeleteCustomerModal, setShowDeleteCustomerModal] = useState<boolean>(false)
    const [showUpdateCustomerModal, setShowUpdateCustomerModal] = useState<boolean>(false)
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | undefined>(undefined)
    const [showSearchModal, setShowSearchModal] = useState<boolean>(false)
    
    async function handleLoad() {
        try {
            const customerResponse: AxiosResponse<any[]> = await axios.get("/customers")
            console.log("customerResponse", customerResponse)
            setCustomers(customerResponse.data)
        } catch (error) {
            console.log("err", error)
        }
    }
    useEffect(function () {
        
        handleLoad()
    }, [])

    const columns: TableColumn<any>[] = [
        {
            id: 'firstname',
            name: "First Name",
            selector: (row: Customer) => row.CustomerFirstName,
            sortable: true,
        },
        {
            id: 'lastname',
            name: "Last Name",
            selector: (row: Customer) => row.CustomerLastName,
            sortable: true,
        },
        {
            id: 'email',
            name: "Email",
            selector: (row: Customer) => row.CustomerEmail,
            sortable: true,
        },
        {
            id: 'edit-row',
            name: '',
            sortable: false,
            cell: (row, index, column, id) => {
                return <div style={{ cursor: 'pointer' }} onClick={() => {
                    setSelectedCustomer(row)
                    setShowUpdateCustomerModal(true)
                }}>
                    <OverlayTrigger
                        placement="right"
                        delay={{ show: 250, hide: 400 }}
                        overlay={UpdateTooltip}
                    >
                        <FontAwesomeIcon icon={faPen} />
                    </OverlayTrigger>

                </div>
            }
        },
        {
            id: 'delete-row',
            name: '',
            sortable: false,
            cell: (row, index, column, id) => {
                return <div><div style={{ cursor: 'pointer' }} onClick={() => {
                    setSelectedCustomer(row)
                    setShowDeleteCustomerModal(true)
                }}>
                    <OverlayTrigger
                        placement="right"
                        delay={{ show: 250, hide: 400 }}
                        overlay={DeleteTooltip}
                    >
                        <FontAwesomeIcon icon={faTrashCan} />
                    </OverlayTrigger>

                </div></div>
            }
        }
    ];
    return (
        <PageTemplate>
            <SnackbarProvider />
            <div className="container">
                <h1>Manage Customers</h1>
                <div>
                    <Button className="mb-4" type="button" variant="primary" onClick={() => { setShowSearchModal(true) }}>
                        Click to Search Customer
                    </Button>
                </div>
                <div>
                <Button type="button" variant="primary" onClick={async() => {await handleLoad() }}>
                        Reset Customers
                    </Button>
                </div>
                <DataTable
                    columns={columns}
                    data={customers}
                    pagination
                />
                <Button type="button" variant="primary" onClick={() => { setShowInsertCustomerModal(true) }}>
                    Click to Insert Customer
                </Button>
                {/* Insert Modal */}
                {showInsertCustomerModal && (
                    <Modal size="lg" show={showInsertCustomerModal} onHide={() => { setShowInsertCustomerModal(false) }}>
                        <Modal.Header closeButton>
                            <Modal.Title>Insert Customers</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <CustomersForm doesValidate={true} onSubmit={async (values: any) => {
                                    try {
                                        const response = await axios.post("/customers", values)
                                        console.log("response", response)
                                        enqueueSnackbar('Successfully inserted customer!', { variant: 'success', anchorOrigin: { vertical: "top", horizontal: "right" } })
                                    } catch (error) {
                                        console.log("err", error)
                                        enqueueSnackbar('An error has occured, customer not inserted!', { variant: 'error', anchorOrigin: { vertical: "top", horizontal: "right" } })
                                    }
                                }} />
                            </div>
                        </Modal.Body>
                    </Modal>
                )}

                {/* Update Modal */}
                {showUpdateCustomerModal && (
                    <Modal size="lg" show={showUpdateCustomerModal} onHide={() => { setShowUpdateCustomerModal(false) }}>
                        <Modal.Header closeButton>
                            <Modal.Title>Update Customers</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <CustomersForm doesValidate={true} customer={selectedCustomer} onSubmit={async (values: any) => {
                                    try {
                                        const response = await axios.patch("/customers", { ...values, customerId: selectedCustomer?.CustomerId })
                                        console.log("response", response)
                                        enqueueSnackbar('Successfully updated customer!', { variant: 'success', anchorOrigin: { vertical: "top", horizontal: "right" } })
                                    } catch (error) {
                                        console.log("err", error)
                                        enqueueSnackbar('An error has occured, customer not updated!', { variant: 'error', anchorOrigin: { vertical: "top", horizontal: "right" } })
                                    }
                                }} />
                            </div>
                        </Modal.Body>
                    </Modal>
                )}

                {/* Search Modal */}
                {showSearchModal && (
                    <Modal size="lg" show={showSearchModal} onHide={() => { setShowSearchModal(false) }}>
                        <Modal.Header closeButton>
                            <Modal.Title>Search Customers</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <CustomersForm onSubmit={async (values: any) => {
                                    setCustomers(
                                        [...customers].filter(c => c.CustomerFirstName.includes(values.customerFirstName))
                                        .filter(c => c.CustomerLastName.includes(values.customerLastName))
                                        .filter(c => c.CustomerEmail.includes(values.customerEmail))
                                    )
                                }} />
                            </div>
                        </Modal.Body>
                    </Modal>
                )}

                {/* Delete Modal */}
                {showDeleteCustomerModal && (
                    <Modal size="lg" show={showDeleteCustomerModal} onHide={() => { setShowDeleteCustomerModal(false) }}>
                        <Modal.Header closeButton>
                            <Modal.Title>Delete Customer</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <p>
                                    Are You Sure You Want To Delete This Customer?
                                </p>
                                <Button type="button" className="me-4" variant="danger" onClick={async () => {
                                    try {
                                        let response = await axios.delete("/customers", { headers: { customerId: selectedCustomer?.CustomerId } })
                                        console.log("customer delete", response)
                                        enqueueSnackbar('Successfully deleted customer!', { variant: 'success', anchorOrigin: { vertical: "top", horizontal: "right" } })
                                    } catch (error) {
                                        enqueueSnackbar('error occured!', { variant: 'error', anchorOrigin: { vertical: "top", horizontal: "right" } })
                                    }
                                    setShowDeleteCustomerModal(false)
                                }}>
                                    Confirm Delete
                                </Button>
                                <Button type="button" variant="secondary" onClick={() => { setShowDeleteCustomerModal(false) }}>
                                    Deny Delete
                                </Button>
                            </div>
                        </Modal.Body>
                    </Modal>
                )}

            </div>
        </PageTemplate>
    );
}

export default ManageCustomers
