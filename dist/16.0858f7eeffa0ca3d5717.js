(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{"4K7J":function(l,n,u){"use strict";u.r(n);var e=u("CcnG"),t=u("H5S2").a,o=function(){return function(){}}(),i=u("3AdZ"),r=u("pMnS"),s=u("5YYS"),c=u("oBZk"),a=u("ZZ/e"),b=u("1GNw"),p=u("qCxN"),d=u("gIcY"),f=u("mrSG"),h=u("BIUv"),m=u("psW0"),v=u("2WpN"),y=u("AytR"),g=u("Tj/N"),w=u("waB5"),S=function(){function l(l,n,u,e,t){this.socialService=l,this.userService=n,this.sessionHandler=u,this.modalCtrl=e,this.utilService=t,this.contentColor=y.a.contentColor,this.appName=y.a.appName}return l.prototype.saveEmailPassword=function(l){return f.b(this,void 0,void 0,function(){var n;return f.e(this,function(u){switch(u.label){case 0:return[4,this.busSelection()];case 1:return(n=u.sent())&&n.length>0&&(l.bus=n,this.createEmailPasswordUser(l)),[2]}})})},l.prototype.saveGoogle=function(){return f.b(this,void 0,void 0,function(){var l;return f.e(this,function(n){switch(n.label){case 0:return[4,this.busSelection()];case 1:return(l=n.sent())&&l.length>0?(this.blockUi.start(),[4,this.socialService.signIn(h.c.PROVIDER_ID).catch(this.blockUi.stop)]):[3,3];case 2:n.sent(),this.createGoogleUser(l),n.label=3;case 3:return[2]}})})},l.prototype.createGoogleUser=function(l){return f.b(this,void 0,void 0,function(){var n=this;return f.e(this,function(u){return this.socialService.authState.pipe(Object(m.a)(function(u){var e=Object(g.a)(u);return e.bus=l,n.userService.createUser(e).pipe(Object(v.a)(function(){return n.blockUi.stop()}))})).subscribe(function(l){n.sessionHandler.loginWithGoogle(l),n.utilService.showToast(l.name+" cadastrado com sucesso","success")},function(l){400===l.status&&n.utilService.showToast("Usu\xe1rio j\xe1 cadastrado","danger")}),[2]})})},l.prototype.createEmailPasswordUser=function(l){var n=this,u=l.password;this.blockUi.start(),this.userService.createUser(l).pipe(Object(v.a)(function(){return n.blockUi.stop()})).subscribe(function(l){l.password=u,n.sessionHandler.loginWithEmail(l),n.utilService.showToast(l.name+" cadastrado com sucesso","success")},function(l){400===l.status&&n.utilService.showToast("Usu\xe1rio j\xe1 cadastrado","danger")})},l.prototype.busSelection=function(){return f.b(this,void 0,void 0,function(){var l;return f.e(this,function(n){switch(n.label){case 0:return[4,this.modalCtrl.create({component:w.a})];case 1:return[4,(l=n.sent()).present()];case 2:return n.sent(),[4,l.onDidDismiss()];case 3:return[2,n.sent().data]}})})},f.c([Object(s.a)(),f.f("design:type",Object)],l.prototype,"blockUi",void 0),l}(),k=u("paZn"),q=u("AHud"),U=u("fzKE"),z=e.ob({encapsulation:2,styles:[],data:{}});function j(l){return e.Jb(0,[(l()(),e.qb(0,0,null,null,1,"block-ui",[],null,null,null,i.d,i.c)),e.pb(1,114688,null,0,s.b,[s.h],null,null),(l()(),e.qb(2,0,null,null,11,"ion-header",[],null,null,null,c.U,c.n)),e.pb(3,49152,null,0,a.B,[e.h,e.l],null,null),(l()(),e.qb(4,0,null,0,9,"ion-toolbar",[],null,null,null,c.nb,c.G)),e.pb(5,49152,null,0,a.Bb,[e.h,e.l],null,null),(l()(),e.qb(6,0,null,0,4,"ion-buttons",[["slot","start"]],null,null,null,c.L,c.e)),e.pb(7,49152,null,0,a.l,[e.h,e.l],null,null),(l()(),e.qb(8,0,null,0,2,"ion-back-button",[["defaultHref","/"]],null,[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==e.Ab(l,10).onClick(u)&&t),t},c.I,c.b)),e.pb(9,49152,null,0,a.g,[e.h,e.l],{defaultHref:[0,"defaultHref"]},null),e.pb(10,16384,null,0,a.h,[[2,a.hb],a.Gb],{defaultHref:[0,"defaultHref"]},null),(l()(),e.qb(11,0,null,0,2,"ion-title",[],null,null,null,c.mb,c.F)),e.pb(12,49152,null,0,a.zb,[e.h,e.l],{color:[0,"color"]},null),(l()(),e.Hb(13,0,[" "," "])),(l()(),e.qb(14,0,null,null,24,"ion-content",[["padding",""]],null,null,null,c.R,c.k)),e.pb(15,49152,null,0,a.u,[e.h,e.l],{color:[0,"color"]},null),(l()(),e.qb(16,0,null,0,22,"ion-grid",[],null,null,null,c.T,c.m)),e.pb(17,49152,null,0,a.A,[e.h,e.l],null,null),(l()(),e.qb(18,0,null,0,20,"ion-row",[],null,null,null,c.hb,c.A)),e.pb(19,49152,null,0,a.ib,[e.h,e.l],null,null),(l()(),e.qb(20,0,null,0,18,"ion-col",[["offsetLg","3.8"],["offsetMd","3"],["offsetXl","4.5"],["sizeLg","4.3"],["sizeMd","6"],["sizeSm","12"],["sizeXl","3"]],null,null,null,c.Q,c.j)),e.pb(21,49152,null,0,a.t,[e.h,e.l],{offsetMd:[0,"offsetMd"],offsetLg:[1,"offsetLg"],offsetXl:[2,"offsetXl"],sizeSm:[3,"sizeSm"],sizeMd:[4,"sizeMd"],sizeLg:[5,"sizeLg"],sizeXl:[6,"sizeXl"]},null),(l()(),e.qb(22,0,null,0,16,"ion-card",[["color","white"],["padding",""],["style","margin-top: 27%"],["text-center",""]],null,null,null,c.O,c.f)),e.pb(23,49152,null,0,a.m,[e.h,e.l],{color:[0,"color"]},null),(l()(),e.qb(24,0,null,0,2,"ion-title",[],null,null,null,c.mb,c.F)),e.pb(25,49152,null,0,a.zb,[e.h,e.l],null,null),(l()(),e.Hb(-1,0,["NOVA CONTA"])),(l()(),e.qb(27,0,null,0,11,"ion-card-content",[],null,null,null,c.M,c.g)),e.pb(28,49152,null,0,a.n,[e.h,e.l],null,null),(l()(),e.qb(29,0,null,0,1,"app-email-password-form",[],null,[[null,"userSubmitted"]],function(l,n,u){var e=!0;return"userSubmitted"===n&&(e=!1!==l.component.saveEmailPassword(u)&&e),e},b.b,b.a)),e.pb(30,114688,null,0,p.a,[d.b],null,{userSubmitted:"userSubmitted"}),(l()(),e.qb(31,0,null,0,3,"div",[["margin-vertical",""]],null,null,null,null,null)),(l()(),e.qb(32,0,null,null,2,"ion-label",[],null,null,null,c.bb,c.u)),e.pb(33,49152,null,0,a.N,[e.h,e.l],null,null),(l()(),e.Hb(-1,0,["OU"])),(l()(),e.qb(35,0,null,0,3,"ion-button",[["color","primary"],["expand","block"],["fill","outline"]],null,[[null,"click"]],function(l,n,u){var e=!0;return"click"===n&&(e=!1!==l.component.saveGoogle()&&e),e},c.K,c.d)),e.pb(36,49152,null,0,a.k,[e.h,e.l],{color:[0,"color"],expand:[1,"expand"],fill:[2,"fill"]},null),(l()(),e.qb(37,0,null,0,1,"ion-icon",[["name","logo-google"]],null,null,null,c.V,c.o)),e.pb(38,49152,null,0,a.C,[e.h,e.l],{name:[0,"name"]},null)],function(l,n){var u=n.component;l(n,1,0),l(n,9,0,"/"),l(n,10,0,"/"),l(n,12,0,u.contentColor),l(n,15,0,u.contentColor),l(n,21,0,"3","3.8","4.5","12","6","4.3","3"),l(n,23,0,"white"),l(n,30,0),l(n,36,0,"primary","block","outline"),l(n,38,0,"logo-google")},function(l,n){l(n,13,0,n.component.appName)})}function H(l){return e.Jb(0,[(l()(),e.qb(0,0,null,null,1,"app-new-account",[],null,null,null,j,z)),e.pb(1,49152,null,0,S,[h.a,k.a,q.a,a.Fb,U.a],null,null)],null,null)}var N=e.mb("app-new-account",S,H,{},{},[]),C=u("Ip0R"),O=u("t/Na"),A=u("W7mc"),G=u("ZYCi");u.d(n,"NewAccountModuleNgFactory",function(){return I});var I=e.nb(o,[],function(l){return e.xb([e.yb(512,e.j,e.cb,[[8,[i.a,i.b,r.a,N]],[3,e.j],e.y]),e.yb(4608,C.m,C.l,[e.v,[2,C.s]]),e.yb(4608,a.b,a.b,[e.A,e.g]),e.yb(4608,a.Fb,a.Fb,[a.b,e.j,e.r,C.d]),e.yb(4608,a.Ib,a.Ib,[a.b,e.j,e.r,C.d]),e.yb(4608,d.o,d.o,[]),e.yb(5120,h.b,t,[]),e.yb(4608,h.a,h.a,[h.b]),e.yb(4608,d.b,d.b,[]),e.yb(5120,s.h,s.g,[s.f]),e.yb(4608,s.e,s.e,[s.h]),e.yb(4608,k.a,k.a,[O.c]),e.yb(1073742336,C.b,C.b,[]),e.yb(1073742336,a.Db,a.Db,[]),e.yb(1073742336,d.m,d.m,[]),e.yb(1073742336,d.e,d.e,[]),e.yb(1073742336,h.d,h.d,[]),e.yb(1073742336,s.d,s.d,[]),e.yb(1073742336,d.k,d.k,[]),e.yb(1073742336,A.a,A.a,[]),e.yb(1073742336,G.o,G.o,[[2,G.u],[2,G.m]]),e.yb(1073742336,o,o,[]),e.yb(256,s.f,{},[]),e.yb(1024,G.k,function(){return[[{path:"",component:S}]]},[])])})}}]);