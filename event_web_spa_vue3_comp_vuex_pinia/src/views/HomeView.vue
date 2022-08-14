<template>
<v-row :style=" name == 'xl' ? 'display : block' : name == 'xs' ? 'display: flex' : 'display: block'">
  <div class="home">
   
    <!-- text -->
     <v-col cols="3" sm="12" >
        <div class="text">
      <h3 class="text-teal">The events that will blow your mind!</h3>
      <p class="text-white">Join our community.</p>
      <p class="text-yellow-darken-4" style="padding-left: 5%">
        Organizie an event.
      </p>
      <p class="text-blue" style="padding-left: 5%">
        Gathered as many people as possible for one purpose.
      </p>
      <p class="text-lime-darken-1" style="padding-left: 15%">Learn!</p>
      <p class="text-blue-grey-darken-1" style="padding-left: 20%">Share!</p>
      <p class="text-deep-orange-accent-4 pb-12" style="padding-left: 25%">
        Enjoy the life!
      </p>
        </div>
     </v-col>
   
    <!--   carousel  -->
    <v-col  cols="3" sm="12"   >
       <div >
      <v-card elevation="24" max-width="500" :class="mobile ? 'mt-11 ml-1' : 'mt-11 ml-12'">
        <v-carousel
          :height="mobile ? 210 : 246"
          cycle
          :continuous="false"
          :show-arrows="false"
          hide-delimiters
        >
          <v-carousel-item v-for="i in 13" :key="i">
            <v-sheet>
              <div class="d-flex fill-height justify-center align-center">
                <v-img cover :src="require(`@/assets/slides/${i}.jpg`)"></v-img>
              </div>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </v-card>
       </div>
    </v-col>

    <!--   logo image   -->
    <v-col>
        <div>
      <img v-show="!mobile"
        :src="require('../assets/images/events.png')"
        class="event-image"
        alt="image"
      />
        </div>  
   </v-col>

   <!--text effect -->
   <v-col>
      <h1 :style="mobile ? 'font-size: 22px; float: left' : null" >Discover more Special Events...</h1>
   </v-col>

    <!--  section text  --> 
    <v-col cols="3" sm="12" >
      <div class="second_text text-white ">

      <section class="pa-1 mb-1">
          <h2 class="text-green text-center ma-8 pt-4">Accents:</h2>
       
        <article :style=" name == 'xs' ? 'width: 24em; margin: 0; text-align: justify;': null">
          <h3 class="ml-3 text-grey text-decoration-underline">Bury Tomorrow try to break a world record</h3>
          <p  class="ml-3"  style="width: 100%">
            There are two thankless jobs at Download – the foot masseurs in the RIP area, and the security team who have to deal with all the crowd surfers. After trying to start the world’s biggest circle pit, then the world’s biggest wall of death, south coast metalcore band Bury Tomorrow went for a record in “most people over the barrier”. The look on the steward’s faces was almost as priceless as the joy on lead singer Daniel Winter-Bates’ when dozens of metalheads started riding the crowd during ‘Black Flame’. PB
          </p>
        </article>

        <article class="mt-6" :style=" name == 'xs' ? 'width: 24em; margin: 0; text-align: justify;': null">
          <h3 class="ml-3 text-grey  text-decoration-underline">Skindred's “Newport Helicopter”</h3>
          <p class="ml-3">
            It’s always a given at a Skindred gig, but the sight of tens of thousands of people whirling their shirts above their heads at the same time is pretty special. Named in honour of their Welsh hometown, Benji Webbe summoned the Newport Helicopter halfway through his mainstage set on Friday afternoon, but the crowd carried on doing it throughout anyway. PB
          </p>
        </article>

        <article class="mt-6" :style=" name == 'xs' ? 'width: 24em; margin: 0; text-align: justify;': null">
          <h3 class="ml-3 text-grey text-decoration-underline">Frank Carter is Frank Carter</h3>
          <p class="ml-3">
          “Trust me, this will be a lot easier if you let me walk on your shoulders” laughs Frank Carter, somewhere in the middle of the crowd as he attempts to walk (not surf) his way around the heads of the audience. Holding a moment’s silence (“for all the other bands we’ve just killed”), starting a female only circle (“if you’re a cis man, get the f**k out the way”), the highlight comes when he Facetime’s his mum on stage, gets everyone to wave hello, and then props her up by the drumkit for the rest of the set. PB
          </p>
        </article>

         <article class="mt-6" :style=" name == 'xs' ? 'width: 24em; margin: 0; text-align: justify;': null">
          <h3 class="ml-3 text-grey text-decoration-underline">Paul Stanley learns to fly </h3>
          <p class="ml-3">
            Kiss know how to put on a show. Everyone else on the mainstage let off a few fireworks and Kiss came along with fire-breathing panthers, exploding UFOs and Gene Simmons spitting blood from a platform 30ft in the air. Saving their best gimmick for the end of their very last ever UK performance, Paul Stanley mounted a zipwire from the stage and flew over the crowd to play ‘I Was Made For Loving You’ on top of the sound deck. What better way to end your own retirement party? 
          </p>
        </article>

          <article class="mt-6" :style=" name == 'xs' ? 'width: 24em; margin: 0; text-align: justify;': null">
          <h3 class="ml-3 text-grey text-decoration-underline">Bruce Dickson wields a flamethrower</h3>
          <p class="ml-3">
            Not to be outdone by their old rivals, Iron Maiden brought the full circus of their Legacy Of The Beast tour to Download on Saturday night – with Bruce Dickinson bouncing off the walls firing two flamethrowers during ‘Flight Of Icarus’. The giant inflatable Satan head and life-sized flying Spitfire were arguably more impressive later on in the Maiden set, but Dickinson’s mad energy paid off like the biggest special effect of the whole festival (especially when he was shooting jets of fire out of his arms). 
          </p>
        </article>

          <article class="mt-6" :style=" name == 'xs' ? 'width: 24em; margin: 0; text-align: justify;': null">
          <h3 class="ml-3 text-grey text-decoration-underline">Rise Against take a stance</h3>
          <p class="ml-3">
            Anyone who’s ever seen Chicago punks Rise Against live will know the band are fiercely political. Kicking off their set with ‘Prayer Of The Refugee’ off their 2006 record The Sufferer & The Witness was particularly poignant on what frontman Tim McIlrath dubbed “Political Sunday”. His wielding megaphone shined as a symbol of the solidarity that can be felt throughout the band’s set. “We sing songs about revolution. There is no racism in revolution.” He proclaims, and it seemed by the end of their set Download had gained a renewed sense of fighting for what’s right. ML
          </p>
        </article>

          <article class="mt-6" :style=" name == 'xs' ? 'width: 24em; margin: 0; text-align: justify;': null">
          <h3 class="ml-3 text-grey text-decoration-underline">Mastodon drown out Deftones</h3>
          <p class="ml-3">
            An ugly clash was mostly avoided on the two main stages for the subs on Saturday night, with a longer running Deftones set overlapping Mastodon for long enough for most fans to catch both. For a time though, two of the loudest bands in the world were competing for the same airspace, with each easily deafening the other depending on where you stood. Mastodon’s bruising set (opening with ‘Pain With An Anchor’, ending on ‘Blood And Thunder’) held up perfectly next to the Californians playing around the corner (the shift from ‘Change’ to ‘Ohms’ was perfect), and Chino Moreno even found time for a shout out
          </p>
        </article>

          <article class="mt-6" :style=" name == 'xs' ? 'width: 24em; margin: 0; text-align: justify;': null">
          <h3 class="ml-3 text-grey text-decoration-underline">RuPaul’s Drag Race goes rock</h3>
          <p class="ml-3">
            Season 2 contestant Bimini brought her stunning live show to Download on Sunday afternoon. Her first ever festival performance, she had many fans calling for more drag acts at Download 2023 by the end of her set. Dressed in gorgeous pearls and a black dress with Princess Diana adorned on her chest, Bimini and her all-queer band delivered original songs and iconic covers of Britney Spears, Soft Cell and more. One of the many acts over the weekend to showcase a more inclusive scene, Bimini set the bar high for drag acts at festivals. ML
          </p>
        </article>

       <!--  article pics  -->        
       <v-col >
          <article v-for="(i) in 3" :key="i">
          <v-img 
           v-show=" !mobile"  
           :width="`${name == 'lg' ? '1300' : name == 'xl' ? '2600' : null}`"
           
           
      
          :src="require(`@/assets/homePageImages/wow${i}.jpg`)" >{{i}}</v-img>
        </article>
       </v-col>

      </section>
      </div>
    </v-col>

    </div>
  </v-row>
</template>


<script setup >
import { useDisplay } from 'vuetify'

  //scroll automatic to Top page
  scroll(0, 0)
const { mobile, name } = useDisplay()

</script>




<style scoped >

@import url('https://fonts.googleapis.com/css?family=Cairo');
body {
	background-color: #010;
}

.title {
	font-family: "Cairo";
	text-align: center;
	color: #FFF;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
	letter-spacing: 1px;
	line-height:2
}

h1 {
	background-image: url(https://media.giphy.com/media/26BROrSHlmyzzHf3i/giphy.gif);
	background-size: cover;
	color: transparent;
	-moz-background-clip: text;
	-webkit-background-clip: text;
	text-transform: uppercase;
	font-size: 70px;
	margin: 1em; 
  text-align: center;
}
/* styling my button */

.white-mode {
	text-decoration: none;
	padding: 7px 10px;
	background-color: #122;
	border-radius: 3px;
	color: #FFF;
	transition: .35s ease-in-out;
	position: absolute;
	left: 15px;
	bottom: 15px;
	font-family: "Montserrat";
}

.white-mode:hover {
	background-color: #FFF;
	color: #122;
}




section{
  background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(4,4,5,0.8001401244091386) 48%, rgba(0,0,0,1) 100%); 
  margin-top: 13em;
  
}

article{
  width: 110em;
  text-align: center;
  margin: 0 auto;
}

article h3{
  text-align: left;
  margin:0.3em;
}

article p{
  /* text-justify: auto; */
  text-align: start;
}


.home {
  height: 100%;
  widows: 100%;

  background: linear-gradient(
      to bottom,
      rgba(0, 0, 30, 100),
      rgba(179, 165, 165, 0)
    ),
    url("@/assets/images/cover2.jpeg");
  background-repeat: no-repeat;
  /* background-size: cover; */
  background-size: contain;
  /* background-position-x: center; */
  animation-name: backgroundEffect;
  animation-delay: 5s;
  animation-duration: 20s;
  /* animation-iteration-count: infinite; */
}

@keyframes backgroundEffect {
  0% {
    background-blend-mode: saturation;
  }
  5% {
    background-blend-mode: unset;
  }
  15% {
    background-blend-mode: saturation;
  }
  25% {
    background-blend-mode: unset;
  }
  35% {
    background-blend-mode: saturation;
  }
  75% {
    background-blend-mode: unset;
  }
  100% {
    background-blend-mode: saturation;
  }
}

.text {
  font-family: "Shojumaru-Regular", serif;
  font-size: 48px;
  /* text-shadow: 2px 2px 2px rgb(223, 222, 222); */
  margin-left: 2em;
  font-weight: bold;
  font-size: x-large;
}

.event-image {
  display: flex;
  float: right;
  margin: -32em auto;
  text-align: center;
  width: 40em;
  animation-name: example;
  animation-duration: 6s;
  animation-iteration-count: infinite;
}

@keyframes example {
  0% {
    transform: scale(1, 1);
  }
  25% {
    transform: scale(1.1, 1.1);
  }
  50% {
    transform: scale(1.1, 1.1);
  }
  75% {
    transform: scale(1.1, 1.1);
  }
  100% {
    transform: scale(1, 1);
  }
}
</style>

 
