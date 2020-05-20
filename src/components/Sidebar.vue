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
        <div class="list" v-else v-for="group in groups" :key="group.id">
          <div class="group-name">
            <a
              v-on:click="emiter('showNotes', group.groupModel.name)"
            >{{nameComp(group.groupModel.name)}}</a>
          </div>
          <div class="group-options">
            <img src="@/assets/svgs/user-plus.svg" alt height="25px" v-if="group.admin == 1" />
            <img src="@/assets/svgs/trash-alt.svg" alt height="25px" v-if="group.admin == 1" v-on:click="show('choice-modal-sidebar-delete')" />
            <img src="@/assets/svgs/sign-out-alt.svg" alt height="25px" v-else v-on:click="show('choice-modal-sidebar'),target = group.groupModel.name" />
          </div>
        </div>
      </div>
      <div class="bot" v-on:click="depliegue()">
        <img src="@/assets/svgs/plus-circle.svg" alt height="40px" />
      </div>
    </div>
    <modal name="choice-modal-sidebar-delete" height="auto" :scrollable="true" >
      <com-choice-sidebar  @exit="hide('choice-modal-sidebar-delete')" message='Delete?' event='delete-group'/>
    </modal>
    <modal name="choice-modal-sidebar" height="auto" :scrollable="true" >
      <com-choice-sidebar  @exit="hide('choice-modal-sidebar')" message='Go out?' event='exit-group'/>
    </modal>
  </div>
</template>

<script>
import bus from "@/bus";
import api from "@/api";
import Choice from "@/components/Choice"
export default {
  components: {
    "com-choice-sidebar": Choice
  },
  data: () => ({
    sidebar: false,
    groups: [],
    target: null,
  }),
  mounted() {
    console.log("From Sidebar componente:", this.$session.get("token"));
    bus.$on("sidebar", () => {
      if (!this.sidebar) {
        document.getElementById("mySidenav").style.width = "300px";
        this.sidebar = true;
      } else {
        document.getElementById("mySidenav").style.width = "0";
        this.sidebar = false;
      }
    });
    bus.$on("exit-group", () =>{
      if(this.target != undefined ){
        console.log("Eliminado Eliminado Eliminado Eliminado")
      }
    })
    this.getGroups();
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
      //console.log("GROUPOS DEL USUARIO",this.groups[0].groupModel.name);
      bus.$emit("firstGroup", this.groups[0].groupModel.name)
    },

    // Exit from a group

    nameComp(name) {
      if (name.length >= 15) {
        return name.substring(0, 9) + "...";
      } else {
        return name;
      }
    },

    show(modal_name) {
      this.$modal.show(modal_name);
    },

    hide(modal_name) {
      this.$modal.hide(modal_name);
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
.list {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}
.group-name{
  width: 70%;
  min-width: 200px;
}
.group-options{
  width: 30%;
}
.group-options img{
  padding: 0 5px;
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