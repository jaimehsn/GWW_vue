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
        <div class="form">
          <div class="labels">
            <label class="form-label" for="#email">Email</label>
            <label class="form-label" for="#name">Name</label>
            <label class="form-label" for="#lastname">Lastname</label>
            <label class="form-label" for="#phone">Phone</label>
            <label class="form-label" for="#category">Category</label>
          </div>
          <div class="inputs">
            <input class="form-input" id="email" v-bind:placeholder="email" disabled />
            <input
              class="form-input"
              type="text"
              id="name"
              v-model="name"
              :v-bind:placeholder="name"
              :disabled="!editMode"
              @focus="edited = true"
            />
            <input
              class="form-input"
              type="text"
              id="lastname"
              v-model="lastname"
              :v-bind:placeholder="lastname"
              :disabled="!editMode"
              @focus="edited = true"
            />
            <input
              class="form-input"
              type="tel"
              id="phone"
              v-model="phone"
              :v-bind:placeholder="phone"
              :disabled="!editMode"
              @focus="edited = true"
            />
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
        </div>
      </form>
      <p v-if="error" class="error">Se ha produciodo un error, intente lo de nuevo más tarde.</p>
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
    this.getUserInfo();
  },
  methods: {
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
          .then(response => {
            console.log(response);
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
}
.title {
  text-align: center;
  color: #102542;
}
.form {
  margin: 3rem auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 20%;
  min-width: 350px;
  max-width: 100%;
}
.labels {
  display: flex;
  flex-direction: column;
  text-align: left;
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

.form-label {
  padding: 10px;
  margin: 5px;
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