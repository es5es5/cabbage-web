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
  </main>
</template>

<script>
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
    FullCalendar,
  },
  data () {
    return {
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
      }
    }
  },
  computed: {
  },
  methods: {
    handleDateSelect (selectInfo) {
      const title = prompt('Please enter a new title for your event')
      const calendarApi = selectInfo.view.calendar

      calendarApi.unselect() // clear date selection

      if (title) {
        calendarApi.addEvent({
          id: this.COMMON.UUID(),
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay
        })
      }
    },
    handleEventClick (clickInfo) {
      if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
        clickInfo.event.remove()
      }
    },
    getContents () {
      this.$Progress.start()
      this.$axios
        .get(`${this.ENV_CUOME}/schedule`)
        .then(result => {
          this.contents = result.data
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
}
</style>
