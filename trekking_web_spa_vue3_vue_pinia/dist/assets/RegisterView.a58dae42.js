import{v as k,b as x,x as f,o as R,r as E,f as v,g as y,i as r,j as _,w as m,e as u,y as A,n as B,z as S,A as N,k as T,B as p,C as V,t as q}from"./index.a0b5c28b.js";import{c as C,g as U,u as L}from"./index-90ebcfae.7c188b35.js";import{V as I}from"./VAlert.87e711d4.js";const M=async(c,d)=>C(U(),c,d).then(s=>{const{uid:o,email:e}=s.user;return console.log("You register was successful",o,e),localStorage.setItem("auth",JSON.stringify({uid:o,email:e})),"success"}).catch(s=>{const o=s.code,e=s.message;return console.log("Error register: ",o," - ",e),s.message}),F=async(c,d)=>{const s=U();await L(s.currentUser,{displayName:c,photoURL:d}).then(()=>(console.log("Success update profile"),"Success update profile")).catch(o=>o)},j=["onSubmit"],z=p("mdi-window-close"),J=T('<div class="text-center mb-4"><h1 class="h3 mb-3 font-weight-normal">Register</h1><p>Join our family and make a wish!</p></div><div class="form-label-group"><input type="text" id="inputUsername" name="inputUsername" class="form-control" placeholder="Username" required autofocus maxlength="20"><label for="inputUsername"></label></div><div class="form-label-group"><input type="text" id="inputPhotoURL" name="photoURL" class="form-control" placeholder="PhotoURL  https://  Not required" autofocus><label for="inputPhotoURL"></label></div><div class="form-label-group"><input type="email" id="inputEmail" name="email" class="form-control" placeholder="Email" autofocus required><label for="inputEmail"></label></div><div class="form-label-group"><input type="password" id="inputPassword" name="password" class="form-control" placeholder="Password" required minlength="6"><label for="inputPassword"></label></div><div class="form-label-group"><input type="password" id="inputRePassword" name="rePassword" class="form-control" placeholder="Re-Password" required minlength="6"><label for="inputRePassword"></label></div>',6),Z={key:0,class:"btn btn-lg btn-dark btn-block",type:"submit"},D=r("p",null,"Sign Up",-1),O=[D],W={class:"text-center mb-4"},Y={class:"alreadyUser"},G=p(" Already have account? Then just "),$=r("a",{href:"#"},"Sign-In",-1),H=p("! "),K=r("p",{class:"mt-5 mb-3 text-muted text-center"},"\xA9 The Trekking Zone - 2022.",-1),te={__name:"RegisterView",setup(c){const{mobile:d,name:s}=k(),o=x();let e=f(!0),l=f(""),n=f("");R(()=>{setTimeout(()=>{const t=document.getElementById("registerForm");t!=null&&t.reset()},500)});const P=t=>{const i=t.target[1].value;let a=t.target[2].value||"../assets/images/user.png";const g=t.target[3].value,h=t.target[4].value,b=t.target[5].value;return console.log(i,a,g,h,b),/.+@.+\..+/.test(a)||(a="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCvPW4n2sq5EZhgjLF3U0iEZAMfkAE-J0nOA&usqp=CAUo"),console.log("done",a),h!=b?(e.value=!1,l.value="error",n.value="Error - Password not match!",setTimeout(()=>{e.value=!0,t.target[3].value=t.target[4].value=""},2e3)):M(g,h).then(w=>{w=="success"?(F(i,a),e.value=!1,l.value="success",n.value="You register success and will be redirect...",setTimeout(()=>{document.getElementById("registerForm").reset(),o.push("/login")},2e3)):(e.value=!1,l.value="error",n.value=w,setTimeout(()=>e.value=!0,3e3))}),{messageAlert:n,typeMessage:l,showBtn:e}};return(t,i)=>{const a=E("router-link");return v(),y("div",{style:{width:"80%","min-width":"20em",margin:"0 auto","margin-top":"1em","margin-bottom":"2em"},class:N(u(s)=="xs"?"w-100":"w-80")},[r("form",{id:"registerForm",onSubmit:S(P,["prevent"])},[_(A,{class:"float-end",variant:"text",onClick:i[0]||(i[0]=g=>u(o).push("/"))},{default:m(()=>[_(V,{color:"red",size:"30"},{default:m(()=>[z]),_:1})]),_:1}),J,r("div",null,[u(e)?(v(),y("button",Z,O)):(v(),B(I,{key:1,type:u(l)},{default:m(()=>[p(q(u(n)),1)]),_:1},8,["type"]))]),r("div",W,[r("p",Y,[G,_(a,{to:"/login"},{default:m(()=>[$,H]),_:1})])]),K],40,j)],2)}}};export{te as default};