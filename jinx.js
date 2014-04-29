/*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*

						The JINX Project - JavaScript Library 121212

*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*/


/*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	
							INIT & CONFIG
*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*/

//current file data
var cuf_len=0;
var cuf_body="";
var cuf_url="http://www.softhare.it/index.php";
var cuf_proto="";
var cuf_domain="";
var cuf_path=new Array();
var cuf_file="";
var cuf_query=new Array();
var cuf_type="";
var cuf_class="";
var cuf_mime="";
var cuf_descri="";
var currentOffset=0

//divs handlers
var headerHandler=0;
var addressHandler=0;
var menuHandler=0;
var errorHandler=0;
var mainHandler=0;
var maskHandler=0;
var floaterHandler=0;

//history
var cronoUrl=new Array();
var cronoText=new Array();
var cronoKey=0;

//misc vars
var errorCode=0;
var gotoFile="";
var redrawNeeded=0;
var renderMode="";

var lok_tags=new Array("!--","<!doctype","a","abbr","acronym","address","applet","area","article","aside","audio","b","base","basefont","bb","bdo","big","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","command","datagrid","datalist","dd","del","details","dfn","dfn","dialog","dir","div","dl","dt","em","embed","fieldset","figure","font","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","iframe","img","input","ins","isindex","kbd","label","legend","li","link","map","mark","menu","meta","meter","nav","noframes","noscript","object","ol","optgroup","option","output","p","param","pre","progress","q","rt","ruby","s","samp","script","section","select","small","source","span","strike","strong","style","sub","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tp","tr","tt","u","ul","var","video","xmp");

var lok_css=new Array("ascent","azimuth","background","background-attachment","background-color","background-image","background-position","background-repeat","baseline","bbox","border","border-collapse","border-color","border-spacing","border-style","border-top","border-right","border-bottom","border-left","border-top-color","border-right-color","border-bottom-color","border-left-color","border-top-style","border-right-style","border-bottom-style","border-left-style","border-top-width","border-right-width","border-bottom-width","border-left-width","border-width","bottom","cap-height","caption-side","centerline","clear","clip","color","content","counter-increment","counter-reset","cue","cue-after","cue-before","cursor","definition-src","descent","direction","display","elevation","empty-cells","float","font","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","height","left","letter-spacing","line-height","list-style","list-style-image","list-style-position","list-style-type","margin","margin-top","margin-right","margin-bottom","margin-left","marker-offset","marks","mathline","max-height","max-width","min-height","min-width","orphans","outline","outline-color","outline-style","outline-width","overflow","padding","padding-top","padding-right","padding-bottom","padding-left","page","page-break-after","page-break-before","page-break-inside","panose-1","pause","pause-after","pause-before","pitch","pitch-range","play-during","position","quotes","richness","right","size","slope","src","speak","speak-header","speak-numeral","speak-punctuation","speech-rate","stemh","stemv","stress","table-layout","text-align","text-decoration","text-indent","text-shadow","text-transform","top","unicode-bidi","unicode-range","units-per-em","vertical-align","visibility","voice-family","volume","white-space","widows","width","widths","word-spacing","x-height","z-index");

var lok_js=new Array("Anchor","Applet","Area","Area","Array","Button","Checkbox","Date","FileUpload","Form","Frame","Hidden","Image","Link","Math","MimeType","Password","Plugin","Radio","Reset","Select","String","Submit","Text","Textarea","abstract","anchors","applets","boolean","break","byte","case","catch","char","class","const","continue","default","delete","do","document","double","else","extends","false","final","finally","float","for","forms","frames","function","goto","history","if","images","implements","import","in","instanceof","int","interface","links","location","long","mimeTypes","native","navigator","new","null","options","package","plugins","private","protected","public","return","short","static","super","switch","synchronized","this","throw","throws","transient","true","try","typeof","var","void","while","window","with");



/*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*

																BASE FUNCTIONS

*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*/


function loading(){mainHandler.innerHTML='<DIV CLASS="temp"><B>LOADING FILE '+cuf_url+' ...</B></DIV>';
setmessage('LOADING FILE '+cuf_url+' ...');};

function busy(){mainHandler.innerHTML='<DIV CLASS="busy"><B>PROCESSING FILE '+cuf_url+' ...</B></DIV>';
setmessage('PROCESSING FILE '+cuf_url+' ...');};

function makelink(u,n,a){return '<A HREF="#" TITLE="'+a+'" ONCLICK="gotoFile=\''+u+'\';return false;">'+n+'</A>';};

//	*	*	*	*	*	SEND ERROR MESSAGE E
function seterror(e){var u='<FONT COLOR=red><B>'+e+'</B></FONT>';
errorHandler.innerHTML=u;errorHandler.style.height=20;errorCode=99;};

//	*	*	*	*	*	SEND GENERIC MESSAGE E
function setmessage(e){var u='<FONT SIZE=1 COLOR=#00aa00><B>'+e+'</B></FONT>';
errorHandler.innerHTML=u;errorHandler.style.height=20;errorCode=59;};

//	*	*	*	*	*	SWITCHES renderMode TO Q
function showmode(q){renderMode=q;redrawNeeded++;};

//	*	*	*	*	*	IF Q SETS GREY MASK, ELSE HIDES IT
function setmask(q){if(q){var u='<DIV STYLE="width:100%;height:2222px;background:#666666;background-color:#666666;"></DIV>';
tse.setAlpha(90,maskHandler);}else{var u='&nbsp;';};maskHandler.innerHTML=u;};

//	*	*	*	*	*	IF PAN OPENS FLOAT PANEL WITH CONTENT PAN, ELSE COLSES IT
function setfpan(pan){if(pan){setmask(1);tse.setAlpha(100,floaterHandler);floaterHandler.innerHTML=pan;
}else{setmask(0);tse.setAlpha(0,floaterHandler);floaterHandler.innerHTML="&nbsp;";};};



//	*	*	*	*	*	
function take_attr(tag,attr){
	var o=cuf_body.toLowerCase();
	var s=o.indexOf("<"+tag,currentOffset);
	var u="";
	if(s){
		s+=1+tag.length;
		var e=o.indexOf(">",s);
		var t=cuf_body.substr(s,e-s);
		o=t.toLowerCase();
		var s2=o.indexOf(attr+'="',s);
		var e2=o.indexOf('"',s2);
		if(s2<1){
			s2=o.indexOf(attr+"='",s);
			e2=o.indexOf("'",s2);
		};
		if(s2<1){
			s2=o.indexOf(attr+"=",s);
			e2=o.indexOf(" ",s2);
			if(e2<1){e2=o.length;};
		};
		if(s2){u=t.substr(s2,e2-s2);};
	};
	return t;
};


/*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*

																REFORMAT FUNCTIONS

*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*/

function reform_html(o){
	if(document.ctrl.ctrl_color.value=="on"){

		var re=/\&lt\;/g;
		o=o.replace(re,'<FONT COLOR=#990000>&lt;');
		re=/\&gt\;/g;
		o=o.replace(re,'&gt;</FONT>');

		for(i=0;i<lok_tags.length;i++){
			re=new RegExp("\&lt\;"+lok_tags[i]+" ","gi");
			o=o.replace(re,'&lt;<FONT COLOR=#ff0000>'+lok_tags[i]+'</FONT> ');
			re=new RegExp("\&lt\;"+lok_tags[i]+"\&gt\;","gi");
			o=o.replace(re,'&lt;<FONT COLOR=#ff0000>'+lok_tags[i]+'</FONT>&gt;');
			re=new RegExp("\&lt\;\/"+lok_tags[i]+" ","gi");
			o=o.replace(re,'&lt;/<FONT COLOR=#ff0000>'+lok_tags[i]+'</FONT> ');
			re=new RegExp("\&lt\;\/"+lok_tags[i]+"\&gt\;","gi");
			o=o.replace(re,'&lt;/<FONT COLOR=#ff0000>'+lok_tags[i]+'</FONT>&gt;');
		};

		re=/\&lt\;\!\-/g;
		o=o.replace(re,'<FONT COLOR=#007700>&lt;!-');

		re=/\-\-\&gt\;/g;
		o=o.replace(re,'--&gt;</FONT>');

		o='<FONT color=#000088>'+o+'</FONT>';
	};
	return o;
};







/*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*

																INTERFACE FUNCTIONS

*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*/

//	*	*	*	*	*	REBUILDS HEADER DIV CONTENT
function setheader(){
	var u='<FORM METHOD=POST ACTION="#" NAME="ctrl"><B>SoftHare\'s JINX - v 100415</B> &nbsp; ';
	u+='color:<INPUT TYPE="checkbox" NAME="ctrl_color" ONCHANGE="redrawNeeded++;"> &nbsp;';
	u+='reformat:<INPUT TYPE="checkbox" NAME="ctrl_format" ONCHANGE="redrawNeeded++;"> &nbsp;';
	u+='</FORM>';headerHandler.innerHTML=u;
};

//	*	*	*	*	*	REBUILDS ADDRESS DIV CONTENT
function setaddress(){
	var g='';
	var u='<A HREF="#" ONCLICK="askaddress(\''+cuf_url+'\');return false;" TITLE="Open New Url from Full Url">URL:</A> <B>'
	g+=cuf_proto+"://";
	u+='<A HREF="#" ONCLICK="askaddress(\''+g+'\');return false;" TITLE="Open New Url from Protocol">'+g+'</A> ';
	g+=cuf_domain+"/";
	u+='<A HREF="#" ONCLICK="askaddress(\''+g+'\');return false;" TITLE="Open New Url from Domain">'+cuf_domain+'/</A> ';
	for(t=0;t<99;t++){
		if(cuf_path[t]){
			g+=cuf_path[t]+"/";
			u+='<A HREF="#" ONCLICK="askaddress(\''+g+'\');return false;" TITLE="Open New Url from This Path">'+cuf_path[t]+'/</A> ';
		};
	};
	g+=cuf_file;
	u+='<A HREF="#" ONCLICK="askaddress(\''+g+'\');return false;" TITLE="Open New Url from This File">'+cuf_file+'</A> ';
	if(cuf_query[0]){
	s="?";
		for(t=0;t<99;t++){
			if(cuf_query[t]){
				g+=s+cuf_query[t];
				u+='<A HREF="#" ONCLICK="askaddress(\''+g+'\');return false;" TITLE="Open New Url from This Query">'+s+cuf_query[t]+'</A> ';
				s="&";
			};
		};
	};
	u+="</B> ["+cuf_len+" bytes, "+cuf_descri+"]";
	u+=' - <A HREF="#" onclick="askcrono();return false;" TITLE="Open Url from session History">CRONO</A>';
	addressHandler.innerHTML=u;
};

//	*	*	*	*	*	REBUILDS MENU DIV CONTENT
function setmenu(){
	var u='',z="";
	u+='&nbsp;<A HREF="#" ONCLICK="busy();showmode(\'info\');return false;" TITLE="Show general info and headers for this file">&nbsp;INFO&nbsp;</A>&nbsp';
	u+='&nbsp;<A HREF="#" ONCLICK="busy();showmode(\'hex\');return false;" TITLE="Show this file as hexadecimal values">&nbsp;HEX&nbsp;</A>&nbsp';
	u+='&nbsp;<A HREF="#" ONCLICK="busy();showmode(\'dec\');return false;" TITLE="Show this file as decimal values">&nbsp;DEC&nbsp;</A>&nbsp';
	if(cuf_class=="h")u+='&nbsp;<A HREF="#" ONCLICK="busy();showmode(\'full\');return false;" TITLE="Show this file as full html source">&nbsp;FULL&nbsp;</A>&nbsp';
	if(cuf_class=="h")u+='&nbsp;<A HREF="#" ONCLICK="busy();showmode(\'html\');return false;" TITLE="Show this file as (only) html source">&nbsp;HTML&nbsp;</A>&nbsp';
	if(cuf_class=="h" || cuf_class=="s")u+='&nbsp;<A HREF="#" ONCLICK="busy();showmode(\'script\');return false;" TITLE="Show only scripts in this file">&nbsp;SCRIPT&nbsp;</A>&nbsp';
	if(cuf_class=="h" || cuf_class=="c")u+='&nbsp;<A HREF="#" ONCLICK="busy();showmode(\'style\');return false;" TITLE="Show only style sheets in this file">&nbsp;STYLE&nbsp;</A>&nbsp';
	if(cuf_class=="h" || cuf_class=="s" || cuf_class=="c")u+='&nbsp;<A HREF="#" ONCLICK="busy();showmode(\'images\');return false;" TITLE="Show images referred in this file">&nbsp;IMAGES&nbsp;</A>&nbsp';
	if(cuf_class=="h" || cuf_class=="s" || cuf_class=="c")u+='&nbsp;<A HREF="#" ONCLICK="busy();showmode(\'media\');return false;" TITLE="Show media embedded in this file">&nbsp;MEDIA&nbsp;</A>&nbsp';
	if(cuf_class=="h")u+='&nbsp;<A HREF="#" ONCLICK="busy();showmode(\'link\');return false;" TITLE="Show all links in this file">&nbsp;LINKS&nbsp;</A>&nbsp';
	if(cuf_class=="h" || cuf_class=="d")u+='&nbsp;<A HREF="#" ONCLICK="busy();showmode(\'text\');return false;" TITLE="Show only plain text within this file">&nbsp;TEXT&nbsp;</A>&nbsp';
	u+='&nbsp;<A HREF="#" ONCLICK="busy();showmode(\'xtext\');return false;" TITLE="Show only texts within this file">&nbsp;XTEXT&nbsp;</A>&nbsp';
	menuHandler.innerHTML=u;
};

/*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*

																FILE FUNCTIONS

*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*/

//	*	*	*	*	*	SPLITS CUF_URL TO CUF_PROTO,DOMAIN,PATH,FILE,QUERY
function splitUrl(){
	var a=cuf_url;
	var i=a.substr(0,6);
	i=i.toLowerCase();
	if(i=="http:/"){
		cuf_proto="http://";a=a.substr(7);
	}else if(i=="https:"){
		cuf_proto="https://";
		a=a.substr(8);
	}else if(i=="ftp://"){
		cuf_proto="ftp://";
		a=a.substr(6);
	}else{
		cuf_proto="http://";
	};
	i=a.indexOf("/");
	if(i>0){
		cuf_domain=a.substr(0,i);
		a=a.substr(i+1);
	}else{
		cuf_domain=a;a="";
	};
	i=a.split("/");
	for(t=0;t<99;t++){
		cuf_path[t]="";
	};
	p=0;
	for(t=0;t<i.length;t++){
		if(t==(i.length-1)){
			cuf_file=i[t];
		}else{
			cuf_path[p]=i[t];p++;
		};
	};
	for(t=0;t<99;t++){
		cuf_query[t]="";
	};
	i=cuf_file.indexOf("?");
	if(i>0){
		a=cuf_file.substr(i+1);
		cuf_file=cuf_file.substr(0,i);
		cuf_query=a.split("&");
	};
	i=cuf_file.indexOf(".");
	if(i){
		a=cuf_file.substr(i+1);
		i=cuf_file.indexOf(".");
		if(i){
			a=cuf_file.substr(i+1);
			i=cuf_file.indexOf(".");
			cuf_type=a;
		}else{
			cuf_type=a;
		};
	}else{
		cuf_type="???";
	};
};

//	*	*	*	*	*	RETURNS URL MADRE FROM CUF_PROTO,DOMAIN,PATH,FILE,QUERY
function assembleUrl(){var u=cuf_proto+"://"+cuf_domain+"/";for(t=0;t<cuf_path.length;t++){if(cuf_path[t]){u+=cuf_path[t]+"/";};};
u+=cuf_file;if(cuf_query[0]){u+="?";var s="";for(t=0;t<cuf_query.length;t++){if(cuf_query[t]){u+=s+""+cuf_query[t];s="&";};};};return u;};

//	*	*	*	*	*	AJAX: LOAD FILE AND PASS IT TO PARSE FUNCTION
function ask_file(file){
	var request=false;
	try{request=new ActiveXObject("Msxml2.XMLHTTP");}catch(e){
		try{request=new ActiveXObject("Microsoft.XMLHTTP");}catch(e){
			request=false;
		};
	};
	if(!request && typeof XMLHttpRequest!='undefined'){
		request=new XMLHttpRequest();
	};
	request.open("GET","jinx.php?url="+encodeURI(cuf_url),true);
	request.onreadystatechange=function(){
		if(request.readyState==4){
			if(request.status==200){
				parse(request.responseText);
			};
		};
	};
	request.send(null);
};


//	*	*	*	*	*	RETURNS ABSOLUTE URL FROM RELATIVE one
function absoluteUrl(one){
	var u='';o=one.toLowerCase();
	if(o.substr(0,7)=="http://" || o.substr(0,8)=="https://"){
		return one;
	}else{
		p=0;
		for(t=0;t<99;t++){
			if(cuf_path[t]){p++;}else{t=99;};
		};
		if(o.substr(0,3)=="../"){p--;o=o.substr(3);one=one.substr(3);};
		if(o.substr(0,2)=="./"){p--;o=o.substr(2);one=one.substr(2);};
		if(o.substr(0,3)=="../"){p--;o=o.substr(3);one=one.substr(3);};
		if(o.substr(0,2)=="./"){p--;o=o.substr(2);one=one.substr(2);};
		if(o.substr(0,3)=="../"){p--;o=o.substr(3);one=one.substr(3);};
		if(o.substr(0,2)=="./"){p--;o=o.substr(2);one=one.substr(2);};
		if(o.substr(0,3)=="../"){p--;o=o.substr(3);one=one.substr(3);};
		if(o.substr(0,2)=="./"){p--;o=o.substr(2);one=one.substr(2);};
		if(o.substr(0,3)=="../"){p--;o=o.substr(3);one=one.substr(3);};
		if(o.substr(0,2)=="./"){p--;o=o.substr(2);one=one.substr(2);};
		u=cuf_proto+"://"+cuf_domain+"/";
		if(p){
			for(t=0;t<p;t++){
				u+=cuf_path[t]+"/";
			};
		};
		u+=one;
		return u;
	};
};



/*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*

																SOURCE ELAB FUNCTIONS

*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*/

function strip_style_content(o){
	var e,i,t,again;
	again=1;
	while(again>0){
		again=0;
		t=o.toLowerCase();
		i=t.indexOf("<style");
		if(i){
			e=t.indexOf("</style",i);
			if(e>i){
				e=1+t.indexOf(">",e);
				if(e>i){
					o=o.substr(0,i-1)+"\n[[COLLAPSED STYLE HERE]]\n"+o.substr(e);
					again=1;
				};
			};
		};
	};
	return o;
};


function strip_script_content(o){
	var e,i,t,again;
	again=1;
	while(again>0){
		again=0;
		t=o.toLowerCase();
		i=t.indexOf("<script");
		if(i){
			e=t.indexOf("</script",i);
			if(e>i){
				e=1+t.indexOf(">",e);
				if(e>i){
					o=o.substr(0,i-1)+"\n[[COLLAPSED SCRIPT HERE]]\n"+o.substr(e);
					again=1;
				};
			};
		};
	};
	return o;
};


function strip_a_content(o){
	var e,i,t,again;
	again=1;
	while(again>0){
		again=0;t=o.toLowerCase();
		i=t.indexOf("<a ");
		if(i){
			e=t.indexOf("</a",i);
			if(e>i){
				e=1+t.indexOf(">",e);
				if(e>i){
					o=o.substr(0,i-1)+""+o.substr(e);
					again=1;
				};
			};
		};
	};
	return o;
};


function extract_attr_values(attr){
	var e,o,t,i=0,q=0;
	var u=new Array();
	o=cuf_body;
	t=o.toLowerCase();
	while(i<o.length){
		i=t.indexOf(attr+'="',i);
		e=t.indexOf('"',i);
		if(i<1){
			i=t.indexOf(attr+"='",i);
			e=t.indexOf("'",i);
		};
		if(i<1){
			i=t.indexOf(attr+"=",i);
			e=t.indexOf(" ",i);
			if(t.indexOf(">",i)<e){
				e=t.indexOf(">",i);
			};
		};
		if(i>0){
			u[q]=o.substr(i,e-i);
			i=e;
		}else{
			i=9999999;
		};
	};
	return u;
};



/*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*

																RENDER FUNCTIONS

*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*/

/*
	*	*	*	*	*	RETURNS INFO
*/
function extract_info(){
	setmessage("Showing General Info for This File");
	var a='',c=0,u='<TABLE align=center cellspacing=1 cellpadding=1 border=0 bgcolor=white><TR><TH colspan=1>GENERAL INFO FOR THIS FILE</TH></TR><TR><TD align=left>',i=0,i2,l=cuf_body.length,o;
	o=cuf_body.toLowerCase();
	u+='&nbsp;<BR>The document returned by the server at url <B>'+cuf_url+'</B> seems to be a <B>'+cuf_descri+'</B> file and is <B>'+cuf_len+'</B> bytes long.<BR>';
	if(o.indexOf("<head")>0 && o.indexOf("<\html")>0){//	*	HTML
		u+='&nbsp;<BR>The document contains an HTML code structure.<BR>';
		if(o.indexOf("<script ")>0 && o.indexOf('javascript')>0){u+='&nbsp;<BR>The document contains also JavaScript code.<BR>';};
		if(o.indexOf("<style")>0 || o.indexOf(' style=')>0){u+='&nbsp;<BR>The document contains also StyleSheet definitions.<BR>';};
		//title
		i=o.indexOf("<title");if(i){i=o.indexOf(">",i);i2=o.indexOf("</title",i);if(i2){u+='&nbsp;<BR>The Document Title is: <B>'+cuf_body.substr(i+1,i2-i-1)+'</B><BR>';};};
		//meta descri
		i=o.indexOf("<meta name='description'");
		if(i<1)i=o.indexOf('<meta name="description"');
		if(i<1)i=o.indexOf('<meta name=description');
		if(i){i1=o.indexOf("content='",i);i0=i1+9;i2=o.indexOf("'",i0);if(i1<1){i1=o.indexOf('content="',i);i0=i1+9;
		i2=o.indexOf('"',i0);};if(i1<1){i1=o.indexOf('content=',i);i0=i1+8;i2=o.indexOf('>',i0);};if(i1){
		u+='&nbsp;<BR>The Meta Description is: <B>'+cuf_body.substr(i0,i2-i0)+'</B><BR>';};};
		//meta keywords
		i=o.indexOf("<meta name='keywords'");if(i<1)i=o.indexOf('<meta name="keywords"');if(i<1)i=o.indexOf('<meta name=keywords');
		if(i){i1=o.indexOf("content='",i);i0=i1+9;i2=o.indexOf("'",i0);if(i1<1){i1=o.indexOf('content="',i);i0=i1+9;i2=o.indexOf('"',i0);
		};if(i1<1){i1=o.indexOf('content=',i);i0=i1+8;i2=o.indexOf('>',i0);};if(i1){u+='&nbsp;<BR>Included Meta Keywords are: <B>'+cuf_body.substr(i0,i2-i0)+'</B><BR>';};};

	}else if(o.indexOf("\nvar ")>0 || o.indexOf(";var ")>0 || o.indexOf(" var ")>0 || o.indexOf("}var ")>0){//	*	JS
		u+='&nbsp;<BR>The document contains JavaScript code.<BR>';

	}else if(o.indexOf("border:")>0 || o.indexOf("color:")>0 || o.indexOf("padding:")>0 || o.indexOf("margin:")>0){//	*	CSS
		u+='&nbsp;<BR>The document contains StyleSheet definitions.<BR>';

	}else{//	*	TXT
		u+='&nbsp;<BR>The document contains plain ascii text.<BR>';

	};
	return u+'<BR>&nbsp;</TD></TR></TABLE>';
};



/*
	*	*	*	*	*	RETURNS HEX DUMP
*/
function extract_hex(){
	setmessage("Showing Hexadecimal Dump of This File");
	u='<TABLE align=center cellspacing=1 cellpadding=1 border=0 bgcolor=white><TR><TH colspan=3>HEXADECIMAL READING OF THIS FILE</TH></TR>';
	o=cuf_body;
	lz=o.length;
	var br=0,h="",d="",t="",a,c;
	var he=new Array("0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F")
	for(iz=0;iz<lz;iz++){
		c=o.charCodeAt(iz);
		a=o.substr(iz,1);
		hi=15 & Math.floor(c/16);
		lo=15 & c;
		h+=" "+he[hi]+""+he[lo];
		hi="0000"+c;
		d+=" "+hi.substr(hi.length-3);
		if(c<32)a=".";if(c>126 && c<160)a=".";if(a=="<")a="&lt;";if(a==">")a="&gt;";if(a==" ")a="&nbsp;";
		t+=""+a;
		br++;
		if(br>15){
			br=0;
			u+='<TR><TD align=right><FONT FACE="courier" color=black>('+Math.floor(16*Math.floor(iz/16))+') <B>'+tse.dec2hex(Math.floor(16*Math.floor(iz/16)),4)+'</B></FONT></TD>';
			u+='<TD align=left><FONT FACE="courier"><B>&nbsp;'+h+'&nbsp;</B></FONT></TD>';
			u+='<TD align=left><FONT FACE="courier" color=blue><B>'+t+"</B></FONT></TD></TR>";
			h="";
			d="";
			t="";
		};
	};
	h=(h+"                                                ").substr(0,48);
	d=(d+"                                                                    ").substr(0,64);
	u+='<TR><TD align=right><FONT FACE="courier" color=black>('+Math.floor(16*Math.floor(iz/16))+') <B>'+tse.dec2hex(Math.floor(16*Math.floor(iz/16)),4)+'</B></FONT></TD>';
	u+='<TD align=left><FONT FACE="courier"><B>&nbsp;'+h+'&nbsp;</B></FONT></TD>';
	u+='<TD align=left><FONT FACE="courier" color=blue><B>'+t+"</B></FONT></TD></TR>";
	return u+'</TABLE>';
};




/*
	*	*	*	*	*	RETURNS DEC DUMP
*/
function extract_dec(){
	setmessage("Showing Decimal Dump of This File");
	u='<TABLE align=center cellspacing=1 cellpadding=1 border=0 bgcolor=white><TR><TH colspan=3>DECIMAL READING OF THIS FILE</TH></TR>';o=cuf_body;l=o.length;var br=0,h="",d="",t="",a,c;
	//var he=new Array("0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F")
	for(i=0;i<l;i++){
		c=o.charCodeAt(i);
		a=o.substr(i,1);
		hi="0000"+c;
		d+=" "+hi.substr(hi.length-3);
		if(c<32)a=".";if(c>126 && c<160)a=".";if(a=="<")a="&lt;";if(a==">")a="&gt;";if(a==" ")a="&nbsp;";
		t+=""+a;
		br++;if(br>15){
			br=0;
			u+='<TR><TD align=right><FONT FACE="courier" color=black><B>'+Math.floor(16*Math.floor(i/16))+'&nbsp;</B></FONT></TD><TD align=left><FONT FACE="courier"><B>&nbsp;'+d+'&nbsp;</B></FONT></TD><TD align=left><FONT FACE="courier" color=blue><B>'+t+"</B></FONT></TD></TR>";
			h="";d="";t="";
		};
	};h=(h+"                                                ").substr(0,48);
	d=(d+"                                                                    ").substr(0,64);
	u+='<TR><TD align=right><FONT FACE="courier" color=black><B>'+Math.floor(16*Math.floor(i/16))+'&nbsp;</B></FONT></TD><TD align=left><FONT FACE="courier"><B>&nbsp;'+d+'&nbsp;</B></FONT></TD><TD align=left><FONT FACE="courier" color=blue><B>'+t+"</B></FONT></TD></TR>";
	return u+'</TABLE>';
};


/*
	*	*	*	*	*	RETURNS FULL HTML
*/
function extract_full(){setmessage("Showing Full HTML Source of This File as it is");var a='',c=0,u='',l=cuf_body.length;
for(t=0;t<l;t++){a=cuf_body.substr(t,1);if(a=="<"){u+="&lt;";}else if(a==">"){u+="&gt;";}else if(a=="\n"){u+="<br>";}else if(a=="\t"){u+="&nbsp;";}else{u+=a;};
};return '<TABLE align=center cellspacing=1 cellpadding=1 border=0 bgcolor=white><TR><TH colspan=1>FULL HTML SOURCE CODE FROM THIS FILE</TH></TR><TR><TD align=left>'+reform_html(u)+'</TD></TR></TABLE>';};



/*
	*	*	*	*	*	RETURNS HTML ONLY
*/
function extract_html(){
var e,i,o,t,a='',c=0,u='',l;setmessage("Showing Only HTML Source of This File");o=strip_script_content(cuf_body);o=strip_style_content(o);
for(i=0;i<o.length;i++){a=o.substr(i,1);if(a=="<"){u+="&lt;";}else if(a==">"){u+="&gt;";}else if(a=="\n"){u+="<br>";}else if(a=="\t"){u+="&nbsp;";}else{u+=a;};};
return '<TABLE align=center cellspacing=1 cellpadding=1 border=0 bgcolor=white><TR><TH colspan=1>ONLY HTML CODE FROM THIS FILE</TH></TR><TR><TD align=left>'+reform_html(u)+'</TD></TR></TABLE>';
};



/*
	*	*	*	*	*	RETURNS SCRIPTS ONLY
*/
function extract_script(){
setmessage("Showing Scripting from This File");var u='';
var o=cuf_body.toLowerCase();for(i=0;i<o.length;){redo=0;i=o.indexOf("<script",i);if(i>0){
i=1+o.indexOf(">",i);i2=o.indexOf("</script",i);if(i2>0){u+=cuf_body.substr(i,i2-i);
if(i2>i){u+="°";};};}else{i=99999999;};};
//strip gt/lt
o=u;u="";l=o.length;for(t=0;t<l;t++){a=o.substr(t,1);if(a=="<"){u+="&lt;";}else if(a==">"){u+="&gt;";}else if(a=="\n"){u+="<br>";}else if(a=="°"){u+="<hr>";}else if(a=="\t"){u+="&nbsp;";}else{u+=a;};};

		for(i=0;i<lok_js.length;i++){
			re=new RegExp(lok_js[i],"gi");
			u=u.replace(re,'<FONT COLOR=#ff0000>'+lok_js[i]+'</FONT>');
		};



return '<TABLE align=center cellspacing=1 cellpadding=1 border=0 bgcolor=white><TR><TH colspan=1>SCRIPTING WITHIN THIS FILE</TH></TR><TR><TD align=left>'+u+'</TD></TR></TABLE>';};




/*
	*	*	*	*	*	RETURNS CSS ONLY
*/
function extract_css(){
setmessage("Showing Style Sheets from This File");
var u='';
var o=cuf_body.toLowerCase();for(i=0;i<o.length;){redo=0;i=o.indexOf("<style",i);if(i>0){i=1+o.indexOf(">",i);i2=o.indexOf("</style",i);
if(i2>0){u+=cuf_body.substr(i,i2-i);};}else{i=99999999;};};
//strip gt/lt
o=u;u="";l=o.length;for(t=0;t<l;t++){a=o.substr(t,1);if(a=="<"){u+="&lt;";}else if(a==">"){u+="&gt;";}else if(a=="\n"){u+="<br>";}else if(a=="\t"){u+="&nbsp;";}else{u+=a;};};
return '<TABLE align=center cellspacing=1 cellpadding=1 border=0 bgcolor=white><TR><TH colspan=1>STYLE SHEETS WITHIN THIS FILE</TH></TR><TR><TD align=left>'+u+'</TD></TR></TABLE>';};





/*
	*	*	*	*	*	RETURNS ALL IMAGES
*/
function extract_imgs(){
setmessage("Showing All Images from This File");
var u='<TABLE align=center cellspacing=1 cellpadding=1 border=0 bgcolor=white><TR><TH colspan=2>IMAGE FILES REFERRED IN THIS FILE</TH></TR>';
var l,o,s,e,te,j,a,b,c,qz=0;
//	*	content images
u+='<TR><TD colspan=2><HR><FONT COLOR="#aa0000"><B>IMAGES FROM IMG TAGS</B></font></TD></TR>';for(o=cuf_body;o.length>7;){l=o.toLowerCase();
s=l.indexOf("<img ");if(s>0){o=o.substr(s+4);l=o.toLowerCase();te=l.indexOf(">");if(te<1)te=o.length-1;
s=5+l.indexOf("src='");e=l.indexOf("'",s);if(s<6){s=5+l.indexOf('src="');e=l.indexOf('"',s);};
if(s<6){s=4+l.indexOf('src=');e=l.indexOf(' ',s);if(l.indexOf('>',s)<e){e=l.indexOf('>',s);};};
if(s>4 && e>s){b=o.substr(s,e-s);a=absoluteUrl(b);j=u.indexOf(a);if(j<1){
s2=5+l.indexOf("alt='");e2=l.indexOf("'",s2);if(s2<6){s2=5+l.indexOf('alt="');e2=l.indexOf('"',s2);};
if(s2<6){s2=4+l.indexOf('alt=');e2=l.indexOf(' ',s2);if(l.indexOf('>',s2)<e2){e2=l.indexOf('>',s2);};};
if(s2>4){c=o.substr(s2,e2-s2);}else{c="";};
u+='<TR><TD align=right><A HREF="'+a+'" TARGET="_blank" TITLE="Open in new window '+b+'">'+b+'<BR><SMALL>'+c+'</SMALL></A></TD>';
u+='<TD align=left><A HREF="'+a+'" TARGET="_blank" TITLE="Open in new window '+b+'"><IMG SRC="'+a+'" HEIGHT="32" BORDER="1" ALT="Open in new window '+b+'" align=left></TD></TR>';
qz++;
};};o=o.substr(te);}else{o="";};};
if(qz<1){u+='<TR><TD align=center colspan=2>none</TD></TR>'};


//html attr images
u+='<TR><TD colspan=2><HR><FONT COLOR="#aa0000"><B>IMAGES FROM BACKGROUND ATTRIBUTES</B></font></TD></TR>';
qz=0;
for(o=cuf_body;o.length>7;){l=o.toLowerCase();
s=12+l.indexOf("background='");e=l.indexOf("'",s);if(s<13){s=12+l.indexOf('background="');e=l.indexOf('"',s);};
if(s<13){s=11+l.indexOf('background=');e=l.indexOf(' ',s);if(l.indexOf('>',s)<e){e=l.indexOf('>',s);};};
if(s>11 && e>s){b=o.substr(s,e-s);a=absoluteUrl(b);j=u.indexOf(a);if(j<1){
u+='<TR><TD align=right><A HREF="'+a+'" TARGET="_blank" TITLE="Open in new window '+b+'">'+b+'</A></TD>';
u+='<TD align=left><A HREF="'+a+'" TARGET="_blank" TITLE="Open in new window '+b+'"><IMG SRC="'+a+'" HEIGHT="32" BORDER="1" ALT="Open in new window '+b+'" align=left></TD></TR>';
qz++;
};o=o.substr(te);}else{o="";};};
if(qz<1){u+='<TR><TD align=center colspan=2>none</TD></TR>'};


//style images
u+='<TR><TD colspan=2><HR><FONT COLOR="#aa0000"><B>IMAGES FROM URL(XX) IN CSS</B></font></TD></TR>';
qz=0;
for(o=cuf_body;o.length>7;){l=o.toLowerCase();
s=5+l.indexOf("url('");e=l.indexOf("'",s);if(s<6){s=5+l.indexOf('url("');e=l.indexOf('"',s);};
if(s<6){s=4+l.indexOf('url(');e=l.indexOf(' ',s);if(l.indexOf('>',s)<e){e=l.indexOf('>',s);};};
if(s>5 && e>s){b=o.substr(s,e-s);a=absoluteUrl(b);j=u.indexOf(a);if(j<1){
u+='<TR><TD align=right><A HREF="'+a+'" TARGET="_blank" TITLE="Open in new window '+b+'">'+b+'</A></TD>';
u+='<TD align=left><A HREF="'+a+'" TARGET="_blank" TITLE="Open in new window '+b+'"><IMG SRC="'+a+'" HEIGHT="32" BORDER="1" ALT="Open in new window '+b+'" align=left></TD></TR>';
qz++;
};o=o.substr(te);}else{o="";};};
if(qz<1){u+='<TR><TD align=center colspan=2>none</TD></TR>'};


return u+'</TABLE>';};



/*
	*	*	*	*	*	RETURNS ALL MEDIA
*/





/*
	*	*	*	*	*	RETURNS ALL LINKS
*/
function extract_links(){
setmessage("Showing All Links from This File");var u='<TABLE align=center cellspacing=1 cellpadding=1 border=0 bgcolor=white><TR><TH colspan=2>URL LINKS REFERRED IN THIS FILE</TH></TR>',o=cuf_body.toLowerCase();
//css
u+='<TR><TD colspan=2><HR><FONT COLOR="#aa0000"><B>REFERENCES TO EXTERNAL CSS FILES</B></FONT></TD></TR>';
var qz=0;
i=o.indexOf("<link");if(i>0){e=o.indexOf(">",i);r=o.indexOf("rel=stylesheet",i);
if(r<i || r>e){r=o.indexOf("rel='stylesheet'",i);};
if(r<i || r>e){r=o.indexOf('rel="stylesheet"',i);};
if(r>i && r<e){ai=6+o.indexOf("href='",i);ae=o.indexOf("'",ai)
if(ai<i || ai>e){ai=6+o.indexOf('href="',i);ae=o.indexOf('"',ai);};
if(ai<i || ai>e){ai=5+o.indexOf('href=',i);ae=o.indexOf(' ',ai);};
if(ai>i && ai<e){url=cuf_body.substr(ai,ae-ai);u+='<TR><TD align=right><A HREF="#" TITLE="Open in Jinx: '+url+'" ONCLICK="gotoFile=\''+absoluteUrl(url)+'\';return false;">'+url+'</A></TD><TD align=left>external CSS</TD></TR>';qz++;};};};
if(qz<1){u+='<TR><TD align=center colspan=2>none</TD></TR>'};

//scripts
u+='<TR><TD colspan=2><FONT COLOR="#aa0000"><HR><B>REFERENCED TO EXTERNAL SCRIPT FILES</B></font></TD></TR>';
qz=0;
for(i=0;i<o.length;i++){i=o.indexOf("<script",i);if(i>0){e=o.indexOf(">",i);ai=5+o.indexOf("src='",i);ae=o.indexOf("'",ai)
if(ai<i || ai>e){ai=5+o.indexOf('src="',i);ae=o.indexOf('"',ai);};
if(ai<i || ai>e){ai=4+o.indexOf('src=',i);ae=o.indexOf(' ',ai);};
if(ai>i && ai<e){url=cuf_body.substr(ai,ae-ai);u+='<TR><TD align=right><A HREF="#" TITLE="Open in Jinx: '+url+'" ONCLICK="gotoFile=\''+absoluteUrl(url)+'\';return false;">'+url+'</A></TD><TD align=left>external Script</TD></TR>';qz++;};};if(i<1)i=99999999;};
if(qz<1){u+='<TR><TD align=center colspan=2>none</TD></TR>'};

//icon

//html
u+='<TR><TD colspan=2><FONT COLOR="#aa0000"><HR><B>LINKS IN COMMON A TAGS</B></font></TD></TR>';
qz=0;
for(i=0;i<o.length;i++){i=o.indexOf("<a ",i);if(i>0){e=o.indexOf(">",i);
ai=7+o.indexOf("title='",i);ae=o.indexOf("'",ai)
if(ai<i || ai>e){ai=7+o.indexOf('title="',i);ae=o.indexOf('"',ai);};
if(ai<i || ai>e){ai=6+o.indexOf('title=',i);ae=o.indexOf(' ',ai);};
if(ai>i && ai<e){tit=cuf_body.substr(ai,ae-ai);}else{tit="";};
ai=6+o.indexOf("href='",i);ae=o.indexOf("'",ai)
if(ai<i || ai>e){ai=6+o.indexOf('href="',i);ae=o.indexOf('"',ai);};
if(ai<i || ai>e){ai=5+o.indexOf('href=',i);ae=o.indexOf(' ',ai);};
if(ai>i && ai<e){url=cuf_body.substr(ai,ae-ai);u+='<TR><TD align=right><A HREF="#" TITLE="Open in Jinx: '+url+'" ONCLICK="gotoFile=\''+absoluteUrl(url)+'\';return false;">'+url+'</A></TD><TD align=left>'+tit+'</TD></TR>';qz++;};
};if(i<1)i=99999999;};
if(qz<1){u+='<TR><TD align=center colspan=2>none</TD></TR>'};

//hidden

return u+'</TABLE>';};






/*
	*	*	*	*	*	RETURNS ONLY PLAIN TEXT
*/
function extract_text(){setmessage("Showing Only Plane Text within This File");var o=cuf_body,x=1,a='',c=0,u='',l=0,s,i,i2,re;
//strip js
for(redo=1;redo>0;){redo=0;s=o.toLowerCase();i=s.indexOf("<script");if(i>0){i2=s.indexOf("</script",i);
i2=s.indexOf(">",i2);o=o.substr(0,i-1)+o.substr(i2+1);redo=1;};};
//strip css
for(redo=1;redo>0;){redo=0;s=o.toLowerCase();i=s.indexOf("<style");if(i>0){i2=s.indexOf("</style",i);
if(i2>0){i2=s.indexOf(">",i2);o=o.substr(0,i-1)+o.substr(i2+1);redo=1;};};};
//trim
re=/\f/g;o=o.replace(re,"§§");re=/\n/g;o=o.replace(re,"§§");re=/\r/g;o=o.replace(re,"§§");re=/\t/g;o=o.replace(re,"§§");re=/\v/g;o=o.replace(re,"§§");
//br 2 cr
re=/<BR>/g;o=o.replace(re,"§§");re=/<br>/g;o=o.replace(re,"§§");
//strip tags
x=1;u="";l=o.length;for(t=0;t<l;t++){a=o.substr(t,1);if(a=="<"){x=0;}else if(a==">"){x=1;}else{if(x)u+=a;};};o=u;u="";
//cr 2 br
re=/§§§§/g;o=o.replace(re,"§§");o=o.replace(re,"§§");o=o.replace(re,"§§");o=o.replace(re,"§§");o=o.replace(re,"§§");o=o.replace(re,"§§");re=/§§/g;o=o.replace(re,"<br>");
return '<TABLE align=center cellspacing=1 cellpadding=1 border=0 bgcolor=white><TR><TH colspan=1>ONLY PLAIN TEXT WITHIN THIS FILE</TH></TR><TR><TD align=left>'+o+'</TD></TR></TABLE>';};





/*
	*	*	*	*	*	RETURNS ALL TEXTS
*/
function extract_xtext(){setmessage("Showing All Plane Text within This File");var o=cuf_body,x=1,a='',c=0,u='',l=0,s,i,i2,re;
//strip js
for(redo=1;redo>0;){redo=0;s=o.toLowerCase();i=s.indexOf("<script");if(i>0){i2=s.indexOf("</script",i);
i2=s.indexOf(">",i2);o=o.substr(0,i-1)+o.substr(i2+1);redo=1;};};
//strip css
for(redo=1;redo>0;){redo=0;s=o.toLowerCase();i=s.indexOf("<style");if(i>0){i2=s.indexOf("</style",i);
if(i2>0){i2=s.indexOf(">",i2);o=o.substr(0,i-1)+o.substr(i2+1);redo=1;};};};
//trim
re=/\f/g;o=o.replace(re,"§§");re=/\n/g;o=o.replace(re,"§§");re=/\r/g;o=o.replace(re,"§§");re=/\t/g;o=o.replace(re,"§§");re=/\v/g;o=o.replace(re,"§§");
//br 2 cr
re=/<BR>/g;o=o.replace(re,"§§");re=/<br>/g;o=o.replace(re,"§§");
//strip tags
x=1;u="";l=o.length;for(t=0;t<l;t++){a=o.substr(t,1);if(a=="<"){x=0;}else if(a==">"){x=1;}else{if(x)u+=a;};};o=u;u="";
//cr 2 br
re=/§§§§/g;o=o.replace(re,"§§");o=o.replace(re,"§§");o=o.replace(re,"§§");o=o.replace(re,"§§");o=o.replace(re,"§§");o=o.replace(re,"§§");re=/§§/g;o=o.replace(re,"<br>");
return '<TABLE align=center cellspacing=1 cellpadding=1 border=0 bgcolor=white><TR><TH colspan=1>ALL PLAIN TEXT WITHIN THIS FILE</TH></TR><TR><TD align=left>'+o+'</TD></TR></TABLE>';};











/*
	*	*	*	*	*	PARSE NEWLY LOADED FILE F
*/
function parse(f){
	busy();
	cuf_body=f;
	if(f){cuf_len=f.length;}else{cuf_len=0;};
	cuf_mime=cuf_type;
	switch(cuf_mime){
		case "php3":case "php4":case "php5":case "php":cuf_descri="php application";cuf_class="h";break;
		case "asp":case "aspx":cuf_descri="asp application";cuf_class="h";break;
		case "css":cuf_descri="style sheet";cuf_class="c";break;
		case "js":cuf_descri="JavaScript file";cuf_class="s";break;
		case "html":case "htm":cuf_descri="HTML file";cuf_class="h";break;
		case "xml":case "xhml":cuf_descri="XML file";cuf_class="h";break;
		case "txt":cuf_descri="Plain Text";cuf_class="d";break;
		default:cuf_descri="Unknown";cuf_class="h";break;
	};
	redrawNeeded++;
	var p=cronoUrl.join("");
	if(p.indexOf(cuf_url)<1){
		cronoUrl[cronoKey]=cuf_url;
		cronoText[cronoKey]=cuf_url;
		cronoKey++;
	};
};




/*
	*	*	*	*	*	REDRAW MAIN CONTENT WITH PROPER MODE
*/
function redraw(){
	//verify renderMode
	switch(renderMode){
	case "info":case "hex":case "dec":break;
	case "full":if(cuf_class!="h"){renderMode="info";};break;
	case "html":if(cuf_class!="h"){renderMode="info";};break;
	case "script":if(cuf_class!="h" && cuf_class!="s"){renderMode="info";};break;
	case "style":if(cuf_class!="h" && cuf_class!="c"){renderMode="info";};break;
	case "images":if(cuf_class=="d"){renderMode="info";};break;
	case "media":if(cuf_class!="h" && cuf_class!="s"){renderMode="info";};break;
	case "link":if(cuf_class=="i" || cuf_class=="d" || cuf_class=="m"){renderMode="info";};break;
	case "text":if(cuf_class!="h"){renderMode="info";};break;
	case "xtext":if(cuf_class!="h" && cuf_class!="s"){renderMode="info";};break;
	default:renderMode="info";break;};
	//adjust headers
	setaddress();
	setmenu();
	//render content
	var u='';
	switch(renderMode){
	case "hex":u=extract_hex();break;
	case "dec":u=extract_dec();break;
	case "full":u=extract_full();break;
	case "html":u=extract_html();break;
	case "script":u=extract_script();break;
	case "style":u=extract_css();break;
	case "images":u=extract_imgs();break;
	case "link":u=extract_links();break;
	case "text":u=extract_text();break;
	case "xtext":u=extract_xtext();break;
	default:u=extract_info();break;
	};
	mainHandler.innerHTML=u;
};


/*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*

																I/O FUNCTIONS

*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*/


//	*	*	*	*	*	OPENS FLOAT PANEL TO ASK THE FILE URL (v=pred value)
function askaddress(v){
	var u='<DIV style="width:100%;text-align:center;">&nbsp;<BR>&nbsp;<BR><TABLE ALIGN=CENTER bgcolor="#bbbbbb" border=1><TR><FORM NAME="theurl" METHOD=POST ACTION="#" onsubmit="openaddress();return false;"><TD align=center style="background:#dddddd;background-color:#dddddd;">';
	u+='<B>Enter the URL address to read  <A HREF="#" ONCLICK="setfpan(0);return false;">[X]</A></B><BR><INPUT TYPE="text" SIZE=88 NAME="url" VALUE="'+v+'"><BR>';
	u+='<INPUT TYPE="button" VALUE="CANCEL" ONCLICK="setfpan(0);"><INPUT TYPE="submit" VALUE="OPEN"></TD></FORM></TABLE></DIV>';
	setfpan(u);
};

//	*	*	*	*	*	LOADS NEW FILE FROM URL STATED IN THE THEURL FORM - CLOSES THE FLOAT PANEL
function openaddress(){var u=document.theurl.url.value;if(u){gotoFile=u;setfpan(0);};};

//	*	*	*	*	*	LOADS NEW FILE U - CLOSES THE FLOAT PANEL
function closeandgo(u){if(u){gotoFile=u;setfpan(0);};};

function askcrono(){var u='<DIV style="width:100%;text-align:center;">&nbsp;<BR>&nbsp;<BR><TABLE ALIGN=CENTER bgcolor="#bbbbbb" border=1><TR><TD align=center style="background:#dddddd;background-color:#dddddd;">';
u+='<B>Choose the address from crono <A HREF="#" ONCLICK="setfpan(0);return false;" TITLE="close panel - cancel">[X]</A></B></TD></TR><TR><TD align=center style="background:#ffffff;background-color:#ffffff;">';

for(t=0;t<cronoKey;t++){
u+='<A HREF="#" ONCLICK="closeandgo(\''+cronoUrl[t]+'\');return false;">'+cronoUrl[t]+' ['+cronoText[t]+']</A><BR>';
};


u+='</TD></TABLE></DIV>';
setfpan(u);
};






/*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*

																TIMED FUNCTIONS

*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*	*/

//	*	*	*	*	*	MAIN TIMED PROCEDURE
function passo(){
	if(errorCode>0){
		errorCode--;
		if(errorCode<20 && errorCode>0){
			errorHandler.style.height=errorCode;
		};
	};
	if(gotoFile!=""){
		cuf_url=gotoFile;
		splitUrl();
		cuf_url=assembleUrl();
		setaddress();
		cuf_mime="zero";
		setmenu();
		loading();
		ask_file();
		gotoFile="";
	};
	if(redrawNeeded>0){redrawNeeded=0;redraw();}
};

