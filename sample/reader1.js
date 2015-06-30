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
	//排序，去掉少的
	this.sort=function(cutnum){
		var sorted = new Array(this.dtnum);
		var i=0;
		for(var k in this.smpdt){
			sorted[i++]=[k,this.smpdt[k]];
		}
		sorted.sort(function(a,b){return b[1]-a[1];});
		//去掉少的
		if(cutnum>0){
			var n=0;
			for(; n<sorted.length; n++){
				if(sorted[n][1]<cutnum)
					break;
			}
			return sorted.slice(0,n);
		}
		return sorted;
	}
	this.save=function(f){
		var sted = this.sort(3);
		var outbuf= new Array(sted.length);
		var i=0;
		sted.forEach(function(v){outbuf[i++]=(v[0]+' '+v[1]);});
		fs.writeFileSync(f,outbuf.join('\r\n'));	
	}
}

function statword(buf,wlen,cutnum){
	var words=new clusterdt();
	var len = buf.length;
	for(var i=0; i<len-wlen; i++){
		var w = buf.slice(i,i+wlen);
		//i%1000==0?log(i/len):"";
		words.adddt(w);
	}
	return words.smpdt;//words.sort(cutnum==null?3:cutnum);
}
//单个字的概率
var word1 = statword(buf,1);
/*
word1.forEach(function(w){
	w[1]/=buf.length;
});
*/
//两个字的概率P(w1w2)
var word2 = statword(buf,2);
/*
word2.forEach(function(w){
})
*/
//计算在w1后面跟着w2的概率
function getPW2(w1,w2){
	var w=w1+w2;
	var wn = word2[w];
	log('wn='+wn+','+word1[w1]);
	if(!wn) return 0;
	return wn/word1[w1];
}
//计算是句子的概率
log(getPW2('黄','蓉' ));
log(getPW2('欧','阳' ));
//w1 w2的概率