import { Database } from '@vuex-orm/core'

class ModelStore {
    constructor() {
        if (!ModelStore.instance) {
            this._models = {}
            this.database = new Database()
            ModelStore.instance = this
        }
        return ModelStore.instance
    }
    register(modelName, Model) {
        if (modelName in this._models) { return this.get(modelName) }
        this._models[modelName] = Model
        this.database.register(this._models[modelName])
        return this._models[modelName]
    }
    unregister(modelName) {
        delete this._models[modelName]
    }
    get(modelName) {
        return this._models[modelName]
    }
}

const instance = new ModelStore()
// Object.freeze(instance)

export default instance
