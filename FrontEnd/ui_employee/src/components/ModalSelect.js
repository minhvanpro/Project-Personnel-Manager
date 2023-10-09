import { fetchAllDepartment } from "../services/DepartmentService";
import { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';

const defaultValue = "default";

const ModalSelect = ({onChange = ()=>{},selected = defaultValue}) => {

    const [departments, setDepartments] = useState(() => []);
    console.log(selected);
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

    const handleUpdateSelect = (event) => {
        onChange(event.target.value !== defaultValue ? event.target.value : null);
    }

    return (
        <>
            <Form.Label>Department:</Form.Label>
            <Form.Select onChange={handleUpdateSelect} aria-label="Default select department" value={selected || defaultValue}>
                <option value={defaultValue}>Open this select menu</option>
                {
                    departments.map(
                        (item) => <option key={item.id} value={item.id}>{item.name}</option>
                    )
                }
            </Form.Select>
        </>
    );
}
export default ModalSelect;