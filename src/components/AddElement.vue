<template>
  <div class="addGroup">
    <div class="question">
      <h1>{{message}}</h1>
      <input type="text" v-model="element" :placeholder='[[ elementType]]+ " here..."' />
    </div>
    <div class="choice">
      <div class="affirmative">
        <button v-on:click="action(true)" @keyup.enter="action(true)">{{btnA}}</button>
      </div>
      <div class="negative">
        <button v-on:click="action(false)">{{btnB}}</button>
      </div>
    </div>
  </div>
</template>

<script>
import bus from "@/bus";
export default {
  props: ["message", "event", "btnA","btnB","elementType", ],
  data: () => ({
    element: ""
  }),
  methods: {
    action(res) {
      if (res) {
        bus.$emit(this.event, this.element);
        this.$emit("exit");
      } else {
        this.$emit("exit");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.addGroup {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
input {
  padding: 1em;
  text-align: center;
  background: none;
  border: 1px solid #cdd7d6;
  border-radius: 3px;
  color: #102542;
  &:focus {
    outline: 0;
    border-color: #31d843;
  }
}
.choice {
  display: flex;
  margin: 2em;
}
.choice button {
  padding: 1em 4em;
  margin: 1em;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  border-radius: 3px;
  font-size: 1em;
}
.affirmative button {
  background-color: #31d843;
  &:hover {
    background-color: #1e8929;
  }
  &:active {
    background-color: #31d843;
  }
}

.negative button {
  background-color: #d00000;
  &:hover {
    background-color: #870000;
  }
  &:active {
    background-color: #d00000;
  }
}
</style>