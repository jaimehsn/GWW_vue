<template>
    <div class="container-feedback">
        <div class="message">
            <h2>{{this.message}}</h2>
        </div>
        <div class="control">
            <img src="@/assets/svgs/times.svg" alt="times" height="50px" v-on:click="$emit('exit')" />
        </div>
    </div>
</template>

<script>
export default {
    props: ["message"],
    data:() => ({

    })
    
}
</script>

<style lang="scss" scoped>
.container-feedback{
    display: flex;
    align-items: center;
    padding: 1em 0;
}
.message{
    width: 85%;
}
.control{
    width: 15%;
}
</style>