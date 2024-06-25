<template>
  <div class="spinner" v-show="loading">
    <span class="sync" v-bind:style="[spinnerStyle, spinnerDelay1]"></span>
    <span class="sync" v-bind:style="[spinnerStyle, spinnerDelay2]"></span>
    <span class="sync" v-bind:style="[spinnerStyle, spinnerDelay3]"></span>
  </div>
</template>
<script>
export default {
  name: "Spinner",
  props: {
    loading: {
      type: Boolean,
      default: true,
    },
    color: {
      type: String,
      default: "#5dc596",
    },
    size: {
      type: String,
      default: "15px",
    },
    margin: {
      type: String,
      default: "2px",
    },
    radius: {
      type: String,
      default: "100%",
    },
  },
  data() {
    return {
      spinnerStyle: {
        backgroundColor: this.color,
        height: this.size,
        width: this.size,
        borderRadius: this.radius,
        margin: this.margin,
        display: "inline-block",
        animationName: "spinerAnimation",
        animationDuration: "1.25s",
        animationIterationCount: "infinite",
        animationTimingFunction: "ease-in-out",
        animationFillMode: "both",
      },
      spinnerDelay1: {
        animationDelay: "0.07s",
      },
      spinnerDelay2: {
        animationDelay: "0.14s",
      },
      spinnerDelay3: {
        animationDelay: "0.21s",
      },
    };
  },
  methods: {
    start() {
      this.loading = true;
    },
    end() {
      this.loading = false;
    },
  },
};
</script>
