
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
<<<<<<< HEAD
var __uniConfig = {"pages":["pages/login/login","pages/index/index","pages/my/my","pages/sign/sign","pages/share/share","pages/upload/upload","pages/leave/leave","pages/signSuccess/signSuccess","pages/signFail/signFail","pages/evaluate/evaluate","pages/evaluateOnline/evaluateOnline","pages/todoList/todoList","pages/todoDetail/todoDetail1","pages/todoDetail/todoDetail2","pages/todoDetail/todoDetail3","pages/todoDetail/todoDetail4","pages/todoDetail/todoDetail5","pages/todoDetail/todoDetail6","pages/webView/webView"],"window":{"navigationBarTextStyle":"white","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#da2a2a","backgroundColor":"#da2a2a"},"tabBar":{"color":"#666","selectedColor":"#f07373","backgroundColor":"#fff","borderStyle":"#ddd","list":[{"pagePath":"pages/index/index","iconPath":"static/tab/home.png","selectedIconPath":"static/tab/home-active.png","text":"首页"},{"pagePath":"pages/my/my","iconPath":"static/tab/my.png","selectedIconPath":"static/tab/my-active.png","text":"我的"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"weex","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"党建","compilerVersion":"3.1.22","entryPagePath":"pages/login/login","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/login/login","meta":{"isQuit":true},"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"","navigationBarBackgroundColor":"#fff","backgroundColor":"#fff","enablePullDownRefresh":false}},{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"天翼党建云","enablePullDownRefresh":true,"titleNView":{"buttons":[{"fontSrc":"/static/fonts/iconfont.ttf","text":"","fontSize":"20","color":"#ffffff","float":"left","background":"rgba(0,0,0,0)"},{"fontSrc":"/static/fonts/iconfont.ttf","text":"","fontSize":"22","color":"#ffffff","float":"right","background":"rgba(0,0,0,0)"}]}}},{"path":"/pages/my/my","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的","enablePullDownRefresh":false}},{"path":"/pages/sign/sign","meta":{},"window":{"navigationBarTitleText":"签到/请假","enablePullDownRefresh":true,"onReachBottomDistance":100}},{"path":"/pages/share/share","meta":{},"window":{"navigationBarTitleText":"分享上传","enablePullDownRefresh":true}},{"path":"/pages/upload/upload","meta":{},"window":{"navigationBarTitleText":"分享上传","enablePullDownRefresh":false}},{"path":"/pages/leave/leave","meta":{},"window":{"navigationBarTitleText":"请假","enablePullDownRefresh":false}},{"path":"/pages/signSuccess/signSuccess","meta":{},"window":{"navigationBarTitleText":"会议签到","enablePullDownRefresh":false}},{"path":"/pages/signFail/signFail","meta":{},"window":{"navigationBarTitleText":"会议签到","enablePullDownRefresh":false}},{"path":"/pages/evaluate/evaluate","meta":{},"window":{"navigationBarTitleText":"在线测评","enablePullDownRefresh":true}},{"path":"/pages/evaluateOnline/evaluateOnline","meta":{},"window":{"navigationBarTitleText":"在线测评","enablePullDownRefresh":false}},{"path":"/pages/todoList/todoList","meta":{},"window":{"navigationBarTitleText":"我的待办","enablePullDownRefresh":true,"onReachBottomDistance":100}},{"path":"/pages/todoDetail/todoDetail1","meta":{},"window":{"navigationBarTitleText":"待办详情","enablePullDownRefresh":false}},{"path":"/pages/todoDetail/todoDetail2","meta":{},"window":{"navigationBarTitleText":"待办详情","enablePullDownRefresh":false}},{"path":"/pages/todoDetail/todoDetail3","meta":{},"window":{"navigationBarTitleText":"待办详情","enablePullDownRefresh":false}},{"path":"/pages/todoDetail/todoDetail4","meta":{},"window":{"navigationBarTitleText":"待办详情","enablePullDownRefresh":false}},{"path":"/pages/todoDetail/todoDetail5","meta":{},"window":{"navigationBarTitleText":"待办详情","enablePullDownRefresh":false}},{"path":"/pages/todoDetail/todoDetail6","meta":{},"window":{"navigationBarTitleText":"待办详情","enablePullDownRefresh":false}},{"path":"/pages/webView/webView","meta":{},"window":{"navigationBarTitleText":"PDF预览","enablePullDownRefresh":false}}];
=======
var __uniConfig = {"pages":["pages/index/index","pages/my/my"],"window":{"navigationBarTextStyle":"white","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#da2a2a","backgroundColor":"#da2a2a"},"tabBar":{"color":"#666","selectedColor":"#f07373","backgroundColor":"#fff","list":[{"pagePath":"pages/index/index","iconPath":"static/tab/home.png","selectedIconPath":"static/tab/home-active.png","text":"首页"},{"pagePath":"pages/my/my","iconPath":"static/tab/my.png","selectedIconPath":"static/tab/my-active.png","text":"我的"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"weex","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"test","compilerVersion":"3.1.13","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"天翼党建云","titleNView":{"buttons":[{"fontSrc":"/static/fonts/iconfont.ttf","text":"","fontSize":"22","color":"#ffffff","float":"right","background":"rgba(0,0,0,0)"}]}}},{"path":"/pages/my/my","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的","enablePullDownRefresh":false}}];
>>>>>>> 2c890acfc96a0a572e59d6bf464ddd6ebd645366
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});