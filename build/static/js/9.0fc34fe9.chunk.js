(this.webpackJsonplowympact=this.webpackJsonplowympact||[]).push([[9],{332:function(e,t,a){},341:function(e,t,a){"use strict";a.r(t);var s=a(7),c=a(9),r=a(8),o=a(1),n=a.n(o),i=a(35),l=a(321),d=a(324),p=(a(169),a(329)),u=a(66),j=a(0),m=function(e){Object(c.a)(a,e);var t=Object(r.a)(a);function a(){var e;Object(s.a)(this,a);for(var c=arguments.length,r=new Array(c),o=0;o<c;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={swiper:void 0,selectedSegment:void 0},e.displayChart=function(){var t=Object(j.jsx)(n.a.Fragment,{});if(e.props.ecoScoreData&&e.props.cartedProduct>0){var a=[{title:"EcoScore A",value:e.props.ecoScoreData.a,color:"#1e8f4f"},{title:"EcoScore B",value:e.props.ecoScoreData.b,color:"#5fad0c"},{title:"EcoScore C",value:e.props.ecoScoreData.c,color:"#ecb10f"},{title:"EcoScore D",value:e.props.ecoScoreData.d,color:"#ff6f1e"},{title:"EcoScore E",value:e.props.ecoScoreData.e,color:"#df1e1f"},{title:"EcoScore Inconnu",value:e.props.ecoScoreData.unknown,color:"#000000"}];t=Object(j.jsx)(p.PieChart,{data:a,lineWidth:30,paddingAngle:1,radius:p.PieChart.defaultProps.radius-3,animate:!0,animationDuration:700,label:function(e){var t=e.dataEntry;return"".concat(Math.round(t.percentage),"%")},labelStyle:function(t){return t==e.state.selectedSegment?{fontSize:"6px",fontFamily:"comfortaa",fill:a[t].color}:{fontSize:"0px",fontFamily:"comfortaa",fill:a[t].color}},labelPosition:60,segmentsStyle:{transition:"stroke .3s ease-out",cursor:"pointer"},segmentsShift:function(t){return t==e.state.selectedSegment?3:0},onClick:function(t,a){a==e.state.selectedSegment?(e.setState({selectedSegment:void 0}),e.state.swiper.slideTo(0,500)):(e.setState({selectedSegment:a}),e.state.swiper.slideTo(a+1,500))}})}else t=Object(j.jsx)("div",{className:"stats-no-product",children:Object(j.jsxs)("div",{children:[Object(j.jsx)("img",{src:u.a,className:"logo",alt:"Fruits"}),Object(j.jsx)("p",{className:"logo-text",children:"Commence \xe0 scanner des produits !"})]})});return t},e.onSlideChange=function(t){0==t?e.setState({selectedSegment:void 0}):e.setState({selectedSegment:t-1})},e.displaySlides=function(){var t=Object(j.jsx)(n.a.Fragment,{});return e.props.ecoScoreData&&e.props.cartedProduct>0&&(t=Object(j.jsxs)(n.a.Fragment,{children:[Object(j.jsx)(l.a,{children:Object(j.jsx)("div",{className:"stats-slider",children:Object(j.jsx)("img",{className:"stats-ecoscore-full",src:"/images/utils/ecoScoreFull.png",alt:""})})}),Object(j.jsx)(l.a,{children:Object(j.jsxs)("div",{className:"stats-slider",children:[Object(j.jsxs)("span",{className:"stats-slider-text",children:[">"," EcoScore A : ",e.props.ecoScoreData.a," ",e.props.ecoScoreData.a>1?" produits":" produit"]}),Object(j.jsx)("img",{className:"stats-ecoscore-image",src:"/images/utils/ecoScoreA.png",alt:""})]})}),Object(j.jsx)(l.a,{children:Object(j.jsxs)("div",{className:"stats-slider",children:[Object(j.jsxs)("span",{className:"stats-slider-text",children:[">"," EcoScore B : ",e.props.ecoScoreData.b," ",e.props.ecoScoreData.b>1?" produits":" produit"]}),Object(j.jsx)("img",{className:"stats-ecoscore-image",src:"/images/utils/ecoScoreB.png",alt:""})]})}),Object(j.jsx)(l.a,{children:Object(j.jsxs)("div",{className:"stats-slider",children:[Object(j.jsxs)("span",{className:"stats-slider-text",children:[">"," EcoScore C : ",e.props.ecoScoreData.c," ",e.props.ecoScoreData.c>1?" produits":" produit"]}),Object(j.jsx)("img",{className:"stats-ecoscore-image",src:"/images/utils/ecoScoreC.png",alt:""})]})}),Object(j.jsx)(l.a,{children:Object(j.jsxs)("div",{className:"stats-slider",children:[Object(j.jsxs)("span",{className:"stats-slider-text",children:[">"," EcoScore D : ",e.props.ecoScoreData.d," ",e.props.ecoScoreData.d>1?" produits":" produit"]}),Object(j.jsx)("img",{className:"stats-ecoscore-image",src:"/images/utils/ecoScoreD.png",alt:""})]})}),Object(j.jsx)(l.a,{children:Object(j.jsxs)("div",{className:"stats-slider",children:[Object(j.jsxs)("span",{className:"stats-slider-text",children:[">"," EcoScore E : ",e.props.ecoScoreData.e," ",e.props.ecoScoreData.e>1?" produits":" produit"]}),Object(j.jsx)("img",{className:"stats-ecoscore-image",src:"/images/utils/ecoScoreE.png",alt:""})]})}),Object(j.jsx)(l.a,{children:Object(j.jsx)("div",{className:"stats-slider",children:Object(j.jsxs)("span",{className:"stats-slider-text",children:[">"," EcoScore Inconnu : ",e.props.ecoScoreData.unknown," ",e.props.ecoScoreData.unknown>1?" produits":" produit"]})})})]})),t},e.render=function(){return Object(j.jsxs)(n.a.Fragment,{children:[Object(j.jsx)("div",{className:"stats-chart-pie",children:e.displayChart()}),Object(j.jsx)("div",{className:"stats-chart-slider",children:Object(j.jsx)(d.a,{spaceBetween:0,slidesPerView:1,centeredSlides:!0,onSlideChange:function(t){return e.onSlideChange(t.activeIndex)},onSwiper:function(t){return e.setState({swiper:t})},children:e.displaySlides()})})]})},e}return a}(n.a.Component),b=a(330),h=a.n(b),v=["Janvier","F\xe9vrier","Mars","Avril","Mai","Juin","Juillet","Ao\xfbt","Septembre","Octobre","Novembre","D\xe9cembre"],f=function(e){Object(c.a)(a,e);var t=Object(r.a)(a);function a(){var e;Object(s.a)(this,a);for(var c=arguments.length,r=new Array(c),o=0;o<c;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={selectedSegment:0,options:{chart:{toolbar:{show:!1},dropShadow:{enabled:!0,top:0,left:0,blur:2,opacity:.5}},plotOptions:{bar:{borderRadius:5,horizontal:!0}},xaxis:{categories:["Janvier","F\xe9vrier","Mars","Avril","Mai"],labels:{style:{fontSize:"12px",fontFamily:"Comfortaa",fontColor:"#1b3044"}},title:{text:"CO\u2082 \xe9quivalent (kg)",style:{fontSize:"12px",fontFamily:"Comfortaa",fontColor:"#1b3044"}}},yaxis:{labels:{style:{fontSize:"12px",fontFamily:"Comfortaa",fontColor:"#1b3044"}}},dataLabels:{enabled:!0,style:{fontSize:"10px",fontFamily:"Comfortaa"}},noData:{text:"Chargement..."},fill:{colors:["#ff914d"]},grid:{xaxis:{lines:{show:!0}},yaxis:{lines:{show:!1}}}}},e.displayChart=function(){var t=Object(j.jsx)(n.a.Fragment,{});if(e.props.carbonImpactData&&e.props.cartedProduct>0){var a,s=e.props.carbonImpactData.data.length,c=[];switch(e.props.carbonImpactData.unit){case"weekly":var r=new Date;r.setHours(0,0,0,0),r.setDate(r.getDate()+4-(r.getDay()||7));var o=new Date(r.getFullYear(),0,1);a=Math.ceil(((r-o)/864e5+1)/7);for(var i=s-1;i>=0;i--)c.push("Semaine "+(a-i));break;case"monthly":a=(new Date).getMonth();for(var l=(new Date).getFullYear(),d=s-1;d>=0;d--){var p=a-d;p<0?c.push(v[p+12]+" "+(l-1)):c.push(v[p]+" "+l)}break;case"yearly":a=(new Date).getFullYear();for(var m=s-1;m>=0;m--)c.push((a-m).toString());break;default:a=(new Date).getFullYear();for(var b=s-1;b>=0;b--)c.push((a-b).toString())}e.state.options.xaxis.categories=c;var f=[{name:"CO\u2082 \xe9quivalent (kg)",data:[]}],g=e.props.carbonImpactData.data;g.sort((function(e,t){return e.offset>t.offset?1:-1}));for(var x=0;x<g.length;x++){var S=0===e.state.selectedSegment?g[x].impact.toFixed(2):(g[x].impact/g[x].nbProducts).toFixed(2);f[0].data.push(S)}t=Object(j.jsx)(n.a.Fragment,{children:Object(j.jsx)("div",{className:"stats-chart-bar",children:Object(j.jsx)(h.a,{options:e.state.options,series:f,type:"bar",height:350})})})}else t=Object(j.jsx)("div",{className:"stats-no-product",children:Object(j.jsxs)("div",{children:[Object(j.jsx)("img",{src:u.a,className:"logo",alt:"Fruits"}),Object(j.jsx)("p",{className:"logo-text",children:"Commence \xe0 scanner des produits !"})]})});return t},e.onSlideChange=function(t){e.setState({selectedSegment:0===e.state.selectedSegment?1:0})},e.displaySlides=function(){var t=Object(j.jsx)(n.a.Fragment,{});return e.props.carbonImpactData&&e.props.cartedProduct>0&&(t=Object(j.jsxs)(n.a.Fragment,{children:[Object(j.jsx)(l.a,{children:Object(j.jsx)("div",{className:"stats-slider",children:Object(j.jsxs)("span",{className:"stats-slider-text",children:[">"," Impact Carbone total"]})})}),Object(j.jsx)(l.a,{children:Object(j.jsx)("div",{className:"stats-slider",children:Object(j.jsxs)("span",{className:"stats-slider-text",children:[">"," Impact Carbone par produit"]})})})]})),t},e.render=function(){return Object(j.jsxs)(n.a.Fragment,{children:[e.displayChart(),Object(j.jsx)("div",{className:"stats-chart-slider",children:Object(j.jsx)(d.a,{spaceBetween:0,slidesPerView:1,centeredSlides:!0,onSlideChange:function(t){return e.onSlideChange(t.activeIndex)},onSwiper:function(t){return e.setState({swiper:t})},children:e.displaySlides()})})]})},e}return a}(n.a.Component),g=(a(171),a(14)),x=a(53),S=a.n(x),O=(a(332),function(e){Object(c.a)(a,e);var t=Object(r.a)(a);function a(){var e;Object(s.a)(this,a);for(var c=arguments.length,r=new Array(c),o=0;o<c;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).state={ecoScoreData:void 0,carbonImpactData:void 0,username:void 0,scannedProduct:void 0,cartedProduct:void 0,userId:void 0,value:0},e.Verify=function(){var t=!0,a=localStorage.getItem("token");if(a){var s=S.a.decode(a,{complete:!0}),c=new Date;s.payload.exp>=c.getTime()/1e3&&(t=!1)}!1===t&&e.setState({connected:!0})},e.componentDidMount=function(){e.Verify();var t=localStorage.getItem("userId");t&&e.setState({userId:t}),e.loadUserData(t),e.loadEcoScoreData(t,"fromBeginning"),e.loadCarbonImpactData(t,"fromBeginning")},e.loadUserData=function(t){fetch("https://api.lowympact.fr/api/v1/users/".concat(t),{method:"get",credentials:"include",headers:new Headers({authorization:localStorage.getItem("token"),"api-key":"99d8fb95-abdd-4885-bf6c-3a81d8874043","Content-Type":"application/json"})}).then((function(e){return e.json()})).then((function(t){var a;e.setState({username:null===t||void 0===t||null===(a=t.data)||void 0===a?void 0:a.username,scannedProduct:null===t||void 0===t?void 0:t.scannedProduct,cartedProduct:null===t||void 0===t?void 0:t.cartedProduct})}))},e.loadEcoScoreData=function(t,a){fetch("https://api.lowympact.fr/api/v1/users/".concat(t,"/statistics?typeStatistic=ecoscore&typeAggregate=").concat(a),{method:"get",credentials:"include",headers:new Headers({authorization:localStorage.getItem("token"),"api-key":"99d8fb95-abdd-4885-bf6c-3a81d8874043","Content-Type":"application/json"})}).then((function(e){return e.json()})).then((function(t){var a;e.setState({ecoScoreData:null===t||void 0===t||null===(a=t.statistics)||void 0===a?void 0:a.ecoscore})}))},e.loadCarbonImpactData=function(t,a){fetch("https://api.lowympact.fr/api/v1/users/".concat(t,"/statistics?typeStatistic=carbonImpact&typeAggregate=").concat(a),{method:"get",credentials:"include",headers:new Headers({authorization:localStorage.getItem("token"),"api-key":"99d8fb95-abdd-4885-bf6c-3a81d8874043","Content-Type":"application/json"})}).then((function(e){return e.json()})).then((function(t){var a;e.setState({carbonImpactData:null===t||void 0===t||null===(a=t.statistics)||void 0===a?void 0:a.carbonImpact})}))},e.displayStats=function(){var t=Object(j.jsx)(n.a.Fragment,{}),a=Object(j.jsx)(n.a.Fragment,{});return void 0!==e.state.scannedProduct&&(t=Object(j.jsxs)("div",{className:"stats-header-text",children:[Object(j.jsx)("span",{className:"circle-stats color_score_stats",children:"\u2b24 "}),e.state.scannedProduct>1?"Produits scann\xe9s :":"Produit scann\xe9 :",Object(j.jsxs)("span",{className:"uppercase ",children:[" ",e.state.scannedProduct]})]})),void 0!==e.state.cartedProduct&&(a=Object(j.jsxs)("div",{className:"stats-header-text",children:[Object(j.jsx)("span",{className:"circle-stats color_score_stats",children:"\u2b24 "}),e.state.cartedProduct>1?"Produits achet\xe9s :":"Produit achet\xe9 :",Object(j.jsxs)("span",{className:"uppercase ",children:[" ",e.state.cartedProduct]})]})),Object(j.jsxs)(n.a.Fragment,{children:[t,a]})},e.handleChange=function(t,a){e.setState({value:a})},e.displayNavbar=function(){return Object(j.jsxs)("div",{className:"stats-navbar-container",children:[Object(j.jsx)("button",{className:0===e.state.value?"stats-navbar-button selected":"stats-navbar-button",onClick:function(){return e.handleChange("",0)},children:"EcoScore"}),Object(j.jsx)("button",{className:1===e.state.value?"stats-navbar-button selected":"stats-navbar-button",onClick:function(){return e.handleChange("",1)},children:"Impact Carbone"}),Object(j.jsx)("div",{className:0===e.state.value?"navbar-under nav-left":"navbar-under nav-right"})]})},e.render=function(){return Object(j.jsx)(n.a.Fragment,{children:Object(j.jsxs)("div",{className:"stats-page-container",children:[Object(j.jsxs)("div",{className:"stats-header-container",children:[Object(j.jsx)("div",{className:"stats-profil-link",children:Object(j.jsxs)(g.b,{to:"/profil",children:[" ","<"," Profil"]})}),Object(j.jsx)("img",{className:"stats-bitmap-image",src:"/images/utils/bitmap.png",alt:""})]}),Object(j.jsx)("div",{className:"stats-welcome",children:Object(j.jsx)("span",{className:"stats-welcome-text",children:e.state.username?e.state.username+", voici ton r\xe9capitulatif Lowympact...":""})}),Object(j.jsx)("div",{className:"stats-text-container",children:e.displayStats()}),e.displayNavbar(),0===e.state.value?Object(j.jsx)(m,{ecoScoreData:e.state.ecoScoreData,scannedProduct:e.state.scannedProduct,cartedProduct:e.state.cartedProduct}):Object(j.jsx)(f,{carbonImpactData:e.state.carbonImpactData,scannedProduct:e.state.scannedProduct,cartedProduct:e.state.cartedProduct}),Object(j.jsx)(i.a,{})]})})},e}return a}(n.a.Component));t.default=O}}]);
//# sourceMappingURL=9.0fc34fe9.chunk.js.map