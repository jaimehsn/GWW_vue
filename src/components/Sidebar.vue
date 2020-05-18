<template>
  <div>
    <div id="mySidenav" class="sidenav" ref="sidebar">
      <div class="top">
        <div>
          <img src="@/assets/svgs/users.svg" alt height="40px" />
        </div>
        <div>
          <h1>Groups</h1>
        </div>
        <div>
          <img src="@/assets/svgs/times.svg" alt v-on:click="depliegue()" height="40px" />
        </div>
      </div>
      <div>
        <div v-if="groups.length == 0">
          <a href>...</a>
        </div>
        <div v-else v-for="group in groups" :key="group.id">
          <a
            v-on:click="emiter('showNotes', group.groupModel.name)"
          >{{nameComp(group.groupModel.name)}}</a>
        </div>
      </div>
      <div class="bot" v-on:click="depliegue()">
        <img src="@/assets/svgs/plus-circle.svg" alt height="40px" />
      </div>
    </div>
  </div>
</template>

<script>
import bus from "@/bus";
import api from "@/api";
export default {
  data: () => ({
    sidebar: false,
    groups: []
  }),
  mounted() {
    console.log("From Sidebar componente:", this.$session.get("token"));
    this.getGroups()
    bus.$on("sidebar", () => {
      if (!this.sidebar) {
        document.getElementById("mySidenav").style.width = "300px";
        this.sidebar = true;
        this.getGroups();
      } else {
        document.getElementById("mySidenav").style.width = "0";
        this.sidebar = false;
      }
    });
  },
  methods: {
    depliegue() {
      bus.$emit("sidebar");
    },
    emiter(dir, nam) {
      bus.$emit(dir, nam);
    },
    async getGroups() {
      //console.log("GerGroups: ", await api.findAllGroups(this.$jwtDec.decode(this.$session.get("token")).sub,this.$session.get("token")));
      this.groups = await api.findAllGroups(
        this.$jwtDec.decode(this.$session.get("token")).sub,
        this.$session.get("token")
      );
      console.log(this.groups);
    },
    nameComp(name) {
      if (name.length >= 24) {
        return name.substring(0, 11) + "...";
      } else {
        return name;
      }
    },
    shownotes() {}
  }
};
</script>

<style lang="scss">
.sidenav {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #fff;
  overflow-x: hidden;
  transition: 0.5s;
}
.top {
  display: flex;
  color: #102542;
  align-items: center;
  justify-content: space-evenly;
  background-color: #b3a394;
}
.bot {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px 0px;
  justify-content: space-evenly;
  background-color: #cdd7d6;
  position: absolute;
  bottom: 0px;
}

.sidenav a {
  padding: 10px 0px;
  text-decoration: none;
  width: 300px;
  font-size: 25px;
  color: #f87060;
  display: block;
  transition: 0.3s;
  &:hover {
    background-color: #cdd7d6;
    cursor: pointer;
  }
}

@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }
  .sidenav a {
    font-size: 18px;
  }
}
</style>