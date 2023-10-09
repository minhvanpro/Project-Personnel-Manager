import Form from 'react-bootstrap/Form';
import { useEffect, useState } from "react";
import { fetchAllEmployee } from '../services/EmployeeService';

const ModalCheckbox = ({onChange = ()=>{}}) => {
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
    const handleUpdateCheckbox = (event) => {
        onChange(event.target.value)
    }

    return (
        <>
            <Form.Label>Select Employee:</Form.Label>
            {
                employees.map(
                    (item) => <Form.Check onChange={handleUpdateCheckbox}
                            key={`employee-${item.id}`} value={item.id}
                            label={item.fullName} aria-label="option 1">
                            </Form.Check>
                )
            }

        </>
    )
}
export default ModalCheckbox;