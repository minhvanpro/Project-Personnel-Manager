import { useEffect, useState } from "react";
import { Table, Form } from "react-bootstrap";



const isObject = obj => typeof obj === 'object' && obj !== null

const Tables = ({
    rows = [],
    columns = [],
    checkBox = false,
    onChangeCheckboxes = ()=> {}
}) => {

    const [dataList,setDataList] = useState(()=>[]);
    const [checkAll,setCheckAll] = useState(false);

    useEffect(()=>{
        let _dataList =  columns ? [...columns] : [];
        if(checkBox){
            _dataList = _dataList.map(item => ({
                check:false,
                ...item,
            }))
        }
        setDataList(_dataList);
    },[JSON.stringify(columns)]);

    const handleOnChangeCheckAll = (state)=> {
        setCheckAll(state);
        const _dataList = [...dataList].map(item => ({
            ...item,
            check:state
        }));
        setDataList(_dataList);
        onChangeCheckboxes(_dataList.filter(item => item.check).map(item => ({id:item.id})));
    }

    const handleOnChangeCheckboxes = (id)=> {
        let element = dataList.find(item => item.id === id);
        if(element){
            element.check = !element.check;
            if(checkAll){
                if(dataList.some(item => !item.check)){
                    setCheckAll(false);
                }
            } else {
                if(dataList.every(item => item.check)){
                    setCheckAll(true);
                }
            }
            const _dataList = [...dataList];
            setDataList(_dataList);
            onChangeCheckboxes(_dataList.filter(item => item.check).map(item => ({id:item.id})));
        }
    }

    return (<>
        <Table>
            <TableHeader rows={rows} checkBox={checkBox} onChangeCheckAll={handleOnChangeCheckAll} checkAll={checkAll} />
            <TableBody rows={rows} columns={dataList} checkBox={checkBox} onChangeCheckBox={handleOnChangeCheckboxes}/>
        </Table>
    </>)
}
export default Tables;


const TableHeader = ({ rows = [], checkBox = false, checkAll = false ,onChangeCheckAll = ()=> {}}) => {
    const handleOnChangeCheckAll = ()=> {
        onChangeCheckAll(!checkAll);
        
    }
    return <>
        <thead>
            <tr>
                <>
                    {checkBox && <th>{
                        <Form.Check onChange={handleOnChangeCheckAll} checked={checkAll}/>
                    }
                    </th>}
                    {rows.map((row, i) => <th key={i}>{
                        isObject(row)
                            ? <>{row.name ? row.name : row.fieldName}</>
                            : <>fieldName {i}</>
                    }
                    </th>)}
                </>
            </tr>
        </thead>
    </>
}


const TableBody = ({
    columns = [],
    rows = [],
    checkBox = false,
    onChangeCheckBox = ()=> {}
}) => {


    const handleChangeCheckBox = (id)=> ()=> {
        onChangeCheckBox(id);
    } 
    return (
        <>
            <tbody>
                {columns.map((column, i) => <tr key={i}>
                    <>
                        {checkBox && <td><Form.Check checked={column.check} onChange={handleChangeCheckBox(column?.id)}/></td>}
                        {rows.map((row, j) => <td key={j}>{
                            isObject(row)
                                ? <>{
                                    row.show ? <>{row.show(column[row.fieldName])}</> : <>{column[row.fieldName]}</>
                                }</>
                                : <>column {i}</>
                        }</td>)}
                    </>
                </tr>)}
            </tbody>
        </>
    )
}


