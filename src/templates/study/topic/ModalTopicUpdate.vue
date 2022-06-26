<template>
  <modal
    name="ModalTopicUpdate"
    class="modal"
    adaptive
    reset
    draggable=".header_wrap"
    @opened="openEvent"
    @closed="closeEvent"
    :clickToClose="false"
    :width="600"
    :height="'auto'"
    >

    <div class="header_wrap">
      <h3 class="header">주제 수정</h3>
      <div class="closeButton" @click="$modal.hide('ModalTopicUpdate')"></div>
    </div>

    <div class="content_wrap">
      <div class="modalForm_wrap">
        <form action="" class="form">
          <fieldset>
            <legend>연구 정보</legend>
            <div class="modalRow row">
              <div class="column column">
                <label for="title" class="required">연구명</label>
                <input type="text" id="title" name="title" v-model="modalForm.title" v-validate="'required'">
              </div>
            </div>

            <div class="modalRow row-2">
              <div class="column column-1">
                <label for="startDate-input">시작 날짜</label>
                <DatePicker
                  id="startDate"
                  v-model="modalForm.startDate"
                />
              </div>
              <div class="column column-1">
                <label for="endDate-input">끝 날짜</label>
                <DatePicker
                  id="endDate"
                  v-model="modalForm.endDate"
                />
              </div>
            </div>

            <div class="modalRow row-2">
              <div class="column column-1">
                <label for="money">비용</label>
                <input type="number" id="money" name="money" v-model.number="modalForm.money">
              </div>
              <div class="column column-1">
                <label for="manager">담당자</label>
                <input type="text" id="manager" name="manager" v-model.number="modalForm.manager">
              </div>
            </div>

            <div class="modalRow row">
              <div class="column column">
                <label for="memo">메모</label>
                <textarea name="memo" id="memo" v-model="modalForm.memo"></textarea>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <Legend>
              <span slot="title">목표 정보</span>
            </Legend>

            <div class="modalRow row">
              <div class="column column">
                <label for="goal">목표</label>
                <input type="text" id="goal" name="goal" v-model.number="modalForm.goal">
              </div>
            </div>

            <div class="modalRow row-2">
              <div class="column column-1">
                <label for="needs">필요성</label>
                <input type="text" id="needs" name="needs" v-model.number="modalForm.needs">
              </div>
              <div class="column column-1">
                <label for="plan">활용방안</label>
                <input type="text" id="plan" name="plan" v-model.number="modalForm.plan">
              </div>
            </div>
          </fieldset>

          <fieldset>
            <Legend>
              <span slot="title">컨소시엄 정보</span>
              <div slot="action">
                <button type="button" class="btn small" @click="addTable">추가</button>
              </div>
            </Legend>
            <div class="table_wrap table-hover table_wrap-scoll-y">
              <table>
                <caption>컴소시엄 리스트</caption>
                <colgroup>
                  <col style="width: 3rem;">
                  <col style="width: 15rem;">
                  <col style="width: 3rem;">
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col">No.</th>
                    <th scope="col">이름</th>
                    <th scope="col">삭제</th>
                  </tr>
                </thead>
              </table>
              <div class="table_scroll">
                <table>
                  <colgroup>
                    <col style="width: 3rem;">
                    <col style="width: 15rem;">
                    <col style="width: 3rem;">
                  </colgroup>
                  <tbody class="text-center">
                    <tr>
                      <td>메인</td>
                      <td><input type="text" class="full" v-model="modalForm.consortiumMain"></td>
                      <td><button type="button" class="btn error small" disabled>삭제</button></td>
                    </tr>
                    <tr v-for="(item, index) in consortiumSubs" :key="index">
                      <td>{{ index + 1 }}</td>
                      <td><input type="text" v-model="item.name" class="full"></td>
                      <td><button type="button" class="btn error small" @click="removeTable(index)">삭제</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </fieldset>
        </form>
      </div>

      <div class="action_wrap">
        <button class="btn warning" @click="doUpdate">수정</button>
        <button class="btn error" @click="doDelete">삭제</button>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'ModalTopicUpdate',
  created () {
  },
  props: {
    id: {
      type: [String, Number],
      require: true
    }
  },
  computed: {
  },
  data () {
    return {
      consortiumSubs: [{
        name: ''
      }],
      modalForm: {
        title: '',
        startDate: '',
        endDate: '',
        money: '',
        manager: '',
        goal: '',
        needs: '',
        plan: '',
        memo: '',
        consortiumSubs: '',
      }
    }
  },
  methods: {
    openEvent () {
      this.getContent()
    },
    closeEvent () { this.$emit('callback') },
    initData () {
      this.modalForm = {
        title: '',
        startDate: '',
        endDate: '',
        money: '',
        manager: '',
        goal: '',
        needs: '',
        plan: '',
        memo: '',
        consortiumSubs: '',
      }
      this.consortiumSubs = [{
        name: ''
      }]
    },
    addTable () {
      this.consortiumSubs.push({
        name: ''
      })
    },
    removeTable (index) {
      this.consortiumSubs.splice(index, 1)
    },
    async getContent () {
      const data = {}
      const apiURL = `${this.ENV_CUOME}/study-topic/${this.id}`

      this.$axios({
        method: 'get',
        url: apiURL,
        data
      }).then(result => {
        this.modalForm = result.data
        console.log(this.modalForm.consortiumSubs.split(','))
        this.modalForm.consortiumSubs = this.modalForm.consortiumSubs.split(',')
        this.consortiumSubs = this.modalForm.consortiumSubs.map(item => {
          return {
            name: item
          }
        })
      }).catch(error => {
        console.error(error)
      })
    },
    async doDelete () {
      if (confirm('삭제하시겠습니까?')) {
        const data = {}
        const apiURL = `${this.ENV_CUOME}/study-topic/${this.id}`

        this.$axios({
          method: 'delete',
          url: apiURL,
          data
        }).then(result => {
          this.initData()
          this.$toast.success(
            '삭제되었습니다.',
            this.ToastSettings
          )
          this.$modal.hide('ModalTopicUpdate')
        }).catch(error => {
          throw new Error(error)
        })
      }
    },
    async doUpdate ($event) {
      $event.target.disabled = true
      if (await this.$validator.validate()) {
        const data = this.modalForm
        data.consortiumSubs = this.consortiumSubs.map(item => item.name).join(',')

        const url = `${this.ENV_CUOME}/study-topic/${this.id}`

        this.$axios({ method: 'put', url, data })
          .then(result => {
            this.initData()
            this.$toast.success(
              '수정되었습니다.',
              this.ToastSettings
            )
            this.$modal.hide('ModalTopicUpdate')
          }).catch(error => {
            throw new Error(error)
          })
      } else {
        this.setValidateError()
        $event.target.disabled = false
      }
    },
  }
}
</script>

<style lang="scss" scoped>
</style>
