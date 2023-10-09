
import {
    CreateButton,
    DatagridConfigurable,
    ExportButton,
    FilterButton,
    Datagrid, List, TextField, TextInput,
    SelectColumnsButton,
    TopToolbar,
    EditButton, DeleteButton,
    SimpleForm,
    Edit,
    Create,
    Show, SimpleShowLayout,FunctionField
} from 'react-admin';
import { ListEmployees } from './Employees';

const ListActions = () => (
    <TopToolbar>
        <SelectColumnsButton />
        <FilterButton />
        <CreateButton />
        <ExportButton />
    </TopToolbar>
);

const postFilters = [
    <TextInput label="Search" source="name" alwaysOn />,
];

const postFilter = [
    <TextInput label="Search" source="idDepartment" alwaysOn />,
];

export const ListDepartments = (props) => {

    return (

        <List actions={<ListActions />} filters={postFilters}>
            <DatagridConfigurable rowClick="show">
                <TextField source="id" />
                <TextField source="name" />
                <EditButton />
            </DatagridConfigurable>
        </List>
    )
}

export const EditDepartment = (props) => {
    return (
        <Edit title="Edit Department" {...props}>
            <SimpleForm>
                <TextInput source="name" />
            </SimpleForm>
        </Edit>
    )
}

export const CreateDepartment = (props) => {
    return (
        <Create title="Create a Department" {...props}>
            <SimpleForm>
                <TextInput source="name" />
            </SimpleForm>
        </Create>
    )
}

export const ShowDepartment = (props) => {
    return (
        <Show>
            <SimpleShowLayout>
                <span>Department:</span>
                <TextField source="id" />
                <TextField source="name" />

                <span>Employee:</span>
                <List hasCreate={false} resource="employees" filters={postFilter}>
                    <DatagridConfigurable>
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
                        <FunctionField
                            label="idDepartment"
                            render={({ idDepartment }) => <>
                                {idDepartment.id}
                            </>}
                        />
                    </DatagridConfigurable>
                </List>
            </SimpleShowLayout>
        </Show>
    )
}
