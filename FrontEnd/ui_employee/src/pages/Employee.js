import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllEmployee } from '../services/EmployeeService';
import ModalAddEmployee from '../components/ModalAddEmployee';
import { ToastContainer } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import ModalEditEmployee from '../components/ModalEditEmployee';
import ModalComfirm from '../components/ModalComfirm';
import _ from 'lodash';

const Employee = () => {
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

    const [isShowModalAddEmployee, setIsShowModalAddEmploee] = useState(false);

    const [isShowModalEdit, setIsShowModalEdit] = useState(false);
    const [dataEmployeeEdit, setDataEmployeeEdit] = useState({});

    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataEmployeeDelete, setDataEmployeeDelete] = useState({});


    const handleClose = () => {
        setIsShowModalAddEmploee(false)
        setIsShowModalEdit(false)
        setIsShowModalDelete(false)
    }

    const handleUpdateTable = () => {
        getEmployees();
    }

    const handleEditEmployee = (employee) => {
        //console.log(employee);
        setDataEmployeeEdit(employee);
        setIsShowModalEdit(true);
    }

    const handleEditEmployeeFormModal = (employee) => {
        let cloneEmpoyees = _.cloneDeep(employees);
        let index = employees.findIndex(item => item.id === employee.id);
        cloneEmpoyees[index].fullName = employee.fullName;
        cloneEmpoyees[index].idAddress.commune = employee.idAddress.commune;
        cloneEmpoyees[index].idAddress.district = employee.idAddress.district;
        cloneEmpoyees[index].idAddress.city = employee.idAddress.city;
        cloneEmpoyees[index].idDepartment.id = employee.idDepartment.id;
        setEmployees(cloneEmpoyees);
    }

    const handleDeleteEmployee = (employee) => {
        handleUpdateTable();
        handleClose();
        setDataEmployeeDelete(employee)
        setIsShowModalDelete(true)
    }

    return (<>
        <div className='employee-container'>
            <div className='my-3 add-new'>
                <span><b>List Employees:</b></span>
                <button className='btn btn-success' onClick={() => { setIsShowModalAddEmploee(true) }}>
                    Add New Employee
                </button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Full Name</th>
                        <th>Address</th>
                        <th>Department</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(item => <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.fullName}</td>
                        <td>{item?.idAddress?.commune} - {item?.idAddress?.district} - {item?.idAddress?.city}</td>
                        <td>{item?.idDepartment?.name}</td>
                        <td>
                            <Button 
                            variant="warning" 
                            className='mx-3'
                            onClick={()=> {handleEditEmployee(item)}}
                            >Edit</Button>

                            <Button 
                            variant="danger"
                            onClick={() => {handleDeleteEmployee(item)}}
                            >Delete</Button>
                        </td>
                    </tr>)}

                </tbody>
            </Table>
            <ModalAddEmployee
                show={isShowModalAddEmployee}
                handleClose={handleClose}
                handleUpdateTable={handleUpdateTable}
            />
            <ModalEditEmployee
                show = {isShowModalEdit}
                dataEmployeeEdit = {dataEmployeeEdit}
                handleClose={handleClose}
                handleEditEmployeeFormModal={handleEditEmployeeFormModal}
            />
            <ModalComfirm
                handleUpdateTable={handleUpdateTable}
                handleClose={handleClose}
                show = {isShowModalDelete}
                dataEmployeeDelete = {dataEmployeeDelete}
            />
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
        </div>
    </>)
}
export default Employee;