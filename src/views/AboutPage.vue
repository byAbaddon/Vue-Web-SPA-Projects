<template>
<div>
  <v-row>
    <v-col
      v-for="n in 9"
      :key="n"
      class="d-flex child-flex"
      cols="4"
    >
      <v-img
        :src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
        :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
        aspect-ratio="1"
        cover
        class="bg-grey-lighten-2"
      >
        <template v-slot:placeholder>
          <v-row
            class="fill-height ma-0"
            align="center"
            justify="center"
          >
            <v-progress-circular
              indeterminate
              color="grey-lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
    </v-col>
  </v-row>

  <div>
    <v-card class="bg-red">
      <v-responsive :aspect-ratio="16/9">
      <v-img src="../assets/images/background/loginUser.jpeg"></v-img>
     
        <v-card-text>
          This card will always be 16:9 (unless you put more stuff in it)
        </v-card-text>
      </v-responsive>
    </v-card>
     <v-sheet
       
            class="mx-auto"
            height="1000"
            width="10"
          ></v-sheet>
  </div>
    <v-divider inset></v-divider>
    </div>
</template>

<script>
  export default {
    data: () => ({ }),

  }
</script>

<style>

</style>
