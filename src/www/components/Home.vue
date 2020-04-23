<template>
  <nav class="fg">
    <router-link v-for="layout in layouts"
                 :key="layout.name"
                 class="fg-item fg-w-4 fg-h-2"
                 :to="'/layout/' + layout.name">

      <icon :name="layout.icon == null ? 'th' : layout.icon" />
      <span>{{ layout.title }}</span>
      <small>{{ layout.description }}</small>

    </router-link>
  </nav>
</template>

<script>
'use strict';

import layouts from 'Lib/layouts';

export default {
  data () {
    return {
      layouts: layouts.getAll()
    }
  }
}
</script>

<style lang="less" scoped>
a[class*='fg-'] {
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
