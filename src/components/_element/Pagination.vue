<template>
  <div class="pagination">
    <!-- <span class="total">total: {{ _totalElement }}</span> -->

    <ul class="pageLink_wrap">
      <!-- <li class="pageLink arrow" @click.prevent="changeNextPage(_activePage - 1)">&lt;</li> -->
      <img src="./left.svg" alt="left" class="pageLink arrow" :class="_activePage <= 1 ? 'disabled' : ''" @click.prevent="changePage(_activePage - 1, _activePage <= 1)">
      <li class="pageLink"
        v-for="(num, index) in array" :key="index"
        :class="{ 'active' : num === _activePage }"
        @click.prevent="changePage(num, false)">
        {{ num }}
      </li>
      <img src="./right.svg" alt="left" class="pageLink arrow" :class="_activePage >= lastPage ? 'disabled' : ''" @click.prevent="changePage(_activePage + 1, _activePage >= lastPage)">
      <!-- <li class="pageLink arrow" @click.prevent="changeNextPage(_activePage + 1)">&gt;</li> -->
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    totalElement: {
      type: Number,
      required: true
    },
    totalPages: {
      required: true
    },
    activePage: {
      default: () => 0,
      required: true
    },
    callback: {
      type: Function,
      required: true
    },
    options: {
      type: Object
    }
  },
  computed: {
    _totalElement () {
      return parseInt(this.totalElement) || 0
    },
    _totalPages () {
      return parseInt(this.totalPages)
    },
    _activePage () {
      return parseInt(this.activePage)
    },
    array () {
      let _from = this._activePage - this.config.offset
      if (_from < 1) _from = 1

      let _to = _from + (this.config.offset * 2)
      if (_to >= this.lastPage) _to = this.lastPage

      const _arr = []
      while (_from <= _to) {
        _arr.push(_from)
        _from += 1
      }

      return _arr
    },
    config () {
      return Object.assign({
        offset: 3,
        alwaysShowPrevNext: true
      }, this.options)
    },
    lastPage () {
      const _total = this._totalElement / this.size
      if (_total < 1) return 1
      if (_total % 1 !== 0) return parseInt(_total + 1)
      return _total
    }
  },
  data () {
    return {
      size: parseInt(this.totalPages)
    }
  },
  methods: {
    showPrevious () {
      return this.config.alwaysShowPrevNext || this._activePage > 1
    },
    showNext () {
      return this.config.alwaysShowPrevNext || this._activePage < this.lastPage
    },
    changePage (page, option) {
      if (option) return
      if (this._activePage === page) return

      // this._currentPage = page
      this.callback(page)
    },
    changeNextPage (page) {
      if (this.array.indexOf(page) < 0) return

      this.changePage(page)
    }
  }
}
</script>

<style lang="scss" scope>
.pagination {
  border: 1px solid $border;
  border-top: transparent;
  position: relative;
  padding: 20px 0;
  text-align: center;
}

.pageLink_wrap {
  display: inline-block;

  > * { vertical-align: middle; }

  .pageLink {
    display: inline-block;
    margin: 0 5px;
    width: 24px;
    height: 24px;
    padding-top: 1px;
    border-radius: 3px;
    font-size: 14px;
    transition: all .2s;
    cursor: pointer;
    background-color: #fff;
    border: 1px solid $border;

    &:hover {
      color: $primary;
      background-color: $primary-light;
    }

    &.arrow {
      border: 1px solid $border;
      // border: 1px solid transparent;
    }

    &.disabled {
      cursor: not-allowed;

      &:hover {
        color: $primary;
        background-color: #fff;
      }
    }
  }

  .active {
    color: $primary;
    background-color: $primary-light;
  }
}
</style>
