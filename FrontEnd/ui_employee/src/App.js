import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import { Container } from 'react-bootstrap';
//import { useCallback, useEffect, useState } from 'react';
import Employee from './pages/Employee';
import Department from './pages/Department';
import Project from './pages/Project';
//import Tables from './components/Tables';
//import { memo } from 'react';
//import Card from './components/Card';
import { Admin, Resource } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import jsonServerProvider from 'ra-data-json-server';

import { useEffect } from 'react';
import { ListDepartments, EditDepartment, CreateDepartment, ShowDepartment} from './components/Departments';
import {ListEmployees, EditEmployee, CreateEmployee} from './components/Employees';
import {ListProjects, EditProject, CreateProject, ShowProject} from './components/Projects';
// state
// props 
// component



function App() {
  //   const [name,setName]  = useState("abc");
  //   const [heightCard,setHeightCard]  = useState(200);
  //   const handleSetName = ()=> {
  //     setName("bcde");
  // }
  // const handleSetHeightCard = ()=> {
  //   setHeightCard(300);
  // }
  //  const [card,setCard]=useState({
  //       name:"abc",
  //       count:1
  //  })
  //  const handleSetCard = useCallback(()=> {
  //   setCard({
  //     name:'abc',
  //     count:1
  //   })
  // })
  // useEffect(()=>{
  //   fetch("http://localhost:8080/api/v2/department/get/list?filter=%7B%7D&range=%5B0%2C9%5D&sort=%5B%22id%22%2C%22ASC%22%5D")
  //   .then(json => json.json())
  //   .then(json => console.log(json))
  //   .catch(err => console.log(err))
  // },[])
  return (
    <div className='app-container'>
      {/* <Card card={card}/
      <button onClick={handleSetCard}>
            Change Card
      </button> */}
      <Admin dataProvider={simpleRestProvider('http://localhost:8080/api/v2')}>
        <Resource name="employees" list={ListEmployees} edit={EditEmployee} create={CreateEmployee} options={{
          label: "Employees"
        }} />
        <Resource name="departments" list={ListDepartments} edit={EditDepartment} create={CreateDepartment} show={ShowDepartment} options={{
          label: "Departments"
        }} />
        <Resource name="projects" list={ListProjects} edit={EditProject} create={CreateProject} show={ShowProject} options={{
          label: "Projects"
        }} />
      </Admin>
      {/* <Header />
      <Container>
        <Routes>
          <Route path='/' element={<Employee/>} />
          <Route path='/department' element={<Department/>} />
          <Route path='/project' element={<Project/>} />
        </Routes> 
      </Container> */}
    </div>
  );
}

export default App;
