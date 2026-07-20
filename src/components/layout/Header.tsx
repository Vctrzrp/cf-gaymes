import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

export function Header() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
  )

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')

    const syncWithDevice = (event: MediaQueryListEvent) => {
      if (localStorage.getItem('theme')) return
      const deviceTheme = event.matches ? 'dark' : 'light'
      document.documentElement.dataset.theme = deviceTheme
      setTheme(deviceTheme)
    }

    media.addEventListener('change', syncWithDevice)
    return () => media.removeEventListener('change', syncWithDevice)
  }, [])

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = nextTheme
    localStorage.setItem('theme', nextTheme)
    setTheme(nextTheme)
  }

  return (
    <header className="site-header">
      <span className="brand">CROSSFIT GAYMES</span>

      <button
        className="theme-toggle"
        type="button"
        aria-label={`Cambiar a modo ${theme === 'dark' ? 'claro' : 'oscuro'}`}
        title={`Cambiar a modo ${theme === 'dark' ? 'claro' : 'oscuro'}`}
        onClick={toggleTheme}
      >
        {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
      </button>
    </header>
  )
}
