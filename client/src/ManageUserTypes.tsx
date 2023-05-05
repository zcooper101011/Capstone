import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from "react";
import { Button, Modal, OverlayTrigger } from "react-bootstrap";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import PageTemplate from "./PageTemplate";
import { UserType } from "./Interfaces/Database";
import DeleteTooltip from "./DeleteToolTip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import UpdateTooltip from "./UpdateToolTip";
import UserTypesForm from "./UserTypesForm";
import DataTable, { TableColumn } from "react-data-table-component";

const ManageUserTypes: React.FC<{}> = () => {

    const [userType, setUserType] = useState<UserType[]>([])
    const [showInsertUserTypesModal, setShowInsertUserTypesModal] = useState<boolean>(false)
    const [showDeleteUserTypeModal, setShowDeleteUserTypeModal] = useState<boolean>(false)
    const [showUpdateUserTypeModal, setShowUpdateUserTypeModal] = useState<boolean>(false)
    const [selectedUserTypes, setSelectedUserTypes] = useState<UserType | undefined>(undefined)
    const [showSearchModal, setShowSearchModal] = useState<boolean>(false)
    async function handleLoad() {
        try {
            const userTypesResponse: AxiosResponse<any[]> = await axios.get("/usertypes")
            console.log("userTypesResponse", userTypesResponse)
            setUserType(userTypesResponse.data)
        } catch (error) {
            console.log("err", error)
        }
    }
    useEffect(function () {
       
        handleLoad()
    }, [])

    const columns: TableColumn<any>[] = [
        {
            id: 'typeName',
            name: "Type Name",
            selector: (row: UserType) => row.TypeName,
            sortable: true,
        },
        {
            id: 'typeDescription',
            name: "Description",
            selector: (row: UserType) => row.TypeDescription,
            sortable: true,
        },
        {
            id: 'typePermissions',
            name: "Permissions",
            cell: (row, index, column, id) => {
                return <div> {JSON.stringify(row.TypePermissions)} </div>
            },
            sortable: true,
        },
        {
            id: 'edit-row',
            name: '',
            sortable: false,
            cell: (row: UserType, index, column, id) => {
                return <div style={{ cursor: 'pointer' }} onClick={() => {
                    setSelectedUserTypes(row)
                    setShowUpdateUserTypeModal(true)
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
            cell: (row: UserType, index, column, id) => {
                return <div><div style={{ cursor: 'pointer' }} onClick={() => {
                    setSelectedUserTypes(row)
                    setShowDeleteUserTypeModal(true)
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
                <h1>Manage User Type</h1>
                <div className="mb-4">
                    <Button type="button" variant="primary" onClick={() => { setShowSearchModal(true) }}>
                        Click to Search User Types
                    </Button>
                </div>
                <div>
                    <Button type="button" variant="primary" onClick={async() => {await handleLoad() }}>
                        Reset Search
                    </Button>
                </div>
                <DataTable
                    columns={columns}
                    data={userType}
                    pagination
                />
                <Button type="button" variant="primary" onClick={() => { setShowInsertUserTypesModal(true) }}>
                    Click to Insert UserType
                </Button>
                {showUpdateUserTypeModal && (
                    <Modal size="lg" show={showUpdateUserTypeModal} onHide={() => { setShowUpdateUserTypeModal(false) }}>
                        <Modal.Header closeButton>
                            <Modal.Title>Update User Types</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <UserTypesForm doesValidate={true} usertype={selectedUserTypes} onSubmit={async (values: any) => {
                                    try {
                                        const response = await axios.patch("/usertypes", {
                                            ...values,
                                            typePermissions: JSON.stringify({ admin: values['typePermissions'] }),
                                            userTypeId: selectedUserTypes?.UserTypeId
                                        })
                                        console.log("response", response)
                                        enqueueSnackbar('Successfully updated User Type!', { variant: 'success', anchorOrigin: { vertical: "top", horizontal: "right" } })
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
                            <Modal.Title>Search User Types</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <UserTypesForm onSubmit={async (values: any) => {
                                    setUserType(
                                        [...userType].filter(e => e.TypeName.includes(values.typeName))
                                            .filter(e => e.TypeDescription.includes(values.typeDescription))
                                            .filter(e => e.TypePermissions.admin.some((p: string) => values.typePermissions.includes(p)))
                                    )
                                }} />
                            </div>
                        </Modal.Body>
                    </Modal>
                )}

                {showInsertUserTypesModal && (
                    <Modal size="lg" show={showInsertUserTypesModal} onHide={() => { setShowInsertUserTypesModal(false) }}>
                        <Modal.Header closeButton>
                            <Modal.Title>Insert User Types</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <UserTypesForm doesValidate={true} onSubmit={async (values: any) => {
                                    try {
                                        const response = await axios.post("/usertypes", {
                                            ...values,
                                            typePermissions: JSON.stringify({ admin: values['typePermissions'] })
                                        })
                                        console.log("response", response)
                                        enqueueSnackbar('Successfully inserted User Type!', { variant: 'success', anchorOrigin: { vertical: "top", horizontal: "right" } })
                                    } catch (error) {
                                        console.log("err", error)
                                    }
                                }} />
                            </div>
                        </Modal.Body>
                    </Modal>
                )}

                {showDeleteUserTypeModal && (
                    <Modal size="lg" show={showDeleteUserTypeModal} onHide={() => { setShowDeleteUserTypeModal(false) }}>
                        <Modal.Header closeButton>
                            <Modal.Title>Delete UserType</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <p>
                                    Are You Sure You Want To Delete This UserType?
                                </p>
                                <Button type="button" className="me-4" variant="danger" onClick={async () => {
                                    try {
                                        let response = await axios.delete("/usertypes", { headers: { usertypeId: selectedUserTypes?.UserTypeId } })
                                        console.log("usertype delete", response)
                                        enqueueSnackbar('Successfully deleted usertype!', { variant: 'success', anchorOrigin: { vertical: "top", horizontal: "right" } })
                                    } catch (error) {
                                        enqueueSnackbar('error occured!', { variant: 'error', anchorOrigin: { vertical: "top", horizontal: "right" } })
                                    }
                                    setShowDeleteUserTypeModal(false)
                                }}>
                                    Confirm Delete
                                </Button>
                                <Button type="button" variant="secondary" onClick={() => { setShowDeleteUserTypeModal(false) }}>
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

export default ManageUserTypes