import {
    CreateButton,
    DatagridConfigurable,
    ExportButton,
    FilterButton,
    List, TextField, TextInput,
    SelectColumnsButton,
    TopToolbar,
    EditButton,
    SimpleForm,
    Edit, useGetList,useGetOne,
    Create, FunctionField, SelectInput, ReferenceInput, TranslatableInputs
} from 'react-admin';

import React, { useState, useEffect } from 'react';

const ListActions = () => (
    <TopToolbar>
        <SelectColumnsButton />
        <FilterButton />
        <CreateButton />
        <ExportButton />
    </TopToolbar>
);

const postFilters = [
    <TextInput label="Search" source="fullName" alwaysOn />,
];

export const ListEmployees = (props) => {

    return (

        <List actions={<ListActions />} filters={postFilters}>
            <DatagridConfigurable rowClick="edit">
                <TextField source="id" />
                <TextField source="fullName" />
                <FunctionField
                    label="Address"
                    render={({ idAddress }) => <>
                        {idAddress.commune} - {idAddress.district} - {idAddress.city}
                    </>}
                />
                <FunctionField
                    label="Department"
                    render={({ idDepartment }) => <>
                        {idDepartment.name}
                    </>}
                />
                <EditButton />
            </DatagridConfigurable>
        </List>
    )
}

export const EditEmployee = (props) => {
    const { data: choices, isLoading: isLoadingChoices } = useGetList('departments');

    return (
        <Edit title="Edit Employee">
            <SimpleForm>
                <span>Name Employee:</span>
                <TextInput source="fullName" />
                <span>Address:</span>
                <TranslatableInputs locales={['commune', 'district', 'city']}>
                    <TextInput source="idAddress" />
                </TranslatableInputs>
                <span>Department:</span>
                <SelectInput
                    source="idDepartment.id"
                    choices={choices}
                    optionText="name"
                    optionValue="id"
                    isLoading={isLoadingChoices}
                    resettable
                />
            </SimpleForm>
        </Edit>
    )
}

export const CreateEmployee = (props) => {

    const { data, isLoading } = useGetList('departments');

    return (
        <Create title="Create a Employee" {...props}>
            <SimpleForm>
                <span>Name Employee:</span>
                <TextInput source="fullName" />
                <span>Address:</span>
                <TranslatableInputs locales={['commune', 'district', 'city']}>
                    <TextInput source="idAddress" />
                </TranslatableInputs>
                <span>Department:</span>
                <SelectInput
                    source="idDepartment"
                    choices={data}
                    optionText="name"
                    optionValue="id"
                    isLoading={isLoading}
                />
            </SimpleForm>
        </Create>
    )
}