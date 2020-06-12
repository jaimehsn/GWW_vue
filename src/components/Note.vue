<template >
  <div @click="show('nota@'+id)">
    <div class="note" v-bind:style="'transform: rotate(' + defineDeg()+'deg);'">
      <p class="title">{{nameComp(this.title, 13)}}</p>
      <div class="vl"></div>
      <p class="content">{{nameComp(this.content, 60)}}</p>
    </div>
    <modal v-bind:name="'nota@' + this.id" height="auto" :adaptive="'adaptive'">
      <admin-note
        v-bind:title="this.title"
        :content="this.content"
        :state="this.state"
        :autor="this.autor"
        :new="false"
        :id="this.id"
        :group="groupName"
        @exit="hide('nota@' + id)"
      />
    </modal>
  </div>
</template>

<script>
import adminNote from "@/components/AdminNote";
import bus from "@/bus";
export default {
  props: ["title", "content", "state","autor", "id","groupName"],
  components: {
    "admin-note": adminNote
  },

  data: () => ({}),

  mounted() {
    console.log("GRUPO: " ,this.groupName, " NOTA: ", this.id)
  },

  methods: {
    nameComp(name, num) {
      if (name.length >= num) {
        return name.substring(0, num) + "...";
      } else {
        return name;
      }
    },
    defineDeg() {
      return Math.random() * (2 - -2 + 1) + -2;
    },

    emiter() {
      bus.$emit("admin-note");
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
.note {
  display: flex;
  flex-direction: column;
  justify-items: center;
  width: 150px;
  height: 150px;
  margin: 0.5em;
  background-color: #cdd7d6;
  box-shadow: 5px 5px 7px #757c7c;

  &:hover {
    transform: none;

    cursor: pointer;
  }
  &:active {
    box-shadow: none;
  }
}
.note p {
  margin: 0.5em;
  text-align: left;
}

.vl {
  margin: 0 auto;
  border: 0.25px solid #fff;
  width: 80%;
  height: 0.5px;
}
</style>