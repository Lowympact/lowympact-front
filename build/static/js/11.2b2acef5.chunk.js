(this.webpackJsonplowympact=this.webpackJsonplowympact||[]).push([[11],{124:function(e,t,a){},317:function(e,t,a){},336:function(e,t,a){"use strict";a.r(t);var s=a(12),n=a(14),c=a(13),r=a(0),o=a.n(r),i=a(46),d=a(326),l=a(332),u=(a(123),a(314)),p=a(41),j=a(1),b=function(e){Object(n.a)(a,e);var t=Object(c.a)(a);function a(){var e;Object(s.a)(this,a);for(var n=arguments.length,c=new Array(n),r=0;r<n;r++)c[r]=arguments[r];return(e=t.call.apply(t,[this].concat(c))).state={swiper:void 0,selectedSegment:void 0},e.displayChart=function(){var t=Object(j.jsx)(o.a.Fragment,{});if(e.props.ecoScoreData&&e.props.cartedProduct>0){var a=[{title:"EcoScore A",value:e.props.ecoScoreData.a,color:"#1e8f4f"},{title:"EcoScore B",value:e.props.ecoScoreData.b,color:"#5fad0c"},{title:"EcoScore C",value:e.props.ecoScoreData.c,color:"#ecb10f"},{title:"EcoScore D",value:e.props.ecoScoreData.d,color:"#ff6f1e"},{title:"EcoScore E",value:e.props.ecoScoreData.e,color:"#df1e1f"},{title:"EcoScore Inconnu",value:e.props.ecoScoreData.unknown,color:"#000000"}];t=Object(j.jsx)(u.PieChart,{data:a,lineWidth:30,paddingAngle:1,radius:u.PieChart.defaultProps.radius-3,animate:!0,animationDuration:700,label:function(e){var t=e.dataEntry;return"".concat(Math.round(t.percentage),"%")},labelStyle:function(t){return t==e.state.selectedSegment?{fontSize:"6px",fontFamily:"comfortaa",fill:a[t].color}:{fontSize:"0px",fontFamily:"comfortaa",fill:a[t].color}},labelPosition:60,segmentsStyle:{transition:"stroke .3s ease-out",cursor:"pointer"},segmentsShift:function(t){return t==e.state.selectedSegment?3:0},onClick:function(t,a){a==e.state.selectedSegment?(e.setState({selectedSegment:void 0}),e.state.swiper.slideTo(0,500)):(e.setState({selectedSegment:a}),e.state.swiper.slideTo(a+1,500))}})}else t=Object(j.jsx)("div",{className:"stats-no-product",children:Object(j.jsxs)("div",{children:[Object(j.jsx)("img",{src:p.a,className:"logo",alt:"Fruits"}),Object(j.jsx)("p",{className:"logo-text",children:"Commence \xe0 scanner des produits !"})]})});return t},e.onSlideChange=function(t){0==t?e.setState({selectedSegment:void 0}):e.setState({selectedSegment:t-1})},e.displaySlides=function(){var t=Object(j.jsx)(o.a.Fragment,{});return e.props.ecoScoreData&&e.props.cartedProduct>0&&(t=Object(j.jsxs)(o.a.Fragment,{children:[Object(j.jsx)(d.a,{children:Object(j.jsx)("div",{className:"stats-slider",children:Object(j.jsx)("img",{className:"stats-ecoscore-full",src:"/images/utils/ecoScoreFull.png",alt:""})})}),Object(j.jsx)(d.a,{children:Object(j.jsxs)("div",{className:"stats-slider",children:[Object(j.jsxs)("span",{className:"stats-slider-text",children:[">"," EcoScore A : ",e.props.ecoScoreData.a," ",e.props.ecoScoreData.a>1?" produits":" produit"]}),Object(j.jsx)("img",{className:"stats-ecoscore-image",src:"/images/utils/ecoScoreA.png",alt:""})]})}),Object(j.jsx)(d.a,{children:Object(j.jsxs)("div",{className:"stats-slider",children:[Object(j.jsxs)("span",{className:"stats-slider-text",children:[">"," EcoScore B : ",e.props.ecoScoreData.b," ",e.props.ecoScoreData.b>1?" produits":" produit"]}),Object(j.jsx)("img",{className:"stats-ecoscore-image",src:"/images/utils/ecoScoreB.png",alt:""})]})}),Object(j.jsx)(d.a,{children:Object(j.jsxs)("div",{className:"stats-slider",children:[Object(j.jsxs)("span",{className:"stats-slider-text",children:[">"," EcoScore C : ",e.props.ecoScoreData.c," ",e.props.ecoScoreData.c>1?" produits":" produit"]}),Object(j.jsx)("img",{className:"stats-ecoscore-image",src:"/images/utils/ecoScoreC.png",alt:""})]})}),Object(j.jsx)(d.a,{children:Object(j.jsxs)("div",{className:"stats-slider",children:[Object(j.jsxs)("span",{className:"stats-slider-text",children:[">"," EcoScore D : ",e.props.ecoScoreData.d," ",e.props.ecoScoreData.d>1?" produits":" produit"]}),Object(j.jsx)("img",{className:"stats-ecoscore-image",src:"/images/utils/ecoScoreD.png",alt:""})]})}),Object(j.jsx)(d.a,{children:Object(j.jsxs)("div",{className:"stats-slider",children:[Object(j.jsxs)("span",{className:"stats-slider-text",children:[">"," EcoScore E : ",e.props.ecoScoreData.e," ",e.props.ecoScoreData.e>1?" produits":" produit"]}),Object(j.jsx)("img",{className:"stats-ecoscore-image",src:"/images/utils/ecoScoreE.png",alt:""})]})}),Object(j.jsx)(d.a,{children:Object(j.jsx)("div",{className:"stats-slider",children:Object(j.jsxs)("span",{className:"stats-slider-text",children:[">"," EcoScore Inconnu : ",e.props.ecoScoreData.unknown," ",e.props.ecoScoreData.unknown>1?" produits":" produit"]})})})]})),t},e.render=function(){return Object(j.jsxs)(o.a.Fragment,{children:[Object(j.jsx)("div",{className:"stats-chart-pie",children:e.displayChart()}),Object(j.jsx)("div",{className:"stats-chart-slider",children:Object(j.jsx)(l.a,{spaceBetween:0,slidesPerView:1,centeredSlides:!0,onSlideChange:function(t){return e.onSlideChange(t.activeIndex)},onSwiper:function(t){return e.setState({swiper:t})},children:e.displaySlides()})})]})},e}return a}(o.a.Component),h=a(315),m=a.n(h),g=["Janvier","F\xe9vrier","Mars","Avril","Mai","Juin","Juillet","Ao\xfbt","Septembre","Octobre","Novembre","D\xe9cembre"],v=function(e){Object(n.a)(a,e);var t=Object(c.a)(a);function a(){var e;Object(s.a)(this,a);for(var n=arguments.length,c=new Array(n),r=0;r<n;r++)c[r]=arguments[r];return(e=t.call.apply(t,[this].concat(c))).state={selectedSegment:0,options:{chart:{toolbar:{show:!1},dropShadow:{enabled:!0,top:0,left:0,blur:2,opacity:.5}},plotOptions:{bar:{borderRadius:5,horizontal:!0}},xaxis:{categories:["Janvier","F\xe9vrier","Mars","Avril","Mai"],labels:{style:{fontSize:"12px",fontFamily:"Comfortaa",fontColor:"#1b3044"}},title:{text:"CO\u2082 \xe9quivalent (kg)",style:{fontSize:"12px",fontFamily:"Comfortaa",fontColor:"#1b3044"}}},yaxis:{labels:{style:{fontSize:"12px",fontFamily:"Comfortaa",fontColor:"#1b3044"}}},dataLabels:{enabled:!0,style:{fontSize:"10px",fontFamily:"Comfortaa"}},noData:{text:"Chargement..."},fill:{colors:["#ff914d"]},grid:{xaxis:{lines:{show:!0}},yaxis:{lines:{show:!1}}}}},e.displayChart=function(){var t=Object(j.jsx)(o.a.Fragment,{});if(e.props.carbonImpactData&&e.props.cartedProduct>0){var a,s=e.props.carbonImpactData.data.length,n=[];switch(e.props.carbonImpactData.unit){case"weekly":var c=new Date;c.setHours(0,0,0,0),c.setDate(c.getDate()+4-(c.getDay()||7));var r=new Date(c.getFullYear(),0,1);a=Math.ceil(((c-r)/864e5+1)/7);for(var i=s-1;i>=0;i--)n.push("Semaine "+(a-i));break;case"monthly":a=(new Date).getMonth();for(var d=(new Date).getFullYear(),l=s-1;l>=0;l--){var u=a-l;u<0?n.push(g[u+12]+" "+(d-1)):n.push(g[u]+" "+d)}break;case"yearly":a=(new Date).getFullYear();for(var b=s-1;b>=0;b--)n.push((a-b).toString());break;default:a=(new Date).getFullYear();for(var h=s-1;h>=0;h--)n.push((a-h).toString())}e.state.options.xaxis.categories=n;var v=[{name:"CO\u2082 \xe9quivalent (kg)",data:[]}],f=e.props.carbonImpactData.data;f.sort((function(e,t){return e.offset>t.offset?1:-1}));for(var x=0;x<f.length;x++){var O=0===e.state.selectedSegment?f[x].impact.toFixed(2):(f[x].impact/f[x].nbProducts).toFixed(2);v[0].data.push(O)}t=Object(j.jsx)(o.a.Fragment,{children:Object(j.jsx)("div",{className:"stats-chart-bar",children:Object(j.jsx)(m.a,{options:e.state.options,series:v,type:"bar",height:350})})})}else t=Object(j.jsx)("div",{className:"stats-no-product",children:Object(j.jsxs)("div",{children:[Object(j.jsx)("img",{src:p.a,className:"logo",alt:"Fruits"}),Object(j.jsx)("p",{className:"logo-text",children:"Commence \xe0 scanner des produits !"})]})});return t},e.onSlideChange=function(t){e.setState({selectedSegment:0===e.state.selectedSegment?1:0})},e.displaySlides=function(){var t=Object(j.jsx)(o.a.Fragment,{});return e.props.carbonImpactData&&e.props.cartedProduct>0&&(t=Object(j.jsxs)(o.a.Fragment,{children:[Object(j.jsx)(d.a,{children:Object(j.jsx)("div",{className:"stats-slider",children:Object(j.jsxs)("span",{className:"stats-slider-text",children:[">"," Impact Carbone total"]})})}),Object(j.jsx)(d.a,{children:Object(j.jsx)("div",{className:"stats-slider",children:Object(j.jsxs)("span",{className:"stats-slider-text",children:[">"," Impact Carbone par produit"]})})})]})),t},e.render=function(){return Object(j.jsxs)(o.a.Fragment,{children:[e.displayChart(),Object(j.jsx)("div",{className:"stats-chart-slider",children:Object(j.jsx)(l.a,{spaceBetween:0,slidesPerView:1,centeredSlides:!0,onSlideChange:function(t){return e.onSlideChange(t.activeIndex)},onSwiper:function(t){return e.setState({swiper:t})},children:e.displaySlides()})})]})},e}return a}(o.a.Component),f=(a(124),a(15)),x=a(55),O=a.n(x),S=(a(317),function(e){Object(n.a)(a,e);var t=Object(c.a)(a);function a(){var e;Object(s.a)(this,a);for(var n=arguments.length,c=new Array(n),r=0;r<n;r++)c[r]=arguments[r];return(e=t.call.apply(t,[this].concat(c))).state={ecoScoreData:void 0,carbonImpactData:void 0,username:void 0,scannedProduct:void 0,cartedProduct:void 0,userId:void 0,value:0},e.Verify=function(){var t=!0,a=localStorage.getItem("token");if(a){var s=O.a.decode(a,{complete:!0}),n=new Date;s.payload.exp>=n.getTime()/1e3&&(t=!1)}!1===t&&e.setState({connected:!0})},e.componentDidMount=function(){e.Verify();var t=localStorage.getItem("userId");t&&e.setState({userId:t}),e.loadUserData(t),e.loadEcoScoreData(t,"fromBeginning"),e.loadCarbonImpactData(t,"fromBeginning")},e.loadUserData=function(t){fetch("https://api.lowympact.fr/api/v1/users/".concat(t),{method:"get",credentials:"include",headers:new Headers({authorization:localStorage.getItem("token"),"api-key":"99d8fb95-abdd-4885-bf6c-3a81d8874043","Content-Type":"application/json"})}).then((function(e){return e.json()})).then((function(t){var a;e.setState({username:null===t||void 0===t||null===(a=t.data)||void 0===a?void 0:a.username,scannedProduct:null===t||void 0===t?void 0:t.scannedProduct,cartedProduct:null===t||void 0===t?void 0:t.cartedProduct})}))},e.loadEcoScoreData=function(t,a){fetch("https://api.lowympact.fr/api/v1/users/".concat(t,"/statistics?typeStatistic=ecoscore&typeAggregate=").concat(a),{method:"get",credentials:"include",headers:new Headers({authorization:localStorage.getItem("token"),"api-key":"99d8fb95-abdd-4885-bf6c-3a81d8874043","Content-Type":"application/json"})}).then((function(e){return e.json()})).then((function(t){var a;e.setState({ecoScoreData:null===t||void 0===t||null===(a=t.statistics)||void 0===a?void 0:a.ecoscore})}))},e.loadCarbonImpactData=function(t,a){fetch("https://api.lowympact.fr/api/v1/users/".concat(t,"/statistics?typeStatistic=carbonImpact&typeAggregate=").concat(a),{method:"get",credentials:"include",headers:new Headers({authorization:localStorage.getItem("token"),"api-key":"99d8fb95-abdd-4885-bf6c-3a81d8874043","Content-Type":"application/json"})}).then((function(e){return e.json()})).then((function(t){var a;e.setState({carbonImpactData:null===t||void 0===t||null===(a=t.statistics)||void 0===a?void 0:a.carbonImpact})}))},e.displayStats=function(){var t=Object(j.jsx)(o.a.Fragment,{}),a=Object(j.jsx)(o.a.Fragment,{});return void 0!==e.state.scannedProduct&&(t=Object(j.jsxs)("div",{className:"stats-header-text",children:[Object(j.jsx)("span",{className:"circle-stats color_score_stats",children:"\u2b24 "}),e.state.scannedProduct>1?"Produits scann\xe9s :":"Produit scann\xe9 :",Object(j.jsxs)("span",{className:"uppercase ",children:[" ",e.state.scannedProduct]})]})),void 0!==e.state.cartedProduct&&(a=Object(j.jsxs)("div",{className:"stats-header-text",children:[Object(j.jsx)("span",{className:"circle-stats color_score_stats",children:"\u2b24 "}),e.state.cartedProduct>1?"Produits achet\xe9s :":"Produit achet\xe9 :",Object(j.jsxs)("span",{className:"uppercase ",children:[" ",e.state.cartedProduct]})]})),Object(j.jsxs)(o.a.Fragment,{children:[t,a]})},e.handleChange=function(t,a){e.setState({value:a})},e.displayNavbar=function(){return Object(j.jsxs)("div",{className:"stats-navbar-container",children:[Object(j.jsx)("button",{className:0===e.state.value?"stats-navbar-button selected":"stats-navbar-button",onClick:function(){return e.handleChange("",0)},children:"EcoScore"}),Object(j.jsx)("button",{className:1===e.state.value?"stats-navbar-button selected":"stats-navbar-button",onClick:function(){return e.handleChange("",1)},children:"Impact Carbone"}),Object(j.jsx)("div",{className:0===e.state.value?"navbar-under nav-left":"navbar-under nav-right"})]})},e.render=function(){return Object(j.jsx)(o.a.Fragment,{children:Object(j.jsxs)("div",{className:"stats-page-container",children:[Object(j.jsxs)("div",{className:"stats-header-container",children:[Object(j.jsx)("div",{className:"stats-profil-link",children:Object(j.jsxs)(f.b,{to:"/profil",children:[" ","<"," Profil"]})}),Object(j.jsx)("img",{className:"stats-bitmap-image",src:"/images/utils/bitmap.png",alt:""})]}),Object(j.jsx)("div",{className:"stats-welcome",children:Object(j.jsx)("span",{className:"stats-welcome-text",children:e.state.username?e.state.username+", voici ton r\xe9capitulatif Lowympact...":""})}),Object(j.jsx)("div",{className:"stats-text-container",children:e.displayStats()}),e.displayNavbar(),0===e.state.value?Object(j.jsx)(b,{ecoScoreData:e.state.ecoScoreData,scannedProduct:e.state.scannedProduct,cartedProduct:e.state.cartedProduct}):Object(j.jsx)(v,{carbonImpactData:e.state.carbonImpactData,scannedProduct:e.state.scannedProduct,cartedProduct:e.state.cartedProduct}),Object(j.jsx)(i.a,{})]})})},e}return a}(o.a.Component));t.default=S},41:function(e,t,a){"use strict";t.a=a.p+"static/media/fruits-vegetables-basket-by-oblik-studio.7d5e1c64.svg"},46:function(e,t,a){"use strict";var s=a(12),n=a(16),c=a(14),r=a(13),o=(a(47),a(0)),i=a.n(o),d=(a(48),a(1));var l=function(){return Object(d.jsxs)("div",{children:[Object(d.jsx)("div",{className:"button-logo",children:Object(d.jsx)("span",{className:"material-icons",children:"history"})}),Object(d.jsx)("div",{children:"Historique"})]})};var u=function(){return Object(d.jsxs)("div",{children:[Object(d.jsx)("div",{children:Object(d.jsx)("span",{className:"material-icons",children:"person"})}),Object(d.jsx)("div",{children:"Profil"})]})};var p=function(){return Object(d.jsx)("div",{children:Object(d.jsx)("div",{className:"navbar-scan-icon",children:Object(d.jsx)("span",{className:"material-icons",children:"qr_code_scanner"})})})},j=a(39),b=a.n(j),h=a(40),m=a(75),g=a(76),v=a.n(g),f=a(77),x=a.n(f),O=function(e){Object(c.a)(a,e);var t=Object(r.a)(a);function a(){var e;Object(s.a)(this,a);for(var n=arguments.length,c=new Array(n),r=0;r<n;r++)c[r]=arguments[r];return(e=t.call.apply(t,[this].concat(c))).state={error:!1,usedCamera:0,devices:[],processingImage:0,text:0},e.switchCamera=function(){var t=e.state.usedCamera+1;t>=e.state.devices.length&&(t=0),e.setState({usedCamera:t}),v.a.stop(),e.QuaggaInit(e.state.devices[t].deviceId)},e.componentDidMount=Object(h.a)(b.a.mark((function t(){var a,s;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(a=window.location.search,s=new URLSearchParams(a),"false"!=s.get("camera")){t.next=7;break}e.setState({error:!0,text:1}),t.next=12;break;case 7:if(!(navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia)){t.next=11;break}return t.delegateYield(b.a.mark((function t(){var a,s,n,c,r,o;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=void 0,t.next=3,navigator.mediaDevices.enumerateDevices().then((function(e){return e}));case 3:s=t.sent,n=[],s.forEach((function(e){"videoinput"===e.kind&&(n.push(e),e.label.match(/back/))})),e.setState({devices:n}),c=-1,r=b.a.mark((function t(s){var r;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=n[s],t.next=3,navigator.mediaDevices.getUserMedia({video:{deviceId:{exact:r.deviceId}}}).then((function(t){t.getVideoTracks().forEach((function(t){var n=t.getCapabilities();n.height.max>=c&&null!=r.label.match(/back/)&&(c=n.height.max,a=r.deviceId,e.setState({usedCamera:s}))})),t.getTracks().forEach((function(e){return e.stop()}))}),(function(e){return console.log(e)}));case 3:case"end":return t.stop()}}),t)})),t.t0=b.a.keys(n);case 10:if((t.t1=t.t0()).done){t.next=15;break}return o=t.t1.value,t.delegateYield(r(o),"t2",13);case 13:t.next=10;break;case 15:e.QuaggaInit(a);case 16:case"end":return t.stop()}}),t)}))(),"t0",9);case 9:t.next=12;break;case 11:e.setState({error:!0,text:3});case 12:case"end":return t.stop()}}),t)}))),e.QuaggaInit=function(t){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1920,s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1080,n={deviceId:t};n.deviceId||(n={}),v.a.init({inputStream:{type:"LiveStream",constraints:Object(m.a)(Object(m.a)({},n),{},{focusMode:"continuous",width:{min:a},height:{min:s}})},locator:{patchSize:"normal",halfSample:!1},locate:!1,area:{top:"30%",right:"25%",left:"25%",bottom:"30%"},numOfWorkers:window.navigator.hardwareConcurrency||2,decoder:{readers:["ean_reader"]},debug:{drawBoundingBox:!0,showFrequency:!0,drawScanline:!0,showPattern:!0},multiple:!1,singleChannel:!1},(function(n){if(n)return 960!=a&&540!=s?e.QuaggaInit(t,960,540):e.setState({error:!0,text:4}),!1;v.a.start()})),e.props.setQuagga(v.a),v.a.onDetected(e._onDetected)},e._onDetected=function(){var t=Object(h.a)(b.a.mark((function t(a){var s;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.props.onDetected(a);case 2:s=t.sent,console.log(s),s&&v.a.stop();case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),e.onDrop=function(t){try{if(1!=e.state.processingImage){e.setState({processingImage:1}),console.log(t[t.length-1]);var a=new FileReader;a.readAsDataURL(t[t.length-1]),a.onloadend=function(){v.a.decodeSingle({decoder:{readers:["ean_reader"]},locate:!0,src:a.result},(function(t){var a;(console.log(t),t)?(e._onDetected(t),e.setState({processingImage:2}),console.log("result",null===(a=t.codeResult)||void 0===a?void 0:a.code)):(console.log("not detected"),e.setState({processingImage:3}))}))}}}catch(s){console.log(s),e.setState({processingImage:4})}},e}return Object(n.a)(a,[{key:"componentWillUnmount",value:function(){v.a.offDetected(this._onDetected)}},{key:"render",value:function(){var e,t,a,s=Object(d.jsx)(i.a.Fragment,{});return 1==this.state.processingImage&&(s=Object(d.jsx)(i.a.Fragment,{children:Object(d.jsx)("p",{children:"Chargement en cours..."})})),2==this.state.processingImage&&(s=Object(d.jsx)(i.a.Fragment,{children:Object(d.jsx)("p",{children:"Ce produit n'existe pas dans la base de donn\xe9es"})})),3==this.state.processingImage&&(s=Object(d.jsx)(i.a.Fragment,{children:Object(d.jsx)("p",{children:"Code barre non trouv\xe9 sur l'image, merci de r\xe9essayer"})})),4==this.state.processingImage&&(s=Object(d.jsx)(i.a.Fragment,{children:Object(d.jsxs)("p",{children:["Mauvais format ou fichier trop grand, merci de r\xe9essayer. ",Object(d.jsx)("br",{}),"Taille max : 5mb ",Object(d.jsx)("br",{}),"Formats: jpg, png, gif"]})})),Object(d.jsxs)(i.a.Fragment,{children:[Object(d.jsx)("div",{id:"interactive",className:"viewport"}),(null===(e=this.state.devices)||void 0===e?void 0:e.length)>1?Object(d.jsxs)("button",{className:"code-switch-camera",onClick:this.switchCamera,children:[Object(d.jsx)("span",{className:"material-icons",children:"cameraswitch"}),this.state.usedCamera]}):Object(d.jsx)(i.a.Fragment,{}),this.state.error?Object(d.jsxs)("div",{className:"scan-error",children:[Object(d.jsx)(x.a,{withIcon:!0,withPreview:!1,buttonText:Object(d.jsxs)("div",{className:"button-import",children:[Object(d.jsx)("div",{className:"material-icons",children:"add_a_photo"}),Object(d.jsx)("p",{children:"Prendre une photo"})]}),onChange:this.onDrop,label:"",imgExtension:[".jpg",".gif",".png",".jpeg"],maxFileSize:5242880,labelClass:"import-label"}),Object(d.jsx)("p",{className:"red",children:s}),Object(d.jsxs)("p",{className:"error-message-import",children:["code d'erreur : "+this.state.text,Object(d.jsx)("br",{})]})]}):Object(d.jsx)(i.a.Fragment,{}),Object(d.jsx)("p",{className:"debug",children:(null===(t=this.state)||void 0===t||null===(a=t.devices[this.state.usedCamera])||void 0===a?void 0:a.deviceId)+"-"})]})}}]),a}(o.Component),S=a(78),w=a.n(S),y=(a(79),a(2)),D=(a(49),function(e){Object(c.a)(a,e);var t=Object(r.a)(a);function a(){var e;Object(s.a)(this,a);for(var n=arguments.length,c=new Array(n),r=0;r<n;r++)c[r]=arguments[r];return(e=t.call.apply(t,[this].concat(c))).state={scanning:!0,status:"",results:[],usedCameraId:"3f6fc4177028f25c3e8215f4444838450630b8d656c627ef511346545d37f302",devices:[],reading:!1,barcode:void 0,bcProductId:void 0,Quagga:void 0},e.setQuagga=function(t){e.state.Quagga&&e.state.Quagga.stop(),e.setState({Quagga:t})},e._scan=function(){e.setState({scanning:!e.state.scanning,status:""})},e._onDetected=function(){var t=Object(h.a)(b.a.mark((function t(a){var s;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!a){t.next=18;break}if(!a.codeResult||!a.codeResult.code){t.next=18;break}return e.setState({results:[a],scanning:!0,status:"waiting"}),t.next=5,fetch("https://world.openfoodfacts.org/api/v0/product/".concat(a.codeResult.code,".json/"));case 5:return s=t.sent,t.next=8,s.json();case 8:if(0===t.sent.status){t.next=16;break}return e.setState({scanning:!1,status:"found",barcode:a.codeResult.code}),e.props.showScanner(!1),e.state.Quagga&&e.state.Quagga.stop(),t.abrupt("return",!0);case 16:return e.setState({scanning:!0,status:"not found"}),t.abrupt("return",!1);case 18:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),e.handleScan=function(t){if(t){var a=t.split("/");a.length>1&&e.setState({scanning:!1,barcode:a[4],bcProductId:a[5],status:"found"}),e.state.Quagga&&e.state.Quagga.stop()}},e.handleError=function(e){console.error(e)},e.displayQrCode=function(){return"found"!==e.state.status?Object(d.jsx)(w.a,{delay:300,onError:e.handleError,onScan:e.handleScan,style:{width:"100%"},showViewFinder:!1}):Object(d.jsx)(i.a.Fragment,{})},e.displayBarCode=function(){return"found"!==e.state.status?Object(d.jsxs)(i.a.Fragment,{children:[Object(d.jsx)("div",{className:"header",children:Object(d.jsx)("ul",{className:"results",children:e.state.results.map((function(t,a){var s;return Object(d.jsxs)("div",{children:["waiting"===e.state.status?"V\xe9rification du code : "+(null===t||void 0===t||null===(s=t.codeResult)||void 0===s?void 0:s.code):"","not found"===e.state.status?"Code non trouv\xe9, merci de r\xe9essayer":""]},t.codeResult.code+a)}))})}),e.state.scanning?Object(d.jsx)(O,{onDetected:e._onDetected,setQuagga:e.setQuagga,usedCameraId:e.usedCameraId}):null]}):Object(d.jsx)(i.a.Fragment,{})},e.switchReader=function(){e.state.reading?e.setState({reading:!1}):(e.state.Quagga&&e.state.Quagga.stop(),e.setState({reading:!0}))},e}return Object(n.a)(a,[{key:"render",value:function(){var e=this;return this.state.barcode&&this.state.bcProductId&&(this.props.barcode!==this.state.barcode||this.props.bcProductId!==this.state.bcProductId)?Object(d.jsx)(y.a,{to:"/products/"+this.state.barcode+"/"+this.state.bcProductId}):this.state.barcode&&this.props.barcode!==this.state.barcode?Object(d.jsx)(y.a,{to:"/products/"+this.state.barcode}):Object(d.jsxs)("div",{className:"code-reader-container",children:[Object(d.jsx)("span",{className:"close",onClick:function(){e.state.Quagga&&e.state.Quagga.stop(),e.props.showScanner(!1)},children:"\xd7"}),this.displayBarCode()]})}}]),a}(o.Component)),N=a(15),C=function(e){Object(c.a)(a,e);var t=Object(r.a)(a);function a(){var e;Object(s.a)(this,a);for(var n=arguments.length,c=new Array(n),r=0;r<n;r++)c[r]=arguments[r];return(e=t.call.apply(t,[this].concat(c))).state={showScanner:!1,barcode:void 0,bcProductId:void 0,height:0},e.updateWindowDimensions=function(){e.setState({height:window.innerHeight})},e.handleScannerButton=function(t){e.setState({showScanner:t})},e.render=function(){return e.state.height<550?Object(d.jsx)(i.a.Fragment,{}):e.state.showScanner?Object(d.jsx)(D,{showScanner:e.handleScannerButton,history:e.props.history}):Object(d.jsx)(i.a.Fragment,{children:Object(d.jsxs)("div",{className:"navbar-container",children:[Object(d.jsx)(N.b,{to:"/history",className:"/history"===window.location.pathname?"navbar-link navbar-text-left navbar-selected":"navbar-link navbar-text-left ",children:Object(d.jsx)(l,{})}),Object(d.jsx)("div",{onClick:function(){return e.handleScannerButton(!0)},children:Object(d.jsx)("div",{className:"navbar-circle",children:Object(d.jsx)(p,{})})}),Object(d.jsx)("span",{className:"navbar-scan-text",children:"Scan"}),Object(d.jsx)(N.b,{to:"/profil",className:"/profil"===window.location.pathname?"navbar-link navbar-text-right navbar-selected":"navbar-link navbar-text-right ",children:Object(d.jsx)(u,{})})]})})},e}return Object(n.a)(a,[{key:"componentDidMount",value:function(){this.updateWindowDimensions(),window.addEventListener("resize",this.updateWindowDimensions)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.updateWindowDimensions)}}]),a}(i.a.Component);t.a=C},47:function(e,t,a){},48:function(e,t,a){},49:function(e,t,a){},56:function(e,t){},57:function(e,t){},59:function(e,t){},60:function(e,t){},62:function(e,t){},63:function(e,t){},64:function(e,t){},65:function(e,t){},66:function(e,t){},67:function(e,t){},68:function(e,t){},69:function(e,t){}}]);
//# sourceMappingURL=11.2b2acef5.chunk.js.map