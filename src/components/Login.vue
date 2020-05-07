<template>
  <div class="login">
    <h1 class="title">Login</h1>
    <form action class="form" @submit.prevent="login">
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
      <p v-if="error" class="error">Has introducido mal el email o la contraseña.</p>
      <input class="form-submit" type="submit" value="Login" />
    </form>
  </div>
</template>

<script>
import auth from "@/login/auth";
export default {
  data: () => ({
    email: "",
    password: "",
    error: false
  }),
  mounted() {
    console.log(this.$session.getAll());
    if (this.$session.get("token")) {
      this.$router.push("/");
      this.$session.remove("token");
    }
  },
  methods: {
    async login() {
      auth
        .login(this.email, this.password)
        .then(response => {
          this.$session.start();
          if (this.error) {
            this.error = false;
          }
          this.$session.set("token", response.data.token);
          console.log("Valor de la sesion: ", this.$session.get("token"));
          this.$router.push("/")
        })
        .catch(error => {
          console.log(error);
          if (error.response.status == 403) {
            this.error = true;
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/login";
</style>