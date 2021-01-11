import { deepFreeze } from './object'

// PROP DEFAULTS
//
// For default values on props, we use the default value factory function approach so
// that the default values are pulled in at each component instantiation
//
//  props: {
//    variant: {
//      type: String,
//      default: () => getConfigComponent('PFWidgetInput', 'widgetName')
//    }
//  }
//
// We also provide a cached getter for breakpoints, which are "frozen" on first access

export default deepFreeze({
  Global: {
    designs: ['vuetify', 'bootstrap4'],
    defaultDesign: 'vuetify'
  },
  Notifier: {},
  API: {
    getListLimit: 1000,
    axiosConnector: null,
    apolloConnector: null,
    defaultConnector: 'axios',
    ERRORS_TRANSLATE: {
      'Field may not be null.': 'Поле не может быть пустым',
      'Invalid type.': 'Не правильный тип данных'
    }
  },
  PFListPage: {
    rowsPerPage: 5
  },
  PFWidgetInput: {
    widgetName: 'input'
  },
  PFFileInputWidget: {
    label: 'Файл',
    placeholder: 'Нажмите здесь',
    color: 'deep-purple accent-4'
  },
  PFInputWidget: {
    label: 'Поле',
    placeholder: 'Нажмите здесь'
  }
})
