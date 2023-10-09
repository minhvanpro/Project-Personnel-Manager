import Table from 'react-bootstrap/Table';
import { useEffect, useState } from "react";
import { fetchAllDepartment } from "../services/DepartmentService";
import ModalAddDepartment from '../components/ModalAddDepartment';
import { ToastContainer } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import ModalDeleteDepartment from '../components/ModalDeleteDepartment';
import ModalEditDepartment from '../components/ModalEditDepartment';
import _ from 'lodash';

const Department = () => {
    const [departments, setDepartments] = useState(() => []);

    useEffect(() => {
        //call api
        getDepartment();
    }, [])

    const getDepartment = async () => {
        let result = await fetchAllDepartment();
        if (result && result.data) {
            setDepartments(result.data)
        }
    }

    const [isShowModalAddDepartment, setIsShowModalAddDepartment] = useState(false);
    const [isShowModalDeleteDepartment, setIsShowModalDeleteDepartment] = useState(false);
    const [dataDepartmentDelete, setDataDepartmentDelete] = useState({});
    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [dataDepartmentEdit, setdataDepartmentEdit] = useState({});

    const handleClose = () => {
        setIsShowModalEdit(false)
        setIsShowModalAddDepartment(false)
        setIsShowModalDeleteDepartment(false)
    }

    const handleUpdateTable = () => {
        getDepartment();
    }

    const handleDeleteDepartment = (department) => {
        handleClose();
        setDataDepartmentDelete(department)
        setIsShowModalDeleteDepartment(true)
    }

    const handleEditDepartment = (department) => {
        setIsShowModalEdit(true)
        setdataDepartmentEdit(department)
    }

    const handleEditDepartmentFormModal = (department) => {
        let cloneDepartments = _.cloneDeep(departments);
        let index = departments.findIndex(item => item.id === department.id);
        cloneDepartments[index].name = department.name;
        setDepartments(cloneDepartments);
    }

    return (
        <>
            <div className="department-container">
                <div className='my-3 add-new'>
                    <span><b>List Department:</b></span>
                    <button className='btn btn-success' onClick={() => { setIsShowModalAddDepartment(true) }}>
                        Add New Department
                    </button>
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {departments.map(item => <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>
                                <Button
                                 variant="warning"
                                  className='mx-3'
                                  onClick={() => {handleEditDepartment(item)}}
                                  >Edit</Button>
                                <Button
                                 variant="danger"
                                 onClick={()=>{handleDeleteDepartment(item)}}
                                 >Delete</Button>
                            </td>
                        </tr>)}

                    </tbody>
                </Table>
                <ModalAddDepartment
                    show={isShowModalAddDepartment}
                    handleClose={handleClose}
                    handleUpdateTable={handleUpdateTable}
                />
                <ModalDeleteDepartment
                    show = {isShowModalDeleteDepartment}
                    handleClose={handleClose}
                    handleUpdateTable={handleUpdateTable}
                    dataDepartmentDelete={dataDepartmentDelete}
                />
                <ModalEditDepartment
                    show = {isShowModalEdit}
                    dataDepartmentEdit = {dataDepartmentEdit}
                    handleClose={handleClose}
                    handleEditDepartmentFormModal={handleEditDepartmentFormModal}
                />
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}
export default Department;