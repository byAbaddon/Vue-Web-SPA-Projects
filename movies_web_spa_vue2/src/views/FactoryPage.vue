     <!-- optional -->
<template>
  <div>
    <v-row class="" style="margin-top: -11px">
      <v-col cols="12" class="mx-auto">
        <v-tabs
          centered
     
          mobile-breakpoint
          v-model="tab" background-color="deep-purple darken-4" dark>
          <v-tabs-slider color="pink darken-1"></v-tabs-slider>
          
          <v-tab 
           class="yellow--text body-2 font-weight-bold">
            All-Movies
          </v-tab>
          <v-tab class="orange--text body-2 font-weight-bold">
            My-Movies
          </v-tab>
          <v-tab class="body-2 font-weight-bold"> Add-movie </v-tab>
          <v-tab class="green--text body-2 font-weight-bold"> Search </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          
          <!--all movies-->
          <v-tab-item>
            <movies-component>
                <v-row class="d-flex " >
                  <v-col cols="" class="">
                      <details-dialog />
                  </v-col>
                  <v-col cols="" class="text-center mx-0 px-0">
                     <!-- <edit-dialog />       //only admin -->   
                      <v-btn  outlined color="primary  mx-0 px-0  ">
                          <v-icon size="16" left class="pr-2 ma-0 " >mdi-lock</v-icon>
                        Edit
                      </v-btn>
                  </v-col>
                  <v-col cols="" class="" >
                     <!-- <delete-dialog /> -->
                       <v-btn  outlined color="red  mx-0 px-0  ">
                          <v-icon size="16" left >mdi-lock</v-icon>
                        Delete
                      </v-btn>
                  </v-col>
                    <span class="ml-8 pb-2 caption center-text"> Only administrators have rights to locked options!</span>
                   
                 
                </v-row>  
            </movies-component>
          </v-tab-item>

          <!--my movies-->
          <v-tab-item>
            
            <my-movies-component>
                <v-row class="d-flex" >
                  <v-col cols="" class="ml-3" >
                      <details-dialog />
                  </v-col>
                  <v-col cols="" class="text-center mx-0 px-0">
                     <edit-dialog />
                  </v-col>
                  <v-col cols="" class="mr-3" >
                     <delete-dialog />
                  </v-col>
                </v-row>  
            </my-movies-component>
          </v-tab-item>
                      
            <!--add new  movies-->
          <v-tab-item>
            <add-new-movie />
          </v-tab-item>

          <!--search  movies-->
          <v-tab-item class="ma-0 pa-0" style="background:#E8EAF6"  >
            <search-movie-component style="background:#E8EAF6">
                    <v-row class="d-flex" >
                  <v-col>
                      <details-dialog />
                  </v-col>
                  <v-col cols="" class="text-center">
                     <edit-dialog />
                  </v-col>
                  <v-col cols="">
                     <delete-dialog />
                  </v-col>
                </v-row>  
            </search-movie-component>
           </v-tab-item>

        </v-tabs-items>
      </v-col>
    </v-row>

    <!-- images-->
    <v-row>
     
      <v-col >
         <div class="text-center mx-auto" >
             <img
           class="text-center"
           position="center"
            :height="$vuetify.breakpoint.xs ? 120 : null"
            src="@/assets/images/factory images/factory1.png" alt="pic" />
         </div>
         

          <!-- <div class="d-flex justify-center" >
            <v-img
              src="@/assets/images/factory images/factory2.jpeg"
              max-height="500"
              max-width="1000"
            >
            </v-img>
          </div> -->

         
       
      </v-col>
    </v-row>
  </div>
</template>

   
<script>
import MoviesComponent from "@/components/MoviesComponent";
import MyMoviesComponent from "@/components/MyMoviesComponent";
import DetailsDialog from "@/components/dialogs/DetailsDialog";
import EditDialog from "@/components/dialogs/EditDialog";
import DeleteDialog from "@/components/dialogs/DeleteDialog";
import AddNewMovie from '@/components/dialogs/AddNewMovie'
import SearchMovieComponent from '@/components/SearchMovieComponent'

export default {
  components: { MoviesComponent, MyMoviesComponent, DetailsDialog, EditDialog, DeleteDialog, AddNewMovie, SearchMovieComponent },
  data: () => ({
    show: true,
    tab: null,
         items: [
        { title: 'Action' },
        { title: 'Drama' },
        { title: 'Crime' },
        { title: 'Horror' },
      ],
  }),

  methods: {
  },
};
</script>


