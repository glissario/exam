<template>
<div class="login-form">
    <Button 
        @click="checkLogin"
        class="p-button-outlined">
        Login
    </Button>
</div>
</template>

<script>
import Button from 'primevue/button';

export default {
    components:{Button},

    methods:{
        checkLogin(){
            this.$store.state.isLoggedIn=true
            this.$router.push({name:'Moduls'})
        }
    }


}
</script>

<style lang="scss" scoped>
.login-form{
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-bottom: 2rem;
    .p-button{     
        color:  #da7573;
        margin: 0.35rem 0;
        width: 30rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .p-button:hover{
        color: black
    }
}

</style>