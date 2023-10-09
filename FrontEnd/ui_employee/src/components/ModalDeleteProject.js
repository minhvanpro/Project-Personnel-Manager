import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteProject } from '../services/ProjectService';
import { toast } from 'react-toastify';

const ModalDeleteProject = (props) => {
    const { show, handleClose, dataProjectDelete, handleUpdateTable} = props;
    const comfirmDelete = async () => {
        let res = await deleteProject(dataProjectDelete.id);
        if (res) {
            handleUpdateTable();
            handleClose();
            toast.success("Delete project success")
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
                    <Modal.Title>Delete a project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='body-add-new'>
                        You are sure want to delete!
                        <br />
                        <b>Project : {dataProjectDelete.name} ?</b>
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

export default ModalDeleteProject;