import {
  Create,
  Datagrid,
  Edit,
  EditButton,
  EmailField,
  email,
  List,
  required,
  SelectField,
  SelectInput,
  SimpleForm,
  TextField,
  TextInput
} from 'react-admin'

const participantStatuses = [
  { id: 'registered', name: 'Inscrito' },
  { id: 'confirmed', name: 'Confirmado' },
  { id: 'inactive', name: 'Inactivo' }
]

const ParticipantForm = () => (
  <SimpleForm>
    <TextInput source="firstName" label="Nombre" validate={required()} />
    <TextInput source="lastName" label="Apellido" validate={required()} />
    <TextInput source="email" label="Correo electrónico" type="email" validate={[required(), email()]} fullWidth />
    <TextInput source="phone" label="Teléfono" />
    <SelectInput
      source="status"
      label="Estado"
      choices={participantStatuses}
      defaultValue="registered"
      validate={required()}
    />
  </SimpleForm>
)

export const ParticipantList = () => (
  <List title="Participantes" sort={{ field: 'lastName', order: 'ASC' }}>
    <Datagrid rowClick="edit">
      <TextField source="firstName" label="Nombre" />
      <TextField source="lastName" label="Apellido" />
      <EmailField source="email" label="Correo" />
      <TextField source="phone" label="Teléfono" />
      <SelectField source="status" label="Estado" choices={participantStatuses} />
      <EditButton />
    </Datagrid>
  </List>
)

export const ParticipantEdit = () => (
  <Edit title="Editar participante">
    <ParticipantForm />
  </Edit>
)

export const ParticipantCreate = () => (
  <Create title="Nuevo participante">
    <ParticipantForm />
  </Create>
)
