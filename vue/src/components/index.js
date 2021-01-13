const requireAdminComponent = require.context('.', true, /admin.js$/)

export const adminCompToReg = requireAdminComponent.keys().map(fileName => {
    let folder = fileName.replace('./', '').replace('/admin.js', '') // fileName.split('/')[1] || null // HERE WAS AN ERROR
    let adminInstance = requireAdminComponent(fileName).adminInstance || null
    if (adminInstance) {
        let components = []
        for (let item in adminInstance.basedComponents) {
            try {
                let component = require(`./${folder}/${item}`).default
                components.push({ name: component.name, config: component })
            } catch (err) {
                components.push({ name: adminInstance.basedComponents[item].componentName, config: adminInstance.generateComponentByName(item) })
            }
        }
        return components
    }
}).flat()