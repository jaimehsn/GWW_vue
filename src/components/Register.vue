<template>
  <div class="register">
    <div class="container-register">
      <div class="items">
        <div class="item">
          <h1 class="title">Sign Up</h1>
        </div>
        <div class="item">
          <img src="@/assets/svgs/times.svg" alt="times" height="50px" v-on:click="emiter(false)" />
        </div>
      </div>
      <div class="container-form">
        <form action class="form" @submit.prevent="register">
          <ul>
            <li>
              <input
                v-model="email"
                class="form-input"
                type="email"
                id="email"
                required
                placeholder="Email"
              />
            </li>
            <li>
              <input
                v-model="password"
                class="form-input"
                type="password"
                id="password"
                placeholder="Password"
                pattern="^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$"
                title="La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un caracter no alfanumérico"
              />
            </li>
            <li>
              <input
                v-model="passwordRepeat"
                class="form-input"
                type="password"
                id="password-repeat"
                placeholder="Password"
              />
            </li>
            <li>
              <p v-if="error" class="error">{{ message }}</p>
              <input class="form-submit" type="submit" value="Sign Up" />
            </li>
          </ul>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import auth from "@/login/auth";
import bus from "@/bus";
export default {
  data: () => ({
    email: "",
    password: "",
    passwordRepeat: "",
    error: false,
    message: ""
  }),
  methods: {
    async register() {
      if (this.password == this.passwordRepeat) {
        auth
          .register(this.email, this.password)
          .then(response => {
            console.log(response.data.token);
            this.$session.set("token", response.data.token);
            console.log(this.$session.get("token"));
            this.emiter(true);
            this.$router.push("/");
          })
          .catch(e => {
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
      bus.$emit("login", permisos);
      this.$emit("exit");
    }
  }
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
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.items {
  display: flex;
  width: 60%;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
}
.title {
  text-align: center;
}
.container-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid #cdd7d6;
  border-style: none solid;
  border-color: #cdd7d6;
  width: 100%;
  max-width: 400px;
  
}
ul {
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #fff;
}
.form{
  padding: 2em;
  max-width: 450px;
}


.form-input {
  width: 100%;
  margin: 1em 0 ;
  padding: 10px 0;
  border: 1px solid #cdd7d6;
  text-align: center;
  border-radius: 3px;
  &:focus {
    outline: 0;
    border-color: #31d843;
  }
}
.form-submit {
  cursor: pointer;
  width: 100%;
  color:#fff;
  border-width:0;
  padding: 10px 0;
  border-radius: 3px;
  background-color: #31d843;
  transition: background 0.2s;
  margin: 1em 0 ;
  &:hover {
    background: #1d8427;
  }
}
.error {
  margin: 1rem 0 0;
  color: #d00000;
}

@media all and (max-width: 600px) {
  
}
</style>
