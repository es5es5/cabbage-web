<template>
  <VueCtkDateTimePicker
    :id="id"
    :value="value" @input="inputValue"
    noLabel
    :format="format"
    :formatted="format"
    :minDate="min"
    :maxDate="max"
    :disabled="disabled"
    :onlyDate="_onlyDate"
    :onlyTime="_onlyTime"
    :label="_placeholder"
    :minuteInterval="minuteInterval"
  ></VueCtkDateTimePicker>
</template>

<script>
// https://chronotruck.github.io/vue-ctk-date-time-picker/
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css'

export default {
  name: 'DatePicker',
  mounted () {
    this.$nextTick(() => {
      this.min = this.minDate
      this.max = this.maxDate
    })
  },
  computed: {
    _onlyDate () {
      return this.format === 'YYYY-MM-DD' || this.format === 'YYYY-MM' || this.format === 'YYYY'
    },
    _onlyTime () {
      return this.format === 'HH:mm' || this.format === 'HH' || this.format === 'mm'
    },
    _placeholder () {
      return this.placeholder ? this.placeholder : this.format
    }
  },
  data () {
    return {
      min: '',
      max: '',
    }
  },
  props: {
    id: {
      type: String,
    },
    value: {
      required: true
    },
    minDate: {
      require: false,
      default: () => null
    },
    maxDate: {
      require: false,
      default: () => null
    },
    disabled: {
      type: Boolean,
    },
    format: {
      type: String,
      default: () => 'YYYY-MM-DD'
    },
    placeholder: {
      type: String,
    },
    minuteInterval: {
      type: String,
    }
  },
  components: {
    VueCtkDateTimePicker
  },
  methods: {
    inputValue (value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
