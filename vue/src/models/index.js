import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
import ModelStore from '@/primusfront/models/ModelRegister'
const requireModels = require.context(
  // Относительный путь до каталога компонентов
  '.',
  // Обрабатывать или нет подкаталоги
  false,
  // Регулярное выражение для определения файлов базовых компонентов
  /.*\.js$/
)

const EXCLUDE_FILELIST = [
  './database.js',
  './index.js',
]

export const Models = requireModels.keys().map(fileName => {
  // Получение имени компонента в PascalCase
  if (EXCLUDE_FILELIST.includes(fileName)) { return }

  return upperFirst(
    camelCase(
      fileName.replace(/\.\w+$/, '')
    )
  )
}).filter(item => !!item)

const database = ModelStore.database

Models.forEach(model => {
  database.register(require(`./${model}`)[model])
})
export default database
