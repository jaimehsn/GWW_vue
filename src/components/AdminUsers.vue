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
        <div>
            <div class="user-name">
              <p>{{email}}</p>
            </div>
          </div>
        <div class="user" v-for="user in users" :key="user.id">
          <div class="items" v-if="user.userModel.email != email">
            <div class="user-name">
              <p>{{user.userModel.email}}</p>
            </div>
            <div class="user-control">
              <img src="@/assets/svgs/sign-out-alt.svg" alt height="30px" v-on:click="emiter('del-user-group', user.userModel.email)" />
            </div>
          </div>
        </div>
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
    <modal name="add-user" height="auto" :adaptive="'adaptive'" :scrollable="true">
      <com-create-element
        @exit="hide('add-user')"
        message="Add User"
        event="add-user"
        btnA="Add"
        btnB="Cancel"
        elementType="Email"
      />
    </modal>
  </div>
</template>

<script>
import api from "@/api";
import AddElement from "@/components/AddElement";
//import Choice from "@/components/Choice";
import bus from "@/bus";
export default {
  props: ["groupName", "email"],
  components: {
    "com-create-element": AddElement
  },
  data: () => ({
    users: null
  }),
  mounted() {
    console.log("NOMBRE DEL GRUPO PARA LISTAR USAURIO: ", this.groupName);
    //Gets the users of a group
    this.getUsers(this.groupName);
    //Subscribe to the data bus event
    bus.$on("add-user", email => {
      if (this.groupName != undefined && email != "") {
        this.addUserIntoGroup(this.groupName, email)
          .then(() => {
            this.getUsers(this.groupName);
          })
          .catch(err => {
            console.log("ERROR ASYNC FUNCION:", err);
          });
      }
    });
    //Subscribe to the data bus event
    bus.$on("del-user-group", (email) =>{
      this.exitFromAGroup(this.groupName, email).then(() =>{
        this.getUsers(this.groupName)
      }).catch(err =>{
        console.log("ERROR DEL-USER-GROUP:", err)
      })
    })
  },
  methods: {
    //asynchronous method to add users to a group
    async addUserIntoGroup(group, email) {
      await api.addUser(email, group, this.$session.get("token"));
    },
    //Gets the users of a group
    async getUsers(group) {
      this.users = await api.listUserGroup(group, this.$session.get("token"));
      console.log("***LIST USER OK***");
    },
    //Remove a user from a group
    async exitFromAGroup(group, email) {
      await api.exitGroup(
        email,
        group,
        this.$session.get("token")
      );
    },
    //Functions for the control of modal windows
    show(modal_name) {
      this.$modal.show(modal_name);
    },

    hide(modal_name) {
      this.$modal.hide(modal_name);
    },
    //Function that executes broadcasts to the event bus
    emiter(event, criteria){
      bus.$emit(event, criteria)
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

.user .items{
display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.user-name{
  width: 70%;
}

.user-control{
  width: 30%;
}

.title {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
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