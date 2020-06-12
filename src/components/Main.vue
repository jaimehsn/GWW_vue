<template>
  <div class="container">
    <sidebar v-if="loged" />
    <div class="add-note-button">
      <img src="@/assets/svgs/plus-circle-notes.svg" alt height="50px" v-on:click="show('nota@')" />
    </div>
    <div class="state">
      <div class="todo">
        <h1>To Do</h1>
        <div class="content">
          <com-note
            v-for="note in todo"
            :key="note.id"
            :id="note.id"
            :autor="note.autor"
            :title="note.title"
            :content="note.content"
            :state="note.state"
            :groupName="groupName"
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
            :id="note.id"
            :autor="note.autor"
            :title="note.title"
            :content="note.content"
            :state="note.state"
            :groupName="groupName"
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
            :id="note.id"
            :autor="note.autor"
            :content="note.content"
            :state="note.state"
            :groupName="groupName"
          />
        </div>
      </div>
    </div>
    <modal name="nota@" height="auto" :adaptive="'adaptive'">
      <com-adminNote v-bind:new="true" :group="groupName" @exit="hide('nota@')" />
    </modal>
    <modal name="modalFeedback" height="auto" :adaptive="'adaptive'">
      <com-feedback v-bind:message="msgFeedback" @exit="hide('modalFeedback')" />
    </modal>
  </div>
</template>

<script>
import api from "@/api";
import SideBar from "@/components/Sidebar";
import adminNote from "@/components/AdminNote";
import feedback from "@/components/Feedback";
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
    note: [],
    groupName: "",
    groupNameOld: "",
    msgFeedback: ""
  }),
  components: {
    "sidebar": SideBar,
    "com-note": note,
    "com-adminNote": adminNote,
    "com-feedback": feedback
  },
  props: {
    msg: String
  },
  mounted() {
    this.loged = true;


    bus.$on("feedback", msg => {
      this.msgFeedback = msg;
      this.show("modalFeedback");
    });

    bus.$on("admin-note", () => {
      this.show("hola");
      console.log("VECES");
    });

    bus.$on("showNotes", criteria => {
      //socket Unsubscription
      this.unSubscribe(criteria);

      if (criteria != null) {
        this.notes = [];
        this.todo = [];
        this.done = [];
        this.process = [];
        this.note = [];
        this.getNotes(criteria);
        this.groupName = criteria;
        //socket subscription
        this.subscribe(criteria);
        this.groupNameOld = criteria;
        
      }
    });

    if (!this.$session.get("token")) {
      this.$router.push("/login");
    }
  },
  methods: {
    async getNotes(group) {
      let data = await api.findAllNotes(group, this.$session.get("token"));
      bus.$emit("takeNotes", data[0].NotesModel);
      return this.sorter(data[0].NotesModel);
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
        this.toda = [];
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

    show(modal_name) {
      this.$modal.show(modal_name);
    },

    hide(modal_name) {
      this.$modal.hide(modal_name);
    },
    subscribe(criteria) {
      if (criteria != this.groupNameOld || this.groupNameOld == "") {
        this.$socket.client.on(criteria, payload => {
          console.log("SUBSCRIBE TO:", payload.group);
          bus.$emit("showNotes", this.groupName);
        });
      }
    },
    unSubscribe(criteria) {
      if (this.groupNameOld != "" && this.groupNameOld != criteria) {
        this.$socket.client.off(this.groupNameOld);
        console.log("DES SUBSCRITO");
      }
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
