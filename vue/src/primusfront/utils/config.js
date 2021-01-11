import Vue from './vue'
import cloneDeep from './clone-deep'
import { getRaw } from './get'
import DEFAULTS from './config-defaults'

const PROP_NAME = '$PrimusFrontConfig'
const VueProto = Vue.prototype

// --- Getter methods ---
// All methods return a deep clone (immutable) copy of the config
// value, to prevent mutation of the user config object.

// Get the current user config. For testing purposes only
export const getConfig = () => {
  return VueProto[PROP_NAME] ? VueProto[PROP_NAME].getConfig() : {}
}

// Method to grab a config value based on a dotted/array notation key
export const getConfigValue = key => {
  return VueProto[PROP_NAME]
    ? VueProto[PROP_NAME].getConfigValue(key)
    : cloneDeep(getRaw(DEFAULTS, key))
}

// Method to grab a config value for a particular component
export const getComponentConfig = (cmpName, key = null) => {
  // Return the particular config value for key for if specified,
  // otherwise we return the full config (or an empty object if not found)
  return key ? getConfigValue(`${cmpName}.${key}`) : getConfigValue(cmpName) || {}
}
