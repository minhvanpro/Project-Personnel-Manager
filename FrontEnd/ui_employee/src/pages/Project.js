import Table from 'react-bootstrap/Table';
import { useEffect, useState } from "react";
import { fetchAllProject } from "../services/ProjectService";
import ModalAddProject from '../components/ModalAddProject';
import { ToastContainer } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import ModalDeleteProject from '../components/ModalDeleteProject';
import ModalEditProject from '../components/ModalEditProject';
import _ from 'lodash';

const Project = () => {
    const [projects, setProjects] = useState(() => []);

    useEffect(() => {
        //call api
        getProjects();
    }, [])

    const getProjects = async () => {
        let result = await fetchAllProject();
        if (result && result.data) {
            setProjects(result.data)
        }
    }

    const [isShowModalAddDepartment, setIsShowModalAddProject] = useState(false);
    const [isShowModalDeleteProject, setIsShowModalDeleteProject] = useState(false);
    const [dataProjectDelete, setDataProjectDelete] = useState({});
    const [dataProjectEdit, setDataProjectEdit] = useState({});
    const [isShowModalEdit, setIsShowModalEdit] = useState(false);

    const handleEditProject = (project) => {
        setIsShowModalEdit(true)
        setDataProjectEdit(project)
    }

    const handleEditProjectFormModal = (project) => {
        let cloneProjects = _.cloneDeep(projects);
        console.log(cloneProjects)
        let index = projects.findIndex(item => item.id === project.id);
        cloneProjects[index].name = project.name;
        setProjects(cloneProjects);
    }

    const handleDeleteProject = (project) => {
        handleUpdateTable();
        handleClose();
        setDataProjectDelete(project)
        setIsShowModalDeleteProject(true)
    }

    const handleClose = () => {
        setIsShowModalEdit(false)
        setIsShowModalDeleteProject(false)
        setIsShowModalAddProject(false)
    }
    const handleUpdateTable = () => {
        getProjects();
    }

    return (
        <>
            <div className="project-container">
                <div className='my-3 add-new'>
                    <span><b>List Project:</b></span>
                    <button className='btn btn-success' onClick={() => { setIsShowModalAddProject(true) }}>
                        Add New Project
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
                        {projects.map(item => <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>
                                <Button 
                                variant="warning" 
                                className='mx-3'
                                onClick={()=>{handleEditProject(item)}}
                                >Edit</Button>
                                <Button
                                 variant="danger"
                                 onClick={()=>{handleDeleteProject(item)}}
                                 >Delete</Button>
                            </td>
                        </tr>)}

                    </tbody>
                </Table>
                <ModalAddProject
                    show={isShowModalAddDepartment}
                    handleClose={handleClose}
                    handleUpdateTable={handleUpdateTable}
                />
                <ModalDeleteProject
                    show={isShowModalDeleteProject}
                    handleClose={handleClose}
                    handleUpdateTable={handleUpdateTable}
                    dataProjectDelete={dataProjectDelete}
                />
                <ModalEditProject
                    show = {isShowModalEdit}
                    dataProjectEdit = {dataProjectEdit}
                    handleClose={handleClose}
                    handleEditProjectFormModal={handleEditProjectFormModal}
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
        </>
    )
}
export default Project;