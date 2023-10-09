import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Tables from './Tables';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { fetchAllEmployee } from '../services/EmployeeService';

import { postCreateProject } from '../services/ProjectService';

const ModalAddProject = (props) => {
    const { show, handleClose, handleUpdateTable } = props;
    const [name, setName] = useState("");
    const [AllEmployee, setAllEmployee] = useState([]);
    const [employees, setEmployees] = useState(() => []);

    useEffect(() => {
        //call apis
        getEmployees();
    }, [])

    const getEmployees = async () => {

        let result = await fetchAllEmployee();
        if (result && result.data) {
            setEmployees(result.data)
        }
    }

    const handleSaveProject = async () => {
        let res = await postCreateProject(name, AllEmployee)
        console.log("check res: ", res);
        if (res) {
            handleClose();
            setName("");
            setAllEmployee([]);
            toast.success("A Project is created succeed!");
            handleUpdateTable();
        } else {
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
                    <Modal.Title>Add New Project</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='body-add-new'>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Name Project:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Name"
                                    value={name} onChange={(event) => setName(event.target.value)} />
                            </Form.Group>
                        </Form>
                    </div>
                    <Tables rows={[
                        {
                            fieldName: 'id',
                        },
                        {
                            fieldName: 'fullName',
                        },
                        {
                            fieldName: 'idAddress',
                            name: 'address',
                            show: (idAddress) => <>{idAddress.commune}-{idAddress.district}-{idAddress.city}</>
                        },
                        {
                            fieldName: 'idDepartment',
                            name: 'department',
                            show: (idDepartment) => <>{idDepartment.name}</>
                        },
                    ]} columns={employees} checkBox onChangeCheckboxes={(ids) => {
                        setAllEmployee(ids);
                    }} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSaveProject()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalAddProject;