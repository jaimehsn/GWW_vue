<template>
  <div class="hello">
    <img src="@/assets/logo.png" alt />
  </div>
</template>

<script>
export default {
  name: "Main",
  props: {
    msg: String
  },
  mounted() {
    
    if(!this.$session.get("token")){
      this.$router.push("/login")
    }
  }
  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
