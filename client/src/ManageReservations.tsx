import axios, { AxiosResponse } from 'axios';
import PageTemplate from "./PageTemplate";
import { useEffect, useState } from "react";
import { Button, Modal, OverlayTrigger, } from "react-bootstrap";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { formatDateTime } from "./utils";
import DeleteTooltip from "./DeleteToolTip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import UpdateTooltip from "./UpdateToolTip";
import ReservationsForm from "./ReservationsForm";
import DataTable, { TableColumn } from "react-data-table-component";
import { Reservations } from "./Interfaces/Database";

const ManageReservations: React.FC<{}> = () => {

    const [reservations, setReservations] = useState<any[]>([])
    const [showInsertReservationsModal, setShowInsertReservationsModal] = useState<boolean>(false)
    const [showDeleteReservationModal, setShowDeleteReservationModal] = useState<boolean>(false)
    const [showUpdateReservationModal, setShowUpdateReservationModal] = useState<boolean>(false)
    const [selectedReservation, setSelectedReservation] = useState<Reservations | undefined>(undefined)
    const [showSearchModal, setShowSearchModal] = useState<boolean>(false)

    async function handleLoad() {
        try {
            const reservationsResponse: AxiosResponse<any[]> = await axios.get("/reservations")
            console.log("reservationsResponse", reservationsResponse)
            setReservations(reservationsResponse.data)
        } catch (error) {
            console.log("err", error)
        }
    }
    useEffect(function () {
        
        handleLoad()
    }, [])

    const columns: TableColumn<any>[] = [
        {
            id: 'userName',
            name: "User Name",
            selector: (row: any) => row.UserName,
            sortable: true,
        },
        {
            id: 'startTime',
            name: "Start Time",
            cell: (row, index, column, id) => {
                return <div> {formatDateTime(new Date(row.StartTime))} </div>
            },
            sortable: true,
        },
        {
            id: 'roomNumber',
            name: "Room Number",
            selector: (row: any) => row.RoomNumber,
            sortable: true,
        },
        {
            id: 'edit-row',
            name: '',
            sortable: false,
            cell: (row, index, column, id) => {
                return <div style={{ cursor: 'pointer' }} onClick={() => {
                    setSelectedReservation(row)
                    setShowUpdateReservationModal(true)
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
                    setSelectedReservation(row)
                    setShowDeleteReservationModal(true)
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
                <h1>Manage Reservations</h1>
                <div className="mb-4">
                    <Button type="button" variant="primary" onClick={() => { setShowSearchModal(true) }}>
                        Click to Search Reservations
                    </Button>
                </div>
                <div>
                <Button type="button" variant="primary" onClick={async() => { await handleLoad()}}>
                        Reset Reservations
                    </Button>
                </div>
                <DataTable
                    columns={columns}
                    data={reservations}
                    pagination
                />
                <Button type="button" variant="primary" onClick={() => { setShowInsertReservationsModal(true) }}>
                    Click to Insert Reservation
                </Button>
                {showInsertReservationsModal && (
                    <Modal size="lg" show={showInsertReservationsModal} onHide={() => { setShowInsertReservationsModal(false) }}>
                        <Modal.Header closeButton>
                            <Modal.Title>Insert Reservation </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <ReservationsForm onSubmit={async (values: any) => {
                                    try {
                                        const response = await axios.post("/reservations", values)
                                        console.log("response", response)
                                        enqueueSnackbar('Successfully inserted reservation!', { variant: 'success', anchorOrigin: { vertical: "top", horizontal: "right" } })
                                    } catch (error) {
                                        console.log("err", error)
                                    }
                                }} />
                            </div>
                        </Modal.Body>
                    </Modal>
                )}

                {showUpdateReservationModal && (
                    <Modal size="lg" show={showUpdateReservationModal} onHide={() => { setShowUpdateReservationModal(false) }}>
                        <Modal.Header closeButton>
                            <Modal.Title>Update Reservation </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <ReservationsForm reservations={selectedReservation} onSubmit={async (values: any) => {
                                    try {
                                        const response = await axios.patch("/reservations", { ...values, reservationId: selectedReservation?.RoomId })
                                        console.log("response", response)
                                        enqueueSnackbar('Successfully inserted reservation!', { variant: 'success', anchorOrigin: { vertical: "top", horizontal: "right" } })
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
                            <Modal.Title>Search Reservations</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <ReservationsForm onSubmit={async (values: any) => {
                                    setReservations(
                                        [...reservations].filter(e => e.UserId.toString().includes(values.userId))
                                            .filter(e => e.StartTime.includes(values.startTime))
                                            .filter(e => e.RoomId.toString().includes(values.roomId))
                                    )
                                }} />
                            </div>
                        </Modal.Body>
                    </Modal>
                )}


                {showDeleteReservationModal && (
                    <Modal size="lg" show={showDeleteReservationModal} onHide={() => { setShowDeleteReservationModal(false) }}>
                        <Modal.Header closeButton>
                            <Modal.Title>Delete Reservation</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div>
                                <p>
                                    Are you sure you want to delete this reservation?
                                </p>
                                <Button type="button" className="me-4" variant="danger" onClick={async () => {
                                    try {
                                        let response = await axios.delete("/reservations", { headers: { reservationId: selectedReservation?.RoomId } })
                                        console.log("reservation delete", response)
                                        enqueueSnackbar('Successfully deleted reservation!', { variant: 'success', anchorOrigin: { vertical: "top", horizontal: "right" } })
                                    } catch (error) {
                                        enqueueSnackbar('error occured!', { variant: 'error', anchorOrigin: { vertical: "top", horizontal: "right" } })
                                    }
                                    setShowDeleteReservationModal(false)
                                }}>
                                    Confirm Delete
                                </Button>
                                <Button type="button" variant="secondary" onClick={() => { setShowDeleteReservationModal(false) }}>
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

export default ManageReservations
