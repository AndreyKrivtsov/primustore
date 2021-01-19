const requireAdminComponent = require.context('./admin', true, /admin.js$/)

export const adminCompToReg = requireAdminComponent.keys().map(fileName => {
    const folder = fileName.replace('./', '').replace('/admin.js', '') // fileName.split('/')[1] || null // HERE WAS AN ERROR
    const adminInstance = requireAdminComponent(fileName).adminInstance || null
    if (adminInstance) {
        const components = []
        const header = adminInstance.listHeader
        for (let item in adminInstance.basedComponents) {
            try {
                const component = require(`./${folder}/${item}`).default
                components.push({
                    name: component.name,
                    config: { component, header }
                })
            } catch (err) {
                const component = adminInstance.generateComponentByName(item)
                components.push({
                    name: adminInstance.basedComponents[item].componentName,
                    config: { component, header }
                })
            }
        }
        return components
    }
}).flat()