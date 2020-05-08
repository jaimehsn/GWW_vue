<template>
  <div id="app">
    <NavBar />
    <router-view />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
export default {
  name: "App",
  components: {
    NavBar: Navbar,
  },
  methods: {
    foo: () => {
      this.$session.start();
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@500&display=swap");
body {
  margin: 0px;
  padding: 0px;
  background: linear-gradient(-45deg, #cdd7d6, #ffffff);
  background-size: 200% 200%;
}

#app {
  font-family: "Rubik", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
img {
  display: inline-block;
  &:hover {
    cursor: pointer;
  }
}
</style>
