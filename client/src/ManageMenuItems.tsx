import axios, { AxiosResponse } from 'axios';
import PageTemplate from "./PageTemplate";
import { useEffect, useState } from "react";
import { Button, Modal, OverlayTrigger } from "react-bootstrap";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import DeleteTooltip from "./DeleteToolTip";
import UpdateTooltip from "./UpdateToolTip";
import MenuItemsForm from "./MenuItemsForm";
import DataTable, { TableColumn } from "react-data-table-component";
import { MenuItems } from "./Interfaces/Database";

const ManageMenuItems: React.FC<{}> = () => {

    const [menuItems, setMenuItems] = useState<any[]>([])
    const [showInsertMenuItemModal, setShowInsertMenuItemModal] = useState<boolean>(false)
    const [showDeleteMenuItemsModal, setShowDeleteMenuItemsModal] = useState<boolean>(false)
    const [showUpdateMenuItemModal, setShowUpdateMenuItemModal] = useState<boolean>(false)
    const [selectedMenuItems, setSelectedMenuItems] = useState<MenuItems | undefined>(undefined)
    const [showSearchModal, setShowSearchModal] = useState<boolean>(false)

    async function handleLoad() {
        try {
            const menuItemsResponse: AxiosResponse<any[]> = await axios.get("/menuitems")
            console.log("menuItemsResponse", menuItemsResponse)
            setMenuItems(menuItemsResponse.data)
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
            name: "Type",
            selector: (row: any) => row.MenuTypeName,
            sortable: true,
        },
        {
            id: 'menuItemName',
            name: "Item Name",
            selector: (row: any) => row.MenuItemName,
            sortable: true,
        },
        {
            id: 'menuItemPrice',
            name: "Item Price",
            selector: (row: any) => row.MenuItemPrice,
            sortable: true,
        },
        {
            id: 'menuItemDescription',
            name: "Description",
            selector: (row: any) => row.MenuItemDescription,
            sortable: true,
        },
        {
            id: 'edit-row',
            name: '',
            sortable: false,
            cell: (row, index, column, id) => {
                return <div style={{ cursor: 'pointer' }} onClick={() => {
                    setSelectedMenuItems(row)
                    setShowUpdateMenuItemModal(true)
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
                    setSelectedMenuItems(row)
                    setShowDeleteMenuItemsModal(true)
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
                <h1>Manage Menu Items</h1>
                <div className="mb-4">
                    <Button type="button" variant="primary" onClick={() => { setShowSearchModal(true) }}>
                        Click to Search Menu Item
                    </Button>
                </div>
                <div>
                    <Button type="button" variant="primary" onClick={async () => { await handleLoad() }}>
                        Reset Menu Items
                    </Button>
                </div>
                <DataTable
                    columns={columns}
                    data={menuItems}
                    pagination
                />
                <Button type="button" variant="primary" onClick={() => { setShowInsertMenuItemModal(true) }}>
                    Click to Insert Menu Item
                </Button>
                {showInsertMenuItemModal && (
                    <Modal size="lg" show={showInsertMenuItemModal} onHide={() => { setShowInsertMenuItemModal(false) }}>
                        <Modal.Header closeButton>
                            <Modal.Title>Insert Menu Items</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <MenuItemsForm doesValidate={true} onSubmit={async (values: any) => {
                                    try {
                                        const response = await axios.post("/menuitems", values)
                                        console.log("response", response)
                                        enqueueSnackbar('Successfully inserted menu item!', { variant: 'success', anchorOrigin: { vertical: "top", horizontal: "right" } })
                                    } catch (error) {
                                        console.log("err", error)
                                    }
                                }} />
                            </div>
                        </Modal.Body>
                    </Modal>
                )}

                {showSearchModal && (
                    <Modal size="lg" show={showSearchModal} onHide={() => { setShowSearchModal(false) }}>
                        <Modal.Header closeButton>
                            <Modal.Title>Search Menu Items</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <MenuItemsForm onSubmit={async (values: any) => {
                                    console.log(menuItems)
                                    setMenuItems(
                                        [...menuItems].filter(e => e.MenuItemName.includes(values.menuItemName))
                                            .filter(e => e.MenuItemDescription.includes(values.menuItemDescription))
                                            .filter(e => e.MenuItemPrice.toString().includes(values.menuItemPrice))
                                            .filter(e => e.MenuTypeId.toString().includes(values.menuTypeId))
                                    )
                                }} />
                            </div>
                        </Modal.Body>
                    </Modal>
                )}
                {showUpdateMenuItemModal && (
                    <Modal size="lg" show={showUpdateMenuItemModal} onHide={() => { setShowUpdateMenuItemModal(false) }}>
                        <Modal.Header closeButton>
                            <Modal.Title>Update Menu Items</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <MenuItemsForm doesValidate={true} menuitem={selectedMenuItems} onSubmit={async (values: any) => {
                                    try {
                                        const response = await axios.patch("/menuitems", { ...values, menuItemId: selectedMenuItems?.MenuItemId })
                                        console.log("response", response)
                                        enqueueSnackbar('Successfully update menu item!', { variant: 'success', anchorOrigin: { vertical: "top", horizontal: "right" } })
                                    } catch (error) {
                                        console.log("err", error)
                                    }
                                }} />
                            </div>
                        </Modal.Body>
                    </Modal>
                )}

                {showDeleteMenuItemsModal && (
                    <Modal size="lg" show={showDeleteMenuItemsModal} onHide={() => { setShowDeleteMenuItemsModal(false) }}>
                        <Modal.Header closeButton>
                            <Modal.Title>Delete Menu Item</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <p>
                                    Are you sure you want to delete this item?
                                </p>
                                <Button type="button" className="me-4" variant="danger" onClick={async () => {
                                    try {
                                        let response = await axios.delete("/menuitems", { headers: { menuItemId: selectedMenuItems?.MenuItemId } })
                                        console.log("customer delete", response)
                                        enqueueSnackbar('Successfully deleted customer!', { variant: 'success', anchorOrigin: { vertical: "top", horizontal: "right" } })
                                    } catch (error) {
                                        enqueueSnackbar('error occured!', { variant: 'error', anchorOrigin: { vertical: "top", horizontal: "right" } })
                                    }
                                    setShowDeleteMenuItemsModal(false)
                                }}>
                                    Confirm Delete
                                </Button>
                                <Button type="button" variant="secondary" onClick={() => { setShowDeleteMenuItemsModal(false) }}>
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

export default ManageMenuItems
