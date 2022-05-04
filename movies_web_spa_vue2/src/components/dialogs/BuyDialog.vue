<template>
  <v-row justify="center">
    <v-dialog max-width="500" min-height="840" v-model="dialog" persistent>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          @click="buyNow"
          color="success"
          outlined
          v-bind="attrs"
          v-on="on"
        >
          Buy now
        </v-btn>
      </template>

      <v-card dark>
        <v-card-title
          class="
            d-flex
            children
            justify-center
            orange
            indigo--text
            text-h5
            pa-2
          "
        >
          BUY TICKET FOR MOVIE

          <v-icon class="indigo--text pl-6 ml-12  hidden-xs-only    " size="34">mdi-cart</v-icon>
        </v-card-title>

        <!-- movie title-->
        <v-card-text class="pl-2 my-1 pb-0 font-weight-bold title">
          {{ movieData.title }}
        </v-card-text>

        <!-- img  -->
        <div class="d-flex float-left">
          <v-img
            class="mx-1 mr-4"
            :src="movieData.imageUrl"
            max-height="200"
            :max-width="!$vuetify.breakpoint.xs ? 170 : 100"
          ></v-img>
        </div>

        <!-- buy ticket div  -->
        <div>
          <p>Available tickets: {{ movieData.tickets }}</p>
          <p>Mega discount: <strong>$</strong>{{ price }}</p>
          <p :v-model="watchTicketsPrice">
            Ticket price: <strong>$</strong>{{ watchTicketsPrice }}
          </p>
          <div sm-float-left>
            <span>Buy tickets: {{ ticketsCounter }} </span>

            <v-icon @click="btnDecreaseTickets" color="red" class="text-red"
              >mdi-minus-circle</v-icon
            >
            <v-icon
              @click="btnIncreaseTickets"
              color="green"
              class="text-red ml-1 mx-1"
              >mdi-plus-circle</v-icon
            >
          </div>
        </div>

        <!-- agree disagree-->
        <div class="my-12 pt-12 ml-1 body-2">
          <span class="teal--text">
            <v-icon color="teal">mdi-glass-cocktail</v-icon>
            The Ivy Sports Bar
          </span>

          <span class="orange--text mx-8">
            <v-icon color="orange">mdi-calendar-text</v-icon>
            {{ new Date().toDateString() }}
          </span>

          <span class="indigo--text body-2">
            <v-icon color="indigo">mdi-seat-recline-extra</v-icon>
            OPEN SEATING
          </span>
        </div>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :disabled="!ticketsCounter"
            text
            color="green"
            @click="btnAgree"
          >
            Agree
          </v-btn>

          <v-btn text color="red" @click="btnDisagree"> Disagree </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- dialog success message-->
    <v-dialog v-model="showMessageDialog" dark width="500" persistent>
      <v-card>
        <v-card-text>
          <p
            class="
              green--text
              body-1
              text-weight-bold text-center text-uppercase
              pt-10
            "
          >
            Success buy
            <span class="yellow--text"> {{ this.ticketsCounter }} </span>
            tickets for movie
            <span class="blue--text">{{ movieData.title }}</span
            >.
          </p>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import updateData from "@/service/updateData"
import {movies} from '@/service/loadAllMovies'

export default {
 
  data: () => ({
    dialog: false,
    movieData: [],
    price: (Math.random() * (22 - 3 + 1) + 3).toFixed(2),
    ticketsCounter: 0,
    currentTicketsCounter: 0,
    showMessageDialog: false,
  }),

  computed: {
    watchTicketsPrice() {
      let newPrice = (this.price * this.ticketsCounter).toFixed(2);
      return newPrice;
    },
  },
  
 
  methods: {
    buyNow(e) {
     const id = e.currentTarget.parentNode.offsetParent.id;
      this.movieData = movies.filter((x) => x.id == id)[0];
      this.currentTicketsCounter = this.movieData.tickets;
      
    },

    btnIncreaseTickets() {
      if (this.movieData.tickets > 0 && this.ticketsCounter < 50) {
        this.ticketsCounter++;
        this.movieData.tickets--;
      }
    },

    btnDecreaseTickets() {
      if (this.ticketsCounter > 0) {
        this.ticketsCounter--;
        this.movieData.tickets++;
      }
    },

    btnAgree() {
      updateData(this.movieData.id, this.movieData).then(() => {
        console.log("success");
        this.showMessageDialog = true;
        setTimeout(() => {
          setTimeout(() => (this.dialog = false), 300);
          this.showMessageDialog = false;
          this.ticketsCounter = 0;

           this.$router.push('home')
           setTimeout(() => { this.$router.push('movies') }, 100);
        }, 3000);
         
      });
    },

    btnDisagree() {
      this.dialog = false;
      this.ticketsCounter = 0;
      this.movieData.tickets = this.currentTicketsCounter;
    },
  },
 


};
</script>