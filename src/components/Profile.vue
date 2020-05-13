<template>
  <div class="profile">
    <div class="container-profile">
      <div class="form-header">
        <div>
          <h1 class="title">Sign Up</h1>
        </div>
        <div>
          <img src="@/assets/svgs/times.svg" alt="times" height="50px" />
        </div>
      </div>
      <div class="form">
        <form action method="post">
          <div>
            <label class="form-label" for="#email">Email</label>
            <input class="form-input" id="email" />
          </div>
          <div>
            <label class="form-label" for="#name">Name</label>
            <input class="form-input" type="email" id="name" />
          </div>
          <div>
            <label class="form-label" for="#name">Lastname</label>
            <input class="form-input" type="lastname" id="lastname" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api";
export default {
  data: () => ({
    info: {}
  }),
  methods: {
    async getUserInfo() {
      this.info = await api.getUserInfo(
        this.$jwtDec.decode(this.$session.get("token")).sub,
        this.$session.get("token")
      );
      console.log(this.info);
    }
  }
};
</script>

<style lang="scss">
.container-profile {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
}
.title {
  text-align: center;
}
.form {
  margin: 3rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 20%;
  min-width: 350px;
  max-width: 100%;
}
.form-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.form-label {
  margin-top: 2rem;
  color: #cdd7d6;
  margin-bottom: 0.5rem;
  &:first-of-type {
    margin-top: 0rem;
  }
}
.form-input {
  padding: 10px;
  text-align: center;
  background: none;
  background-image: none;
  border: 1px solid #cdd7d6;
  border-radius: 3px;
  color: #102542;
  &:focus {
    outline: 0;
    border-color: #31d843;
  }
}
.form-submit {
  background: #31d843;
  border: none;
  border-radius: 3px;
  color: white;
  margin-top: 3rem;
  padding: 1rem 0;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #31d843;
  }
}
.error {
  margin: 1rem 0 0;
  color: #d00000;
}
</style>