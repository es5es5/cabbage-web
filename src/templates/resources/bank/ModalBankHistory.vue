<template>
  <modal
    name="ModalBankHistory"
    class="modal"
    adaptive
    reset
    draggable=".header_wrap"
    @opened="openEvent"
    @closed="closeEvent"
    :clickToClose="false"
    :width="900"
    :height="'auto'"
    >

    <div class="header_wrap">
      <h3 class="header">[{{ modalForm.code }}] 히스토리</h3>
      <div class="closeButton" @click="$modal.hide('ModalBankHistory')"></div>
    </div>

    <div class="content_wrap">
      <div class="modalForm_wrap">
        <form action="" class="form">
          <fieldset>
            <Legend>
              <span slot="title">뱅크 히스토리</span>
            </Legend>
            <div class="table_wrap table-hover table_wrap-scoll-y">
              <table>
                <caption>뱅크 히스토리</caption>
                <colgroup>
                  <col style="width: 3rem;">
                  <col style="width: 15rem;">
                  <col style="width: 15rem;">
                  <col style="width: 7rem;">
                  <col style="width: 5rem;">
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col">No.</th>
                    <th scope="col">장소</th>
                    <th scope="col">개수</th>
                    <th scope="col">일시</th>
                    <th scope="col">수정자</th>
                  </tr>
                </thead>
              </table>
              <div class="table_scroll">
                <table>
                  <colgroup>
                    <col style="width: 3rem;">
                    <col style="width: 15rem;">
                    <col style="width: 15rem;">
                    <col style="width: 7rem;">
                    <col style="width: 5rem;">
                  </colgroup>
                  <tbody class="text-center">
                    <template v-for="index in 10">
                      <tr :key="index">
                        <td rowspan="2">{{ 10 - index }}</td>
                        <td>{{ '연구실 -> 제주도' }}</td>
                        <td>{{ '1 -> 4' }}</td>
                        <td>{{ '2020-05-05 12:22' }}</td>
                        <td>{{ '멍뭉이' }}</td>
                      </tr>
                      <tr :key="index">
                        <td colspan="4" style="padding: 4px;">
                          <textarea placeholder="메모" style="width: 100%; padding: 4px; height: 50px;" />
                        </td>
                      </tr>
                    </template>
                  </tbody>
                </table>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'ModalBankHistory',
  created () {
  },
  props: {
    id: {
      type: [String, Number],
      require: true
    },
  },
  computed: {
  },
  data () {
    return {
      modalForm: {
        code: '',
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
        code: ''
      }
    },
    async getContent () {
      const data = {}
      const apiURL = `${this.ENV_CUOME}/bank/${this.id}`

      this.$axios({
        method: 'get',
        url: apiURL,
        data
      }).then(result => {
        this.modalForm = result.data
      }).catch(error => {
        console.error(error)
      })
    },
    async doCreate ($event) {
      $event.target.disabled = true
      if (await this.$validator.validate()) {
        const data = this.modalForm

        data.consortiumSubs = this.consortiumSubs.map(item => item.name).join(',')
        const url = `${this.ENV_CUOME}/study-topic`

        this.$axios({ method: 'post', url, data })
          .then(result => {
            this.initData()
            this.$toast.success(
              '등록되었습니다.',
              this.ToastSettings
            )
            this.$modal.hide('ModalBankHistory')
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
.table_scroll {
  max-height: 400px;
}
</style>
