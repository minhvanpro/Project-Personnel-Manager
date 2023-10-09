import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import ModalSelect from '../components/ModalSelect';
import {putUpdateEmployee} from '../services/EmployeeService';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const ModalEditEmployee = (props) => {
    const { show, handleClose, dataEmployeeEdit, handleEditEmployeeFormModal} = props;
    const [fullName, setFullName] = useState("");
    const [commune, setCommune] = useState("");
    const [district, setDistrict] = useState("");
    const [city, setCity] = useState("");
    const [idDepartment, setIdDepartment] = useState();

    const handleChangeDepartmentId = (id) => {
        setIdDepartment(id);
    }

    const handleEditEmployee = async () => {
        //let respon = handleEditEmployeeFormModal({id: dataEmployeeEdit.id, fullName: fullName, idAddress:{id: dataEmployeeEdit.idAddress.id, commune: commune, district: district, city: city}, idDepartment: {id: idDepartment, name: dataEmployeeEdit.idDepartment.name}})

        let res = await putUpdateEmployee(dataEmployeeEdit.id,fullName, commune, district, city, idDepartment)
        if(res){
            //success
            let respon = handleEditEmployeeFormModal({id: dataEmployeeEdit.id, fullName: fullName, idAddress:{id: dataEmployeeEdit.idAddress.id, commune: commune, district: district, city: city}, idDepartment: {id: idDepartment, name: dataEmployeeEdit.idDepartment.name}})
            handleClose();
            toast.success("Update employee success!")
        }else{
            //error
            toast.error("An error...")
        }
    }

    useEffect(() => {
        if(show){
            setFullName(dataEmployeeEdit.fullName)
            setCommune(dataEmployeeEdit.idAddress.commune)
            setDistrict(dataEmployeeEdit.idAddress.district)
            setCity(dataEmployeeEdit.idAddress.city)
            setIdDepartment(dataEmployeeEdit?.idDepartment?.id);
        }
    }, [JSON.stringify(dataEmployeeEdit)])

    return (
        <>
            <Modal 
            show={show} 
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Employee</Modal.Title>
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
                            <ModalSelect onChange={handleChangeDepartmentId} selected={idDepartment}/>
                        </Form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleEditEmployee()}>
                        Comfirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalEditEmployee;