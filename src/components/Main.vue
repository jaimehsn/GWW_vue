<template>
  <div class="container">
    <sidebar />
    <div class="state">
      <div class="todo">
        <h1>To Do</h1>
        <div class="content">
          <div class="cuadrado" v-for="note in notes" :key="note.id"></div>
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
    notes: null,
  }),
  components: {
    sidebar: SideBar
  },
  props: {
    msg: String
  },
  mounted() {
    console.log("Valor de la sesion: ", this.$session.get("token"));
    bus.$on("showNotes", criteria => {
      if (criteria != null) {
        this.info = criteria;
      }
    });
    bus.$on("firstGroup", criteria => {
      if(criteria != undefined){
        this.getNotes(criteria)
        console.log("SE EJECUTA EL GET NOTES")
      }
    });

    if (!this.$session.get("token")) {
      this.$router.push("/login");
    }
  },
  methods: {
    async getNotes(group) {
      let data = await api.findAllNotes(group,this.$session.get("token"));
       this.notes = data[0].NotesModel
      console.log("NOTAS RECOGIDAS DESDE LA API: ",this.notes)
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
.content{
  width:100%;
  background-color: #000;
  display: flex;
}
.cuadrado{
  width: 100px;
  height: 100px;
  margin:5px;
  background-color: #fff;
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

@media all and (max-width: 600px) {
  .vl {
    height: 0;
  }
  .container .state {
    width: 100%;
    height: 50%;
  }
}
</style>
