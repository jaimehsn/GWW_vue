<template>
  <div class="componente">
    <sidebar />
    <h1 v-if="info != null">Nombre del grupo: {{info}}</h1>
    <div class="container">
      <div class="state">
        <div class="todo">
          <h1>To Do</h1>
        </div>
      </div>
      <div class="vl"></div>
      <div class="state">
        <div class="process">
          <h1>Process</h1>
        </div>
      </div>
      <div class="vl"></div>
      <div class="state">
        <div class="done">
          <h1>Done</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/Sidebar";
import bus from "@/bus";
export default {
  name: "Main",
  data: () => ({
    info: null
  }),
  components: {
    sidebar: SideBar
  },
  props: {
    msg: String
  },
  mounted() {
    console.log("Valor de la sesion: ", this.$session.get("token"));
    bus.$on("showNotes", criteria => {
      if (criteria != null) {
        this.info = criteria;
      }
    });

    if (!this.$session.get("token")) {
      this.$router.push("/login");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.componente{

}
.container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  height: 100%;
}

.container .state {
  width: 100%;
}
.vl {
  border: 0.5px solid #cdd7d6;
  padding-top: 30px;
  padding-bottom: 30px;
  width: 0.5px;
  height: 100%;
}
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
