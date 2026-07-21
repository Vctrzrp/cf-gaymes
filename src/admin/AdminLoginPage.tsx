import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Alert, Box, Button, Paper, TextField, Typography } from '@mui/material'
import { FormEvent, useState } from 'react'
import { useLogin } from 'react-admin'

export function AdminLoginPage() {
  const login = useLogin()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login({ username, password })
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'No fue posible iniciar sesión.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        p: 2,
        display: 'grid',
        placeItems: 'center',
        background: 'radial-gradient(circle at 15% 0%, rgba(255,106,0,.18), transparent 28rem), #0b0b0f'
      }}
    >
      <Paper
        component="form"
        onSubmit={submit}
        elevation={0}
        sx={{
          width: 'min(100%, 430px)',
          p: { xs: 3, sm: 4 },
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 3
        }}
      >
        <Box sx={{ width: 54, height: 54, mb: 3, borderRadius: 2, display: 'grid', placeItems: 'center', color: '#111', bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Box>

        <Typography variant="overline" color="primary" sx={{ fontWeight: 800, letterSpacing: '.14em' }}>
          Acceso privado
        </Typography>
        <Typography variant="h3" sx={{ mb: 1 }}>Administración</Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Ingresa tus credenciales. Después de dos intentos incorrectos volverás al sitio principal.
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <TextField
          label="Usuario"
          value={username}
          onChange={event => setUsername(event.target.value)}
          autoComplete="username"
          autoFocus
          required
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Contraseña"
          type="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
          autoComplete="current-password"
          required
          fullWidth
          sx={{ mb: 3 }}
        />
        <Button type="submit" variant="contained" size="large" disabled={loading} fullWidth>
          {loading ? 'Validando…' : 'Ingresar'}
        </Button>
      </Paper>
    </Box>
  )
}
