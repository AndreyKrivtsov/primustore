import Vue from 'vue'

export const errorHandler = function (error, type, componentName, url = null) {
  let titles = {
    'get': 'Не смог забрать данные',
    'save': 'Не смог сохранить объект',
    'create': 'Не смог создать объект',
    'delete': 'Не смог удалить объект'
  }
  let title = 'Заголовок'
  if (titles.hasOwnProperty(type)) {
    title = titles[type]
  }
  if (error instanceof PrimusError) {
    let errorData = JSON.stringify(error.data)
    let text = `${error.message}<br />${errorData}${url}`
    Vue.notify({ group: 'api', type: 'error', title, text })
    console.log(`api ${type} error`, componentName, error)
  }
}

export class PrimusError {
  constructor ({ message = '', error = null, type = null, data = {} }) {
    this.message = message // Человеческое сообщение
    this.data = data // критичные данные для восприятия
    this.error = error // ошибка родитель
    this.type = type // Сепарация по типу
  }
}

export const METHODS = {
  get: 'get',
  post: 'post',
  put: 'put',
  delete: 'delete'
}
