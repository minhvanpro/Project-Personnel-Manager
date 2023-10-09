import axios from "./Customize-axios";

const fetchAllDepartment = () => {
    return axios.get("/api/department/get/all");
}

const postCreateDepartment = (name) => {
    return axios.post("/api/department", {name: name});
}

const deleteDepartment = (id) => {
    return axios.delete(`/api/department/${id}`)
}

const putUpdateDepartment = (id, name) => {
    return axios.put("/api/department", {id: id, name: name})
}

export {fetchAllDepartment, postCreateDepartment, deleteDepartment, putUpdateDepartment};