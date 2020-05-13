<template>
  <div class="register">
    <div class="container-register">
      <div class="item">
        <h1 class="title">Sign Up</h1>
      </div>
      <div class="item">
        <img
          src="@/assets/svgs/times.svg"
          alt="times"
          height="50px"
          v-on:click="emiter(false)"
        />
      </div>
    </div>
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
        pattern="^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$"
        title="La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un caracter no alfanumérico"
      />
      <label class="form-label" for="#password-repeat"></label>
      <input
        v-model="passwordRepeat"
        class="form-input"
        type="password"
        id="password-repeat"
        placeholder="Password"
      />
      <p v-if="error" class="error">{{ message }}</p>
      <input class="form-submit" type="submit" value="Sign Up" />
    </form>
  </div>
</template>

<script>
import auth from "@/login/auth";
import bus from "@/bus"
export default {
  data: () => ({
    email: "",
    password: "",
    passwordRepeat: "",
    error: false,
    message: "",
  }),
  methods: {
    async register() {
      if (this.password == this.passwordRepeat) {
        auth
          .register(this.email, this.password)
          .then((response) => {
            console.log(response.data.token);
            this.$session.set("token", response.data.token);
            console.log(this.$session.get("token"));
            this.emiter(true)
            this.$router.push("/");
          })
          .catch((e) => {
            console.log(e);
            if (e.response.status == 400) {
              this.error = true;
              this.message = "El correo ya está en uso.";
              console.log(this.error);
            }
          });
      } else {
        this.error = true;
        this.message = "Las contraseñas no coinciden.";
        console.log(this.error);
      }
    },
    emiter(permisos) {
      bus.$emit("login", permisos)
      this.$emit("exit")
    },
  },
};
</script>

<style lang="scss" scoped>
.register {
  padding: 2rem;
}
.container-register {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;

}
.item{
  flex-grow: 3;
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
