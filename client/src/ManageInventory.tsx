import axios, { AxiosResponse } from 'axios';
import PageTemplate from "./PageTemplate";
import { useEffect, useState } from "react";
import { Button, Modal, OverlayTrigger } from "react-bootstrap";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { Inventory } from "./Interfaces/Database";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import DeleteTooltip from "./DeleteToolTip";
import InventoryForm from "./InventoryForm";
import UpdateTooltip from "./UpdateToolTip";
import DataTable, { TableColumn } from "react-data-table-component";

const ManageInventory: React.FC<{}> = () => {

    const [inventory, setInventory] = useState<Inventory[]>([])
    const [showInsertInventoryModal, setShowInsertInventoryModal] = useState<boolean>(false)
    const [showDeleteInventoryModal, setShowDeleteInventoryModal] = useState<boolean>(false)
    const [showUpdateInventoryModal, setShowUpdateInventoryModal] = useState<boolean>(false)
    const [selectedInventory, setSelectedInventory] = useState<Inventory | undefined>(undefined)
    const [showSearchModal, setShowSearchModal] = useState<boolean>(false)

    async function handleLoad() {
        try {
            const inventoryResponse: AxiosResponse<any[]> = await axios.get("/inventory")
            console.log("inventoryResponse", inventoryResponse)
            setInventory(inventoryResponse.data)
        } catch (error) {
            console.log("err", error)
        }
    }
    useEffect(function () {
        
        handleLoad()
    }, [])
    const columns: TableColumn<any>[] = [
        {
            id: 'inventoryName',
            name: "Inventory Name",
            selector: (row: Inventory) => row.InventoryName,
            sortable: true,
        },
        {
            id: 'inventoryDescription',
            name: "Description",
            selector: (row: Inventory) => row.InventoryDescription,
            sortable: true,
        },
        {
            id: 'inventoryQuantity',
            name: "Quantity",
            selector: (row: Inventory) => row.InventoryQuantity,
            sortable: true,
        },
        {
            id: 'edit-row',
            name: '',
            sortable: false,
            cell: (row: Inventory, index, column, id) => {
                return <div style={{ cursor: 'pointer' }} onClick={() => {
                    setSelectedInventory(row)
                    setShowUpdateInventoryModal(true)
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
            cell: (row: Inventory, index, column, id) => {
                return <div><div style={{ cursor: 'pointer' }} onClick={() => {
                    setSelectedInventory(row)
                    setShowDeleteInventoryModal(true)
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
                <h1>Manage Inventory</h1>
                <div className="mb-4">
                    <Button type="button" variant="primary" onClick={() => { setShowSearchModal(true) }}>
                        Click to Search Inventory
                    </Button>
                </div>
                <div>
                    <Button type="button" variant="primary" onClick={async() => { await handleLoad()}}>
                        Reset Inventory
                    </Button>
                </div>
                <DataTable
                    columns={columns}
                    data={inventory}
                    pagination
                />
                <Button type="button" variant="primary" onClick={() => { setShowInsertInventoryModal(true) }}>
                    Click to Insert Inventory
                </Button>
                {showInsertInventoryModal && (
                    <Modal size="lg" show={showInsertInventoryModal} onHide={() => { setShowInsertInventoryModal(false) }}>
                        <Modal.Header closeButton>
                            <Modal.Title>Insert Inventory</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <InventoryForm doesValidate={true} onSubmit={async (values: any) => {
                                    try {
                                        const response = await axios.post("/inventory", values)
                                        console.log("response", response)
                                        enqueueSnackbar('Successfully inserted inventory!', { variant: 'success', anchorOrigin: { vertical: "top", horizontal: "right" } })
                                    } catch (error) {
                                        console.log("err", error)
                                        enqueueSnackbar('Error has occured', { variant: 'error', anchorOrigin: { vertical: "top", horizontal: "right" } })
                                    }
                                }} />
                            </div>
                        </Modal.Body>
                    </Modal>
                )}

                {showSearchModal && (
                    <Modal size="lg" show={showSearchModal} onHide={() => { setShowSearchModal(false) }}>
                        <Modal.Header closeButton>
                            <Modal.Title>Search Inventory</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <InventoryForm onSubmit={async (values: any) => {
                                    console.log(inventory)
                                    setInventory(
                                        [...inventory].filter(e => e.InventoryName.includes(values.inventoryName))
                                            .filter(e => e.InventoryDescription.includes(values.inventoryDescription))
                                            .filter(e => e.InventoryQuantity.toString().includes(values.inventoryQuantity))
                                    )
                                }} />
                            </div>
                        </Modal.Body>
                    </Modal>
                )}

                {showUpdateInventoryModal && (
                    <Modal size="lg" show={showUpdateInventoryModal} onHide={() => { setShowUpdateInventoryModal(false) }}>
                        <Modal.Header closeButton>
                            <Modal.Title>Update Inventory</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <InventoryForm doesValidate={true} inventory={selectedInventory} onSubmit={async (values: any) => {
                                    try {
                                        const response = await axios.patch("/inventory", { ...values, inventoryId: selectedInventory?.InventoryId })
                                        console.log("response", response)
                                        enqueueSnackbar('Successfully updated inventory!', { variant: 'success', anchorOrigin: { vertical: "top", horizontal: "right" } })
                                    } catch (error) {
                                        console.log("err", error)
                                        enqueueSnackbar('Error has occured', { variant: 'error', anchorOrigin: { vertical: "top", horizontal: "right" } })
                                    }
                                }} />
                            </div>
                        </Modal.Body>
                    </Modal>
                )}

                {showDeleteInventoryModal && (
                    <Modal size="lg" show={showDeleteInventoryModal} onHide={() => { setShowDeleteInventoryModal(false) }}>
                        <Modal.Header closeButton>
                            <Modal.Title>Delete Inventory</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <p>
                                    Are You Sure You Want To Delete This Inventory?
                                </p>
                                <Button type="button" className="me-4" variant="danger" onClick={async () => {
                                    try {
                                        let response = await axios.delete("/inventory", { headers: { inventoryId: selectedInventory?.InventoryId } })
                                        console.log("inventory delete", response)
                                        enqueueSnackbar('Successfully deleted inventory!', { variant: 'success', anchorOrigin: { vertical: "top", horizontal: "right" } })
                                    } catch (error) {
                                        enqueueSnackbar('error occured!', { variant: 'error', anchorOrigin: { vertical: "top", horizontal: "right" } })
                                    }
                                    setShowDeleteInventoryModal(false)
                                }}>
                                    Confirm Delete
                                </Button>
                                <Button type="button" variant="secondary" onClick={() => { setShowDeleteInventoryModal(false) }}>
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

export default ManageInventory
