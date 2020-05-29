<template>
  <div class="admin-note">
    <div class="admin-title">
      <div>
        <textarea class="titleArea" v-model="admin_title" name="title" cols="25" rows="1"></textarea>
      </div>
      <div>
        <img src="@/assets/svgs/times.svg" alt="times" height="45px" v-on:click="$emit('exit')" />
      </div>
    </div>
    <div class="vl"></div>
    <div class="admin-content">
      <textarea class="contentArea" v-model="admin_content" name="content" cols="25" rows="15"></textarea>
    </div>
    <div class="admin-controll">
      <div>
        <img src="@/assets/svgs/save.svg" alt="times" height="35px" v-on:click="$emit('exit')" />
      </div>
    </div>
    <div class="admin-info" v-if="!this.new">
      <div>
        <small>Create by: {{this.autor}}</small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "content", "state", "new","id", "autor"],
  data: () => ({
    admin_title: null,
    admin_content: null
  }),
  mounted() {
    if (this.new) {
      this.admin_title = "Title here...";
      this.admin_content = "Content here...";
    } else {
      this.admin_title = this.title;
      this.admin_content = this.content;
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@500&display=swap");
.admin-note {
  display: flex;
  flex-direction: column;
  min-height: 500px;
}

.admin-title {
  margin: 1em;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: nowrap;
  align-items: center;
}

.admin-content {
  margin: 1em 12%;
}

.admin-controll {
  display: flex;
  justify-content: center;
  margin: 1em 12%;
}
.admin-info{
  display: flex;
}


.admin-info div{
  margin: 1em 12%;
}

.titleArea {
  font-family: "Rubik", sans-serif;
  width: 100%;
  border: none;
  resize: inherit;
  text-align: left;
  color: #2c3e50;
  font-size: 1.5em;
  vertical-align: middle;
  outline: none !important;
  border: 0.5px solid #fff;
  &:focus {
    border: 0.5px solid #31d843;
  }
}
.contentArea {
  font-family: "Rubik", sans-serif;
  width: 100%;
  border: none;
  resize: inherit;
  text-align: left;
  color: #2c3e50;
  font-size: 1em;
  outline: none !important;
  vertical-align: middle;
  border: 0.5px solid #fff;
  &:focus {
    border: 0.5px solid #31d843;
  }
}
.vl {
  margin: 0 auto;
  border: 0.25px solid #cdd7d6;
  width: 80%;
  height: 0.5px;
}
</style>
