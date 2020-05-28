<template>
  <div class="container">
    <sidebar v-if="loged" />
    <div class="add-note-button">
      <img src="@/assets/svgs/plus-circle-notes.svg" alt height="50px" />
    </div>
    <div class="state">
      <div class="todo">
        <h1>To Do</h1>
        <div class="content">
          <com-note
            v-for="note in todo"
            :key="note.id"
            :title="note.title"
            :content="note.content"
          />
        </div>
      </div>
    </div>
    <div class="vl"></div>
    <div class="state">
      <div class="process">
        <h1>Process</h1>
        <div class="content">
          <com-note
            v-for="note in process"
            :key="note.id"
            :title="note.title"
            :content="note.content"
          />
        </div>
      </div>
    </div>
    <div class="vl"></div>
    <div class="state">
      <div class="done">
        <h1>Done</h1>
        <div class="content">
          <com-note
            v-for="note in done"
            :key="note.id"
            :title="note.title"
            :content="note.content"
            v-on:click="this.bus.$emit('admin-note')"
          />
          
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import api from "@/api";
import SideBar from "@/components/Sidebar";
//import adminNote from "@/components/AdminNote";
import note from "@/components/Note";
import bus from "@/bus";
export default {
  name: "Main",
  data: () => ({
    info: null,
    notes: null,
    loged: null,
    todo: [],
    process: [],
    done: [],
    note: []
  }),
  components: {
    sidebar: SideBar,
    "com-note": note,
    /*"com-adminNote": adminNote*/
  },
  props: {
    msg: String
  },
  mounted() {
    this.loged = true;
    bus.$on("admin-note", () =>{
      this.show("hola")
      console.log("VECES")
    })

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
      this.sorter(data[0].NotesModel);
    },
    nameComp(name, num) {
      if (name.length >= num) {
        return name.substring(0, num) + "...";
      } else {
        return name;
      }
    },

    sorter(data) {
      data.forEach(valor => {
        switch (valor.state) {
          case "to do":
            this.todo.push(valor);
            break;
          case "in process":
            this.process.push(valor);
            break;
          case "done":
            this.done.push(valor);
            break;
          default:
            this.note.push(valor);
            break;
        }
      });
    },
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
  left: 90%;
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
  .add-note-button {
    left: 85%;
    top: 85%;
  }
}
@media all and (max-width: 400px) {
  .add-note-button {
    left: 75%;
    top: 85%;
  }
}
</style>
