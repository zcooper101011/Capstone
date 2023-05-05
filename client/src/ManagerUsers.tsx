import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from "react";
import { Button, Modal, OverlayTrigger } from "react-bootstrap";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import PageTemplate from "./PageTemplate";
import DeleteTooltip from "./DeleteToolTip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import UpdateTooltip from "./UpdateToolTip";
import UsersForm from "./UsersForm";
import DataTable, { TableColumn } from "react-data-table-component";
import { Users } from "./Interfaces/Database";


const ManageUsers: React.FC<{}> = () => {

    const [users, setUsers] = useState<any[]>([])
    const [showInsertUsersModal, setShowInsertUsersModal] = useState<boolean>(false)
    const [showDeleteUserModal, setShowDeleteUserModal] = useState<boolean>(false)
    const [showUpdateUserModal, setShowUpdateUserModal] = useState<boolean>(false)
    const [selectedUsers, setSelectedUsers] = useState<Users | undefined>(undefined)
    const [showSearchModal, setShowSearchModal] = useState<boolean>(false)

    async function handleLoad() {
        try {
            const usersResponse: AxiosResponse<any[]> = await axios.get("/users")
            console.log("usersResponse", usersResponse)
            setUsers(usersResponse.data)
        } catch (error) {
            console.log("err", error)
        }
    }
    useEffect(function () {

        handleLoad()
    }, [])

    const columns: TableColumn<any>[] = [
        {
            id: 'userFirstName',
            name: "First Name",
            selector: (row: any) => row.UserFirstName,
            sortable: true,
        },
        {
            id: 'userLastName',
            name: "Last Name",
            selector: (row: any) => row.UserLastName,
            sortable: true,
        },
        {
            id: 'userName',
            name: "Username",
            selector: (row: any) => row.UserName,
            sortable: true,
        },
        {
            id: 'userEmail',
            name: "Email",
            selector: (row: any) => row.UserEmail,
            sortable: true,
        },
        {
            id: 'userTypeName',
            name: "Type Name",
            selector: (row: any) => row.TypeName,
            sortable: true,
        },
        {
            id: 'edit-row',
            name: '',
            sortable: false,
            cell: (row, index, column, id) => {
                return <div style={{ cursor: 'pointer' }} onClick={() => {
                    setSelectedUsers(row)
                    setShowUpdateUserModal(true)
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
                    setSelectedUsers(row)
                    setShowDeleteUserModal(true)
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
                <h1>Manage Users</h1>
                <div className="mb-4">
                    <Button type="button" variant="primary" onClick={() => { setShowSearchModal(true) }}>
                        Click to Search Users
                    </Button>
                </div>
                <div>
                <Button type="button" variant="primary" onClick={async() => { await handleLoad()}}>
                        Reset Users
                    </Button>
                </div>
                <DataTable
                    columns={columns}
                    data={users}
                    pagination
                />
                <Button type="button" variant="primary" onClick={() => { setShowInsertUsersModal(true) }}>
                    Click to Insert User
                </Button>
                {showInsertUsersModal && (
                    <Modal size="lg" show={showInsertUsersModal} onHide={() => { setShowInsertUsersModal(false) }}>
                        <Modal.Header closeButton>
                            <Modal.Title>Insert User</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <UsersForm doesValidate={true} onSubmit={async (values: any) => {
                                    try {
                                        const response = await axios.post("/users", values)
                                        console.log("response", response)
                                        enqueueSnackbar('Successfully inserted user!', { variant: 'success', anchorOrigin: { vertical: "top", horizontal: "right" } })
                                    } catch (error) {
                                        console.log("err", error)
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
                                <UsersForm onSubmit={async (values: any) => {
                                    setUsers(
                                        [...users].filter(e => e.UserFirstName.includes(values.userFirstName))
                                            .filter(e => e.UserLastName.includes(values.userLastName))
                                            .filter(e => e.UserName.includes(values.username))
                                            .filter(e => e.UserEmail.includes(values.userEmail))
                                            .filter(e => e.UserTypeId.toString().includes(values.userTypeId))
                                    )
                                }} />
                            </div>
                        </Modal.Body>
                    </Modal>
                )}

                {showUpdateUserModal && (
                    <Modal size="lg" show={showUpdateUserModal} onHide={() => { setShowUpdateUserModal(false) }}>
                        <Modal.Header closeButton>
                            <Modal.Title>Update User</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <UsersForm doesValidate={true} users={selectedUsers} onSubmit={async (values: any) => {
                                    try {
                                        const response = await axios.patch("/users", { ...values, userId: selectedUsers?.UserId })
                                        console.log("response", response)
                                        enqueueSnackbar('Successfully updated user!', { variant: 'success', anchorOrigin: { vertical: "top", horizontal: "right" } })
                                    } catch (error) {
                                        console.log("err", error)
                                    }
                                }} />
                            </div>
                        </Modal.Body>
                    </Modal>
                )}

                {showDeleteUserModal && (
                    <Modal size="lg" show={showDeleteUserModal} onHide={() => { setShowDeleteUserModal(false) }}>
                        <Modal.Header closeButton>
                            <Modal.Title>Delete User</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <p>
                                    Are you sure you want to delete this user?
                                </p>
                                <Button type="button" className="me-4" variant="danger" onClick={async () => {
                                    try {
                                        let response = await axios.delete("/users", { headers: { userId: selectedUsers?.UserId } })
                                        console.log("user delete", response)
                                        enqueueSnackbar('Successfully deleted user!', { variant: 'success', anchorOrigin: { vertical: "top", horizontal: "right" } })
                                    } catch (error) {
                                        enqueueSnackbar('error occured!', { variant: 'error', anchorOrigin: { vertical: "top", horizontal: "right" } })
                                    }
                                    setShowDeleteUserModal(false)
                                }}>
                                    Confirm Delete
                                </Button>
                                <Button type="button" variant="secondary" onClick={() => { setShowDeleteUserModal(false) }}>
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

export default ManageUsers