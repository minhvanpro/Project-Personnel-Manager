import axios from "./Customize-axios";

const fetchAllProject = () => {
    return axios.get("/api/project/get/all");
}

const postCreateProject = (name, AllEmployee) => {
    return axios.post("/api/project", {name: name, employees: AllEmployee});
}

const deleteProject = (id) => {
    return axios.delete(`/api/project/${id}`)
}

const putUpdateProject = (id, name) => {
    return axios.put("/api/project", {id: id, name: name})
}

export {fetchAllProject, postCreateProject, deleteProject, putUpdateProject};