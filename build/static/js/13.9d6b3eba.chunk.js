(this.webpackJsonplowympact=this.webpackJsonplowympact||[]).push([[13],{295:function(e,t,a){},315:function(e,t,a){"use strict";a.r(t);var n=a(12),s=a(15),c=a(14),r=a(13),i=a(0),o=a(41),d=a(53),l=a(50),u=(a(295),a(16)),j=a(1);function h(e){var t,a=e.item;"d"===a.label||"e"===a.label?t="red":"c"===a.label?t="yellow":"a"!==a.label&&"b"!==a.label||(t="green");var n="/products/"+a.barcode;return a.bcProductId&&(n+="/"+a.bcProductId),n+="?cart=no","80135463"===a.barcode&&(a.name="Nutella 200g"),Object(j.jsx)("div",{children:Object(j.jsxs)(u.b,{className:"history-item",to:n,children:[Object(j.jsx)("div",{className:"history-img-container",children:Object(j.jsx)("img",{src:a.image,alt:""})}),Object(j.jsxs)("div",{className:"history-name-container",children:[Object(j.jsx)("div",{className:"history-name",children:a.name}),Object(j.jsx)("div",{className:"history-brand",children:a.brand})]}),Object(j.jsxs)("div",{className:"history-label-container",children:[Object(j.jsx)("div",{style:{color:t},children:"\u25cf"}),Object(j.jsx)("div",{className:"history-label",children:-1==["a","b","c","d","e"].indexOf(a.label)?"":a.label})]}),Object(j.jsx)("div",{style:{marginRight:"10px",color:"rgb(41,72,102)"},children:">"})]})})}var b=function(e){Object(c.a)(a,e);var t=Object(r.a)(a);function a(e){var s;return Object(n.a)(this,a),(s=t.call(this,e)).componentDidMount=function(){s.loadLocalStorageHistory();var e=localStorage.getItem("userId"),t=localStorage.getItem("token");e&&t&&s.setState({userId:e})},s.loadHistoryInformations=function(e){fetch("https://api.lowympact.fr/api/v1/users/".concat(e,"/history"),{method:"get",credentials:"include",headers:new Headers({authorization:localStorage.getItem("token"),"Content-Type":"application/json","api-key":"99d8fb95-abdd-4885-bf6c-3a81d8874043"})}).then((function(e){return e.json()})).then((function(e){s.setState({items:null===e||void 0===e?void 0:e.data,loading:!1}),localStorage.setItem("local_history",JSON.stringify(null===e||void 0===e?void 0:e.data))}))},s.loadLocalStorageHistory=function(){var e=JSON.parse(localStorage.getItem("local_history"));if(s.setState({items:e,loading:!1}),!e){var t=localStorage.getItem("userId"),a=localStorage.getItem("token");t&&a&&(s.setState({loading:!0}),s.loadHistoryInformations(t))}},s.state={items:void 0,loading:!0,userId:void 0},s}return Object(s.a)(a,[{key:"render",value:function(){if(this.state.items){var e=Object(j.jsx)(i.Fragment,{});return e=this.loading?Object(j.jsx)("div",{className:"loader",children:Object(j.jsx)("img",{src:"/images/utils/loading.gif",alt:""})}):this.state.items.sort((function(e,t){return Date.parse(new Date(e.date))<Date.parse(new Date(t.date))?1:-1})).map((function(e){return Object(j.jsx)("div",{children:Object(j.jsx)(h,{item:e})},e.barcode+e.bcProductId)})),0===Object.keys(this.state.items).length?Object(j.jsxs)("div",{children:[Object(j.jsx)(l.a,{}),Object(j.jsx)(d.a,{}),Object(j.jsx)("div",{className:"App",children:Object(j.jsxs)("div",{children:[Object(j.jsx)("img",{src:o.a,className:"logo",alt:"Fruits"}),Object(j.jsx)("p",{className:"logo-text",children:"Commence \xe0 scanner des produits !"})]})})]}):Object(j.jsxs)("div",{children:[Object(j.jsx)("div",{className:"screen",children:Object(j.jsx)("div",{className:"screen-title",children:e})}),Object(j.jsx)(l.a,{}),Object(j.jsx)(d.a,{})]})}var t=Object(j.jsxs)("div",{children:[Object(j.jsx)("img",{src:o.a,className:"logo",alt:"Fruits"}),Object(j.jsx)("p",{className:"logo-text",children:"Commence \xe0 scanner des produits !"})]});return this.state.loading&&(t=Object(j.jsx)("div",{className:"loader",children:Object(j.jsx)("img",{src:"/images/utils/loading.gif",alt:""})})),Object(j.jsxs)("div",{children:[Object(j.jsx)(l.a,{}),Object(j.jsx)(d.a,{}),Object(j.jsx)("div",{className:"App",children:t})]})}}]),a}(i.Component);t.default=b},38:function(e,t,a){"use strict";t.a=a.p+"static/media/logo.b235ef42.svg"},41:function(e,t,a){"use strict";t.a=a.p+"static/media/fruits-vegetables-basket-by-oblik-studio.7d5e1c64.svg"},45:function(e,t,a){"use strict";t.a=a.p+"static/media/bitmap.6f490d5b.png"},47:function(e,t,a){},48:function(e,t,a){},49:function(e,t,a){},50:function(e,t,a){"use strict";a(51);var n=a(38),s=a(45),c=a(0),r=a.n(c),i=a(1);t.a=function(e){return Object(i.jsxs)("div",{children:[Object(i.jsx)("div",{children:Object(i.jsx)("img",{src:s.a,className:"blob-top",alt:"Blob"})}),e.history?Object(i.jsx)(r.a.Fragment,{}):Object(i.jsxs)(r.a.Fragment,{children:[Object(i.jsx)("div",{children:Object(i.jsx)("img",{src:s.a,className:"blob-left",alt:"Blob"})}),Object(i.jsx)("div",{children:Object(i.jsx)("img",{src:s.a,className:"blob-right",alt:"Blob"})})," "]}),Object(i.jsxs)("div",{className:"header-container",children:[Object(i.jsx)("img",{src:n.a,className:"header-logo",alt:"Logo"}),Object(i.jsx)("span",{children:"Lowympact"})]})]})}},51:function(e,t,a){},53:function(e,t,a){"use strict";var n=a(12),s=a(15),c=a(14),r=a(13),i=(a(47),a(0)),o=a.n(i),d=(a(48),a(1));var l=function(){return Object(d.jsxs)("div",{children:[Object(d.jsx)("div",{className:"button-logo",children:Object(d.jsx)("span",{className:"material-icons",children:"history"})}),Object(d.jsx)("div",{children:"Historique"})]})};var u=function(){return Object(d.jsxs)("div",{children:[Object(d.jsx)("div",{children:Object(d.jsx)("span",{className:"material-icons",children:"person"})}),Object(d.jsx)("div",{children:"Profil"})]})};var j=function(){return Object(d.jsx)("div",{children:Object(d.jsx)("div",{className:"navbar-scan-icon",children:Object(d.jsx)("span",{className:"material-icons",children:"qr_code_scanner"})})})},h=a(39),b=a.n(h),m=a(40),g=a(83),v=a.n(g),p=function(e){Object(c.a)(a,e);var t=Object(r.a)(a);function a(){var e;Object(n.a)(this,a);for(var s=arguments.length,c=new Array(s),r=0;r<s;r++)c[r]=arguments[r];return(e=t.call.apply(t,[this].concat(c))).state={error:!1,usedCamera:0,devices:[]},e.switchCamera=function(){var t=e.state.usedCamera+1;t>=e.state.devices.length&&(t=0),e.setState({usedCamera:t}),v.a.stop(),e.QuaggaInit(e.state.devices[t].deviceId)},e.componentDidMount=Object(m.a)(b.a.mark((function t(){var a,n,s,c,r,i;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,navigator.mediaDevices.enumerateDevices().then((function(e){return e}));case 2:n=t.sent,s=[],n.forEach((function(e){"videoinput"===e.kind&&s.push(e)})),e.setState({devices:s}),c=-1,r=b.a.mark((function t(n){var r;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=s[n],t.next=3,navigator.mediaDevices.getUserMedia({video:{deviceId:{exact:r.deviceId}}}).then((function(t){t.getVideoTracks().forEach((function(t){var s=t.getCapabilities();s.height.max>=c&&null!=r.label.match(/back/)&&(c=s.height.max,a=r.deviceId,e.setState({usedCamera:n}))})),t.getTracks().forEach((function(e){return e.stop()}))}),(function(e){return console.log(e)}));case 3:case"end":return t.stop()}}),t)})),t.t0=b.a.keys(s);case 9:if((t.t1=t.t0()).done){t.next=14;break}return i=t.t1.value,t.delegateYield(r(i),"t2",12);case 12:t.next=9;break;case 14:e.QuaggaInit(a);case 15:case"end":return t.stop()}}),t)}))),e.QuaggaInit=function(t){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1920,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1080;v.a.init({inputStream:{type:"LiveStream",constraints:{deviceId:t,focusMode:"continuous",width:{min:a},height:{min:n},aspectRatio:{min:1,max:2}}},locator:{patchSize:"normal",halfSample:!1},locate:!1,area:{top:"25%",right:"25%",left:"25%",bottom:"25%"},numOfWorkers:window.navigator.hardwareConcurrency||2,decoder:{readers:["ean_reader"]},debug:{drawBoundingBox:!0,showFrequency:!0,drawScanline:!0,showPattern:!0},multiple:!1,singleChannel:!1},(function(s){if(s)return 960!=a&&540!=n?e.QuaggaInit(t,960,540):e.setState({error:!0}),!1;v.a.start()})),e.props.setQuagga(v.a),v.a.onDetected(e._onDetected)},e._onDetected=function(){var t=Object(m.a)(b.a.mark((function t(a){return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.props.onDetected(a);case 2:t.sent&&v.a.stop();case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),e}return Object(s.a)(a,[{key:"componentWillUnmount",value:function(){v.a.offDetected(this._onDetected)}},{key:"render",value:function(){var e;return Object(d.jsxs)(o.a.Fragment,{children:[Object(d.jsx)("div",{id:"interactive",className:"viewport"}),(null===(e=this.state.devices)||void 0===e?void 0:e.length)>1?Object(d.jsxs)("button",{className:"code-switch-camera",onClick:this.switchCamera,children:[Object(d.jsx)("span",{className:"material-icons",children:"cameraswitch"}),this.state.usedCamera]}):Object(d.jsx)(o.a.Fragment,{}),this.state.error?Object(d.jsxs)("div",{className:"scan-error",children:["Il semblerait que votre cam\xe9ra ne soit pas d\xe9tect\xe9e. Essayez de changer de navigateur. Si le probl\xe8me persiste, contactez-nous"," ",Object(d.jsx)("a",{href:"mailto:corentin.branchereau@insa-lyon.fr?Subject=Lowympact-camera not working",children:"via ce lien"})]}):Object(d.jsx)(o.a.Fragment,{})]})}}]),a}(i.Component),f=a(84),x=a.n(f),O=a(85),w=a.n(O),y=a(2),S=(a(49),function(e){Object(c.a)(a,e);var t=Object(r.a)(a);function a(){var e;Object(n.a)(this,a);for(var s=arguments.length,c=new Array(s),r=0;r<s;r++)c[r]=arguments[r];return(e=t.call.apply(t,[this].concat(c))).state={scanning:!0,status:"",results:[],usedCameraId:"3f6fc4177028f25c3e8215f4444838450630b8d656c627ef511346545d37f302",devices:[],reading:0,barcode:void 0,bcProductId:void 0,Quagga:void 0},e.setQuagga=function(t){e.state.Quagga&&e.state.Quagga.stop(),e.setState({Quagga:t})},e._scan=function(){e.setState({scanning:!e.state.scanning,status:""})},e._onDetected=function(){var t=Object(m.a)(b.a.mark((function t(a){var n;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!a){t.next=18;break}if(!a.codeResult||!a.codeResult.code){t.next=18;break}return e.setState({results:[a],scanning:!0,status:"waiting"}),t.next=5,fetch("https://world.openfoodfacts.org/api/v0/product/".concat(a.codeResult.code,".json/"));case 5:return n=t.sent,t.next=8,n.json();case 8:if(0===t.sent.status){t.next=16;break}return e.setState({scanning:!1,status:"found",barcode:a.codeResult.code}),e.props.showScanner(!1),e.state.Quagga&&e.state.Quagga.stop(),t.abrupt("return",!0);case 16:return e.setState({scanning:!0,status:"not found"}),t.abrupt("return",!1);case 18:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),e.handleScan=function(t){if(t){var a=t.split("/");a.length>1&&e.setState({scanning:!1,barcode:a[4],bcProductId:a[5],status:"found"}),e.state.Quagga&&e.state.Quagga.stop()}},e.handleError=function(e){console.error(e)},e.displayQrCode=function(){return"found"!==e.state.status?Object(d.jsx)(x.a,{delay:300,onError:e.handleError,onScan:e.handleScan,style:{width:"100%"},showViewFinder:!1}):Object(d.jsx)(o.a.Fragment,{})},e.displayBarCode=function(){return"found"!==e.state.status?Object(d.jsxs)(o.a.Fragment,{children:[Object(d.jsx)("div",{className:"header",children:Object(d.jsx)("ul",{className:"results",children:e.state.results.map((function(t,a){var n;return Object(d.jsxs)("div",{children:["waiting"===e.state.status?"V\xe9rification du code"+(null===t||void 0===t||null===(n=t.codeResult)||void 0===n?void 0:n.code):"","not found"===e.state.status?"code non trouv\xe9, merci de r\xe9essayer":""]},t.codeResult.code+a)}))})}),e.state.scanning?Object(d.jsx)(p,{onDetected:e._onDetected,setQuagga:e.setQuagga,usedCameraId:e.usedCameraId}):null]}):Object(d.jsx)(o.a.Fragment,{})},e.switchReader=function(){e.state.reading?e.setState({reading:!1}):(e.state.Quagga&&e.state.Quagga.stop(),e.setState({reading:!0}))},e}return Object(s.a)(a,[{key:"render",value:function(){var e=this;return this.state.barcode&&this.state.bcProductId&&(this.props.barcode!==this.state.barcode||this.props.bcProductId!==this.state.bcProductId)?Object(d.jsx)(y.a,{to:"/products/"+this.state.barcode+"/"+this.state.bcProductId}):this.state.barcode&&this.props.barcode!==this.state.barcode?Object(d.jsx)(y.a,{to:"/products/"+this.state.barcode}):Object(d.jsxs)("div",{className:"code-reader-container",children:[Object(d.jsx)("span",{className:"close",onClick:function(){e.state.Quagga&&e.state.Quagga.stop(),e.props.showScanner(!1)},children:"\xd7"}),Object(d.jsxs)("div",{className:"code-switch",onClick:this.switchReader,children:[Object(d.jsxs)("div",{className:"span-code-switch",children:[Object(d.jsx)("span",{className:this.state.reading?"material-icons":"material-icons green",children:"view_week"}),Object(d.jsx)("span",{children:"Barcode"})]}),Object(d.jsx)(w.a,{onChange:this.switchReader,uncheckedIcon:!1,checkedIcon:!1,checked:this.state.reading,onColor:"#888",offColor:"#888"}),Object(d.jsxs)("div",{className:"span-code-switch",children:[Object(d.jsx)("span",{className:this.state.reading?"material-icons green":"material-icons",children:"qr_code_scanner"}),Object(d.jsx)("span",{children:"QR Code"})]})]}),this.state.reading?this.displayQrCode():this.displayBarCode()]})}}]),a}(i.Component)),N=a(16),k=function(e){Object(c.a)(a,e);var t=Object(r.a)(a);function a(){var e;Object(n.a)(this,a);for(var s=arguments.length,c=new Array(s),r=0;r<s;r++)c[r]=arguments[r];return(e=t.call.apply(t,[this].concat(c))).state={showScanner:!1,barcode:void 0,bcProductId:void 0,height:0},e.updateWindowDimensions=function(){e.setState({height:window.innerHeight})},e.handleScannerButton=function(t){e.setState({showScanner:t})},e.render=function(){return e.state.height<550?Object(d.jsx)(o.a.Fragment,{}):e.state.showScanner?Object(d.jsx)(S,{showScanner:e.handleScannerButton,history:e.props.history}):Object(d.jsx)(o.a.Fragment,{children:Object(d.jsxs)("div",{className:"navbar-container",children:[Object(d.jsx)(N.b,{to:"/history",className:"/history"===window.location.pathname?"navbar-link navbar-text-left navbar-selected":"navbar-link navbar-text-left ",children:Object(d.jsx)(l,{})}),Object(d.jsx)("div",{onClick:function(){return e.handleScannerButton(!0)},children:Object(d.jsx)("div",{className:"navbar-circle",children:Object(d.jsx)(j,{})})}),Object(d.jsx)("span",{className:"navbar-scan-text",children:"Scan"}),Object(d.jsx)(N.b,{to:"/profil",className:"/profil"===window.location.pathname?"navbar-link navbar-text-right navbar-selected":"navbar-link navbar-text-right ",children:Object(d.jsx)(u,{})})]})})},e}return Object(s.a)(a,[{key:"componentDidMount",value:function(){this.updateWindowDimensions(),window.addEventListener("resize",this.updateWindowDimensions)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.updateWindowDimensions)}}]),a}(o.a.Component);t.a=k}}]);
//# sourceMappingURL=13.9d6b3eba.chunk.js.map