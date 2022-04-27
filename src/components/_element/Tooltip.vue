<template>
  <div class="tooltip_wrap">
    <template v-if="title !== ''">
      <span>{{title}}</span>
    </template>
    <template v-if="tooltipType === 'employeeList'">
      <ul>
        <li class="list_item" v-for="(item, index) in dataList" :key="index"> - {{item.employeeInfo.nameBase}}</li>
      </ul>
    </template>
    <template v-if="tooltipType === 'participants'">
      <ul>
        <li class="list_item participants master"><img src="@/assets/images/conference/master.svg" class="master_icon">{{conferenceLeader}}</li>
        <li class="">참석자</li>
        <li class="list_item participants member" v-for="(item, index) in readyAttendee" :key="index">{{item.displayName}}</li>
        <li class="">미참석자</li>
        <li class="list_item participants member" v-for="(item, index) in notReadyAttendee" :key="index">{{item}}</li>
      </ul>
    </template>
    <template v-if="tooltipType === 'list'">
      <ul>
        <li class="list_item" v-for="(item, index) in dataList" :key="index"> - {{item}}</li>
      </ul>
    </template>
  </div>
</template>

<script>
export default {
  name: 'Tooltip',
  created () {},
  mounted () {
    this.notReadyAttendeeList()
  },
  props: {
    tooltipType: {
      type: String
    },
    title: {
      type: String
    },
    dataList: {
      type: Array
    },
    conferenceLeader: {
      type: String
    },
    dataObject: {
      type: Object
    },
    readyAttendee: {
      type: Array
    },
    totalAttendee: {
      type: Array
    }
  },
  data () {
    return {
      notReadyAttendee: []
    }
  },
  computed: {
  },
  watch: {},
  methods: {
    notReadyAttendeeList () {
      this.totalAttendee.forEach(item => {
        // const notReadyMemberInfo = item
        const notReadyMember = item.split('[')
        let check = true
        for (const ready in this.readyAttendee) {
          const readyMember = this.readyAttendee[ready].displayName.split('[')
          if (readyMember[1] === notReadyMember[1]) {
            check = false
          } else {
            // this.notReadyAttendee.push(notReadyMemberInfo)
          }
        }
        if (check) {
          this.notReadyAttendee.push(item)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tooltip_wrap {
  z-index: 2000;
  position: absolute;
  max-height: 150px;
  overflow-y: auto;
  // right: 6px;
  // top: 0;

  padding: 6px;
  border: 1px solid border;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0px 4px 3px rgba(0, 0, 0, 0.2);
  .list_item {
    @include hover;
    display: block;
    // width: 30px;
    height: auto;
    // padding: 8px;
    &.participants {
      font-size: 15px;
        &.master {
          .master_icon {
            width: 15px;
            height: 15px;
          }
        }
        &.member {
          padding-left: 15px;
        }
    }
  }
}
</style>
