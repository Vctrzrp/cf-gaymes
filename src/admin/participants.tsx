import { FormControl, FormControlLabel, FormLabel, Switch } from '@mui/material'
import {
  Create,
  Datagrid,
  Edit,
  EditButton,
  List,
  required,
  SaveButton,
  SelectField,
  SimpleForm,
  TextField,
  TextInput,
  Toolbar,
  useInput
} from 'react-admin'

const participantStatuses = [
  { id: 'active', name: 'Activo' },
  { id: 'inactive', name: 'Inactivo' }
]

const ParticipantStatusInput = () => {
  const { field } = useInput({
    source: 'status',
    defaultValue: 'active',
    validate: required()
  })

  return (
    <FormControl fullWidth sx={{ mt: 1 }}>
      <FormLabel id="participant-status-label" sx={{ mb: 1, fontWeight: 700 }}>
        Estado
      </FormLabel>
      <FormControlLabel
        sx={{ m: 0, gap: 1 }}
        label={field.value === 'active' ? 'Activo' : 'Inactivo'}
        control={(
          <Switch
            checked={field.value === 'active'}
            onChange={event => field.onChange(event.target.checked ? 'active' : 'inactive')}
            slotProps={{ input: { 'aria-labelledby': 'participant-status-label' } }}
            sx={{
              width: 68,
              height: 38,
              padding: 0,
              '& .MuiSwitch-switchBase': {
                padding: '4px',
                color: '#ffffff',
                transitionDuration: '220ms',
                '&.Mui-checked': {
                  transform: 'translateX(30px)',
                  color: '#ffffff',
                  '& + .MuiSwitch-track': {
                    backgroundColor: '#ff6a00',
                    borderColor: '#ff6a00',
                    opacity: 1
                  }
                }
              },
              '& .MuiSwitch-thumb': {
                width: 30,
                height: 30,
                boxShadow: '0 2px 8px rgba(0, 0, 0, .24)'
              },
              '& .MuiSwitch-track': {
                borderRadius: 19,
                border: '1px solid',
                borderColor: 'divider',
                backgroundColor: '#ffffff',
                opacity: 1
              }
            }}
          />
        )}
      />
    </FormControl>
  )
}

const ParticipantFormToolbar = () => (
  <Toolbar
    sx={{
      width: '100%',
      boxSizing: 'border-box',
      m: '0 !important',
      p: '24px 28px 28px !important',
      backgroundColor: 'transparent'
    }}
  >
    <SaveButton
      label="Guardar"
      sx={{
        width: '100%',
        minHeight: 52,
        fontSize: '1rem',
        color: '#ffffff !important',
        '& .MuiSvgIcon-root': { color: '#ffffff' }
      }}
    />
  </Toolbar>
)

const ParticipantForm = () => (
  <SimpleForm
    toolbar={<ParticipantFormToolbar />}
    sx={{ boxSizing: 'border-box', width: '100%', p: '28px !important' }}
  >
    <TextInput source="firstName" label="Nombre" validate={required()} fullWidth />
    <TextInput source="lastName" label="Apellido" validate={required()} fullWidth />
    <ParticipantStatusInput />
  </SimpleForm>
)

export const ParticipantList = () => (
  <List title="Participantes" sort={{ field: 'lastName', order: 'ASC' }}>
    <Datagrid rowClick="edit">
      <TextField source="firstName" label="Nombre" />
      <TextField source="lastName" label="Apellido" />
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
