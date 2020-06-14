<template>
  <div class="choice-container">
    <div class="question">
      <h1>{{message}}</h1>
    </div>
    <div class="choice">
      <div class="yes">
        <button v-on:click="result(true)">Yes</button>
      </div>
      <div class="no">
        <button v-on:click="result(false)">No</button>
      </div>
    </div>
  </div>
</template>

<script>
import bus from "@/bus";
export default {
  props: ["message", "event"],
  methods: {
    //Method that executes a broadcast to the event bus
    result(res) {
      if (res) {
        bus.$emit(this.event, true);
        this.$emit("exit");
      } else {
        this.$emit("exit");
      }
    }
  }
};
</script>

<style lang="scss">
.choice-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.choice {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
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
.yes button {
  background-color: #31d843;
  &:hover {
    background-color: #1e8929;
  }
  &:active {
    background-color: #31d843;
  }
}

.no button {
  background-color: #d00000;
  &:hover {
    background-color: #870000;
  }
  &:active {
    background-color: #d00000;
  }
}

@media all and (max-width: 400px) {
  .choice{
    margin: 0;
  }
  
}
</style>