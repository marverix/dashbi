<template>
  <i :class="['fa fa-fw', 'fa-' + name]"></i>
</template>

<script>
'use strict';

export default {
  props: ['name']
}
</script>
