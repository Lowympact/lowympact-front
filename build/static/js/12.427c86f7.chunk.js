(this.webpackJsonplowympact=this.webpackJsonplowympact||[]).push([[12],{344:function(e,t,n){"use strict";n.r(t);var s=n(13),a=n(17),r=n(15),c=n(14),i=n(0),o=n.n(i),l=n(2),u=n(1);var d=function(){return Object(u.jsx)("div",{children:"Me connecter"})},p=n(45),j=n(18),b=(n(9),n(76),n(16)),f=n(52),m=n.n(f),h=n(99);var O=function(e){Object(r.a)(n,e);var t=Object(c.a)(n);function n(e){var a;return Object(s.a)(this,n),(a=t.call(this,e)).handleSubmit=function(e){e.preventDefault();var t=a.state,n=function(e,t){var n=[];return 0===e.length&&n.push(Object(u.jsx)("p",{children:"Saissez votre adresse e-mail"})),0===t.length&&n.push(Object(u.jsx)("p",{children:"Saissez votre mot de passe"})),n}(t.email,t.password);a.setState({errors:n}),0===n.length&&a.Connect()},a.componentDidMount=function(){a.Verify()},a.Verify=function(){var e=!0,t=localStorage.getItem("token");if(t){var n=m.a.decode(t,{complete:!0}),s=new Date;n.payload.exp>=s.getTime()/1e3&&(e=!1)}!1===e&&a.setState({redirect:!0})},a.Connect=function(){fetch("https://api.lowympact.fr/api/v1/users/login",{method:"POST",headers:{"Content-Type":"application/json","api-key":"99d8fb95-abdd-4885-bf6c-3a81d8874043"},body:JSON.stringify({email:a.state.email,password:a.state.password})}).then((function(e){return e.json()})).then((function(e){if("No user found"===e.error){a.setState({loginSuccessful:!1});var t=a.state.errors;t.push(Object(u.jsx)("p",{children:"Utilisateur Inconnu"})),a.setState({errors:t})}else if("Incorrect password"!==e.error&&e.success)localStorage.setItem("token",e.token),localStorage.setItem("userId",e._id),a.setState({loginSuccessful:!0,redirect:!0});else{a.setState({loginSuccessful:!1});var n=a.state.errors;n.push(Object(u.jsx)("p",{children:"Mot de passe Incorrect"})),a.setState({errors:n})}}))},a.onPasswordChange=function(){a.setState({password:a.passwordInput.value,email:a.emailInput.value})},a.state={email:"",password:"",errors:[],redirect:!1,loginSuccessful:null},a}return Object(a.a)(n,[{key:"render",value:function(){var e=this;return this.state.redirect?Object(u.jsx)(l.a,{to:"/history"}):Object(u.jsxs)(o.a.Fragment,{children:[Object(u.jsx)(b.b,{to:"/login",children:Object(u.jsx)(j.a,{})}),Object(u.jsx)("div",{className:"logo-fruits",children:Object(u.jsx)("img",{src:p.a,className:"logo",alt:"Fruits"})}),Object(u.jsx)(b.b,{className:"back-button",to:"/login",children:"< Retour"}),Object(u.jsxs)("div",{className:"signin-container",children:[Object(u.jsxs)("form",{className:"forms",children:[Object(u.jsxs)("label",{children:["email",Object(u.jsx)("input",{className:"input-forms",value:this.state.email,onChange:this.onPasswordChange,ref:function(t){return e.emailInput=t},type:"email"})]}),Object(u.jsxs)("label",{children:["mot de passe",Object(u.jsx)("input",{className:"input-forms",value:this.state.password,onChange:this.onPasswordChange,ref:function(t){return e.passwordInput=t},type:"password"})]})]}),Object(u.jsx)("label",{className:"errors-signin",children:this.state.errors}),Object(u.jsx)("div",{className:"button-signin",onClick:this.handleSubmit,children:Object(u.jsx)(d,{})})]}),Object(u.jsx)(h.a,{})]})}}]),n}(i.Component);t.default=O},45:function(e,t,n){"use strict";t.a=n.p+"static/media/fruits-vegetables-basket-by-oblik-studio.7d5e1c64.svg"},55:function(e,t){},56:function(e,t){},57:function(e,t){},58:function(e,t){},60:function(e,t){},61:function(e,t){},62:function(e,t){},63:function(e,t){},64:function(e,t){},65:function(e,t){},66:function(e,t){},67:function(e,t){},76:function(e,t,n){},98:function(e,t,n){},99:function(e,t,n){"use strict";var s=n(49),a=n(0),r=n(150),c=n.n(r),i=function(e){var t=c()().toISOString();localStorage.setItem(e,t)};function o(e,t){var n=c()(function(e){return localStorage.getItem(e)}(e)),s=c()().diff(n,"days");return isNaN(s)||s>t}var l=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:30,n=Object(a.useState)(o(e,t)),r=Object(s.a)(n,2),c=r[0],l=r[1],u=function(){l(!1),i(e)};return[c,u]},u=function(){if(navigator.standalone)return!1;var e=window.navigator.userAgent,t=!!e.match(/iPad/i),n=!!e.match(/iPhone/i);return t||n},d=function(){var e=l("iosInstallPromptedAt"),t=Object(s.a)(e,2),n=t[0],a=t[1];return[u()&&n,a]},p=function(){var e=Object(a.useState)(),t=Object(s.a)(e,2),n=t[0],r=t[1],c=l("webInstallPromptedAt"),i=Object(s.a)(c,2),o=i[0],u=i[1];Object(a.useEffect)((function(){var e=function(e){e.preventDefault(),o&&(r(e),localStorage.setItem("installPrompt",e))};return window.addEventListener("beforeinstallprompt",e),function(){return window.removeEventListener("beforeinstallprompt",e)}}),[o]);return[n,function(){u(),r(null)},function(){prompt=localStorage.getItem("installPrompt"),prompt.prompt(),prompt.userChoice.then((function(e){"accepted"!==e.outcome&&u(),localStorage.getItem("installPrompt",null)}))}]},j=(n(98),n(1));t.a=function(){var e=d(),t=Object(s.a)(e,2),n=t[0],a=t[1],r=p(),c=Object(s.a)(r,3),i=c[0],o=c[1],l=c[2];return n||i?Object(j.jsx)("div",{className:"install-popup",children:Object(j.jsxs)("div",{className:"install-popup-wrapper",children:[Object(j.jsx)("img",{className:"mx-auto",style:{borderTopRightRadius:"50%",borderTopLeftRadius:"50%",backgroundColor:"#fff",marginTop:"-50px"},width:"100px",src:"pwa-512x512.png",alt:"Icon"}),Object(j.jsxs)("div",{children:[n&&Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)("div",{className:"text-center",children:Object(j.jsx)("h3",{children:"T\xe9l\xe9chargez l'application"})}),Object(j.jsxs)("div",{className:"text-center",children:["Cliquez sur ","  ",Object(j.jsx)("span",{className:"material-icons",children:"ios_share"}),"  ","puis \"Ajouter \xe0 l'\xe9cran d'accueil\""]}),Object(j.jsx)("div",{className:"button-dissmiss",children:Object(j.jsx)("button",{onClick:a,children:"Pas maintenant"})})]}),i&&Object(j.jsxs)(j.Fragment,{children:[Object(j.jsx)("div",{className:"text-center",children:Object(j.jsx)("h3",{children:"Ne passez plus \xe0 c\xf4t\xe9 des alternatives durables"})}),Object(j.jsxs)("div",{className:"android-wrapper",children:[Object(j.jsx)("button",{className:"install-button",onClick:l,children:"Installer l'application"}),Object(j.jsx)("button",{className:"dont-install-button",onClick:o,children:"Pas maintenant"})]})]})]})]})}):null}}}]);
//# sourceMappingURL=12.427c86f7.chunk.js.map