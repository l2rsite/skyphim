//<![CDATA[
function ancMedia() {
  url = window.location.href,
  home = ancplayer.load.site, 
  server_i = [0];
    part = new Array; 
  sv = ancplayer.sv.list_sv.split(",");
  tensv = ancplayer.sv.ten_sv.split(",");
  width = ancplayer.load.width;
  height = ancplayer.load.height;
  player = ancplayer.load.player;
  proxy = ancplayer.load.proxy;
  skin = ancplayer.load.skin;
  imgload = ancplayer.load.imgload; 
  tmget = ancplayer.load.getlink; 
  auto = ancplayer.load.autoplay;
  eauto = ancplayer.load.embedplay;

	var $_  = function(x){return document.getElementById(x);}
    this.fu  = function (x, y, z) {
		if (y == null && z == null) {
			return document.getElementById(x).innerHTML;
		} else { if (y != null && z == null) 
		       { document.getElementById(x).innerHTML = y }
		  else { document.getElementById(x).style[z] = y }
		}
	};

	this.read = function () {
		b = this.fu("anc_data"),
		c = '<div id="b_data" style="display:none !important;">',
		d = '</div>',
		b = b.replace(/\<id\>/gi, c),
		b = b.replace(/\<\/id\>/gi, d);
		b = b.replace(/\[id\]/gi, c),
		b = b.replace(/\[\/id\]/gi, d),
		this.fu("anc_data", b);
		if(b.indexOf("anc*") != -1){
		b = this.fu("b_data");
		b = b.replace("anc*","");
		b = b.substring(0,b.length);
	    b = decodeanc(b);
		if(b.indexOf("|") <= 0) {b = ";" + b + "|" };
	}	else{b = this.fu("b_data"); if(b.indexOf("|") <= 0) {b = ";" + b + "|" };}
		return  b
	};
	
data = this.read();
  
l_spi = data.split("|").length; 
l_spk = function(x) {return data.split("|")[x].split(";").length;};
d_spi = function(x) {return data.split("|")[x];};
d_spk = function(x, y) {return data.split("|")[x].split(";")[y];};
pc = ["0","a","b","c","d","e","f","g","h","i","k","l","m","n","o","p","q","r","s"];

  svt = "";
  svx = 0;


this.setCookie = function(c_name,value,exdays) {
var exdate=new Date();
exdate.setDate(exdate.getDate() + exdays);
var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
document.cookie=c_name + "=" + c_value;
};
this.getCookie = function(c_name) {
var i,x,y,ARRcookies=document.cookie.split(";");
for (i=0;i<ARRcookies.length;i++){
x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
x=x.replace(/^\s+|\s+$/g,"");
if (x==c_name){return unescape(y);}}
};
  
this.Play = function() {
for(var s = 0;s < tensv.length ;s++) {var svr = tensv[s].split(".")[0];if(svr == ""){svr = home;}part[s] = '<li id="sev_'+s+'" class="sev" style="font-size: 15px;margin-bottom: 15px;">'+svr+' <li><li class="clear"></li>' }
for (var i = 0; i < l_spi -1; i++) {
for (var j = 0; j < l_spk(i); j++) 
{ name = d_spk(i, 0); link = d_spk(i, j);
name = 2 == l_spk(i) ? d_spk(i, 0) : name == d_spk(i + 1, 0) || !Number(name) ? name + pc[j] : name + pc[j];

for(var s = 0;s < sv.length; s++) {
//if(d_spk(0, 1).indexOf(sv[s]) != -1) { this.setCookie("ancplayer", s , 365); }
if (d_spk(0, 1).indexOf(sv[s]) != -1) {this.setCookie("_ancServer", s, 365); }
if(link.indexOf(sv[s]) != -1) { 
if(sv[s]) {data_out = '<li class="ep"><a class="a_tap" id="ep_'+i+'" href="?xem='+s+'-'+i+'-'+j+'" title="'+name+' - '+home+'" >'+name+'</a></li>' } 
part[s] += data_out } } } }

for(var s = 0;s < sv.length; s++) {
if(part[s].indexOf(home) != -1) {
svt += '<ul id="server_'+svx+'" > '+part[s]+' <div class="clear"></div></ul>';		
server_i[s] = svx.toString();
svx++
}}

svt = '<div id="list_tap"> '+svt+' <div class="clear"></div></div><div class="clear"></div>';

this.fu("anc_tp", svt);
this.getUrl()
};


this.getUrl = function() {
  String.prototype.GetPart = function(dcmm) {
    var vltn = new RegExp("(^|&)" + dcmm + "=([^&]*)(&|$)");
    var clgt = this.substr(this.indexOf("?") + 1).match(vltn);
    if (clgt != null) {
      return unescape(clgt[2]);
    }
    return null;
  };
  


	//if(part_Url == null) { part_Url = ""+laylinksv+"-0-1" }
    part_Url = url.GetPart("xem");
    if(part_Url == null) { part_Url = this.getCookie("_ancServer") + "-0-1" }	
    part_Url = part_Url.split("-");
    pserver = part_Url[0];
    pepisode = part_Url[1];
    pelink = part_Url[2];
	
    var bh = this.fu("server_0");
    var bj = this.fu("server_" + server_i[pserver]);
    this.fu("server_" + server_i[pserver], bh);
    this.fu("server_0", bj);
	document.getElementById("ep_" + pepisode).className = "tap_active";
	document.getElementById("sev_" + pserver).className = "sv_active";

	if (!d_spk(pepisode, pelink)) {window.location.href = url.split("?")[0];} 
	else {this.load(d_spk(pepisode, pelink));}
		
  };
  
this.load = function(x) {	
if(x.indexOf(sv[0]) != -1){x = x.replace(/\/watch\?v=/gi,"/embed/"); x = x.replace(/\feature\=player\_embedded/gi,""); x = x.replace(/\#sub=/gi,"&captions.file="); obj = DBOj(x)[1];} // youtube
if(x.indexOf(sv[1]) != -1){x = x.replace(/skyphim\.com/gi,"https://youtube.com/embed");obj = DBOj(x)[1];}	 // youtube
if(x.indexOf(sv[2]) != -1){x = x.replace(/skyphim\.net/gi,"https://drive.google.com/file/d");obj = DBOj(x)[3];}  // SkyPhim // https://drive.google.com/file/d  // https://www.googleapis.com/drive/v3/files
if(x.indexOf(sv[3]) != -1){x = x.replace(/skyphim\.vn/gi,"https://www.dailymotion.com/embed/video");obj = DBOj(x)[3];}  // Daily
if(x.indexOf(sv[4]) != -1){x = x.replace(/skyphim-SKTM\.net/gi,"https://get.skyphim.net");obj = DBOj(x)[15];}  // ThuyetMinh.SkyPhim.Net
if(x.indexOf(sv[5]) != -1){x = x.replace(/skyphim-SKLT\.net/gi,"https://get.skyphim.net");obj = DBOj(x)[15];}  // LongTieng.SkyPhim.Net
if(x.indexOf(sv[6]) != -1){x = x.replace(/skyphim-SKVS\.net/gi,"https://get.skyphim.net");obj = DBOj(x)[15];}  // VietSub.SkyPhim.Net
if(x.indexOf(sv[7]) != -1){x = x.replace(/skyphim-tm\.com/gi,"https://youtube.com/embed");obj = DBOj(x)[1];}	 // ThuyetMinh.SkyPhim.Com
if(x.indexOf(sv[8]) != -1){x = x.replace(/skyphim-lt\.com/gi,"https://youtube.com/embed");obj = DBOj(x)[1];}	 // LongTieng.SkyPhim.Com
if(x.indexOf(sv[9]) != -1){x = x.replace(/skyphim-vs\.com/gi,"https://youtube.com/embed");obj = DBOj(x)[1];}	 // VietSub.SkyPhim.Com
if(x.indexOf(sv[10]) != -1){x = x.replace(/skyphim-lt\.vn/gi,"https://www.dailymotion.com/embed/video");obj = DBOj(x)[3];}	 //LongTieng.SkyPhim.VN
if(x.indexOf(sv[11]) != -1){x = x.replace(/skyphim-0\.net/gi,"https://www.googleapis.com/drive/v3/files");obj = DBOj(x)[2];}  // SkyPhim.Net
if(x.indexOf(sv[12]) != -1){x = x.replace(/skyphim-1\.net/gi,"https://lh3.googleusercontent.com");obj = DBOj(x)[4];}  // Photo.Google
if(x.indexOf(sv[13]) != -1){x = x.replace(/skyphim-gp\.net/gi,"http://s3.skyphim.net");obj = DBOj(x)[15];}  // Photo.Google
if(x.indexOf(sv[14]) != -1){x = x.replace(/skyphim-GPVS\.net/gi,"http://101.skyphim.net"); x = x.replace(/\#sub=/gi,"&sub=");obj = DBOj(x)[15];}  // Photo.Google
if(x.indexOf(sv[15]) != -1){x = x.replace(/skyphim-GPTM\.net/gi,"http://101.skyphim.net");obj = DBOj(x)[15];}  // Photo.Google
if(x.indexOf(sv[16]) != -1){x = x.replace(/skyphim-GPLT\.net/gi,"http://101.skyphim.net");obj = DBOj(x)[15];}  // Photo.Google
if(x.indexOf(sv[17]) != -1){x = x.replace(/skyphim-GDVS\.net/gi,"http://s2.skyphim.net/video");obj = DBOj(x)[15];}  // Drive.Google
if(x.indexOf(sv[18]) != -1){x = x.replace(/skyphim-GDTM\.net/gi,"http://s2.skyphim.net/video");obj = DBOj(x)[15];}  // Drive.Google
if(x.indexOf(sv[19]) != -1){x = x.replace(/skyphim-GDLT\.net/gi,"http://s2.skyphim.net/video");obj = DBOj(x)[15];}  // Drive.Google
if(x.indexOf(sv[20]) != -1){x = x.replace(/skyphim-GGVS\.net/gi,"http://s3.skyphim.net");obj = DBOj(x)[15];}  // Google
if(x.indexOf(sv[21]) != -1){x = x.replace(/skyphim-GGTM\.net/gi,"http://s3.skyphim.net");obj = DBOj(x)[15];}  // Google
if(x.indexOf(sv[22]) != -1){x = x.replace(/skyphim-GGLT\.net/gi,"http://s3.skyphim.net");obj = DBOj(x)[15];}  // Google
if(x.indexOf(sv[23]) != -1){x = x.replace(/skyphim-ZMTV\.net/gi,"https://get.zmtv.xyz");obj = DBOj(x)[15];}  // Google
if(x.indexOf(sv[24]) != -1) {x = x.replace(/\*/gi,"&");x = x.replace(/\@/gi,"&");x = x.replace(/\#sub=/gi,"&captions.file=");obj = DBOj(x)[2];}  // googlevideo.com
if(x.indexOf(sv[25]) != -1){x = x.replace(/\#sub=/gi,"&sub="); obj = DBOj(x)[4]} //SkyPhim
if(x.indexOf(sv[26]) != -1){x = x.replace(/\#sub=/gi,"&sub="); obj = DBOj(x)[5]} //SkyPhim
if(x.indexOf(sv[27]) != -1){x = x.replace(/\#sub=/gi,"&sub="); obj = DBOj(x)[6]} //SkyPhim
if(x.indexOf(sv[28]) != -1){x = x.replace(/\#sub=/gi,"&sub="); obj = DBOj(x)[7]} //SkyPhim
if(x.indexOf(sv[29]) != -1){x = x.replace(/\#sub=/gi,"&sub="); obj = DBOj(x)[8]} //SkyPhim
if(x.indexOf(sv[30]) != -1){x = x.replace(/\#sub=/gi,"&sub="); obj = DBOj(x)[9]} //SkyPhim
if(x.indexOf(sv[31]) != -1){x = x.replace(/pm\.net\//gi,""); x = x.replace(/\#sub=/gi,"&sub="); obj = DBOj(x)[10];}  // SkyPhim
if(x.indexOf(sv[32]) != -1){x = x.replace(/\#sub=/gi,"&sub="); obj = DBOj(x)[11]} //SkyPhim
if(x.indexOf(sv[33]) != -1){x = x.replace(/phim2b\.com\//gi,""); x = x.replace(/\#sub=/gi,"&sub="); obj = DBOj(x)[14];}  // SkyPhim
if(x.indexOf(sv[34]) != -1){x = x.replace(/\#sub=/gi,"&sub="); obj = DBOj(x)[15]} //SkyPhim
if(x.indexOf(sv[35]) != -1){x = x.replace(/anc\.blog\/http/gi,"http"); x = x.replace(/\#sub=/gi,"&sub=");obj = DBOj(x)[2];}  // SkyPhim
for(var k = 36; k < sv.length; k++){if(x.indexOf(sv[k]) != -1){x = x.replace(/\#sub=/gi,"&captions.file=");obj = DBOj(x)[1]};}
if(x.indexOf(sv[37]) != -1){x = x.replace(/\#sub=/gi,"&sub="); obj = DBOj(x)[5]} //SkyPhim
if(x.indexOf(sv[39]) != -1){x = x.replace(/\#sub=/gi,"&sub="); obj = DBOj(x)[5]} //SkyPhim
if(x.indexOf(sv[40]) != -1){x = x.replace(/\#sub=/gi,"&sub="); obj = DBOj(x)[5]} //SkyPhim
if(x.indexOf(sv[42]) != -1){x = x.replace(/\#sub=/gi,"&sub="); obj = DBOj(x)[5]} //SkyPhim
if(x.indexOf(sv[51]) != -1){x = x.replace(/skyphim-OK\.net/gi,"http://ok.ru/videoembed");obj = DBOj(x)[14];}  // Drive.Google


this.fu("anc_pl", obj)
}; 
   
var DBOj = function(x){	
rut = '<iframe width="100%" height="'+height+'" src="';



qua = '<div id="logoplayer"></div><';
	return obj = [
	// 0 -.load. 
	'<video oncontextmenu="return false;" controls="" controlslist="nodownload" preload="metadata" width="100%" height="'+height+'" autoplay="" name="media"><source  style="border: none !important;" src="'+x+'" type="video/mp4" scrolling="no" frameborder="0" allowfullscreen="true" id="playerayer"/></video>',
	// 1 - Youtube
	'<iframe id="playerayer"  src="'+x+'?start=20&modestbranding=1&controls=1&showinfo=0&hd=1&rel=0&loop=1&iv_load_policy=3&autohide=2&border=0&wmode=opaque&enablejsapi=1&autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" width="100%" height="'+height+'"/></iframe>',
	// 2 - Drive
	'<video oncontextmenu="return false;" controls="" controlslist="nodownload" preload="metadata" width="100%" height="'+height+'" autoplay="" name="media"><source  style="border: none !important;" src="'+x+'?alt=media&amp;key=AIzaSyDeCs--N9DiT67ZOEfOsPeectQZnq1X5fI" type="video/mp4" scrolling="no" frameborder="0" allowfullscreen="true" id="playerayer"/></video>',
	// 3 - Driver ma hoa
	'<iframe width="100%" height="'+height+'"  src="'+x+'/preview?modestbranding=1&controls=1&showinfo=0" scrolling="no" frameborder="0" allowfullscreen="true" id="playerayer"></iframe>',
	// 4 - mphim
	'<video oncontextmenu="return false;" controls="" controlslist="nodownload" preload="metadata" width="100%" height="'+height+'" autoplay="" name="media"><source  style="border: none !important;" src="'+x+'" type="video/mp4" scrolling="no" frameborder="0" allowfullscreen="true" id="playerayer"/></video>',
	// 5 - Dailymotion
	'<iframe id="playerayer" frameborder="0" width="100%" height="'+height+'" src="'+x+'?autoplay=1&queue-enable=false&queue-autoplay-next=false&sharing-enable=0&controls=1&ui-logo=0&ui-start-screen-info=0" allowfullscreen allow="autoplay"></iframe>',
	// 6 - phimnhanh
	''+rut+'http://skyphim.net?url='+x+'" scrolling="no" frameborder="0" allowfullscreen="true" id="playerayer"> </iframe>',
    // 7 - phim4v
	''+rut+'http://skyphim.net?url='+x+'" scrolling="no" frameborder="0" allowfullscreen="true" id="playerayer"> </iframe>',
    // 8 - phim7
	''+rut+'http://skyphim.net?url='+x+'" scrolling="no" frameborder="0" allowfullscreen="true" id="playerayer"> </iframe>',
	// 9 - hayphimtv
	''+rut+'http://skyphim.net?url='+x+'" scrolling="no" frameborder="0" allowfullscreen="true" id="playerayer"> </iframe>',
	// 10 - Driver ma hoa
	''+rut+'http://skyphim.net?url='+x+'" scrolling="no" frameborder="0" allowfullscreen="true" id="playerayer"> </iframe>',
	// 11 - xemphimso
	''+rut+'http://skyphim.net?url='+x+'" scrolling="no" frameborder="0" allowfullscreen="true" id="playerayer"> </iframe>',
	// 12 - mp4
	''+rut+'http://skyphim.net?url='+x+'" scrolling="no" frameborder="0" allowfullscreen="true" id="playerayer"> </iframe>',
	// 13- zing
	''+rut+'http://skyphim.net/?player=jwplayer&link='+x+'" scrolling="no" frameborder="0" allowfullscreen="true" id="playerayer"> </iframe>',
	// 14 - embed
	'<iframe width="100%" height="'+height+'" src="'+x+'?autoplay=1&?fromTime=10" scrolling="no" frameborder="0" allow="autoplay" allowfullscreen="true"> </iframe>',
	// 15 - phimmoi
	'<iframe width="100%" height="'+height+'" src="'+x+'" scrolling="no" frameborder="0" allow="autoplay" allowfullscreen="true"> </iframe>',];
}}
var M = new ancMedia; M.Play();
 //]]>
