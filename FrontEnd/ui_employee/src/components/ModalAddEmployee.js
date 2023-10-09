import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { postCreateEmployee } from '../services/EmployeeService';
import { toast } from 'react-toastify';
import ModalSelect from './ModalSelect';

const ModalAddEmployee = (props) => {
    const { show, handleClose, handleUpdateTable } = props;
    const [fullName, setFullName] = useState("");
    const [commune, setCommune] = useState("");
    const [district, setDistrict] = useState("");
    const [city, setCity] = useState("");
    const [idDepartment, setIdDepartment] = useState();


    const handleChangeDepartmentId = (id)=> {
       setIdDepartment(id);
    }

    const handleSaveEmployee = async () => {
        let res = await postCreateEmployee(fullName, commune, district, city, idDepartment)
        console.log("check res: ", res);
        if (res) {
            //success
            handleClose();
            setFullName("");
            setCommune("");
            setDistrict("");
            setCity("");
            setIdDepartment();
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
                    <Modal.Title>Add New Employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='body-add-new'>
                        <Form>
                            <Form.Group className="mb-5">
                                <Form.Label>Full Name:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Full Name"
                                    value={fullName} onChange={(event) => setFullName(event.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="my-3">
                                <Form.Label>Address:</Form.Label>
                                <Form.Group className="my-1">
                                    <Form.Label>Commune</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Commune"
                                        value={commune} onChange={(event) => setCommune(event.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="my-1">
                                    <Form.Label>District</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter District"
                                        value={district} onChange={(event) => setDistrict(event.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-5">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter City"
                                        value={city} onChange={(event) => setCity(event.target.value)}
                                    />
                                </Form.Group>
                            </Form.Group>

                            <ModalSelect onChange={handleChangeDepartmentId}/>
                        </Form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={()=> handleSaveEmployee()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalAddEmployee;