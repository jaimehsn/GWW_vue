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
    NavBar: Navbar
  },
  methods: {
    foo: () => {
      this.$session.start();
    },

  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@500&display=swap");
html{
  height: 100%;
}
body {
  margin: 0px;
  padding: 0px;
  background: linear-gradient(-45deg, #cdd7d6, #fff);
  background-size: 400% 400%;
  height: 100%;}

#app {
  margin: 0px;
  padding: 0px;
  font-family: "Rubik", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  overflow: auto;
}

img {
  display: inline-block;
  &:hover {
    cursor: pointer;
  }
}
/* width */
::-webkit-scrollbar {
  width: 6px;
}

/* Track 
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey; 
  border-radius: 10px;
}*/
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #757C7C; 
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #444444; 
}
</style>
