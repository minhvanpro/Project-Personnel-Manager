import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteDepartment } from '../services/DepartmentService';
import { toast } from 'react-toastify';

const ModalDeleteDepartment = (props) => {
    const { show, handleClose, dataDepartmentDelete, handleUpdateTable} = props;
    const comfirmDelete = async () => {
        let res = await deleteDepartment(dataDepartmentDelete.id);
        if (res) {
            handleUpdateTable();
            handleClose();
            toast.success("Delete department success")
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
                        <b>Department : {dataDepartmentDelete.name} ?</b>
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

export default ModalDeleteDepartment;