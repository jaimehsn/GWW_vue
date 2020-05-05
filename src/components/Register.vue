<template>
  <div class="register">
    <h1 class="title">Sign Up</h1>
    <form action class="form" @submit.prevent="register">
      <label class="form-label" for="#email"></label>
      <input
        v-model="email"
        class="form-input"
        type="email"
        id="email"
        required
        placeholder="Email"
      />
      <label class="form-label" for="#password"></label>
      <input
        v-model="password"
        class="form-input"
        type="password"
        id="password"
        placeholder="Password"
      />
      <label class="form-label" for="#password-repeat"></label>
      <input
        v-model="passwordRepeat"
        class="form-input"
        type="password"
        id="password-repeat"
        placeholder="Password"
      />
      <input class="form-submit" type="submit" value="Sign Up" />
    </form>
  </div>
</template>

<script>
import auth from "@/login/auth";
export default {
  data: () => ({
    email: "",
    password: "",
    passwordRepeat: ""
  }),
  methods: {
    async register() {
      auth.register(this.email, this.password)
      .then(response => {
        console.log(response);
      }).catch(e =>{
        console.log(e)
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  padding: 2rem;
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
  border: 1px solid #cdd7d6;
  border-style: none solid;
  border-color: #cdd7d6;
  padding: 40px;
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
  border-radius: 4px;
  color: #102542;
  &:focus {
    outline: 0;
    border-color: #31d843;
  }
}
.form-submit {
  background: #31d843;
  border: none;
  border-radius: 4px;
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