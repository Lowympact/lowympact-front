(this.webpackJsonplowympact=this.webpackJsonplowympact||[]).push([[4],{113:function(e,t,a){},41:function(e,t,a){"use strict";t.a=a.p+"static/media/logo.b235ef42.svg"},42:function(e,t,a){"use strict";var n=a(12),s=a(15),r=a(14),c=a(13),i=(a(49),a(0)),o=a.n(i),d=(a(50),a(1));var l=function(){return Object(d.jsxs)("div",{children:[Object(d.jsx)("div",{className:"button-logo",children:Object(d.jsx)("span",{className:"material-icons",children:"history"})}),Object(d.jsx)("div",{children:"Historique"})]})};var u=function(){return Object(d.jsxs)("div",{children:[Object(d.jsx)("div",{children:Object(d.jsx)("span",{className:"material-icons",children:"person"})}),Object(d.jsx)("div",{children:"Profil"})]})};var h=function(){return Object(d.jsx)("div",{children:Object(d.jsx)("div",{className:"navbar-scan-icon",children:Object(d.jsx)("span",{className:"material-icons",children:"qr_code_scanner"})})})},b=a(39),j=a.n(b),g=a(40),m=a(80),p=a(81),v=a.n(p),f=a(82),x=a.n(f),O=function(e){Object(r.a)(a,e);var t=Object(c.a)(a);function a(){var e;Object(n.a)(this,a);for(var s=arguments.length,r=new Array(s),c=0;c<s;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={error:!1,noBackCamera:!1,usedCamera:0,devices:[],processingImage:0,text:0,mutlipleTracks:!1,no_permission:!1},e.switchCamera=function(){var t=e.state.usedCamera+1;t>=e.state.devices.length&&(t=0),e.setState({usedCamera:t}),v.a.stop(),e.QuaggaInit(e.state.devices[t].deviceId)},e.componentDidMount=Object(g.a)(j.a.mark((function t(){var a,n,s,r,c,i;return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(t.prev=0,a=window.location.search,n=new URLSearchParams(a),"false"!=n.get("camera")){t.next=8;break}e.setState({error:!0,text:1}),t.next=25;break;case 8:if(!(navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia)){t.next=24;break}return t.next=11,navigator.mediaDevices.enumerateDevices().then((function(e){return e.filter((function(e){return"videoinput"===e.kind}))}));case 11:return s=t.sent,e.setState({devices:s}),0===(r=s.filter((function(e){return null!=e.label.match(/back/)}))).length&&(e.setState({noBackCamera:!0}),r=s),console.log(r),c=r.map(function(){var t=Object(g.a)(j.a.mark((function t(a){return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,navigator.mediaDevices.getUserMedia({video:{deviceId:{exact:a.deviceId}}}).then((function(t){var a=t.getVideoTracks().map((function(e){return console.log(e),e.getCapabilities?e.getCapabilities():[{}]}));return t.getTracks().forEach((function(e){return e.stop()})),a.length>1&&e.setState({mutlipleTracks:!0}),a&&a.length>0?a[0]:{}}),(function(e){return console.log(e)}));case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),t.next=19,Promise.all(c);case 19:(i=t.sent)&&i.length>0&&i.sort((function(e,t){return(e.width.max+e.height.max)/2>(t.width.max+t.height.max)/2?-1:1})),i[0],e.QuaggaInit({}),t.next=25;break;case 24:e.setState({error:!0,text:3});case 25:t.next=30;break;case 27:t.prev=27,t.t0=t.catch(0),e.QuaggaInit({});case 30:case"end":return t.stop()}}),t,null,[[0,27]])}))),e.QuaggaInit=function(t){console.log(t),0==Object.keys(t).length&&e.setState({text:"vide"}),v.a.init({inputStream:{type:"LiveStream",constraints:Object(m.a)(Object(m.a)({},t),{},{facingMode:"environment"})},locator:{patchSize:"normal",halfSample:!1},locate:!1,area:{top:"40%",right:"25%",left:"25%",bottom:"40%"},numOfWorkers:window.navigator.hardwareConcurrency||2,decoder:{readers:["ean_reader"]},multiple:!1,singleChannel:!1},(function(a){if(a)return console.log(a),"NotAllowedError: Permission denied"==a&&e.setState({no_permission:!0}),e.setState({error:!0,text:a+" "+JSON.stringify(t)}),!1;v.a.start()})),e.props.setQuagga(v.a),v.a.onDetected(e._onDetected)},e._onDetected=function(){var t=Object(g.a)(j.a.mark((function t(a){var n;return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.props.onDetected(a);case 2:n=t.sent,console.log(n),n&&v.a.stop();case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),e.onDrop=function(t){try{if(1!=e.state.processingImage){e.setState({processingImage:1}),console.log(t[t.length-1]);var a=new FileReader;a.readAsDataURL(t[t.length-1]),a.onloadend=function(){v.a.decodeSingle({decoder:{readers:["ean_reader"]},locate:!0,src:a.result},(function(t){var a;(console.log(t),t)?(e._onDetected(t),e.setState({processingImage:2}),console.log("result",null===(a=t.codeResult)||void 0===a?void 0:a.code)):(console.log("not detected"),e.setState({processingImage:3}))}))}}}catch(n){console.log(n),e.setState({processingImage:4})}},e.setImport=function(){e.setState({error:!e.state.error})},e}return Object(s.a)(a,[{key:"componentWillUnmount",value:function(){v.a.offDetected(this._onDetected)}},{key:"render",value:function(){var e,t=Object(d.jsx)(o.a.Fragment,{});return 1==this.state.processingImage&&(t=Object(d.jsx)(o.a.Fragment,{children:Object(d.jsx)("p",{children:"Chargement en cours..."})})),2==this.state.processingImage&&(t=Object(d.jsx)(o.a.Fragment,{children:Object(d.jsx)("p",{children:"Ce produit n'existe pas dans la base de donn\xe9es"})})),3==this.state.processingImage&&(t=Object(d.jsx)(o.a.Fragment,{children:Object(d.jsx)("p",{children:"Code barre non trouv\xe9 sur l'image, merci de r\xe9essayer"})})),4==this.state.processingImage&&(t=Object(d.jsx)(o.a.Fragment,{children:Object(d.jsxs)("p",{children:["Mauvais format ou fichier trop grand, merci de r\xe9essayer. ",Object(d.jsx)("br",{}),"Taille max : 5mb ",Object(d.jsx)("br",{}),"Formats: jpg, png, gif"]})})),Object(d.jsxs)(o.a.Fragment,{children:[Object(d.jsx)("div",{id:"interactive",className:this.state.error?"hidden":"viewport"}),(null===(e=this.state.devices)||void 0===e?void 0:e.length)>1?Object(d.jsxs)("button",{className:"code-switch-camera",onClick:this.switchCamera,children:[Object(d.jsx)("span",{className:"material-icons",children:"cameraswitch"}),this.state.usedCamera]}):Object(d.jsx)(o.a.Fragment,{}),this.state.error?Object(d.jsxs)("div",{className:"scan-error",children:[Object(d.jsx)(x.a,{withIcon:!0,withPreview:!1,buttonText:Object(d.jsxs)("div",{className:"button-import",children:[Object(d.jsx)("div",{className:"material-icons",children:"add_a_photo"}),Object(d.jsx)("p",{children:"Prendre une photo"})]}),onChange:this.onDrop,label:"",imgExtension:[".jpg",".gif",".png",".jpeg"],maxFileSize:5242880,labelClass:"import-label"}),Object(d.jsx)("p",{className:"red",children:t}),Object(d.jsxs)("p",{className:"error-message-import",children:[this.state.no_permission?Object(d.jsx)("div",{className:"no-permission",children:"L'acc\xe8s \xe0 votre cam\xe9ra est bloqu\xe9 : Vous pouvez l'autoriser dans les param\xe8tres de votre navigateur pour acc\xe9der au scanner"}):Object(d.jsx)(o.a.Fragment,{}),Object(d.jsx)("br",{})]})]}):Object(d.jsx)(o.a.Fragment,{}),this.state.mutlipleTracks?Object(d.jsx)("h1",{className:"debug",children:"If you see this, tell me"}):"",Object(d.jsx)("div",{className:"debug",children:this.state.text})]})}}]),a}(i.Component),w=a(83),S=a.n(w),k=(a(84),a(2)),y=(a(51),function(e){Object(r.a)(a,e);var t=Object(c.a)(a);function a(){var e;Object(n.a)(this,a);for(var s=arguments.length,r=new Array(s),c=0;c<s;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={scanning:!0,status:"",results:[],usedCameraId:"3f6fc4177028f25c3e8215f4444838450630b8d656c627ef511346545d37f302",devices:[],reading:!1,barcode:void 0,bcProductId:void 0,Quagga:void 0},e.setQuagga=function(t){e.state.Quagga&&e.state.Quagga.stop(),e.setState({Quagga:t})},e._scan=function(){e.setState({scanning:!e.state.scanning,status:""})},e._onDetected=function(){var t=Object(g.a)(j.a.mark((function t(a){var n;return j.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!a){t.next=18;break}if(!a.codeResult||!a.codeResult.code){t.next=18;break}return e.setState({results:[a],scanning:!0,status:"waiting"}),t.next=5,fetch("https://world.openfoodfacts.org/api/v0/product/".concat(a.codeResult.code,".json/"));case 5:return n=t.sent,t.next=8,n.json();case 8:if(0===t.sent.status){t.next=16;break}return e.setState({scanning:!1,status:"found",barcode:a.codeResult.code}),e.props.showScanner(!1),e.state.Quagga&&e.state.Quagga.stop(),t.abrupt("return",!0);case 16:return e.setState({scanning:!0,status:"not found"}),t.abrupt("return",!1);case 18:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),e.handleScan=function(t){if(t){var a=t.split("/");a.length>1&&e.setState({scanning:!1,barcode:a[4],bcProductId:a[5],status:"found"}),e.state.Quagga&&e.state.Quagga.stop()}},e.handleError=function(e){console.error(e)},e.displayQrCode=function(){return"found"!==e.state.status?Object(d.jsx)(S.a,{delay:300,onError:e.handleError,onScan:e.handleScan,style:{width:"100%"},showViewFinder:!1}):Object(d.jsx)(o.a.Fragment,{})},e.displayBarCode=function(){return"found"!==e.state.status?Object(d.jsxs)(o.a.Fragment,{children:[Object(d.jsx)("div",{className:"header",children:Object(d.jsx)("ul",{className:"results",children:e.state.results.map((function(t,a){var n;return Object(d.jsxs)("div",{children:["waiting"===e.state.status?"V\xe9rification du code : "+(null===t||void 0===t||null===(n=t.codeResult)||void 0===n?void 0:n.code):"","not found"===e.state.status?"Code non trouv\xe9, merci de r\xe9essayer":""]},t.codeResult.code+a)}))})}),e.state.scanning?Object(d.jsx)(O,{onDetected:e._onDetected,setQuagga:e.setQuagga,usedCameraId:e.usedCameraId}):null]}):Object(d.jsx)(o.a.Fragment,{})},e.switchReader=function(){e.state.reading?e.setState({reading:!1}):(e.state.Quagga&&e.state.Quagga.stop(),e.setState({reading:!0}))},e}return Object(s.a)(a,[{key:"render",value:function(){var e=this;return this.state.barcode&&this.state.bcProductId&&(this.props.barcode!==this.state.barcode||this.props.bcProductId!==this.state.bcProductId)?Object(d.jsx)(k.a,{to:"/products/"+this.state.barcode+"/"+this.state.bcProductId}):this.state.barcode&&this.props.barcode!==this.state.barcode?Object(d.jsx)(k.a,{to:"/products/"+this.state.barcode}):Object(d.jsxs)("div",{className:"code-reader-container",children:[Object(d.jsx)("span",{className:"close",onClick:function(){e.state.Quagga&&e.state.Quagga.stop(),e.props.showScanner(!1)},children:"\xd7"}),this.displayBarCode()]})}}]),a}(i.Component)),N=a(16),C=function(e){Object(r.a)(a,e);var t=Object(c.a)(a);function a(){var e;Object(n.a)(this,a);for(var s=arguments.length,r=new Array(s),c=0;c<s;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={showScanner:!1,barcode:void 0,bcProductId:void 0,height:0},e.updateWindowDimensions=function(){e.setState({height:window.innerHeight})},e.handleScannerButton=function(t){e.setState({showScanner:t})},e.render=function(){return e.state.height<550?Object(d.jsx)(o.a.Fragment,{}):e.state.showScanner?Object(d.jsx)(y,{showScanner:e.handleScannerButton,history:e.props.history}):Object(d.jsx)(o.a.Fragment,{children:Object(d.jsxs)("div",{className:"navbar-container",children:[Object(d.jsx)(N.b,{to:"/history",className:"/history"===window.location.pathname?"navbar-link navbar-text-left navbar-selected":"navbar-link navbar-text-left ",children:Object(d.jsx)(l,{})}),Object(d.jsx)("div",{onClick:function(){return e.handleScannerButton(!0)},children:Object(d.jsx)("div",{className:"navbar-circle",children:Object(d.jsx)(h,{})})}),Object(d.jsx)("span",{className:"navbar-scan-text",children:"Scan"}),Object(d.jsx)(N.b,{to:"/profil",className:"/profil"===window.location.pathname?"navbar-link navbar-text-right navbar-selected":"navbar-link navbar-text-right ",children:Object(d.jsx)(u,{})})]})})},e}return Object(s.a)(a,[{key:"componentDidMount",value:function(){this.updateWindowDimensions(),window.addEventListener("resize",this.updateWindowDimensions)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.updateWindowDimensions)}}]),a}(o.a.Component);t.a=C},43:function(e,t,a){"use strict";a(52);var n=a(41),s=a(47),r=a(0),c=a.n(r),i=a(1);t.a=function(e){return Object(i.jsxs)("div",{children:[Object(i.jsx)("div",{children:Object(i.jsx)("img",{src:s.a,className:"blob-top",alt:"Blob"})}),e.history?Object(i.jsx)(c.a.Fragment,{}):Object(i.jsxs)(c.a.Fragment,{children:[Object(i.jsx)("div",{children:Object(i.jsx)("img",{src:s.a,className:"blob-left",alt:"Blob"})}),Object(i.jsx)("div",{children:Object(i.jsx)("img",{src:s.a,className:"blob-right",alt:"Blob"})})," "]}),Object(i.jsxs)("div",{className:"header-container",children:[Object(i.jsx)("img",{src:n.a,className:"header-logo",alt:"Logo"}),Object(i.jsx)("span",{children:"Lowympact"})]})]})}},47:function(e,t,a){"use strict";t.a=a.p+"static/media/bitmap.6f490d5b.png"},49:function(e,t,a){},50:function(e,t,a){},51:function(e,t,a){},52:function(e,t,a){}}]);
//# sourceMappingURL=4.839bffa2.chunk.js.map