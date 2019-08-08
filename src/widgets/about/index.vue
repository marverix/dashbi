<template>
  <div>
    <img src="@img/logo.svg" alt="Dashbi logo" id="logo">

    <h3>Dashbi v{{ version }}</h3>
    <p>
      &copy; {{ year }} Marek Sierociński <br>
      Released under the <a href="https://github.com/marverix/dashbi/blob/master/LICENSE" target="_blank" rel="noopener">ISC License</a>
    </p>
    <p>
      <a href="https://github.com/marverix/dashbi" target="_blank" rel="noopener">Contribute on GitHub</a>
    </p>
  </div>
</template>

<script>
import version from '@root/package.json';

export default {
  data () {
    return {
      version
    }
  },

  computed: {
    year () {
      let ret = 2019;
      let y = new Date().getFullYear();
      if (y == ret) {
        ret += ' - ' + y;
      }
      return ret;
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@less/colors.less';

#logo {
  width: 200px;
  height: 200px;
}
</style>
