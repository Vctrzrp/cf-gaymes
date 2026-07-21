import type { ThemeOptions } from '@mui/material/styles'

const sharedTheme: ThemeOptions = {
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
    h1: { fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 800, textTransform: 'uppercase' },
    h2: { fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 800, textTransform: 'uppercase' },
    h3: { fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 800, textTransform: 'uppercase' },
    h4: { fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 800, textTransform: 'uppercase' },
    h5: { fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 800, textTransform: 'uppercase' },
    h6: { fontFamily: '"Barlow Condensed", sans-serif', fontWeight: 800, textTransform: 'uppercase' },
    button: { fontWeight: 800 }
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          textTransform: 'none',
          minHeight: 40,
          paddingInline: 18,
          '&.MuiButton-containedPrimary': {
            color: '#111111',
            boxShadow: '0 10px 26px rgba(255, 106, 0, .2)'
          }
        }
      }
    },
    MuiIconButton: {
      styleOverrides: { root: { borderRadius: 10 } }
    },
    MuiPaper: {
      styleOverrides: { root: { backgroundImage: 'none' } }
    },
    MuiTableCell: {
      styleOverrides: {
        head: { fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.04em', fontSize: '.72rem' }
      }
    },
    MuiTextField: {
      defaultProps: { variant: 'outlined' }
    },
    RaLayout: {
      styleOverrides: {
        root: {
          '& .RaLayout-content': { padding: '28px clamp(16px, 3vw, 42px)' }
        }
      }
    },
    RaMenuItemLink: {
      styleOverrides: {
        root: {
          margin: '5px 10px',
          borderRadius: 10,
          '&.RaMenuItemLink-active': {
            color: '#ff6a00',
            backgroundColor: 'rgba(255, 106, 0, .11)'
          }
        }
      }
    },
    RaMenu: {
      styleOverrides: {
        root: {
          '&.RaMenu-closed .RaMenuItemLink-root': {
            width: 44,
            minHeight: 44,
            margin: '5px auto',
            padding: 0,
            justifyContent: 'center'
          },
          '&.RaMenu-closed .RaMenuItemLink-icon': {
            minWidth: 0,
            margin: 0,
            display: 'grid',
            placeItems: 'center'
          },
          '&.RaMenu-closed .RaMenuItemLink-root > .MuiTypography-root': {
            display: 'none'
          }
        }
      }
    },
    RaDatagrid: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          overflow: 'visible',
          '& .RaDatagrid-tableWrapper': {
            borderRadius: 14,
            overflow: 'hidden'
          },
          '& .RaDatagrid-row:hover': { backgroundColor: 'rgba(255, 106, 0, .06)' }
        }
      }
    },
    RaSimpleForm: {
      styleOverrides: {
        root: { padding: '28px', gap: 6 }
      }
    }
  }
}

export const adminLightTheme: ThemeOptions = {
  ...sharedTheme,
  palette: {
    mode: 'light',
    primary: { main: '#ff6a00', dark: '#d95700', contrastText: '#111111' },
    secondary: { main: '#17171c' },
    background: { default: '#f7f7f9', paper: '#ffffff' },
    text: { primary: '#17171c', secondary: '#686874' },
    divider: '#d9d9e0'
  }
}

export const adminDarkTheme: ThemeOptions = {
  ...sharedTheme,
  palette: {
    mode: 'dark',
    primary: { main: '#ff6a00', light: '#ff8a3d', contrastText: '#111111' },
    secondary: { main: '#f5f5f7' },
    background: { default: '#0b0b0f', paper: '#15151b' },
    text: { primary: '#f5f5f7', secondary: '#9c9ca8' },
    divider: '#303039'
  }
}
