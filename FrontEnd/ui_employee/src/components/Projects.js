
import {
    CreateButton,
    DatagridConfigurable,
    ExportButton,
    FilterButton,
    Datagrid, List, TextField, TextInput,
    SelectColumnsButton, ReferenceManyField,
    TopToolbar, CheckboxGroupInput,
    EditButton, DeleteButton,
    SimpleForm, useGetList,Show,SimpleShowLayout,
    Edit, AutocompleteInput,
    Create, FunctionField, SelectArrayInput,
    AutocompleteArrayInput, ArrayInput, SimpleFormIterator
} from 'react-admin';

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

export const ListProjects = (props) => {

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

export const EditProject = (props) => {
    return (
        <Edit title="Edit Project" {...props}>
            <SimpleForm>
                <TextInput source="name" />
            </SimpleForm>
        </Edit>
    )
}

export const CreateProject = (props) => {

    const { data, isLoading } = useGetList('employees');

    return (
        <Create title="Create a Project" {...props}>
            <SimpleForm>
                <span>Name Project:</span>
                <TextInput source="name" label="Name Project" title='Name Poroject' />
                <span>Employees:</span>

                <ReferenceManyField reference='employees' target='id'>
                    <List hasCreate={false} resource="employees" filters={postFilters}>
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
                        </DatagridConfigurable>
                    </List>
                </ReferenceManyField>

                {/* <AutocompleteArrayInput  source="employees" choices={data} optionText="fullName" optionValue="id" /> */}

                {/* <SelectArrayInput source="employees" choices={data} optionText="fullName" optionValue="id" resettable/> */}

            </SimpleForm>
        </Create>
    )   
}

export const ShowProject = (props) => {
    return (
        <Show>
            <SimpleShowLayout>
                <span>Department:</span>
                <TextField source="id" />
                <TextField source="name" />

                <span>Employee:</span>
                <List hasCreate={false} resource="employees" filters={postFilters}>
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
                    </DatagridConfigurable>
                </List>
            </SimpleShowLayout>
        </Show>
    )
}