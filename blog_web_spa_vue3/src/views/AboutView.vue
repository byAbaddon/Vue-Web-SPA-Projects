<template>
<div class="main">
    <div class="pictures">
      <img src="@/assets/images/about/0.png">
      <img src="@/assets/images/about/1.png">
      <img src="@/assets/images/about/2.png">
      <img src="@/assets/images/about/3.png">
    </div>
    
   <div class="before-footer">
       <h2>Get connected with us on social networks!</h2>
    </div> 
   <div class="footer">
    <a href="#" class="fa fa-facebook"></a>
    <a href="#" class="fa fa-twitter"></a>
    <a href="#" class="fa fa-google"></a>
    <a href="#" class="fa fa-linkedin"></a>
    <a href="#" class="fa fa-youtube"></a>
    <a href="#" class="fa fa-instagram"></a>
    <a href="#" class="fa fa-pinterest"></a>
    <a href="#" class="fa fa-snapchat-ghost"></a>
    <a href="#" class="fa fa-skype"></a>
    <a href="#" class="fa fa-android"></a>
    <a href="#" class="fa fa-dribbble"></a>
    <a href="#" class="fa fa-vimeo"></a>
    <a href="#" class="fa fa-tumblr"></a>
    <a href="#" class="fa fa-vine"></a>
    <a href="#" class="fa fa-foursquare"></a>
    <a href="#" class="fa fa-stumbleupon"></a>
    <a href="#" class="fa fa-flickr"></a>
    <a href="#" class="fa fa-yahoo"></a>
    <a href="#" class="fa fa-reddit"></a>
    <a href="#" class="fa fa-rss"></a>
   </div>
  </div>
</template>


<style scoped>
.main{
  margin-top: 3em;
}

img{
  height: 40em;
  width: 60em;
  margin: 0 auto;
}

.pictures{
  display: flex;
  flex-direction: column;
}


.footer {
  background-color: #201d1d;
  display: flex;
  justify-content: space-evenly;
  padding-bottom: 4em;
 
}

.before-footer h2{
  background-color: #201d1d;
  color: white;
  margin-bottom: 0;
  padding: 1.4em;
  padding-left:2.2em;
}



.fa {
  padding: 10px;
  font-size: 20px;
  width: 20px;
  text-align: center;
  text-decoration: none;
  margin: 5px 2px;
  border-radius: 50%;
}

.fa:hover {
    opacity: 0.7;
}

.fa-facebook {
  background: #3B5998;
  color: white;
}

.fa-twitter {
  background: #55ACEE;
  color: white;
}

.fa-google {
  background: #dd4b39;
  color: white;
}

.fa-linkedin {
  background: #007bb5;
  color: white;
}

.fa-youtube {
  background: #bb0000;
  color: white;
}

.fa-instagram {
  background: #125688;
  color: white;
}

.fa-pinterest {
  background: #cb2027;
  color: white;
}

.fa-snapchat-ghost {
  background: #fffc00;
  color: white;
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
}

.fa-skype {
  background: #00aff0;
  color: white;
}

.fa-android {
  background: #a4c639;
  color: white;
}

.fa-dribbble {
  background: #ea4c89;
  color: white;
}

.fa-vimeo {
  background: #45bbff;
  color: white;
}

.fa-tumblr {
  background: #2c4762;
  color: white;
}

.fa-vine {
  background: #00b489;
  color: white;
}

.fa-foursquare {
  background: #45bbff;
  color: white;
}

.fa-stumbleupon {
  background: #eb4924;
  color: white;
}

.fa-flickr {
  background: #f40083;
  color: white;
}

.fa-yahoo {
  background: #430297;
  color: white;
}

.fa-soundcloud {
  background: #ff5500;
  color: white;
}

.fa-reddit {
  background: #ff5700;
  color: white;
}

.fa-rss {
  background: #ff6600;
  color: white;
}
</style>