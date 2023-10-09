//import axios from "axios";
import axios from "./Customize-axios";
const fetchAllEmployee = () => {
    return axios.get("/api/employee/get/all");
}
const postCreateEmployee = (fullName, commune, district, city, idDepartment) => {
    return axios.post("/api/employee", {fullName: fullName, idAddress:{commune: commune, district: district, city: city}, idDepartment: {id: idDepartment}});
}

const putUpdateEmployee = (id,fullName, commune, district, city, idDepartment) => {
    return axios.put("/api/employee", {id:id,fullName: fullName, idAddress:{commune: commune, district: district, city: city}, idDepartment: {id: idDepartment}});
}

const deleteEmployee = (id) => {
    return axios.delete(`/api/employee/${id}`)
}

export {fetchAllEmployee, postCreateEmployee, putUpdateEmployee, deleteEmployee};