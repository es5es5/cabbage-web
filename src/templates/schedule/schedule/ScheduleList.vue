<template>
  <main>
    <!-- <div class="search_wrap">
      <label for="검색">검색</label>
      <input id="검색" type="text" placeholder="">
      <span class="separator">|</span>

      <button type="button" class="btn-search" @click="getContents">검색</button>
    </div> -->
    <div class="action_wrap">
      <!-- <button type="button" class="btn primary">등록</button> -->
      <!-- <button type="button" class="btn">엑셀다운로드</button> -->
    </div>
    <div class="calendar_wrap">
      <FullCalendar :options="calendarOptions" />
    </div>

    <ModalScheduleCreate @callback="callbackCreate" />
    <ModalScheduleUpdate @callback="callbackUpdate" />
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
    // this.getContents()
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
      contents: [],
      calendarOptions: {
        locale: 'ko',
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        dateClick: this.handleDateClick,
        events: [
          { title: '학회', date: this.COMMON.getToDate() },
        ],
        editable: true,
        selectable: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
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
    callbackUpdate () {},
    callbackCreate (validate, modalForm) {
      console.log('validate, modalForm', validate, modalForm)
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
    handleEventClick (clickInfo) {
      if (confirm(`[${clickInfo.event.title}] 일정을 삭제하시겠습니까?`)) {
        clickInfo.event.remove()
      }
    },
    handleEvents (events) {
      console.log(events)
      this.contents = events
    },
    getContents () {
      // this.$Progress.start()
      // this.$axios
      //   .get(`${this.ENV_CUOME}/schedule`)
      //   .then(result => {
      //     this.contents = result.data
      //     this.$Progress.finish()
      //   })
      //   .catch(error => {
      //     this.$Progress.fail()
      //     throw new Error(error)
      //   })
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
}
</style>
