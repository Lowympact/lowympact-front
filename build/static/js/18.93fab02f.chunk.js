(this.webpackJsonplowympact=this.webpackJsonplowympact||[]).push([[18],{122:function(e,n,t){},228:function(e,n,t){"use strict";t.r(n);var c=t(13),o=t(16),i=t(15),s=t(14),r=t(0),a=t.n(r),l=t(46),u=t(18),d=(t(122),t(17)),f=t(57),j=t.n(f),p=t(1),b=function(e){Object(i.a)(t,e);var n=Object(s.a)(t);function t(){var e;Object(c.a)(this,t);for(var o=arguments.length,i=new Array(o),s=0;s<o;s++)i[s]=arguments[s];return(e=n.call.apply(n,[this].concat(i))).state={connected:!1},e.disconnect=function(){localStorage.removeItem("token"),localStorage.removeItem("userId"),e.props.history.push("/login")},e.componentDidMount=function(){e.Verify()},e.Verify=function(){var n=!0,t=localStorage.getItem("token");if(t){var c=j.a.decode(t,{complete:!0}),o=new Date;c.payload.exp>=o.getTime()/1e3&&(n=!1)}!1===n&&e.setState({connected:!0})},e.displayConnectedProfil=function(){return Object(p.jsxs)(a.a.Fragment,{children:[Object(p.jsx)("h2",{className:"profil-title",children:"Bienvenue sur ton profil!"}),Object(p.jsx)(d.b,{to:"/stats",className:"profil-button",children:"Statistiques"}),Object(p.jsx)(d.b,{to:"/avis",className:"profil-button",children:"Donnez votre avis !"}),Object(p.jsx)(d.b,{to:"/configuration",className:"profil-button",children:"Configuration"}),Object(p.jsxs)("div",{onClick:e.disconnect,className:"profil-button-disconnect",children:[Object(p.jsx)("div",{className:"material-icons",children:"logout"}),Object(p.jsx)("p",{children:"D\xe9connexion"})]})]})},e.displayUnconnectedProfil=function(){return Object(p.jsxs)(a.a.Fragment,{children:[Object(p.jsx)("h2",{className:"profil-title",children:"Non connect\xe9"}),Object(p.jsx)("p",{children:"Connecte toi pour que ton historique soit sauvegard\xe9 !"}),Object(p.jsx)(d.b,{to:"/login",className:"profil-button",children:"Me Connecter"})]})},e}return Object(o.a)(t,[{key:"render",value:function(){return Object(p.jsxs)("div",{children:[Object(p.jsx)(d.b,{to:"/",children:Object(p.jsx)(u.a,{})}),Object(p.jsxs)("div",{className:"profil-screen",children:[Object(p.jsx)("div",{className:"profil-picture",children:Object(p.jsx)("div",{className:"material-icons",children:"person"})}),this.state.connected?this.displayConnectedProfil():this.displayUnconnectedProfil()]}),Object(p.jsx)(l.a,{})]})}}]),t}(a.a.Component);n.default=b},63:function(e,n){},64:function(e,n){},65:function(e,n){},66:function(e,n){},68:function(e,n){},69:function(e,n){},70:function(e,n){},71:function(e,n){},72:function(e,n){},73:function(e,n){},74:function(e,n){},75:function(e,n){}}]);
//# sourceMappingURL=18.93fab02f.chunk.js.map