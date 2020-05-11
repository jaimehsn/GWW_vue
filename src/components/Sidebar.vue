<template>
  <div>
    <div id="mySidenav" class="sidenav">
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
      <a href="#">About</a>
      <a href="#">Services</a>
      <a href="#">Clients</a>
      <a href="#">Contact</a>
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
    sidebar: false
  }),
  mounted() {
    console.log("From Sidebar componente:", this.$session.get("token"));
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
    async getGroups() {
      api.findAllGroups(this.$jwtDec.decode(this.$session.get("token")).sub,this.$session.get("token"));
    }
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
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
}

.sidenav a:hover {
  color: #f1f1f1;
}

.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
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