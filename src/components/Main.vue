<template>
  <div class="container">
    <sidebar />
    <div class="add-note-button">
      <img src="@/assets/svgs/plus-circle-notes.svg" alt height="50px" />
    </div>
    <div class="state">
      <h1>{{info}}</h1>
      <div class="todo">
        <h1>To Do</h1>
        <div class="content">
          <div
            class="cuadrado"
            v-for="note in notes"
            :key="note.id"
            v-bind:style="'transform: rotate(' + defineDeg()+'deg);'"
          ></div>
        </div>
      </div>
    </div>
    <div class="vl"></div>
    <div class="state">
      <div class="process">
        <h1>Process</h1>
        <div></div>
      </div>
    </div>
    <div class="vl"></div>
    <div class="state">
      <div class="done">
        <h1>Done</h1>
        <div class="note"></div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api";
import SideBar from "@/components/Sidebar";
import bus from "@/bus";
export default {
  name: "Main",
  data: () => ({
    info: null,
    notes: null
  }),
  components: {
    sidebar: SideBar
  },
  props: {
    msg: String
  },
  mounted() {
    bus.$on("showNotes", criteria => {
      if (criteria != null) {
        this.notes = this.getNotes(criteria);
      }
    });

    if (!this.$session.get("token")) {
      this.$router.push("/login");
    }
  },
  methods: {
    async getNotes(group) {
      let data = await api.findAllNotes(group, this.$session.get("token"));
      this.notes = data[0].NotesModel;
    },

    nameComp(name) {
      if (name.length >= 15) {
        return name.substring(0, 9) + "...";
      } else {
        return name;
      }
    },
    defineDeg() {
      return Math.random() * (2 - -2 + 1) + -2;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 95%;
}
.content {
  width: 100%;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
}
.cuadrado {
  width: 150px;
  height: 150px;
  margin: 0.5em;
  background-color: #cdd7d6;
  -moz-box-shadow: 5px 5px 7px rgba(33, 33, 33, 1);
  /* Safari+Chrome */
  -webkit-box-shadow: 5px 5px 7px rgba(33, 33, 33, 0.7);
  /* Opera */
  box-shadow: 5px 5px 7px rgba(33, 33, 33, 0.7);
  &:hover {
    transform: rotate(0deg);
    cursor: pointer;
  }
}

.container .state {
  width: 100%;
  height: 100%;
}
.vl {
  border: 0.5px solid #cdd7d6;
  width: 0.5px;
  height: 90%;
}

.add-note-button {
  position: absolute;
  left: 85%;
  top: 85%;
  z-index: 10;
}

@media all and (max-width: 600px) {
  .vl {
    height: 0;
  }
  .container .state {
    width: 100%;
    height: 100%;
  }
}
</style>
