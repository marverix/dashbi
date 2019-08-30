<template>
  <div class="fg">
    <template v-if="current != null">

      <div v-for="widget in current.widgets"
           :key="widget.name"
           :class="['fg-item', getWidgetClass(widget)]">

        <component :is="'widget-' + widget.name"
                   :title="widget.title"
                   :data="$store.state.sources[ widget.source ]"
                   :params="widget.params"></component>

      </div>

    </template>
  </div>
</template>

<script>
'use strict';

import layouts from '@lib/layouts';

export default {

  data () {
    return {
      current: null
    }
  },

  watch: {
    '$route': {
      handler: 'onRoute',
      immediate: true
    }
  },

  methods: {

    /**
     * On route change
     * @param {Object} to
     * @param {Object} from
     * @see {@link https://router.vuejs.org/guide/essentials/dynamic-matching.html#reacting-to-params-changes}
     */
    onRoute (to, from) {
      let layout = layouts.getByName(to.params.name);
      if (layout != null) {
        this.changeCurrent(layout);
      } else {
        this.$router.replace('/error404');
      }
    },

    /**
     * Change current
     * @param {Object} layout
     */
    changeCurrent (layout) {
      this.initWidgetsSources(layout.widgets);
      this.current = layout;
      document.title = layout.title;
    },

    /**
     * Init widgets sources
     * @param {Object[]} widgets
     */
    initWidgetsSources (widgets) {
      for (let widget of widgets) {
        this.$store.dispatch('initSource', widget.source);
      }
    },

    /**
     * Get widget class
     * @param {Object} widget
     * @returns {string}
     */
    getWidgetClass (widget) {
      let classes = [];

      // width
      let width = widget.params.width || 1;
      classes.push(`fg-w-${width}`);

      // height
      let height = widget.params.height || 1;
      classes.push(`fg-h-${height}`);

      // style
      if (widget.params.style) {
        classes.push(`fg-style-${widget.params.style}`);
      }

      return classes.join(' ');
    }

  }

}
</script>

<style lang="less" scoped>
@import '~@less/colors.less';

a {
  display: block;
  width: 100%;
  height: 100%;
  background: @blue;
  text-align: center;
  color: white;

  &:hover {
    background: @green;
  }

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

.fg {
  .fg-item {
    & > * {
      width: auto;
      height: 100%;
    }
  }
}
</style>
