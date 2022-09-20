<template>
  <div>
    <Nuxt />
  </div>
</template>

<script>
import { nextTick } from "process";

export default {
  watch: {
    $route(to, from) {
      console.log("route change to", to);
      console.log("route change from", from);
      if (from == "study-time" && this.$store.state.isTimerRunning) {
        alert("unsaved");
      } else {
      }
    },
  },
  beforeMount() {
    var self = this;
    window.onbeforeunload = function (e) {
      if (self.$route.path == "/study-time") {
        e = e || window.event;
        //old browsers
        if (e) {
          e.returnValue = "Changes you made may not be saved";
        }
        //safari, chrome(chrome ignores text)
        return "Changes you made may not be saved";
      } else {
        return null;
      }
    };
    if (performance.navigation.type == 1) {
      if (this.$route.path == "/study-time") {
        this.$router.push({ path: "/study-time" });
      } else {
        console.log("reload page without redirect");
      }
    }
  },
};
</script>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
