<template>
    <div v-show="showDialog" class="header-modal" >
      <!-- Modal content -->
      <div class="modal">
       <edit-component />        
      </div>
    </div>
</template>

<script>

import emitter from 'tiny-emitter/instance'
import EditComponent from '../EditComponent.vue';

export default {
  components: { EditComponent },
  props: ["allPosts"],

  data: () => ({
    message: 'Edit post?',
    showDialog: false,
  }),

  mounted(){
    emitter.on('on-edit', (currentPostId) => {
         this.showDialog = !this.showDialog
         let postData = this.allPosts.filter((x) => x.id == currentPostId)[0];
          emitter.emit('postData', postData ) 
     })

    emitter.on('exit',() =>  this.showDialog = false )    
  }

};
</script>




