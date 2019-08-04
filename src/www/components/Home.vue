<template>
  <nav class="g-container">
    <router-link v-for="layout in layouts"
                 :key="layout.name"
                 class="g-item g-item-4x2"
                 :to="'/layout/' + layout.name">

      <icon :name="layout.icon == null ? 'th' : layout.icon" />
      <span>{{ layout.title }}</span>
      <small>{{ layout.description }}</small>

    </router-link>
  </nav>
</template>

<script>
'use strict';

import layouts from '@lib/layouts';

export default {
  data () {
    return {
      layouts: layouts.getAll()
    }
  }
}
</script>

<style lang="less" scoped>
.g-item {
  * {
    padding: 0.25rem 0.5rem;
  }

  i.fa {
    font-size: 250%;
    margin-top: 2rem;
  }

  span {
    display: block;
    font-size: 175%;
  }

  small {
    display: block;
  }
}
</style>
