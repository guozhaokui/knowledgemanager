var log = console.log;
var fs = require('fs');

var buf = fs.readFileSync('sdyxz.txt','utf8');

//预处理一下，修改所有的符合为空格
buf = buf.replace(/\r\n/g,' ');
var biaodian = '，。：！“”‘’…、？（）《》　/';
var ebiaodian = escape(biaodian).replace(/%/g,'\\');
var regbiao = new RegExp('[+'+ebiaodian+']','g');
buf = buf.replace(regbiao,' ');
//空格也去掉
buf = buf.replace(/[ ]*/g,'');

//统计个数
function clusterdt(){
	this.dtnum=0;
	this.smpdt={};
	this.adddt=function(v){
		if(this.smpdt[v]===undefined){
			this.smpdt[v]=1;
			this.dtnum++;
		}else{
			this.smpdt[v]++;
		}
	}
	this.clear=function(){
		this.smpdt={};
		this.dtnum=0;
	}
	this.sort=function(){
		var sorted = new Array(this.dtnum);
		var i=0;
		for(var k in this.smpdt){
			sorted[i++]=[k,this.smpdt[k]];
		}
		sorted.sort(function(a,b){return b[1]-a[1];});
		//去掉少的
		var cutnum=3;
		var n=0;
		for(; n<sorted.length; n++){
			if(sorted[n][1]<cutnum)
				break;
		}
		return sorted.slice(0,n);
	}
	this.save=function(f){
		var sted = this.sort();
		var outbuf= new Array(sted.length);
		var i=0;
		sted.forEach(function(v){outbuf[i++]=(v[0]+' '+v[1]);});
		fs.writeFileSync(f,outbuf.join('\r\n'));	
	}
}

function statword(buf,wlen){
	var words=new clusterdt();
	var len = buf.length;
	for(var i=0; i<len-wlen; i++){
		var w = buf.slice(i,i+wlen);
		i%1000==0?log(i/len):"";
		words.adddt(w);
	}
	return words.sort();
}

log(statword(buf,1));