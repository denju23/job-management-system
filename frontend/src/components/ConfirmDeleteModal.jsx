import { Modal, Button } from 'react-bootstrap';

const ConfirmDeleteModal = ({ show, onClose, onConfirm, jobTitle = 'this job' }) => {
    return (
        <Modal show={show} onHide={onClose} backdrop="static" keyboard={false}>
            <Modal.Header closeButton className="border-0">
                <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete <strong>{jobTitle}</strong>?
            </Modal.Body>
            <Modal.Footer className="border-0">
                <Button variant="secondary" onClick={onClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={onConfirm}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmDeleteModal;
