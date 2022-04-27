<template>
  <div class="background">
    <div class="Confirm">
      <div class="msg">
        <span>테스트 입니다</span>
      </div>
      <div class="confirm_footer">
        <div class="accept">
          <span>승인</span>
        </div>
        <div class="reject">
          <span>거절</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Confirm',
  created () {},
  mounted () {},
  props: {
    message: {
      type: String
    }
  },
  data () {
    return {
    }
  },
  computed: {
  },
  watch: {},
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.background {
  position: fixed;
  z-index: 1999;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  .Confirm {
    z-index: 2000;
    position: absolute;
    width: 300px;
    height: 150px;
    top: 40vh;
    left: 40vw;
    overflow-y: auto;

    padding: 0;
    border: 1px solid border;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    .msg {
      height: 100px;
      text-align: center;
      padding-top: 10px;
    }
    .confirm_footer {
      display: inline-block;
      position: absolute;
      height: 50px;
      width: 100%;
      left: 0;
      bottom: 0;
      margin: 0;
      padding: 0;
      vertical-align: middle;
      // width: 100%;
      .accept {
        display: inline-block;
        width: 50%;
        height: 50px;
        // padding: 8px 16px;
        // border: solid 2px black;
        padding: 15px 60px;
        background-color: rgba(0, 126, 255, 0.67);
        border-radius: 0px 0px 0px 8px;
      }
      .reject {
        display: inline-block;
        // padding: 8px 16px;
        padding: 15px 60px;
        height: 50px;
        width: 50%;
        background-color: rgba(255, 255, 255, 1);
        // background-color: rgba(255, 0, 0, 0.67);
        border-radius: 0px 0px 8px 0px;
      }
    }
    // .list_item {
    //   @include hover;
    //   display: block;
    //   height: auto;
    // }
  }
}
</style>
