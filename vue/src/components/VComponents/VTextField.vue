<template>
    <div>
        <label>
            {{ label }}
            <input v-model="computedValue" :type="type" @mousedown="clearError" />
            <div>{{ error }}</div>
        </label>
    </div>
</template>

<script>
import { String } from '@vuex-orm/core'
export default {
    name: 'VForm',
    props: {
        value: {
            type: String|Number,
            default: '',
        },
        type: {
            type: String,
            default: '',
        },
        label: {
            type: String,
            default: '',
        },
        rules: {
            type: Array,
            default: []
        },
    },
    data() {
        return {
            error: ''
        }
    },
    computed: {
        computedValue: {
            get() {
                return this.value
            },
            set(value) {
                const valid = this.validate(value)
                if (this.validate(value)) {
                    this.$emit('input', value)
                }
            }
        }
    },
    methods: {
        validate(value) {
            let isValid = true
            for (const key in this.rules) {
                const validateFunction = this.rules[key]
                const validateResult = validateFunction(value)
                if (validateResult !== true) {
                    this.error = validateResult
                    isValid = false
                    break
                }
            }
            
            return isValid
        },
        clearError() {
            this.error = ''
        }
    },
}
</script>