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
      <div class="group-list">
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
            <img
              src="@/assets/svgs/user-edit.svg"
              alt
              height="25px"
              v-on:click="show('admin-users'),changeTarget(group.groupModel.name)"
              v-if="group.admin == 1"
            />
            <img
              src="@/assets/svgs/trash-alt.svg"
              alt
              height="25px"
              v-if="group.admin == 1"
              v-on:click="show('choice-modal-sidebar-delete'),changeTarget(group.groupModel.name)"
            />
            <img
              src="@/assets/svgs/sign-out-alt.svg"
              alt
              height="25px"
              v-else
              v-on:click="show('choice-modal-sidebar-exit'),changeTarget(group.groupModel.name)"
            />
          </div>
        </div>
        <div class="bot" v-on:click="show('create-group')">
          <img src="@/assets/svgs/plus-circle.svg" alt height="40px" />
        </div>
      </div>
    </div>
    <modal name="choice-modal-sidebar-delete" height="auto" :scrollable="true">
      <com-choice-sidebar
        @exit="hide('choice-modal-sidebar-delete')"
        message="Delete?"
        event="delete-group"
      />
    </modal>
    <modal name="choice-modal-sidebar-exit" height="auto" :scrollable="true">
      <com-choice-sidebar
        @exit="hide('choice-modal-sidebar-exit')"
        message="Go out?"
        event="exit-group"
      />
    </modal>
    <modal name="create-group" height="auto" :scrollable="true">
      <com-create-element
        @exit="hide('create-group')"
        message="Create group"
        event="add-group"
        btnA="Create"
        btnB="Cancel"
        element-type="Group"
      />
    </modal>
    <modal name="admin-users" height="auto" :scrollable="true">
      <com-admin-users @exit="hide('admin-users')" v-bind:groupName="this.target" />
    </modal>
  </div>
</template>

<script>
import bus from "@/bus";
import api from "@/api";
import Choice from "@/components/Choice";
import AddElement from "@/components/AddElement";
import AdminUsers from "@/components/AdminUsers";
export default {
  components: {
    "com-choice-sidebar": Choice,
    "com-create-element": AddElement,
    "com-admin-users": AdminUsers
  },
  data: () => ({
    sidebar: false,
    groups: [],
    target: null
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

    bus.$on("exit-group", () => {
      if (this.target != undefined) {
        this.exitFromAGroup(this.target)
          .then(() => {
            this.getGroups();
          })
          .catch(err => {
            console.log("ERROR ASYNC FUNCION exitFromAGroup:", err);
          });
      }
    });
    bus.$on("delete-group", () => {
      if (this.target != undefined) {
        this.deleteAGroup(this.target).then(()=>{
          this.getGroups();
        }).catch(err =>{
          console.log("ERROR ASYNC FUNCION deleteAGroup:", err);
        });
      }
    });

    bus.$on("add-group", grpName => {
      if (grpName != "") {
        this.createAGroup(grpName).then(() => {
          this.getGroups();
          console.log("GROUPO CREADO:", grpName);
        }).catch(err =>{
          console.log("ERROR ASYNC FUNCION createAGroup:", err);
        });
      } else {
        console.log("GROUPO ERROR:", grpName);
      }
    });

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
      this.groups = await api.findAllGroups(
        this.$jwtDec.decode(this.$session.get("token")).sub,
        this.$session.get("token")
      );
    },

    async exitFromAGroup(group) {
      await api.exitGroup(
        this.$jwtDec.decode(this.$session.get("token")).sub,
        group,
        this.$session.get("token")
      );
    },

    async createAGroup(group) {
      await api.createGroup(group, this.$session.get("token"));
    },

    async deleteAGroup(group) {
      await api.deleteGroup(group, this.$session.get("token"));
    },

    changeTarget(group) {
      this.target = group;
      console.log("CAMBIO DEL TARGET:", this.target);
    },

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
  overflow: hidden;
  transition: 0.5s;
  border-right: 1px solid #cdd7d6;
}
.group-list {
  overflow: auto;
  height: 90%;
  overflow-x: hidden;
}
.list {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}
.group-name {
  width: 70%;
  min-width: 200px;
}
.group-options {
  width: 30%;
}
.group-options img {
  padding: 0 5px;
}

.top {
  display: flex;
  color: #102542;
  align-items: center;
  justify-content: space-evenly;
  background-color: #b3a394;
  height: 10%;
}
.bot {
  display: flex;
  align-items: center;
  width: 100%;
  height: 5%;
  padding: 0.25em 0px;
  justify-content: space-evenly;
  background-color: #cdd7d6;
  &:hover {
    cursor: pointer;
  }
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