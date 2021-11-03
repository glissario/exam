<template>
    <div v-if="this.$store.state.isLoggedIn">
        <router-link :to="{name:'About'}">Über uns</router-link>
        <router-link :to="{name:'Moduls'}">Module</router-link>
        <router-link :to="{name:'Contact'}">Kontakt</router-link>
    </div>
    
</template>


<script>

export default {
    name: 'MainNavigation',

    data(){
        return{

        }
    },
    methods:{
        routePage(){
            console.log(event.target.innerText)
            console.log(this.$route)
            
        }
    }
}
</script>

<style lang="scss" scoped>

a{
    text-decoration: none;
    padding: 0.5rem 0.25rem;
    margin: 0 1rem;
    color: #573643;
    border: 2px solid #573643;
}

a.router-link-active{
    color:  #da7573;
    cursor: pointer;
}



</style>