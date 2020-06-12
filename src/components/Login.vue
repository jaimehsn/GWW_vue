<template>
  <div class="login">
    <h1 class="title">Login</h1>
    <form action class="form" @submit.prevent="login">
      <label class="form-label-login" for="#email"></label>
      <input
        v-model="email"
        class="form-input"
        type="email"
        id="email"
        required
        placeholder="Email"
      />
      <label class="form-label-login" for="#password"></label>
      <input
        v-model="password"
        class="form-input"
        type="password"
        id="password"
        placeholder="Password"
      />
      <p v-if="error" class="error">
        Email o Contraseña incorrectas.
      </p>
      <input class="form-submit" type="submit" value="Login" v-on:keyup.enter="login()" />
    </form>
  </div>
</template>

<script>
import auth from "@/login/auth";
import bus from "@/bus"
export default {
  mane: "login",
  data: () => ({
    email: "",
    password: "",
    error: false,
    message: "",
    shoWmodal: false,
  }),
  mounted() {
    if (this.$session.get("token")) {
      this.$router.push("/");
    }
  },
  methods: {
    async login() {
      auth
        .login(this.email, this.password)
        .then((response) => {
          this.$session.start();
          if (this.error) {
            this.error = false;
          }
          this.$session.set("token", response.data.token);
          bus.$emit("login", true);
          bus.$off("showNotes");
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status == 403 || error.response.status == 404) {
            this.error = true;
          }
        });
    },
    
  },
};
</script>

<style lang="scss" scoped>

.title {
  text-align: center;
}
.form {
  margin: 3rem auto;
  display: flex;
  width: 30%;
  max-width: 400px;
  min-width: 330px;
  flex-direction: column;
  justify-content: center;
  border: 1px solid #cdd7d6;
  border-style: none solid;
  border-color: #cdd7d6;
  padding: 2.5em;
}
.form-label-login {
  margin-top: 2rem;
  color: #cdd7d6;
  margin-bottom: 0.5rem;
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
.form-input-login {
  padding: 1em;
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
  &:hover {
    background: #26ac34;
  }
}
.error {
  margin: 1rem 0 0;
  color: #d00000;
}
::-webkit-input-placeholder { /* WebKit, Blink, Edge */
  color: #F87060;
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
 color: #F87060;
 opacity: 1 /* esto es porque Firefox le reduce la opacidad por defecto */;
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
 color: #F87060;
 opacity:  1;
}
:-ms-input-placeholder { /* Internet Explorer 10-11 */
 color: #F87060;
}
@media all and (max-width: 600px) {
  .form{
    width: 50%;
    max-width: none;
    min-width: 0;
  }

}


@media all and (max-width: 400px) {
  .form{
    width: 90%;
    padding: 1em;
    max-width: none;
    border:none;
    margin: 0;
  }
  
}

</style>
