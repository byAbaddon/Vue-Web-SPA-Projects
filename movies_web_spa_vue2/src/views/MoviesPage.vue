<template>
  <movies-component>
    <v-row class="d-flex align-center mb-2">
      <v-col class="ml-5">
        <buy-dialog /> 
      </v-col>
      <v-col>
         <details-dialog />
      </v-col>
    </v-row>
    
   
  </movies-component>
</template>


<script>
import MoviesComponent from "@/components/MoviesComponent";
import BuyDialog from "@/components/dialogs/BuyDialog";
import DetailsDialog from "@/components/dialogs/DetailsDialog";

export default {
  components: {
    MoviesComponent,
    BuyDialog,
    DetailsDialog,
  },

  data: () => ({}),
};
</script>





    








  



