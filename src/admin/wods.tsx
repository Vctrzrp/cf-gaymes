import {
  Create,
  Datagrid,
  DateField,
  DateInput,
  Edit,
  EditButton,
  List,
  required,
  SimpleForm,
  TextField,
  TextInput
} from 'react-admin'

const WodForm = () => (
  <SimpleForm>
    <TextInput source="name" label="Nombre" validate={required()} />
    <DateInput source="date" label="Fecha de realización" validate={required()} />
    <TextInput source="description" label="Descripción" fullWidth multiline minRows={5} />
  </SimpleForm>
)

export const WodList = () => (
  <List title="WODs" sort={{ field: 'date', order: 'ASC' }}>
    <Datagrid rowClick="edit">
      <TextField source="name" label="WOD" />
      <DateField source="date" label="Fecha" locales="es-CL" />
      <TextField source="description" label="Descripción" />
      <EditButton />
    </Datagrid>
  </List>
)

export const WodEdit = () => (
  <Edit title="Editar WOD">
    <WodForm />
  </Edit>
)

export const WodCreate = () => (
  <Create title="Nuevo WOD">
    <WodForm />
  </Create>
)
