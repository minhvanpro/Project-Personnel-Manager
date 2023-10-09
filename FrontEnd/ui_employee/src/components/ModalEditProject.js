import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {putUpdateProject} from '../services/ProjectService';

const ModalEditProject = (props) => {
    const { show, handleClose, handleEditProjectFormModal, dataProjectEdit } = props;
    const [name, setName] = useState("");

    const handleEditProject = async () => {
        let res = await putUpdateProject(dataProjectEdit.id, name)
        if(res){
            let respon = handleEditProjectFormModal({id: dataProjectEdit.id, name: name})
            handleClose();
            toast.success("Update employee success!")
        }else{
            toast.error("An error...")
        }
    }

    useEffect(() => {
        if (show) {
            setName(dataProjectEdit.name)
        }
    }, [JSON.stringify(dataProjectEdit)])

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='body-add-new'>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Name:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Name"
                                    value={name} onChange={(event) => setName(event.target.value)} />
                            </Form.Group>
                        </Form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleEditProject()}>
                        Comfirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalEditProject;