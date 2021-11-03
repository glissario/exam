<template>
    <h2> {{this.actualModule.label}}</h2>
</template>

<script>
export default {


    computed:{
        actualModule(){
        return this.$store.state.actualModule
        },
    },
}
</script>