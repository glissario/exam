<template>
<div class="content-wrapper">
    <TreeSelect 
        @change="changeRoute"
        v-model="selectedModule" 
        :options="nodes" 
        placeholder="Wähle ein Modul"/>

    <router-view/>


</div>


</template>

<script>

import TreeSelect from 'primevue/treeselect';
import moduls from "./modulePlan.json"

export default {
    component:{TreeSelect},
    data(){
        return{
            selectedModule: null,
            semester:null,
            nodes:null,
            moduls
        }
    },
    computed:{
        actualModule(){
        return this.$store.state.actualModule
        },
        actualSemester(){
        return this.$store.state.actualSemester
        }

    },

    mounted() {  
        this.nodes = this.moduls.root
    },
    watcher:{

    },
    methods:{
        changeRoute(){
 
            this.$store.state.actualSemester = this.filteredSemester()
            if (this.$store.state.actualSemester !=null && this.$store.state.actualSemester.key.length>5) {
                this.$router.push({name:'SemesterOverview'})
            }
            else{
                for (let i=0; i<this.nodes.length; i++){
                    if(this.nodes[i].children.length>0){
                        for (let j=0; j<this.nodes[i].children.length; j++){
                            if (Object.keys(this.selectedModule)[0].toString() == this.nodes[i].children[j].key.toString()){
                                this.$store.state.actualModule = this.nodes[i].children[j]
                                this.$router.push({name:'QuestionOverview'})
                                return
                        }
                    }
                }
            }
        }
        },
        filteredSemester(){         
            
            if (this.selectedModule!==null){
                this.semester=this.nodes.find(node=>{
                    return node.key == Object.keys(this.selectedModule)[0].toString()
                })
                return this.semester
            }
            else{
                return null
            }
        },
    }

}
</script>

<style>

.content-wrapper{
    min-height: 10rem;
}

</style>