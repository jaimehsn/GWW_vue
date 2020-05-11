<template>
  <div>
    <sidebar />
    <h1>{{info.sub}}</h1>
  </div>
</template>

<script>
import SideBar from "@/components/Sidebar";
export default {
  name: "Main",
  data: () => ({
    info: {}
  }),
  components: {
    sidebar: SideBar
  },
  props: {
    msg: String
  },
  mounted() {
    console.log("Valor de la sesion: ", this.$session.get("token"));
    if (!this.$session.get("token")) {
      this.$router.push("/login");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.hello {
  display: flex;
  align-items: center;
  justify-content: center;
}
.hello div {
  height: 200px;
  width: 200px;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
