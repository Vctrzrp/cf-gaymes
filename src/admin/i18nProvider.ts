import polyglotI18nProvider from 'ra-i18n-polyglot'
import spanishMessages from 'ra-language-spanish'

const messages = {
  ...spanishMessages,
  ra: {
    ...spanishMessages.ra,
    action: {
      ...spanishMessages.ra.action,
      clear_array_input: 'Vaciar la lista',
      clear_input_value: 'Limpiar valor',
      confirm: 'Confirmar',
      export: 'Exportar',
      move_up: 'Mover hacia arriba',
      move_down: 'Mover hacia abajo',
      toggle_theme: 'Cambiar modo claro/oscuro',
      close: 'Cerrar'
    },
    message: {
      ...spanishMessages.ra.message,
      clear_array_input: '¿Estás seguro de que quieres eliminar todas las actividades?'
    },
    navigation: {
      ...spanishMessages.ra.navigation,
      page_rows_per_page: 'Filas por página:'
    }
  }
}

export const i18nProvider = polyglotI18nProvider(() => messages, 'es')
