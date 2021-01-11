import { BaseWidgetMixin } from './baseWidget'
let moment = require('moment')

export const BaseDateTimeWidgetMixin = {
  mixins: [BaseWidgetMixin],
  methods: {
    assembleDT: function (date, time) {
      return moment(date + ' ' + time).format()
    },
    DateInputHandler: function (val) {
      this.$emit('input', this.assembleDT(val, this.time))
    },
    TimeInputHandler: function (val) {
      this.$emit('input', this.assembleDT(this.date, val))
    }
  },
  computed: {
    val: function () {
      // вычисляемое свойство для подготовки значения времени
      if (this.value) {
        return `${this.value}`
      }
      return null
    },
    TZ: function () {
      return moment(this.value).isValid() ? moment(this.value).utcOffset() : 0
    },
    date: function () {
      let val = this.value === null ? undefined : this.value
      let d = moment(val)
      return d.format(moment.HTML5_FMT.DATE)
    },
    time: function () {
      let val = this.value === null ? undefined : this.value
      let d = moment(val)
      return d.format(moment.HTML5_FMT.TIME)
    },
    fullDT: function () {
      return moment(this.date + ' ' + this.time).format()
    }
  },
  mounted () { // тут работает нормальная эмиссия
    this.$nextTick(() => {
      if (!this.value) {
        console.log('emit now(), cause blank value', this.fullDT)
        this.$emit('input', this.fullDT)
      }
    })
  }
}

export default BaseDateTimeWidgetMixin
