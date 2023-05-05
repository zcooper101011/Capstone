import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from "react";
import { Button, Modal, OverlayTrigger } from "react-bootstrap";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { MenuType } from "./Interfaces/Database";
import PageTemplate from "./PageTemplate";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import DeleteTooltip from "./DeleteToolTip";
import MenuTypeForm from "./MenuTypeForm";
import UpdateTooltip from "./UpdateToolTip";
import DataTable, { TableColumn } from "react-data-table-component";

const ManageMenuTypes: React.FC<{}> = () => {

    const [menuTypes, setMenuTypes] = useState<MenuType[]>([])
    const [showInsertMenuTypeModal, setShowInsertMenuTypeModal] = useState<boolean>(false)
    const [showDeleteMenuTypesModal, setShowDeleteMenuTypesModal] = useState<boolean>(false)
    const [showUpdateMenuTypesModal, setShowUpdateMenuTypesModal] = useState<boolean>(false)
    const [selectedMenuType, setSelectedMenuType] = useState<MenuType | undefined>(undefined)
    const [showSearchModal, setShowSearchModal] = useState<boolean>(false)

    async function handleLoad() {
        try {
            const menuTypesResponse: AxiosResponse<any[]> = await axios.get("/menutypes")
            console.log("menuTypesResponse", menuTypesResponse)
            setMenuTypes(menuTypesResponse.data)
        } catch (error) {
            console.log("err", error)
        }
    }
    useEffect(function () {

        handleLoad()
    }, [])
    const columns: TableColumn<any>[] = [
        {
            id: 'menuTypeName',
            name: "Type Name",
            selector: (row: MenuType) => row.MenuTypeName,
            sortable: true,
        },
        {
            id: 'menuTypeDescription',
            name: "Description",
            selector: (row: MenuType) => row.MenuTypeDescription,
            sortable: true,
        },
        {
            id: 'edit-row',
            name: '',
            sortable: false,
            cell: (row: MenuType, index, column, id) => {
                return <div style={{ cursor: 'pointer' }} onClick={() => {
                    setSelectedMenuType(row)
                    setShowUpdateMenuTypesModal(true)
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
            cell: (row: MenuType, index, column, id) => {
                return <div><div style={{ cursor: 'pointer' }} onClick={() => {
                    setSelectedMenuType(row)
                    setShowDeleteMenuTypesModal(true)
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
                <h1>Manage Menu Types</h1>
                <div className="mb-4">
                    <Button type="button" variant="primary" onClick={() => { setShowSearchModal(true) }}>
                        Click to Search Menu Type
                    </Button>
                </div>
                <div>
                    <Button type="button" variant="primary" onClick={async () => { await handleLoad() }}>
                        Reset Menu Types
                    </Button>
                </div>
                <DataTable
                    columns={columns}
                    data={menuTypes}
                    pagination
                />
                <Button type="button" variant="primary" onClick={() => { setShowInsertMenuTypeModal(true) }}>
                    Click to Insert Menu Type
                </Button>
                {showInsertMenuTypeModal && (
                    <Modal size="lg" show={showInsertMenuTypeModal} onHide={() => { setShowInsertMenuTypeModal(false) }}>
                        <Modal.Header closeButton>
                            <Modal.Title>Insert Menu Types</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <MenuTypeForm doesValidate={true} onSubmit={async (values: any) => {
                                    try {
                                        const response = await axios.post("/menutypes", values)
                                        console.log("response", response)
                                        enqueueSnackbar('Successfully inserted menu type!', { variant: 'success', anchorOrigin: { vertical: "top", horizontal: "right" } })
                                    } catch (error) {
                                        console.log("err", error)
                                        enqueueSnackbar('error has occured!', { variant: 'error', anchorOrigin: { vertical: "top", horizontal: "right" } })
                                    }
                                }} />
                            </div>
                        </Modal.Body>
                    </Modal>
                )}

                {showSearchModal && (
                    <Modal size="lg" show={showSearchModal} onHide={() => { setShowSearchModal(false) }}>
                        <Modal.Header closeButton>
                            <Modal.Title>Search Menu Types</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <MenuTypeForm onSubmit={async (values: any) => {
                                    setMenuTypes(
                                        [...menuTypes].filter(e => e.MenuTypeName.includes(values.menuTypeName))
                                            .filter(e => e.MenuTypeDescription.includes(values.menuTypeDescription))

                                    )
                                }} />
                            </div>
                        </Modal.Body>
                    </Modal>
                )}

                {showUpdateMenuTypesModal && (
                    <Modal size="lg" show={showUpdateMenuTypesModal} onHide={() => { setShowUpdateMenuTypesModal(false) }}>
                        <Modal.Header closeButton>
                            <Modal.Title>Update Menu Types</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <MenuTypeForm doesValidate={true} menutypes={selectedMenuType} onSubmit={async (values: any) => {
                                    try {
                                        const response = await axios.patch("/menutypes", { ...values, menuTypeId: selectedMenuType?.MenuTypeId })
                                        console.log("response", response)
                                        enqueueSnackbar('Successfully updated menu type!', { variant: 'success', anchorOrigin: { vertical: "top", horizontal: "right" } })
                                    } catch (error) {
                                        console.log("err", error)
                                    }
                                }} />
                            </div>
                        </Modal.Body>
                    </Modal>
                )}

                {showDeleteMenuTypesModal && (
                    <Modal size="lg" show={showDeleteMenuTypesModal} onHide={() => { setShowDeleteMenuTypesModal(false) }}>
                        <Modal.Header closeButton>
                            <Modal.Title>Delete Menu Type</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <p>
                                    Are you sure you want to delete this item type?
                                </p>
                                <Button type="button" className="me-4" variant="danger" onClick={async () => {
                                    try {
                                        let response = await axios.delete("/menutypes", { headers: { menuTypeId: selectedMenuType?.MenuTypeId } })
                                        console.log(" menutype delete", response)
                                        enqueueSnackbar('Successfully deleted!', { variant: 'success', anchorOrigin: { vertical: "top", horizontal: "right" } })
                                    } catch (error) {
                                        enqueueSnackbar('error occured!', { variant: 'error', anchorOrigin: { vertical: "top", horizontal: "right" } })
                                    }
                                    setShowDeleteMenuTypesModal(false)
                                }}>
                                    Confirm Delete
                                </Button>
                                <Button type="button" variant="secondary" onClick={() => { setShowDeleteMenuTypesModal(false) }}>
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

export default ManageMenuTypes
