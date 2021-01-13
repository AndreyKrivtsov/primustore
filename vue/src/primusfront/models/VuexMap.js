import { BaseApi } from '../api/BaseApi'
import { errorHandler, PrimusError } from '@/primusfront/api/utils'
import Vue from 'vue'
import cloneDeep from '@/primusfront/utils/clone-deep'
import { EventObserver } from '@/primusfront/utils/observer'

export class PrimusVuexOrmApiModelMap {
    // todo вытащить нотификатор и написать обёртку под него
    // todo сделать подгрузку моков, если preventFetch = true
    constructor({
        api = new BaseApi(),
        Model,
        mocks = [],
        cached = false,
        preventFetch = false
    } = {}) {
        this.api = api
        this.Model = Model
        this.cached = cached
        this.preventFetch = preventFetch
        this.mocks = mocks
        this._observer = new EventObserver()
        this.Model.afterUpdate = (model) => {
            this._observer.broadcast(model)
        }
    }

    async getOrmItem(id) { // Забираем данные из модели и мапаем элемент в стор
        this._beforeGetOrmItem(id)
        if (!id || +id === 0) {
            return Promise.reject(new PrimusError({ message: 'VuexMap: Не получен ID или он нулевой' }))
        }
        let modelInstance = this.Model.find(id) || null
        if (!this.cached || !modelInstance || !this.preventFetch) {
            try {
                let data = this.preventFetch ? this.mocks : await this.api.getApiItem(id)
                data = this._prepareDataAfterGetOrmItemResponse(data)
                return this.Model.insert({ data }).then(() => {
                    let modelInstance = this.Model.query().withAll().whereId(id).first()
                    this._afterGetOrmItem(modelInstance)
                    let instanceClone = cloneDeep(modelInstance)
                    instanceClone._observer = this._observer
                    return instanceClone
                })
            } catch (error) {
                this._errorHandler({ error, type: 'get', method: 'getOrmItem' })
            }
        }
    }

    async getOrmList() { // Забираем список моделей с бэк и мапаем их к стору
        this._beforeGetOrmList() // ? MAY BE DEPRECATED
        try {
            let data = this.preventFetch ? this.mocks : await this.api.getApiList()
            data = this._prepareDataAfterGetOrmListResponse(data)
            let listOfId = data.map(i => i.id)
            return this.Model.create({data}).then(() => {
              let modelInstances = this.Model.query().withAllRecursive().whereIdIn(listOfId).get()
              this._afterGetOrmList(modelInstances) // ? MAY BE DEPRECATED
              return modelInstances
            })
        } catch (error) {
            this._errorHandler({ error, type: 'create', method: 'getOrmList' })
        }
    }

    async updateOrmItem(obj) { // Отправляем данные из стора в бэк и кладем обновленное в стор
        if (!('id' in obj)) {
            return Promise.reject(new PrimusError({ message: 'VuexMap: У переданного объекта нет id, не могу обновить объект' }))
        }
        this._beforeUpdateOrmItem(obj)
        if (!this.preventFetch) {
            let modelInstance = this.Model.find(obj.id) || null
            if (!modelInstance) {
                return Promise.reject(new PrimusError({ message: 'VuexMap: По заданному ID не найден объект в хранилище' }))
            }
            try {
                let data = await this.api.updateApiItem(obj)
                data = this._prepareDataAfterUpdateOrmItemResponse(data)
                return this.Model.update({ where: obj.id, data: data }).then(() => {
                    let modelInstance = this.Model.query().withAll().find(obj.id)
                    this.notify({ group: 'api', type: 'success', 'title': `обновление данных`, text: `Объект успешно обновлён` })
                    this._afterUpdateOrmItem(modelInstance)
                    let instanceClone = cloneDeep(modelInstance)
                    instanceClone._observer = this._observer
                    return instanceClone
                })
            } catch (error) {
                this._errorHandler({ error, type: 'save', method: 'updateOrmItem' })
            }
        }
    }

    async createOrmItem(instance = null) { // отправляем набор данных в бэк на сохранение и модель с бэка в стор
        if (!instance) {
            return Promise.reject(new PrimusError({ message: 'VuexMap: Объект не передан' }))
        }
        this._beforeCreateOrmItem(instance)
        this._saveFKObjects()
        try {
            let obj = this._prepareDataBeforeCreateOrmItemRequest(instance)
            let data = await this.api.createApiItem(obj)
            data = this._prepareDataAfterCreateOrmItemResponse(data)
            return this.Model.insert({ data }).then(() => {
                let modelInstance = this.Model.query().last() // should be change
                this._afterCreateOrmItem(modelInstance)
                let instanceClone = cloneDeep(modelInstance)
                instanceClone._observer = this._observer
                this.notify({ group: 'api', type: 'success', 'title': `создание объекта`, text: `Операция по созданию прошла успешно` })
                return instanceClone
            })
        } catch (error) {
            this._errorHandler({ error, type: 'create', method: 'createOrmItem' })
        }
    }

    async deleteOrmItem(id) { // великий удалятор из модели и бэка, возвращает <мега жирным> копию </мега жирным> удаленных данных
        // функция удаляет объект
        this._beforeDeleteOrmItem()
        try {
            return await this.api.deleteApiItem(id).then(() => {
                let item = this.Model.query().withAll().find(id)
                this.Model.delete(id)
                if (this.notify) {
                    this.notify({ group: 'api', type: 'success', 'title': `удаление объекта`, text: `Операция по удалению прошла успешно` })
                }
                this._afterDeleteOrmItem()
                return item
            })
        } catch (error) {
            this._errorHandler({ error, type: 'delete', method: 'deleteOrmItem' })
        }
    }

    notify(obj) {
        return Vue.notify(obj)
    }

    _errorHandler({ error, type, method, url = '' } = {}) {
        let err = new PrimusError({ message: `VuexMap: Ошибка в маппере функции ${method}`, error })
        errorHandler(err, type, this.constructor.name, url)
        throw (err)
    }

    _afterGetOrmItem(modelInstance) { } // Действия после получения объекта
    _beforeGetOrmItem(id) { } // Действия до получения объекта

    _beforeGetOrmList() { } // Действия до получения объектов
    _afterGetOrmList() { } // Действия после получения объектов

    _prepareDataAfterGetOrmItemResponse(data) { return data } // Постобрабочик полученных данных
    _prepareDataAfterGetOrmListResponse(data) { return data } // подготовка данных от сервера
    _prepareDataAfterUpdateOrmItemResponse(data) { return data } // подготовка данных перед сохранением в модель

    _beforeUpdateOrmItem(id) { } // Преобработчик при обновлении
    _afterUpdateOrmItem(modelInstance) { } // Пост обрабочик при обновлении

    _prepareDataBeforeCreateOrmItemRequest(data) { return data } // подготовка данных перед запросом на бэк
    _prepareDataAfterCreateOrmItemResponse(data) { return data } // подготовка данных для сохранения в модель
    _saveFKObjects() { } // Прежде чем создать основной объект, надо создать связанные с ним объекты
    _beforeCreateOrmItem(instance) { } // Предобратка при создании
    _afterCreateOrmItem(modelInstance) { } // Пост-обработка при создании

    _beforeDeleteOrmItem() { } // Обработка до удаления
    _afterDeleteOrmItem() { } // Обработка после удаления
}
