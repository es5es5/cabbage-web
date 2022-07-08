<template>
  <header id="header">
    <div class="header_wrap">
      <div class="left">
        <!-- <select name="brandList" id="brandList" v-model="brand" @change="changeBrand">
          <option :value="item.value" v-for="(item, index) in _brandList" :key="index">{{ item.name }}</option>
        </select> -->
      </div>
      <div class="right">
        <img src="@/assets/images/header/user.svg" alt="user" class="headerImg user" @click="toggleSetting" />
        <span class="employeeName" @click="toggleSetting">{{ _user.displayName }} 님</span>
        <img src="@/assets/images/header/3dots.svg" alt="3dots" class="headerImg 3dots" @click="toggleSetting" />
      </div>

      <div class="setting_wrap" :class="isSettingOpen ? 'open' : ''">
        <ul class="setting">
          <!-- <li class="setting-item" @click="showModalEmptySample">
            명세서
          </li> -->
          <li class="setting-item" @click="showModalMySettings">
            내 정보
          </li>
          <li class="setting-item" @click="signout">
            로그아웃
          </li>
        </ul>
      </div>
    </div>
    <ModalMySettings />
  </header>
</template>

<script>
import ModalMySettings from './ModalMySettings'

export default {
  name: 'Header',
  components: {
    ModalMySettings,
  },
  created () {
  },
  mounted () {
  },
  data () {
    return {
      brand: '',
      isSettingOpen: false
    }
  },
  watch: {
    isSettingOpen () {
      const bodyElement = document.getElementsByClassName('contents')[0]
      if (this.isSettingOpen) {
        bodyElement.addEventListener('click', this.handler)
      } else {
        bodyElement.removeEventListener('click', this.handler)
      }
    }
  },
  computed: {
    _user () { return this.$store.getters['user/getUser'] }
  },
  methods: {
    showModalMySettings () {
      this.$modal.show('ModalMySettings')
      this.isSettingOpen = false
    },
    handler () {
      if (this.isSettingOpen) this.isSettingOpen = false
    },
    toggleSetting () {
      this.isSettingOpen = !this.isSettingOpen
    },
    signout () {
      const apiURL = `${this.ENV_CUOME}/auth/logout`
      const data = {}
      this.$axios({
        method: 'post',
        url: apiURL,
        data
      }).then(() => {
        this.$axios.defaults.headers.common.Authorization = ''
        this.$cookies.remove('accessToken')
        this.$store.dispatch('user/logout')
        location.href = '/login'
      })
    },
  }
}
</script>

<style lang="scss" scoped>
#header {
  float: left;
  width: calc(100% - 180px);
  height: 50px;
  background-color: #fff;
}

.header_wrap {
  position: relative;
  padding: 0 8px 0 20px;

  .left {
    float: left;
    line-height: 50px;
    -ms-user-select: none; -moz-user-select: -moz-none; -webkit-user-select: none; -khtml-user-select: none; user-select:none;
  }

  .right {
    float: right;
    line-height: 50px;
    -ms-user-select: none; -moz-user-select: -moz-none; -webkit-user-select: none; -khtml-user-select: none; user-select:none;
  }

  .headerImg {
    @include hover;
    &.bell { margin-right: 15px; }
    &.user { margin: 0 5px; }
    vertical-align: middle;
    line-height: 25px;
  }

  .employeeName {
    @include hover;
    display: inline-block;
    text-align: left;
    min-width: 100px;
    line-height: 25px;
    font-size: 12px;
    vertical-align: middle;
    margin: 0 10px;
  }

  .setting_wrap {
    display: none;
    z-index: 5000;
    padding: 3px;
    position: absolute;
    right: 10px;
    width: 190px;
    background-color: #fff;
    border-radius: 3px;
    box-shadow: 0px 4px 3px rgba(0, 0, 0, 0.2);

    transition: all .5s;
    top: 40px;
    opacity: 0;
    &.open {
      display: block;
      opacity: 1;
      top: 60px;
    }

    .setting {
      .setting-item {
        text-align: left;
        padding: 12px 16px;
        font-size: 12px;
        border-bottom: 1px solid rgba($border, .25);

        &:hover {
          cursor: pointer;
          color: $primary;
          background-color: $primary-hover;
        }
      }
      :last-child {
        border-bottom: 0;
      }
    }
  }
}
</style>
