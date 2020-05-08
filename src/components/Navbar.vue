<template>
  <header>
    <nav>
      <ul class="container">
        <li class="option">
          <img src="@/assets/svgs/bars.svg" alt="Menu" height="25px" />
        </li>
        <li class="search">
          <div class="input-icono">
            <input type="text" class="search-input" />
          </div>
        </li>
        <li class="option">
          <img v-if="loged" src="@/assets/svgs/user-circle.svg" alt="Menu" height="25px" />
          <img v-else src="@/assets/svgs/user-plus.svg" alt="Menu" height="25px" />
          <img src="@/assets/svgs/cog.svg" alt="Menu" height="25px" />
          <img v-if="loged" v-on:click="logout()" src="@/assets/svgs/sign-out-alt.svg" alt="Menu" height="25px" />
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import bus from "@/bus";
export default {
  name: "Navbar", //this is the name of the component
  data: () => ({
    loged: false
  }),
  mounted() {
    bus.$on("login", criteria => {
      this.loged = criteria;
    });
  },
  methods: {
    logout() {
      this.$session.remove("token")
      this.$router.push("/login")
      bus.$emit("login", false)
    }
  }
};
</script>
<style lang="scss">
ul {
  list-style-type: none;
  padding: 0.5em;
  padding-inline-start: 0px;
  margin-block-start: 0px;
  margin-block-end: 0px;
  background-color: #cdd7d6;
}
nav {
  padding: 0px;
  margin: 0px;
}
.container {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.search {
  width: 30%;
}
.option {
  width: 10%;
  display: flex;
  flex-direction: row;
}
.option img {
  padding: 0px 5px;
}

.search input {
  border: 1px solid #cdd7d6;
  border-radius: 3px;
  padding: 0px 5px;
  height: 30px;
  width: 100%;
  text-align: center;
  &:focus {
    border-color: #757c7c;
    border-radius: 3px;
  }
}
.input-icono {
  background-image: url("../assets/svgs/search.svg");
}

.input-icono input:focus {
  outline: none;
}
@media all and (max-width: 600px) {
  .container {
    flex-wrap: wrap;
  }
  .container > li {
    flex-basis: 50%;
  }
}
@media all and (max-width: 400px) {
  .container > li {
    flex-basis: 100%;
  }
  .search {
    order: 1;
  }
}
</style>
