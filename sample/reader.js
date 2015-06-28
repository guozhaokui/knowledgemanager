var log = console.log;
var fs = require('fs');

var buf = fs.readFileSync('sdyxz.txt','utf8');

//预处理一下，修改所有的符合为空格
buf = buf.replace(/\r\n/g,' ');
var biaodian = '，。：！“”‘’…、？（）《》　/';
var ebiaodian = escape(biaodian).replace(/%/g,'\\');
var regbiao = new RegExp('[+'+ebiaodian+']','g');
buf = buf.replace(regbiao,' ');

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
			sorted[i++]={k:k,v:this.smpdt[k]};
		}
		sorted.sort(function(a,b){return b.v-a.v;});
		//去掉少的
		var cutnum=3;
		var n=0;
		for(; n<sorted.length; n++){
			if(sorted[n].v<cutnum)
				break;
		}
		return sorted.slice(0,n);
	}
	this.save=function(f){
		var sted = this.sort();
		var outbuf= new Array(sted.length);
		var i=0;
		sted.forEach(function(v){outbuf[i++]=(v.k+' '+v.v);});
		fs.writeFileSync(f,outbuf.join('\r\n'));	
	}
}

function statword(buf,wlen,f){
	var words=new clusterdt();
	var len = buf.length;
	for(var i=0; i<len-2; i++){
		var w = buf.slice(i,i+wlen);
		i%1000==0?log(i/len):"";
		if(w.indexOf(' ')<0)
			words.adddt(w);
	}
	words.save(f);
}

statword(buf,1,'word1.txt');
statword(buf,2,'word2.txt');
statword(buf,3,'word3.txt');
statword(buf,4,'word4.txt');
statword(buf,5,'word5.txt');
statword(buf,6,'word6.txt');
statword(buf,7,'word7.txt');

