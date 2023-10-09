import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { putUpdateDepartment } from '../services/DepartmentService';

const ModalEditProject = (props) => {
    const { show, handleClose, handleEditDepartmentFormModal, dataDepartmentEdit } = props;
    const [name, setName] = useState("");

    const handleEditDepartment = async () => {
        let res = await putUpdateDepartment(dataDepartmentEdit.id, name)
        if(res){
            let respon = handleEditDepartmentFormModal({id: dataDepartmentEdit.id, name: name})
            handleClose();
            toast.success("Update employee success!")
        }else{
            toast.error("An error...")
        }
    }

    useEffect(() => {
        if (show) {
            setName(dataDepartmentEdit.name)
        }
    }, [JSON.stringify(dataDepartmentEdit)])

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Department</Modal.Title>
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
                    <Button variant="primary" onClick={() => handleEditDepartment()}>
                        Comfirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalEditProject;