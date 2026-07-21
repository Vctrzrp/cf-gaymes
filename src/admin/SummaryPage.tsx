import AddIcon from '@mui/icons-material/Add'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlineOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography
} from '@mui/material'
import { FormEvent, useMemo, useState } from 'react'
import {
  Title,
  useCreate,
  useDelete,
  useGetList,
  useNotify,
  useRefresh,
  useUpdate
} from 'react-admin'
import type { Identifier, RaRecord } from 'react-admin'

interface WodRecord extends RaRecord {
  id: Identifier
  name: string
  date?: string
}

interface ParticipantRecord extends RaRecord {
  id: Identifier
  firstName: string
  lastName: string
  status?: string
}

interface ResultRecord extends RaRecord {
  id: Identifier
  wodId: Identifier
  participantId: Identifier
  score: string
  points: number
  status: 'pending' | 'finished' | 'dnf'
}

const resultStatuses = {
  pending: { label: 'Pendiente', color: 'warning' as const },
  finished: { label: 'Finalizado', color: 'success' as const },
  dnf: { label: 'Comenzó, pero no terminó', color: 'default' as const }
}

const formatDate = (date?: string) => date
  ? new Intl.DateTimeFormat('es-CL', { day: '2-digit', month: 'short', year: 'numeric' })
    .format(new Date(`${date}T00:00:00`))
  : 'Sin fecha'

export function SummaryPage() {
  const notify = useNotify()
  const refresh = useRefresh()
  const [createResult, { isPending: isCreating }] = useCreate()
  const [updateResult, { isPending: isUpdating }] = useUpdate()
  const [deleteResult, { isPending: isDeleting }] = useDelete()
  const [selectedWod, setSelectedWod] = useState<WodRecord | null>(null)
  const [editingResult, setEditingResult] = useState<ResultRecord | null>(null)
  const [deletingResult, setDeletingResult] = useState<ResultRecord | null>(null)
  const [participantId, setParticipantId] = useState('')
  const [score, setScore] = useState('')
  const [points, setPoints] = useState('')
  const [status, setStatus] = useState<ResultRecord['status']>('pending')

  const { data: wods = [], isPending: loadingWods } = useGetList<WodRecord>('wods', {
    pagination: { page: 1, perPage: 100 },
    sort: { field: 'date', order: 'ASC' },
    filter: {}
  })
  const { data: participants = [] } = useGetList<ParticipantRecord>('participants', {
    pagination: { page: 1, perPage: 500 },
    sort: { field: 'lastName', order: 'ASC' },
    filter: {}
  })
  const { data: results = [] } = useGetList<ResultRecord>('results', {
    pagination: { page: 1, perPage: 1000 },
    sort: { field: 'points', order: 'DESC' },
    filter: {}
  })

  const participantNames = useMemo(() => new Map(
    participants.map(participant => [
      String(participant.id),
      `${participant.firstName} ${participant.lastName}`
    ])
  ), [participants])

  const selectableParticipants = useMemo(() => participants.filter(participant => {
    if (participant.status !== 'active' && String(participant.id) !== participantId) return false
    if (!selectedWod || editingResult) return true
    return !results.some(result => (
      String(result.wodId) === String(selectedWod.id)
      && String(result.participantId) === String(participant.id)
    ))
  }), [editingResult, participantId, participants, results, selectedWod])

  const openCreateDialog = (wod: WodRecord) => {
    setEditingResult(null)
    setParticipantId('')
    setScore('')
    setPoints('')
    setStatus('pending')
    setSelectedWod(wod)
  }

  const openEditDialog = (wod: WodRecord, result: ResultRecord) => {
    setEditingResult(result)
    setParticipantId(String(result.participantId))
    setScore(result.score ?? '')
    setPoints(String(result.points))
    setStatus(result.status)
    setSelectedWod(wod)
  }

  const closeDialog = () => {
    setSelectedWod(null)
    setEditingResult(null)
    setParticipantId('')
    setScore('')
    setPoints('')
    setStatus('pending')
  }

  const submitResult = (event: FormEvent) => {
    event.preventDefault()
    if (!selectedWod || !participantId || points === '') return

    const data = {
      wodId: selectedWod.id,
      participantId,
      score,
      points: Number(points),
      status
    }
    const onSuccess = () => {
      notify(editingResult ? 'Resultado actualizado correctamente' : 'Resultado agregado correctamente', { type: 'success' })
      closeDialog()
      refresh()
    }
    const onError = () => notify('No fue posible guardar el resultado', { type: 'error' })

    if (editingResult) {
      updateResult('results', {
        id: editingResult.id,
        data,
        previousData: editingResult
      }, { mutationMode: 'pessimistic', onSuccess, onError })
      return
    }

    createResult('results', { data }, { onSuccess, onError })
  }

  const confirmDelete = () => {
    if (!deletingResult) return
    deleteResult('results', {
      id: deletingResult.id,
      previousData: deletingResult
    }, {
      mutationMode: 'pessimistic',
      onSuccess: () => {
        notify('Resultado eliminado correctamente', { type: 'success' })
        setDeletingResult(null)
        refresh()
      },
      onError: () => notify('No fue posible eliminar el resultado', { type: 'error' })
    })
  }

  const isSaving = isCreating || isUpdating

  return (
    <Box>
      <Title title="Resultados" />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
        <EmojiEventsIcon color="primary" />
        <Typography variant="h4">Resultados</Typography>
      </Box>

      {!loadingWods && wods.length === 0 && (
        <Alert severity="info">Primero debes crear al menos un WOD.</Alert>
      )}

      <Stack spacing={3}>
        {wods.map(wod => {
          const wodResults = results.filter(result => String(result.wodId) === String(wod.id))

          return (
            <Paper key={wod.id} variant="outlined" sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3 }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: { xs: 'stretch', sm: 'center' },
                  justifyContent: 'space-between',
                  gap: 2,
                  mb: 2.5
                }}
              >
                <Box>
                  <Typography variant="h5">{wod.name}</Typography>
                  <Typography color="text.secondary">{formatDate(wod.date)}</Typography>
                </Box>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => openCreateDialog(wod)}
                  sx={{ color: '#fff !important', '& .MuiSvgIcon-root': { color: '#fff' } }}
                >
                  Agregar resultado
                </Button>
              </Box>

              {wodResults.length === 0 ? (
                <Alert severity="info">Este WOD todavía no tiene resultados.</Alert>
              ) : (
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Participante</TableCell>
                        <TableCell>Marca</TableCell>
                        <TableCell align="right">Puntos</TableCell>
                        <TableCell>Estado</TableCell>
                        <TableCell align="right">Acciones</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {wodResults.map(result => (
                        <TableRow key={result.id}>
                          <TableCell>{participantNames.get(String(result.participantId)) ?? result.participantId}</TableCell>
                          <TableCell>{result.score || '—'}</TableCell>
                          <TableCell align="right">{result.points}</TableCell>
                          <TableCell>
                            <Chip
                              size="small"
                              label={resultStatuses[result.status]?.label ?? result.status}
                              color={resultStatuses[result.status]?.color ?? 'default'}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Tooltip title="Editar resultado">
                              <IconButton
                                color="primary"
                                aria-label="Editar resultado"
                                onClick={() => openEditDialog(wod, result)}
                              >
                                <EditOutlinedIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Eliminar resultado">
                              <IconButton
                                color="error"
                                aria-label="Eliminar resultado"
                                onClick={() => setDeletingResult(result)}
                              >
                                <DeleteOutlineIcon />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Paper>
          )
        })}
      </Stack>

      <Dialog open={Boolean(selectedWod)} onClose={closeDialog} fullWidth maxWidth="sm">
        <Box component="form" onSubmit={submitResult}>
          <DialogTitle>
            {editingResult ? 'Editar resultado' : 'Agregar resultado'} · {selectedWod?.name}
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2.5} sx={{ pt: 1 }}>
              <FormControl fullWidth required>
                <InputLabel id="result-participant-label">Participante</InputLabel>
                <Select
                  labelId="result-participant-label"
                  label="Participante"
                  value={participantId}
                  onChange={event => setParticipantId(event.target.value)}
                >
                  {selectableParticipants.map(participant => (
                    <MenuItem key={participant.id} value={String(participant.id)}>
                      {participant.firstName} {participant.lastName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label="Marca o resultado"
                placeholder="Ej.: 08:42 o 8 + 24 reps"
                value={score}
                onChange={event => setScore(event.target.value)}
                fullWidth
              />
              <TextField
                label="Puntos"
                type="number"
                value={points}
                onChange={event => setPoints(event.target.value)}
                slotProps={{ htmlInput: { min: 0 } }}
                required
                fullWidth
              />
              <FormControl fullWidth required>
                <InputLabel id="result-status-label">Estado del resultado</InputLabel>
                <Select
                  labelId="result-status-label"
                  label="Estado del resultado"
                  value={status}
                  onChange={event => setStatus(event.target.value as ResultRecord['status'])}
                >
                  <MenuItem value="pending">Pendiente</MenuItem>
                  <MenuItem value="finished">Finalizado</MenuItem>
                  <MenuItem value="dnf">Comenzó, pero no terminó</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </DialogContent>
          <DialogActions sx={{ p: 3, pt: 1 }}>
            <Button onClick={closeDialog} disabled={isSaving}>Cancelar</Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isSaving || !participantId || points === ''}
              sx={{ color: '#fff !important' }}
            >
              {editingResult ? 'Guardar cambios' : 'Guardar resultado'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      <Dialog open={Boolean(deletingResult)} onClose={() => setDeletingResult(null)} maxWidth="xs" fullWidth>
        <DialogTitle>Eliminar resultado</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que quieres eliminar el resultado de{' '}
            <strong>{deletingResult ? participantNames.get(String(deletingResult.participantId)) : ''}</strong>?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setDeletingResult(null)} disabled={isDeleting}>Cancelar</Button>
          <Button
            variant="contained"
            color="error"
            onClick={confirmDelete}
            disabled={isDeleting}
            sx={{ color: '#fff !important' }}
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
