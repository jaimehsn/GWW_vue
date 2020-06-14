<template>
  <div class="profile">
    <div class="container-profile">
      <div class="form-header">
        <div>
          <h1 class="title">Profile</h1>
        </div>
        <div class="icons">
          <div>
            <img
              v-if="editMode"
              src="@/assets/svgs/check.svg"
              alt="times"
              height="45px"
              width="35"
              v-on:click="sendInfo()"
            />
          </div>
          <div>
            <img
              v-if="!editMode"
              src="@/assets/svgs/pen.svg"
              alt="times"
              height="33px"
              width="35"
              v-on:click="editMode = !editMode"
            />
          </div>
          <div>
            <img
              src="@/assets/svgs/times.svg"
              alt="times"
              height="45px"
              width="35"
              v-on:click="$emit('exit')"
            />
          </div>
        </div>
      </div>
      <form action method="put" @submit.prevent="sendInfo()">
        <div>
          <label class="form-label" for="#email">Email</label>
          <input class="form-input" id="email" v-bind:placeholder="email" disabled />
        </div>
        <div>
          <label class="form-label" for="#name">Name</label>
          <input
            class="form-input"
            type="text"
            id="name"
            v-model="name"
            :v-bind:placeholder="name"
            :disabled="!editMode"
            @focus="edited = true"
          />
        </div>
        <div>
          <label class="form-label" for="#lastname">Lastname</label>
          <input
            class="form-input"
            type="text"
            id="lastname"
            v-model="lastname"
            :v-bind:placeholder="lastname"
            :disabled="!editMode"
            @focus="edited = true"
          />
        </div>
        <div>
          <label class="form-label" for="#phone">Phone</label>
          <input
            class="form-input"
            type="tel"
            id="phone"
            v-model="phone"
            :v-bind:placeholder="phone"
            :disabled="!editMode"
            @focus="edited = true"
          />
        </div>
        <div>
          <label class="form-label" for="#category">Category</label>
          <input
            class="form-input"
            type="text"
            id="category"
            v-model="category"
            :v-bind:placeholder="category"
            :disabled="!editMode"
            @focus="edited = true"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from "@/api";
export default {
  data: () => ({
    info: [],
    error: false,
    editMode: false,
    edited: false,
    email: "",
    name: "",
    lastname: "",
    category: "",
    phone: ""
  }),
  mounted() {
    //Function that obtains user information
    this.getUserInfo();
  },
  methods: {
    //Function that obtains user information
    async getUserInfo() {
      this.info = await api.userInfo(
        this.$jwtDec.decode(this.$session.get("token")).sub,
        this.$session.get("token")
      );
      console.log(this.info);
      this.email = this.info[0].email;
      this.name = this.info[0].name;
      this.lastname = this.info[0].lastname;
      this.phone = this.info[0].phone;
      this.category = this.info[0].category;
    },
    //Function that sends updated user data
    async sendInfo() {
      if (this.edited) {
        api
          .updateInfo(
            this.$jwtDec.decode(this.$session.get("token")).sub,
            this.$session.get("token"),
            this.name,
            this.lastname,
            this.phone,
            this.category
          )
          .then(() => {
            this.$emit("exit");
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.editMode = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>

.container-profile {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  margin:1em 0;
}

.title {
  text-align: center;
  color: #102542;
}


.form-header {
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-around;
}

.icons {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.icons img {
  margin: 0 5px;
}

form{
  width: 100%;
}

.form-label {
  padding: 10px;
  margin: 5px;
  width: 100%;
  color: #102542;
  font-weight: bold;
  &:first-of-type {
    margin-top: 0rem;
  }
}

.form-input {
  padding: 10px;
  margin: 5px;
  text-align: center;
  background: none;
  background-image: none;
  border: 1px solid #cdd7d6;
  border-radius: 3px;
  color: #f87060;
  &:focus {
    outline: 0;
    border-color: #31d843;
  }
  &::placeholder {
    color: #f87060;
  }
}

.error {
  margin: 1rem 0 0;
  color: #d00000;
}
</style>