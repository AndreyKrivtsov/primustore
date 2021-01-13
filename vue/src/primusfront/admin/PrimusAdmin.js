import _ from 'lodash'
import ModelStore from '../models/ModelRegister'
import { Model } from '@vuex-orm/core'

import { PrimusVuexOrmApiModelMap } from '../models/VuexMap'
import Blank from '@/primusfront/models/Blank'
import { BaseItemMixin } from '@/primusfront/components/baseItem'
import BaseListMixin from '@/primusfront/components/baseList'
import BaseItemPageMixin from '@/primusfront/components/baseItemPage'
import BaseListPageMixin from '@/primusfront/components/baseListPage'
import { ApiAdapter } from '@/primusfront/api/adapter'
import BaseFieldComponentMixin from '@/primusfront/components/BaseFieldComponent'
import BaseComboComponentMixin from '@/primusfront/components/BaseComboComponent'
import { PrimusForm } from '../../primusfront/forms/PrimusForm'
import PrimusFormSetComponentMixin from '@/primusfront/components/BaseFormSetComponent'

export class PrimusAdmin {
    preventFetchData = false // предотвращение запроса к API и связи запроса с моделью
    AdminApiAdapterClass = ApiAdapter
    AdminVuexOrmMapperClass = PrimusVuexOrmApiModelMap
    constructor({
        componentBaseName, // Базовое название компонента, от него идёт генерация List, Page и пр.
        form = new PrimusForm(), // Форма
        apiSuffix = [], // массив суффиксов для api ['some', 1, 'body', 2] => some/1/body/2(/), если пусто то [componentBaseName]
        options = {}, // просто перекрытие this
        mocks = [], // моки для отладки
        itemHeader = '', // Заголовок для item компонента
        listHeader = '', // Заголовок для list компонента
        itemFields = [], // Выводимые поля формы для item компонента (если [] то выводим все)
        listFields = [], // Выводимые колонки таблицы для list компонента (если [] то выводим все)
        preventFetchData = false, // запрет на fetch item & fetch list для апи. Используем когда не готов бэк
        basedComponents = null // переопределение базовых компонентов.
    } = {}) {
        this.form = form
        this.mocks = mocks
        this.itemHeader = itemHeader
        this.listHeader = listHeader
        this.itemFields = itemFields
        this.listFields = listFields
        this.preventFetchData = preventFetchData
        Object.assign(this, options)
        this.componentBaseName = componentBaseName
        this.apiSuffix = apiSuffix.length ? apiSuffix : [this._getObjectNameForApi()]
        // список базовых компоненотов для реализации работы с CRUD
        this.basedComponents = basedComponents || {
            'item': this.generateComponentMetaByName('item', [BaseItemMixin]),
            'itemPage': this.generateComponentMetaByName('itemPage', [BaseItemPageMixin]),
            'list': this.generateComponentMetaByName('list', [BaseListMixin]),
            'listPage': this.generateComponentMetaByName('list', [BaseListPageMixin]),
            'field': this.generateComponentMetaByName('field', [BaseFieldComponentMixin]),
            'formSet': this.generateComponentMetaByName('formSet', [PrimusFormSetComponentMixin]),
            'combo': this.generateComponentMetaByName('combo', [BaseComboComponentMixin])
        }
    }
    get name() {
        return this.componentBaseName || ''
    }
    globalSet(Model) {
        this._setModel(Model)
        this._setApi()
        this._setOrmMapper()
    }
    _setModel(Model = null) {
        if (Model) {
            this.Model = Model
            return
        }
        let currentModel
        try {
            currentModel = require(`@/models/${this.componentBaseName}`).default
        } catch (error) {
            if (this.form.getKeys().length > 0) {
                currentModel = this._generateVuexOrmModel()
            } else {
                currentModel = Blank
            }
        }
        this.Model = ModelStore.register(this.componentBaseName, currentModel)
    }
    _setApi() {
        this.api = new this.AdminApiAdapterClass({
            objectName: this._getObjectNameForApi(),
            suffixAttrs: this.apiSuffix,
            form: this.form
        })
    }
    _setOrmMapper() {
        this.ormMapper = new this.AdminVuexOrmMapperClass({
            api: this.api,
            Model: this.Model,
            mocks: this.mocks
        })
    }
    _getObjectNameForApi() {
        return this.componentBaseName[0].toLowerCase() + this.componentBaseName.slice(1)
    }
    generateComponentMetaByName(name, mixins) {
        let nameSuffix = name === 'item' ? '' : _.upperFirst(name)
        return { componentName: `${this.componentBaseName}${nameSuffix}`, mixins: mixins }
    }
    generateBaseData() { return { adminInstance: this } }
    generateComponentByName(name) {
        let vm = this
        if (!this.basedComponents.hasOwnProperty(name)) { return {} }
        console.log('[PrimusAdmin] Generated component', this.basedComponents[name].componentName)
        return {
            name: this.basedComponents[name].componentName,
            mixins: this.basedComponents[name].mixins,
            data() { return vm.generateBaseData() }
        }
    }
    generateItemComponent() { return this.generateComponentByName('item') }
    generateListComponent() { return this.generateComponentByName('list') }
    generateItemPageComponent() { return this.generateComponentByName('itemPage') }
    generateListPageComponent() { return this.generateComponentByName('itemPage') }
    generateFieldComponent() { return this.generateComponentByName('field') }
    generateFormSetComponent() { return this.generateComponentByName('formSet') }
    generateComboComponent() { return this.generateComponentByName('combo') }

    generateRoutes() {
        let url = this.componentBaseName
        let pred = this ? '.' : '@' // for lazy requirement
        return [
            {
                path: `/${url}`,
                name: this.basedComponents.listPage.componentName,
                component: () => import(`${pred}/listPage`)
            },
            {
                path: `/${url}/:id`,
                name: this.basedComponents.itemPage.componentName,
                component: () => import(`${pred}/itemPage`)
            }
        ]
    }
    createInitialObject() {
        return this.form.createInitialObject()
    }
    _generateVuexOrmModel() {
        let vm = this
        return class extends Model {
            static entity = `${vm.componentBaseName}-entity`
            static fields() {
                let obj = {}
                vm.form.getKeys().forEach(fieldName => {
                    let method = vm.form[fieldName].orm.name
                    let attrs = vm.form[fieldName].orm.attrs
                    obj[fieldName] = this[method](attrs)
                })
                return obj
            }
        }
    }
}
