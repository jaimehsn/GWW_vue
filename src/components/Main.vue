<template>
  <div class="container">
    <sidebar />
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
        <div class="note"></div>
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
.container {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 95%;
}

.container .state {
  width: 100%;
  height: 100%;
}
.vl {
  border: 0.5px solid #cdd7d6;
  width: 0.5px;
  height: 90% 
}

</style>
