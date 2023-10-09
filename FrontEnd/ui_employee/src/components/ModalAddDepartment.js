import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { postCreateDepartment } from '../services/DepartmentService';
import { toast } from 'react-toastify';

const ModalAddDepartment = (props) => {
    const { show, handleClose, handleUpdateTable} = props;
    const [name, setName] = useState("");

    const handleSaveDepartment = async () => {
        let res = await postCreateDepartment(name);
        console.log("check res: ", res);
        if (res) {
            //success
            handleClose();
            setName("");
            toast.success("A Department is created succeed!");
            handleUpdateTable();
        } else {
            //error
            toast.error("An error...");
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
                    <Modal.Title>Add New Department</Modal.Title>
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
                    <Button variant="primary" onClick={() => handleSaveDepartment()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalAddDepartment;