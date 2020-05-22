<template>
  <div class="container">
    <div class="title">
      <div>
        <h1>Users</h1>
      </div>
      <div class="icons">
        <div>
          <img src="@/assets/svgs/times.svg" alt="times" height="45px" v-on:click="$emit('exit')" />
        </div>
      </div>
    </div>
    <div class="content">
      <div class="users">
        
      </div>
      <div class="add">
        <img
          src="@/assets/svgs/plus-circle.svg"
          alt="times"
          height="50px"
          v-on:click="show('add-user')"
        />
      </div>
    </div>
    <modal name="add-user" height="auto" :scrollable="true">
      <com-create-element
        @exit="hide('add-user')" message="Add User" event="add-user" btnA="Add" btnB="Cancel" elementType="Email"
      />
    </modal>
  </div>
</template>

<script>
import api from "@/api"
import AddElement from "@/components/AddElement"
//import Choice from "@/components/Choice";
import bus from "@/bus";
export default {
  props: ["groupName"],
  components: {
    "com-create-element": AddElement,
  },
  mounted() {
    bus.$on("add-user", (email) => {
      if (this.groupName != undefined && email != "") {
        this.addUserIntoGroup(this.groupName, email);
      }
    });
  },
  methods: {

    async addUserIntoGroup(group,email) {
      
      let respuesta = await api.addUser(
        email,
        group,
        this.$session.get("token")
      );

      if (respuesta == 200) {
        //this.getUsers();
        console.log("user add TODO OK*****************************")
      }

    },

    async getUsers(group){
      let respuesta = await api.getUsers(
        group,
        this.$session.get("token")
      );

      if (respuesta == 200) {
        this.getUsers();
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

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.title {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-around;
}
.content {
  height: 400px;
  max-height: 400px;
  width: 65%;
  border: 1px solid #cdd7d6;
  border-radius: 3px;
  margin-bottom: 2em;
}
.icons {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.icons img {
  margin: 0 5px;
}

.users {
  width: 100%;
  height: 83%;
  max-height: 390px;
  overflow: auto;
}
.add {
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 0px;
  width: 100%;
  height: 17%;
  background-color: #cdd7d6;
  &:hover {
    cursor: pointer;
  }
}
</style>