<template>
  <main>
    <!-- <div class="search_wrap">
      <label for="검색">검색</label>
      <input id="검색" type="text" placeholder="">
      <span class="separator">|</span>

      <button type="button" class="btn-search" @click="getContents">검색</button>
    </div> -->
    <div class="action_wrap">
    </div>
    <div class="calendar_wrap">
      <transition name="fade" mode="out-in">
        <FullCalendar v-if="calendarInit" :options="calendarOptions" />
      </transition>
    </div>

    <ModalScheduleCreate @callback="callbackCreate" />
    <ModalScheduleUpdate :id="selectId" @callback="getContents" />
  </main>
</template>

<script>
import ModalScheduleCreate from './ModalScheduleCreate'
import ModalScheduleUpdate from './ModalScheduleUpdate'

import '@fullcalendar/core/vdom'
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

export default {
  name: 'ScheduleList',
  created () {
    this.getContents()
  },
  watch: {
  },
  components: {
    ModalScheduleCreate,
    ModalScheduleUpdate,
    FullCalendar,
  },
  data () {
    return {
      calendarInit: false,
      selectId: '',
      contents: [],
      calendarOptions: {
        locale: 'ko',
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        dateClick: this.handleDateClick,
        events: [
          // { title: '학회', date: this.COMMON.getToDate() },
        ],
        editable: true,
        selectable: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        // eventsSet: this.getContents,
        eventAdd: this.postSchedule,
        eventChange: this.putSchedule,
        eventRemove: this.deleteSchedule,
      },
      validate: false,
      modalForm: {},
      createInterval: null,
      updateInterval: null,
    }
  },
  computed: {
  },
  methods: {
    callbackDelete () {},
    callbackCreate (validate, modalForm) {
      if (!validate) {
        clearInterval(this.createInterval)
      }
      this.validate = validate
      this.modalForm = modalForm
    },
    handleDateSelect (selectInfo) {
      const calendarApi = selectInfo.view.calendar
      this.$modal.show('ModalScheduleCreate')

      calendarApi.unselect()

      this.createInterval = setInterval(() => {
        if (this.validate) {
          calendarApi.addEvent({
            id: this.COMMON.UUID(),
            title: this.modalForm.title,
            memo: this.modalForm.memo,
            color: this.modalForm.color,
            start: selectInfo.startStr,
            end: selectInfo.endStr,
            editable: true,
            allDay: this.modalForm.allDay,
          })
          this.validate = false
          clearInterval(this.createInterval)
        }
      }, 100)
    },
    handleEvents (events) {
      this.contents = []
      this.contents = events
    },
    postSchedule (value) {
      const data = {
        id: value.event.id,
        title: value.event.title,
        allDay: value.event.allDay,
        start: value.event.start,
        end: value.event.end,
        color: value.event.backgroundColor,
        memo: value.event.extendedProps.memo,
      }
      const url = `${this.ENV_CUOME}/schedule`

      this.$axios({ method: 'post', url, data })
        .then(result => {
          this.$toast.success(
            '등록되었습니다.',
            this.ToastSettings
          )
        }).catch(error => {
          throw new Error(error)
        })
    },
    putSchedule (value) {
      const data = {
        id: value.event.id,
        title: value.event.title,
        allDay: value.event.allDay,
        start: value.event.start,
        end: value.event.end,
        color: value.event.extendedProps.color,
        memo: value.event.extendedProps.memo,
      }
      const url = `${this.ENV_CUOME}/schedule/${value.event.id}`

      this.$axios({ method: 'put', url, data })
        .then(result => {
          this.$toast.success(
            '수정되었습니다.',
            this.ToastSettings
          )
        }).catch(error => {
          throw new Error(error)
        })
    },
    handleEventClick (clickInfo) {
      this.selectId = clickInfo.event.id
      this.$modal.show('ModalScheduleUpdate')
    },
    getContents () {
      this.$Progress.start()
      this.$axios
        .get(`${this.ENV_CUOME}/schedule`)
        .then(result => {
          this.calendarInit = false
          this.calendarOptions.events = result.data
          this.$nextTick(() => {
            this.calendarInit = true
          })
          this.$Progress.finish()
        })
        .catch(error => {
          this.$Progress.fail()
          throw new Error(error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.calendar_wrap {
  font-size: 14px;
  background-color: #fff;
  padding: 25px;
  border-radius: 4px;
  min-height: calc(100vh - 50px);
}
</style>
