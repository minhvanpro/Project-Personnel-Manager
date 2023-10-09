import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteEmployee } from '../services/EmployeeService';
import { toast } from 'react-toastify';

const ModalComfirm = (props) => {
    const { show, handleClose, dataEmployeeDelete, handleUpdateTable} = props;
    const comfirmDelete = async () => {
        let res = await deleteEmployee(dataEmployeeDelete.id);
        if (res) {
            handleClose();
            handleUpdateTable();
            toast.success("Delete employee success")
        } else {
            toast.error("An error...")
        }
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete a employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='body-add-new'>
                        You are sure want to delete!
                        <br />
                        <b>Employee : {dataEmployeeDelete.fullName} ?</b>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => comfirmDelete()}>
                        Comfirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalComfirm;