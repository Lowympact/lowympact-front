(this.webpackJsonplowympact=this.webpackJsonplowympact||[]).push([[7],{296:function(e,t,n){},316:function(e,t,n){"use strict";n.r(t);var a=n(12),c=n(15),s=n(14),r=n(13),i=n(0),o=n.n(i),d=n(53),l=n(50),u=(n(296),n(16)),h=n(58),j=n.n(h),b=n(1),f=function(e){Object(s.a)(n,e);var t=Object(r.a)(n);function n(){var e;Object(a.a)(this,n);for(var c=arguments.length,s=new Array(c),r=0;r<c;r++)s[r]=arguments[r];return(e=t.call.apply(t,[this].concat(s))).state={connected:!1},e.disconnect=function(){localStorage.clear(),e.props.history.push("/login")},e.componentDidMount=function(){e.Verify()},e.Verify=function(){var t=!0,n=localStorage.getItem("token");if(n){var a=j.a.decode(n,{complete:!0}),c=new Date;a.payload.exp>=c.getTime()/1e3&&(t=!1)}!1===t&&e.setState({connected:!0})},e.displayConnectedProfil=function(){return Object(b.jsxs)(o.a.Fragment,{children:[Object(b.jsx)("h2",{className:"profil-title",children:"Bienvenue sur ton profil!"}),Object(b.jsx)(u.b,{to:"/stats",className:"profil-button",children:"Statistiques"}),Object(b.jsx)(u.b,{to:"/configuration",className:"profil-button",children:"Configuration"}),Object(b.jsx)("div",{onClick:e.disconnect,className:"profil-button",children:"D\xe9connecter"})]})},e.displayUnconnectedProfil=function(){return Object(b.jsxs)(o.a.Fragment,{children:[Object(b.jsx)("h2",{className:"profil-title",children:"Non connect\xe9"}),Object(b.jsx)("p",{children:"Connecte toi pour que ton historique soit sauvegard\xe9 !"}),Object(b.jsx)(u.b,{to:"/login",className:"profil-button",children:"Me Connecter"})]})},e}return Object(c.a)(n,[{key:"render",value:function(){return Object(b.jsxs)("div",{children:[Object(b.jsx)(u.b,{to:"/",children:Object(b.jsx)(l.a,{})}),Object(b.jsxs)("div",{className:"profil-screen",children:[Object(b.jsx)("div",{className:"profil-picture",children:Object(b.jsx)("div",{className:"material-icons",children:"person"})}),this.state.connected?this.displayConnectedProfil():this.displayUnconnectedProfil()]}),Object(b.jsx)(d.a,{})]})}}]),n}(o.a.Component);t.default=f},38:function(e,t,n){"use strict";t.a=n.p+"static/media/logo.b235ef42.svg"},45:function(e,t,n){"use strict";t.a=n.p+"static/media/bitmap.6f490d5b.png"},47:function(e,t,n){},48:function(e,t,n){},49:function(e,t,n){},50:function(e,t,n){"use strict";n(51);var a=n(38),c=n(45),s=n(0),r=n.n(s),i=n(1);t.a=function(e){return Object(i.jsxs)("div",{children:[Object(i.jsx)("div",{children:Object(i.jsx)("img",{src:c.a,className:"blob-top",alt:"Blob"})}),e.history?Object(i.jsx)(r.a.Fragment,{}):Object(i.jsxs)(r.a.Fragment,{children:[Object(i.jsx)("div",{children:Object(i.jsx)("img",{src:c.a,className:"blob-left",alt:"Blob"})}),Object(i.jsx)("div",{children:Object(i.jsx)("img",{src:c.a,className:"blob-right",alt:"Blob"})})," "]}),Object(i.jsxs)("div",{className:"header-container",children:[Object(i.jsx)("img",{src:a.a,className:"header-logo",alt:"Logo"}),Object(i.jsx)("span",{children:"Lowympact"})]})]})}},51:function(e,t,n){},53:function(e,t,n){"use strict";var a=n(12),c=n(15),s=n(14),r=n(13),i=(n(47),n(0)),o=n.n(i),d=(n(48),n(1));var l=function(){return Object(d.jsxs)("div",{children:[Object(d.jsx)("div",{className:"button-logo",children:Object(d.jsx)("span",{className:"material-icons",children:"history"})}),Object(d.jsx)("div",{children:"Historique"})]})};var u=function(){return Object(d.jsxs)("div",{children:[Object(d.jsx)("div",{children:Object(d.jsx)("span",{className:"material-icons",children:"person"})}),Object(d.jsx)("div",{children:"Profil"})]})};var h=function(){return Object(d.jsx)("div",{children:Object(d.jsx)("div",{className:"navbar-scan-icon",children:Object(d.jsx)("span",{className:"material-icons",children:"qr_code_scanner"})})})},j=n(39),b=n.n(j),f=n(40),p=n(83),v=n.n(p),m=function(e){Object(s.a)(n,e);var t=Object(r.a)(n);function n(){var e;Object(a.a)(this,n);for(var c=arguments.length,s=new Array(c),r=0;r<c;r++)s[r]=arguments[r];return(e=t.call.apply(t,[this].concat(s))).state={error:!1,usedCamera:0,devices:[]},e.switchCamera=function(){var t=e.state.usedCamera+1;t>=e.state.devices.length&&(t=0),e.setState({usedCamera:t}),v.a.stop(),e.QuaggaInit(e.state.devices[t].deviceId)},e.componentDidMount=Object(f.a)(b.a.mark((function t(){var n,a,c,s,r,i;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,navigator.mediaDevices.enumerateDevices().then((function(e){return e}));case 2:a=t.sent,c=[],a.forEach((function(e){"videoinput"===e.kind&&c.push(e)})),e.setState({devices:c}),s=-1,r=b.a.mark((function t(a){var r;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=c[a],t.next=3,navigator.mediaDevices.getUserMedia({video:{deviceId:{exact:r.deviceId}}}).then((function(t){t.getVideoTracks().forEach((function(t){var c=t.getCapabilities();c.height.max>=s&&null!=r.label.match(/back/)&&(s=c.height.max,n=r.deviceId,e.setState({usedCamera:a}))})),t.getTracks().forEach((function(e){return e.stop()}))}),(function(e){return console.log(e)}));case 3:case"end":return t.stop()}}),t)})),t.t0=b.a.keys(c);case 9:if((t.t1=t.t0()).done){t.next=14;break}return i=t.t1.value,t.delegateYield(r(i),"t2",12);case 12:t.next=9;break;case 14:e.QuaggaInit(n);case 15:case"end":return t.stop()}}),t)}))),e.QuaggaInit=function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1920,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1080;v.a.init({inputStream:{type:"LiveStream",constraints:{deviceId:t,focusMode:"continuous",width:{min:n},height:{min:a},aspectRatio:{min:1,max:2}}},locator:{patchSize:"normal",halfSample:!1},locate:!1,area:{top:"25%",right:"25%",left:"25%",bottom:"25%"},numOfWorkers:window.navigator.hardwareConcurrency||2,decoder:{readers:["ean_reader"]},debug:{drawBoundingBox:!0,showFrequency:!0,drawScanline:!0,showPattern:!0},multiple:!1,singleChannel:!1},(function(c){if(c)return 960!=n&&540!=a?e.QuaggaInit(t,960,540):e.setState({error:!0}),!1;v.a.start()})),e.props.setQuagga(v.a),v.a.onDetected(e._onDetected)},e._onDetected=function(){var t=Object(f.a)(b.a.mark((function t(n){return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.props.onDetected(n);case 2:t.sent&&v.a.stop();case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),e}return Object(c.a)(n,[{key:"componentWillUnmount",value:function(){v.a.offDetected(this._onDetected)}},{key:"render",value:function(){var e;return Object(d.jsxs)(o.a.Fragment,{children:[Object(d.jsx)("div",{id:"interactive",className:"viewport"}),(null===(e=this.state.devices)||void 0===e?void 0:e.length)>1?Object(d.jsxs)("button",{className:"code-switch-camera",onClick:this.switchCamera,children:[Object(d.jsx)("span",{className:"material-icons",children:"cameraswitch"}),this.state.usedCamera]}):Object(d.jsx)(o.a.Fragment,{}),this.state.error?Object(d.jsxs)("div",{className:"scan-error",children:["Il semblerait que votre cam\xe9ra ne soit pas d\xe9tect\xe9e. Essayez de changer de navigateur. Si le probl\xe8me persiste, contactez-nous"," ",Object(d.jsx)("a",{href:"mailto:corentin.branchereau@insa-lyon.fr?Subject=Lowympact-camera not working",children:"via ce lien"})]}):Object(d.jsx)(o.a.Fragment,{})]})}}]),n}(i.Component),g=n(84),x=n.n(g),O=n(85),w=n.n(O),y=n(2),k=(n(49),function(e){Object(s.a)(n,e);var t=Object(r.a)(n);function n(){var e;Object(a.a)(this,n);for(var c=arguments.length,s=new Array(c),r=0;r<c;r++)s[r]=arguments[r];return(e=t.call.apply(t,[this].concat(s))).state={scanning:!0,status:"",results:[],usedCameraId:"3f6fc4177028f25c3e8215f4444838450630b8d656c627ef511346545d37f302",devices:[],reading:0,barcode:void 0,bcProductId:void 0,Quagga:void 0},e.setQuagga=function(t){e.state.Quagga&&e.state.Quagga.stop(),e.setState({Quagga:t})},e._scan=function(){e.setState({scanning:!e.state.scanning,status:""})},e._onDetected=function(){var t=Object(f.a)(b.a.mark((function t(n){var a;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!n){t.next=18;break}if(!n.codeResult||!n.codeResult.code){t.next=18;break}return e.setState({results:[n],scanning:!0,status:"waiting"}),t.next=5,fetch("https://world.openfoodfacts.org/api/v0/product/".concat(n.codeResult.code,".json/"));case 5:return a=t.sent,t.next=8,a.json();case 8:if(0===t.sent.status){t.next=16;break}return e.setState({scanning:!1,status:"found",barcode:n.codeResult.code}),e.props.showScanner(!1),e.state.Quagga&&e.state.Quagga.stop(),t.abrupt("return",!0);case 16:return e.setState({scanning:!0,status:"not found"}),t.abrupt("return",!1);case 18:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),e.handleScan=function(t){if(t){var n=t.split("/");n.length>1&&e.setState({scanning:!1,barcode:n[4],bcProductId:n[5],status:"found"}),e.state.Quagga&&e.state.Quagga.stop()}},e.handleError=function(e){console.error(e)},e.displayQrCode=function(){return"found"!==e.state.status?Object(d.jsx)(x.a,{delay:300,onError:e.handleError,onScan:e.handleScan,style:{width:"100%"},showViewFinder:!1}):Object(d.jsx)(o.a.Fragment,{})},e.displayBarCode=function(){return"found"!==e.state.status?Object(d.jsxs)(o.a.Fragment,{children:[Object(d.jsx)("div",{className:"header",children:Object(d.jsx)("ul",{className:"results",children:e.state.results.map((function(t,n){var a;return Object(d.jsxs)("div",{children:["waiting"===e.state.status?"V\xe9rification du code"+(null===t||void 0===t||null===(a=t.codeResult)||void 0===a?void 0:a.code):"","not found"===e.state.status?"code non trouv\xe9, merci de r\xe9essayer":""]},t.codeResult.code+n)}))})}),e.state.scanning?Object(d.jsx)(m,{onDetected:e._onDetected,setQuagga:e.setQuagga,usedCameraId:e.usedCameraId}):null]}):Object(d.jsx)(o.a.Fragment,{})},e.switchReader=function(){e.state.reading?e.setState({reading:!1}):(e.state.Quagga&&e.state.Quagga.stop(),e.setState({reading:!0}))},e}return Object(c.a)(n,[{key:"render",value:function(){var e=this;return this.state.barcode&&this.state.bcProductId&&(this.props.barcode!==this.state.barcode||this.props.bcProductId!==this.state.bcProductId)?Object(d.jsx)(y.a,{to:"/products/"+this.state.barcode+"/"+this.state.bcProductId}):this.state.barcode&&this.props.barcode!==this.state.barcode?Object(d.jsx)(y.a,{to:"/products/"+this.state.barcode}):Object(d.jsxs)("div",{className:"code-reader-container",children:[Object(d.jsx)("span",{className:"close",onClick:function(){e.state.Quagga&&e.state.Quagga.stop(),e.props.showScanner(!1)},children:"\xd7"}),Object(d.jsxs)("div",{className:"code-switch",onClick:this.switchReader,children:[Object(d.jsxs)("div",{className:"span-code-switch",children:[Object(d.jsx)("span",{className:this.state.reading?"material-icons":"material-icons green",children:"view_week"}),Object(d.jsx)("span",{children:"Barcode"})]}),Object(d.jsx)(w.a,{onChange:this.switchReader,uncheckedIcon:!1,checkedIcon:!1,checked:this.state.reading,onColor:"#888",offColor:"#888"}),Object(d.jsxs)("div",{className:"span-code-switch",children:[Object(d.jsx)("span",{className:this.state.reading?"material-icons green":"material-icons",children:"qr_code_scanner"}),Object(d.jsx)("span",{children:"QR Code"})]})]}),this.state.reading?this.displayQrCode():this.displayBarCode()]})}}]),n}(i.Component)),N=n(16),S=function(e){Object(s.a)(n,e);var t=Object(r.a)(n);function n(){var e;Object(a.a)(this,n);for(var c=arguments.length,s=new Array(c),r=0;r<c;r++)s[r]=arguments[r];return(e=t.call.apply(t,[this].concat(s))).state={showScanner:!1,barcode:void 0,bcProductId:void 0,height:0},e.updateWindowDimensions=function(){e.setState({height:window.innerHeight})},e.handleScannerButton=function(t){e.setState({showScanner:t})},e.render=function(){return e.state.height<550?Object(d.jsx)(o.a.Fragment,{}):e.state.showScanner?Object(d.jsx)(k,{showScanner:e.handleScannerButton,history:e.props.history}):Object(d.jsx)(o.a.Fragment,{children:Object(d.jsxs)("div",{className:"navbar-container",children:[Object(d.jsx)(N.b,{to:"/history",className:"/history"===window.location.pathname?"navbar-link navbar-text-left navbar-selected":"navbar-link navbar-text-left ",children:Object(d.jsx)(l,{})}),Object(d.jsx)("div",{onClick:function(){return e.handleScannerButton(!0)},children:Object(d.jsx)("div",{className:"navbar-circle",children:Object(d.jsx)(h,{})})}),Object(d.jsx)("span",{className:"navbar-scan-text",children:"Scan"}),Object(d.jsx)(N.b,{to:"/profil",className:"/profil"===window.location.pathname?"navbar-link navbar-text-right navbar-selected":"navbar-link navbar-text-right ",children:Object(d.jsx)(u,{})})]})})},e}return Object(c.a)(n,[{key:"componentDidMount",value:function(){this.updateWindowDimensions(),window.addEventListener("resize",this.updateWindowDimensions)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.updateWindowDimensions)}}]),n}(o.a.Component);t.a=S},59:function(e,t){},60:function(e,t){},62:function(e,t){},63:function(e,t){},67:function(e,t){},68:function(e,t){},69:function(e,t){},70:function(e,t){},71:function(e,t){},72:function(e,t){},73:function(e,t){},74:function(e,t){}}]);
//# sourceMappingURL=7.aeafabb3.chunk.js.map