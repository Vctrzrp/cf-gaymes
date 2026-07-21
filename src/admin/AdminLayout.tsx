import LogoutIcon from '@mui/icons-material/Logout'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import { IconButton, Tooltip, Typography } from '@mui/material'
import { AppBar, Layout, Menu, type LayoutProps, useLogout } from 'react-admin'

const CrossfitAppBar = () => {
  const logout = useLogout()

  return (
    <AppBar
      userMenu={false}
      color="inherit"
      sx={{
        color: '#f5f5f7',
        background: 'linear-gradient(90deg, #09090c, #171015)',
        borderBottom: '1px solid rgba(255, 106, 0, .28)',
        boxShadow: '0 8px 30px rgba(0, 0, 0, .18)'
      }}
    >
      <Typography
        component="span"
        sx={{
          flex: 1,
          fontFamily: '"Barlow Condensed", sans-serif',
          fontSize: { xs: '1.05rem', sm: '1.3rem' },
          fontWeight: 800,
          letterSpacing: '.07em'
        }}
      >
        CROSSFIT GAYMES <Typography component="small" sx={{ color: '#ff6a00', font: 'inherit' }}>/ ADMIN</Typography>
      </Typography>
      <Tooltip title="Cerrar sesión">
        <IconButton color="inherit" aria-label="Cerrar sesión" onClick={() => void logout()}>
          <LogoutIcon />
        </IconButton>
      </Tooltip>
    </AppBar>
  )
}

const AdminMenu = () => (
  <Menu>
    <Menu.ResourceItem name="wods" />
    <Menu.ResourceItem name="participants" />
    <Menu.Item
      to="/adm/summary"
      primaryText="Resultados"
      leftIcon={<EmojiEventsIcon />}
    />
  </Menu>
)

export const AdminLayout = (props: LayoutProps) => (
  <Layout {...props} appBar={CrossfitAppBar} menu={AdminMenu} appBarAlwaysOn />
)
