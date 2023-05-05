import axios, { AxiosResponse } from 'axios';
import PageTemplate from "./PageTemplate";
import { useEffect, useState } from "react";
import { Button, Modal, OverlayTrigger } from "react-bootstrap";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { Rooms } from "./Interfaces/Database";
import DeleteTooltip from "./DeleteToolTip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import UpdateTooltip from "./UpdateToolTip";
import RoomsForm from "./RoomsForm";
import DataTable, { TableColumn } from "react-data-table-component";

const ManageRooms: React.FC<{}> = () => {

    const [rooms, setRooms] = useState<Rooms[]>([])
    const [showInsertRoomsModal, setShowInsertRoomsModal] = useState<boolean>(false)
    const [showDeleteRoomsModal, setShowDeleteRoomsModal] = useState<boolean>(false)
    const [showUpdateRoomsModal, setshowUpdateRoomsModal] = useState<boolean>(false)
    const [selectedRooms, setSelectedRooms] = useState<Rooms | undefined>(undefined)
    const [showSearchModal, setShowSearchModal] = useState<boolean>(false)

    async function handleLoad() {
        try {
            const roomsResponse: AxiosResponse<Rooms[]> = await axios.get("/rooms")
            console.log("roomsResponse", roomsResponse)
            setRooms(roomsResponse.data)
        } catch (error) {
            console.log("err", error)
        }
    }
    useEffect(function () {

        handleLoad()
    }, [])

    const columns: TableColumn<any>[] = [
        {
            id: 'roomNumber',
            name: "Room Number",
            selector: (row: Rooms) => row.RoomNumber,
            sortable: true,
        },
        {
            id: 'roomDescription',
            name: "Description",
            selector: (row: Rooms) => row.RoomDescription,
            sortable: true,
        },
        {
            id: 'edit-row',
            name: '',
            sortable: false,
            cell: (row, index, column, id) => {
                return <div style={{ cursor: 'pointer' }} onClick={() => {
                    setSelectedRooms(row)
                    setshowUpdateRoomsModal(true)
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
                    setSelectedRooms(row)
                    setShowDeleteRoomsModal(true)
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
                <h1>Manage Rooms</h1>
                <div className="mb-4">
                    <Button type="button" variant="primary" onClick={() => { setShowSearchModal(true) }}>
                        Click to Search Rooms
                    </Button>
                </div>
                <div>
                    <Button type="button" variant="primary" onClick={async () => { await handleLoad() }}>
                        Reset Rooms
                    </Button>
                </div>
                <DataTable
                    columns={columns}
                    data={rooms}
                    pagination
                />
                <Button type="button" variant="primary" onClick={() => { setShowInsertRoomsModal(true) }}>
                    Click to Insert Room
                </Button>
                {showInsertRoomsModal && (
                    <Modal size="lg" show={showInsertRoomsModal} onHide={() => { setShowInsertRoomsModal(false) }}>
                        <Modal.Header closeButton>
                            <Modal.Title>Insert Rooms</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <RoomsForm onSubmit={async (values: any) => {
                                    try {
                                        const response = await axios.post("/rooms", values)
                                        console.log("response", response)
                                        enqueueSnackbar('Successfully inserted room!', { variant: 'success', anchorOrigin: { vertical: "top", horizontal: "right" } })
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
                            <Modal.Title>Search Rooms</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <RoomsForm onSubmit={async (values: any) => {
                                    setRooms(
                                        [...rooms].filter(e => e.RoomNumber.toString().includes(values.roomNumber))
                                            .filter(e => e.RoomDescription.includes(values.roomDescription))
                                    )
                                }} />
                            </div>
                        </Modal.Body>
                    </Modal>
                )}

                {showUpdateRoomsModal && (
                    <Modal size="lg" show={showUpdateRoomsModal} onHide={() => { setshowUpdateRoomsModal(false) }}>
                        <Modal.Header closeButton>
                            <Modal.Title>Update Room</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <RoomsForm rooms={selectedRooms} onSubmit={async (values: any) => {
                                    try {
                                        const response = await axios.patch("/rooms", { ...values, roomId: selectedRooms?.RoomId })
                                        console.log("response", response)
                                        enqueueSnackbar('Successfully update room!', { variant: 'success', anchorOrigin: { vertical: "top", horizontal: "right" } })
                                    } catch (error) {
                                        console.log("err", error)
                                    }
                                }} />
                            </div>
                        </Modal.Body>
                    </Modal>
                )}

                {showDeleteRoomsModal && (
                    <Modal size="lg" show={showDeleteRoomsModal} onHide={() => { setShowDeleteRoomsModal(false) }}>
                        <Modal.Header closeButton>
                            <Modal.Title>Delete Rooom</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <p>
                                    Are you sure you want to delete this room?
                                </p>
                                <Button type="button" className="me-4" variant="danger" onClick={async () => {
                                    try {
                                        let response = await axios.delete("/rooms", { headers: { roomId: selectedRooms?.RoomId } })
                                        console.log("room delete", response)
                                        enqueueSnackbar('Successfully deleted room!', { variant: 'success', anchorOrigin: { vertical: "top", horizontal: "right" } })
                                    } catch (error) {
                                        enqueueSnackbar('error occured!', { variant: 'error', anchorOrigin: { vertical: "top", horizontal: "right" } })
                                    }
                                    setShowDeleteRoomsModal(false)
                                }}>
                                    Confirm Delete
                                </Button>
                                <Button type="button" variant="secondary" onClick={() => { setShowDeleteRoomsModal(false) }}>
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

export default ManageRooms
