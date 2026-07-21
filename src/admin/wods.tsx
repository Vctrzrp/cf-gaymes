import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import { Button as MuiButton } from '@mui/material'
import {
  ArrayInput,
  Create,
  Datagrid,
  DateInput,
  Edit,
  EditButton,
  FunctionField,
  List,
  required,
  SaveButton,
  SimpleForm,
  SimpleFormIterator,
  TextField,
  TextInput,
  Toolbar,
  useSimpleFormIterator
} from 'react-admin'

const AddActivityButton = () => {
  const { add } = useSimpleFormIterator()

  return (
    <MuiButton
      type="button"
      variant="contained"
      startIcon={<AddCircleOutlineIcon />}
      onClick={() => add()}
      sx={{
        minHeight: 46,
        px: 3,
        color: '#ffffff !important',
        backgroundColor: '#ff6a00',
        '&:hover': { backgroundColor: '#d95700' },
        '& .MuiSvgIcon-root': { color: '#ffffff' }
      }}
    >
      Agregar actividad
    </MuiButton>
  )
}

const WodFormToolbar = () => (
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

const WodForm = () => (
  <SimpleForm
    toolbar={<WodFormToolbar />}
    sx={{ boxSizing: 'border-box', width: '100%', p: '28px !important' }}
  >
    <TextInput source="name" label="Nombre del WOD" fullWidth validate={required()} />
    <DateInput source="date" label="Fecha del WOD" fullWidth validate={required()} />
    <ArrayInput source="activities" label="Actividades" fullWidth validate={required()}>
      <SimpleFormIterator
        addButton={<AddActivityButton />}
        sx={{
          width: '100%',
          '& .RaSimpleFormIterator-list': {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          },
          '& .RaSimpleFormIterator-line': {
            width: '100%',
            borderBottom: 'none !important'
          },
          '& .RaSimpleFormIterator-form': { flex: 1, width: '100%' },
          '& .MuiFormControl-root': { width: '100%' },
          '& .RaSimpleFormIterator-buttons': { marginTop: '16px' }
        }}
      >
        <TextInput
          source=""
          label="Actividad"
          helperText={false}
          fullWidth
          validate={required()}
        />
      </SimpleFormIterator>
    </ArrayInput>
  </SimpleForm>
)

export const WodList = () => (
  <List title="WODs" sort={{ field: 'name', order: 'ASC' }}>
    <Datagrid rowClick="edit">
      <TextField source="name" label="WOD" />
      <FunctionField
        label="Actividades"
        render={record => `${record.activities?.length ?? 0} actividades`}
      />
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
