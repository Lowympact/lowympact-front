(this.webpackJsonplowympact=this.webpackJsonplowympact||[]).push([[17],{138:function(t,e,r){var n=function(t){"use strict";var e,r=Object.prototype,n=r.hasOwnProperty,a="function"===typeof Symbol?Symbol:{},o=a.iterator||"@@iterator",i=a.asyncIterator||"@@asyncIterator",s=a.toStringTag||"@@toStringTag";function c(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{c({},"")}catch(I){c=function(t,e,r){return t[e]=r}}function u(t,e,r,n){var a=e&&e.prototype instanceof v?e:v,o=Object.create(a.prototype),i=new k(n||[]);return o._invoke=function(t,e,r){var n=h;return function(a,o){if(n===p)throw new Error("Generator is already running");if(n===d){if("throw"===a)throw o;return _()}for(r.method=a,r.arg=o;;){var i=r.delegate;if(i){var s=L(i,r);if(s){if(s===m)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===h)throw n=d,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=p;var c=l(t,e,r);if("normal"===c.type){if(n=r.done?d:f,c.arg===m)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n=d,r.method="throw",r.arg=c.arg)}}}(t,r,i),o}function l(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(I){return{type:"throw",arg:I}}}t.wrap=u;var h="suspendedStart",f="suspendedYield",p="executing",d="completed",m={};function v(){}function b(){}function g(){}var y={};y[o]=function(){return this};var j=Object.getPrototypeOf,w=j&&j(j(P([])));w&&w!==r&&n.call(w,o)&&(y=w);var x=g.prototype=v.prototype=Object.create(y);function O(t){["next","throw","return"].forEach((function(e){c(t,e,(function(t){return this._invoke(e,t)}))}))}function N(t,e){function r(a,o,i,s){var c=l(t[a],t,o);if("throw"!==c.type){var u=c.arg,h=u.value;return h&&"object"===typeof h&&n.call(h,"__await")?e.resolve(h.__await).then((function(t){r("next",t,i,s)}),(function(t){r("throw",t,i,s)})):e.resolve(h).then((function(t){u.value=t,i(u)}),(function(t){return r("throw",t,i,s)}))}s(c.arg)}var a;this._invoke=function(t,n){function o(){return new e((function(e,a){r(t,n,e,a)}))}return a=a?a.then(o,o):o()}}function L(t,r){var n=t.iterator[r.method];if(n===e){if(r.delegate=null,"throw"===r.method){if(t.iterator.return&&(r.method="return",r.arg=e,L(t,r),"throw"===r.method))return m;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return m}var a=l(n,t.iterator,r.arg);if("throw"===a.type)return r.method="throw",r.arg=a.arg,r.delegate=null,m;var o=a.arg;return o?o.done?(r[t.resultName]=o.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,m):o:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,m)}function E(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function S(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function k(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(E,this),this.reset(!0)}function P(t){if(t){var r=t[o];if(r)return r.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var a=-1,i=function r(){for(;++a<t.length;)if(n.call(t,a))return r.value=t[a],r.done=!1,r;return r.value=e,r.done=!0,r};return i.next=i}}return{next:_}}function _(){return{value:e,done:!0}}return b.prototype=x.constructor=g,g.constructor=b,b.displayName=c(g,s,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===b||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,g):(t.__proto__=g,c(t,s,"GeneratorFunction")),t.prototype=Object.create(x),t},t.awrap=function(t){return{__await:t}},O(N.prototype),N.prototype[i]=function(){return this},t.AsyncIterator=N,t.async=function(e,r,n,a,o){void 0===o&&(o=Promise);var i=new N(u(e,r,n,a),o);return t.isGeneratorFunction(r)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},O(x),c(x,s,"Generator"),x[o]=function(){return this},x.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=P,k.prototype={constructor:k,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(S),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function a(n,a){return s.type="throw",s.arg=t,r.next=n,a&&(r.method="next",r.arg=e),!!a}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],s=i.completion;if("root"===i.tryLoc)return a("end");if(i.tryLoc<=this.prev){var c=n.call(i,"catchLoc"),u=n.call(i,"finallyLoc");if(c&&u){if(this.prev<i.catchLoc)return a(i.catchLoc,!0);if(this.prev<i.finallyLoc)return a(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return a(i.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return a(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var a=this.tryEntries[r];if(a.tryLoc<=this.prev&&n.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var o=a;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=t,i.arg=e,o?(this.method="next",this.next=o.finallyLoc,m):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),m},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),S(r),m}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var a=n.arg;S(r)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:P(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),m}},t}(t.exports);try{regeneratorRuntime=n}catch(a){Function("r","regeneratorRuntime = r")(n)}},343:function(t,e,r){"use strict";r.r(e),r.d(e,"validEmail",(function(){return y}));var n=r(43),a=r.n(n),o=r(44),i=r(13),s=r(17),c=r(15),u=r(14),l=r(0),h=r.n(l),f=r(2),p=r(1);var d=function(){return Object(p.jsx)("div",{children:"Cr\xe9er mon compte"})},m=r(45),v=r(18),b=(r(76),r(16)),g=r(99),y=new RegExp("^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"),j=function(t){Object(c.a)(r,t);var e=Object(u.a)(r);function r(){var t;Object(i.a)(this,r);for(var n=arguments.length,s=new Array(n),c=0;c<n;c++)s[c]=arguments[c];return(t=e.call.apply(e,[this].concat(s))).state={userName:"",email:"",password:"",confirmPassword:"",errors:[],redirect:!1,submit:!1},t.signUser=Object(o.a)(a.a.mark((function e(){var r;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://api.lowympact.fr/api/v1/users/",{method:"post",credentials:"include",headers:new Headers({"api-key":"99d8fb95-abdd-4885-bf6c-3a81d8874043","Content-Type":"application/json"}),body:JSON.stringify({username:t.state.userName,email:t.state.email,password:t.state.password})}).then((function(t){return t.json()})).then((function(e){var r=[];return e.success?(localStorage.setItem("token",e.token),localStorage.setItem("userId",e._id),t.props.history.push("/history")):r.push("Il y a d\xe9j\xe0 un compte avec ce mail ou une erreur r\xe9seau."),t.setState({errors:r}),r}));case 2:return r=e.sent,e.abrupt("return",r);case 4:case"end":return e.stop()}}),e)}))),t.handleSubmit=function(){var e=Object(o.a)(a.a.mark((function e(r){var n;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r.preventDefault(),0!==(n=t.validate()).length){e.next=6;break}return e.next=5,t.signUser();case 5:n=e.sent;case 6:0===n.length&&t.setState({redirect:!0});case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),t.displayErrors=function(){h.a.Fragment;return t.state.errors.map((function(t){return Object(p.jsx)("p",{children:t})}))},t}return Object(s.a)(r,[{key:"validate",value:function(){var t=[];return 0===this.state.userName.length&&t.push("Saissez votre nom"),0===this.state.email.length&&t.push("Saissez votre adresse e-mail"),!1===y.test(this.state.email)&&t.push("Saissez une adresse e-mail valide"),this.state.password.length<6&&t.push("Entre un mot de passe. 6 car\xe0cteres minimum requis"),this.state.password!==this.state.confirmPassword&&t.push("Les mots de passe ne correspondent pas"),this.setState({errors:t}),t}},{key:"render",value:function(){var t=this;return this.state.redirect?Object(p.jsx)(f.a,{to:"/history"}):Object(p.jsxs)(h.a.Fragment,{children:[Object(p.jsx)(b.b,{to:"/login",children:Object(p.jsx)(v.a,{})}),Object(p.jsx)("div",{className:"logo-fruits",children:Object(p.jsx)("img",{src:m.a,className:"logo",alt:"Fruits"})}),Object(p.jsx)(b.b,{className:"back-button",to:"/login",children:"< Retour"}),Object(p.jsxs)("div",{className:"signup-container",children:[Object(p.jsxs)("form",{className:"forms",children:[Object(p.jsxs)("label",{children:["nom",Object(p.jsx)("input",{className:"input-forms",value:this.state.userName,onChange:function(e){return t.setState({userName:e.target.value})},type:"text"})]}),Object(p.jsxs)("label",{children:["email",Object(p.jsx)("input",{className:"input-forms",value:this.state.email,onChange:function(e){return t.setState({email:e.target.value})},type:"email"})]}),Object(p.jsxs)("label",{children:["mot de passe",Object(p.jsx)("input",{className:"input-forms",value:this.state.password,onChange:function(e){return t.setState({password:e.target.value})},type:"password"})]}),Object(p.jsxs)("label",{children:["confirmer mot de passe",Object(p.jsx)("input",{className:"input-forms",value:this.state.passwordConfirm,onChange:function(e){return t.setState({confirmPassword:e.target.value})},type:"password"})]})]}),Object(p.jsx)("label",{className:"errors-signup",children:this.displayErrors()}),Object(p.jsx)("div",{className:"button-signup",onClick:this.handleSubmit,children:Object(p.jsx)(d,{})})]}),Object(p.jsx)(g.a,{})]})}}]),r}(l.Component);e.default=j},43:function(t,e,r){t.exports=r(138)},44:function(t,e,r){"use strict";function n(t,e,r,n,a,o,i){try{var s=t[o](i),c=s.value}catch(u){return void r(u)}s.done?e(c):Promise.resolve(c).then(n,a)}function a(t){return function(){var e=this,r=arguments;return new Promise((function(a,o){var i=t.apply(e,r);function s(t){n(i,a,o,s,c,"next",t)}function c(t){n(i,a,o,s,c,"throw",t)}s(void 0)}))}}r.d(e,"a",(function(){return a}))},45:function(t,e,r){"use strict";e.a=r.p+"static/media/fruits-vegetables-basket-by-oblik-studio.7d5e1c64.svg"},53:function(t,e){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),t.webpackPolyfill=1),t}},76:function(t,e,r){},98:function(t,e,r){},99:function(t,e,r){"use strict";var n=r(49),a=r(0),o=r(150),i=r.n(o),s=function(t){var e=i()().toISOString();localStorage.setItem(t,e)};function c(t,e){var r=i()(function(t){return localStorage.getItem(t)}(t)),n=i()().diff(r,"days");return isNaN(n)||n>e}var u=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:30,r=Object(a.useState)(c(t,e)),o=Object(n.a)(r,2),i=o[0],u=o[1],l=function(){u(!1),s(t)};return[i,l]},l=function(){if(navigator.standalone)return!1;var t=window.navigator.userAgent,e=!!t.match(/iPad/i),r=!!t.match(/iPhone/i);return e||r},h=function(){var t=u("iosInstallPromptedAt"),e=Object(n.a)(t,2),r=e[0],a=e[1];return[l()&&r,a]},f=function(){var t=Object(a.useState)(),e=Object(n.a)(t,2),r=e[0],o=e[1],i=u("webInstallPromptedAt"),s=Object(n.a)(i,2),c=s[0],l=s[1];Object(a.useEffect)((function(){var t=function(t){t.preventDefault(),c&&(o(t),localStorage.setItem("installPrompt",t))};return window.addEventListener("beforeinstallprompt",t),function(){return window.removeEventListener("beforeinstallprompt",t)}}),[c]);return[r,function(){l(),o(null)},function(){prompt=localStorage.getItem("installPrompt"),prompt.prompt(),prompt.userChoice.then((function(t){"accepted"!==t.outcome&&l(),localStorage.getItem("installPrompt",null)}))}]},p=(r(98),r(1));e.a=function(){var t=h(),e=Object(n.a)(t,2),r=e[0],a=e[1],o=f(),i=Object(n.a)(o,3),s=i[0],c=i[1],u=i[2];return r||s?Object(p.jsx)("div",{className:"install-popup",children:Object(p.jsxs)("div",{className:"install-popup-wrapper",children:[Object(p.jsx)("img",{className:"mx-auto",style:{borderTopRightRadius:"50%",borderTopLeftRadius:"50%",backgroundColor:"#fff",marginTop:"-50px"},width:"100px",src:"pwa-512x512.png",alt:"Icon"}),Object(p.jsxs)("div",{children:[r&&Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)("div",{className:"text-center",children:Object(p.jsx)("h3",{children:"T\xe9l\xe9chargez l'application"})}),Object(p.jsxs)("div",{className:"text-center",children:["Cliquez sur ","  ",Object(p.jsx)("span",{className:"material-icons",children:"ios_share"}),"  ","puis \"Ajouter \xe0 l'\xe9cran d'accueil\""]}),Object(p.jsx)("div",{className:"button-dissmiss",children:Object(p.jsx)("button",{onClick:a,children:"Pas maintenant"})})]}),s&&Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)("div",{className:"text-center",children:Object(p.jsx)("h3",{children:"Ne passez plus \xe0 c\xf4t\xe9 des alternatives durables"})}),Object(p.jsxs)("div",{className:"android-wrapper",children:[Object(p.jsx)("button",{className:"install-button",onClick:u,children:"Installer l'application"}),Object(p.jsx)("button",{className:"dont-install-button",onClick:c,children:"Pas maintenant"})]})]})]})]})}):null}}}]);
//# sourceMappingURL=17.34d0f745.chunk.js.map