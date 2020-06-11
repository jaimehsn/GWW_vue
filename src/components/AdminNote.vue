<template>
  <div class="admin-note">
    <div class="admin-title">
      <div>
        <textarea
          class="titleArea"
          v-model="admin_title"
          name="title"
          cols="25"
          rows="1"
          v-on:focus="edit = true"
        ></textarea>
      </div>
      <div>
        <select v-model="admin_state" name="state" class="custom-select" v-on:focus="edit = true">
          <option value="to do">To do</option>
          <option value="in process">In process</option>
          <option value="done">Done</option>
        </select>
      </div>
      <div>
        <img src="@/assets/svgs/times.svg" alt="times" height="45px" v-on:click="$emit('exit')" />
      </div>
    </div>
    <div class="vl"></div>
    <div class="admin-content">
      <textarea
        class="contentArea"
        v-model="admin_content"
        name="content"
        cols="5"
        rows="15"
        v-on:focus="edit = true"
      ></textarea>
    </div>
    <div class="admin-controll">
      <div v-if="edit">
        <img
          src="@/assets/svgs/save.svg"
          alt="times"
          height="35px"
          v-on:click="acction(),$emit('exit')"
        />
      </div>
      <div v-if="!this.new">
        <img src="@/assets/svgs/trash-alt.svg" alt="trash" height="35px" v-on:click="trash()" />
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
import api from "@/api";
export default {
  props: ["title", "content", "state", "new", "id", "autor", "group"],

  components: {},

  data: () => ({
    admin_title: null,
    admin_content: null,
    admin_id: null,
    edit: false,
    admin_state: null,
    groupName: null
  }),

  mounted() {
    if (this.new) {
      this.admin_title = "Title here...";
      this.admin_content = "Content here...";
      this.groupName = this.group;
      this.admin_state = "to do";
    } else {
      this.admin_id = this.id;
      this.admin_title = this.title;
      this.admin_content = this.content;
      this.groupName = this.group;
      this.admin_state = this.state;
    }
  },

  methods: {
    async acction() {
      if (this.new) {
        console.log("CREACION");
        await api
          .createNote(
            this.admin_title,
            this.admin_content,
            this.admin_state,
            this.groupName,
            this.$jwtDec.decode(this.$session.get("token")).sub,
            this.$session.get("token")
          )
          .then(() => {
            //bus.$emit("showNotes", this.groupName);
            this.$socket.client.emit("update-note", {
                    group: this.groupName
            });
          })
          .catch(err => {
            console.log("ERROR ASYNC FUNCION createnote:", err);
          });
      } else {
        console.log("ACTUALIZACION");
        await api
          .updateNote(
            this.admin_id,
            this.admin_title,
            this.admin_content,
            this.admin_state,
            this.$jwtDec.decode(this.$session.get("token")).sub,
            this.$session.get("token")
          )
          .then(() => {
            //bus.$emit("showNotes", this.groupName);
            this.$socket.client.emit("update-note", {
                    group: this.groupName
            });
          })
          .catch(err => {
            console.log("ERROR ASYNC FUNCION deleteNote:", err);
          });
      }
    },

    async trash() {
      console.log("Eliminación");
      await api
        .deleteNote(this.admin_id, this.$session.get("token"))
        .then(data => {
          //bus.$emit("showNotes", this.groupName);
          this.$socket.client.emit("update-note", {
                    group: this.groupName
            });
          return data;
        })
        .catch(err => {
          console.log("ERROR ASYNC FUNCION deleteNote:", err);
        });
    },

    show(modal_name) {
      this.$modal.show(modal_name);
    },

    hide(modal_name) {
      this.$modal.hide(modal_name);
    }
  }
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

.custom-select {
  position: relative;
  font-family: "Rubik", sans-serif;
}
.custom-select select {
  display: none; /*hide original SELECT element:*/
}
.select-selected {
  background-color: DodgerBlue;
}

.admin-content {
  margin: 1em 12%;
}

.admin-controll {
  display: flex;
  justify-content: space-around;
  margin: 1em 12%;
}
.admin-info {
  display: flex;
}

.admin-info div {
  margin: 1em 12%;
}

.titleArea {
  font-family: "Rubik", sans-serif;
  width: 80%;
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
