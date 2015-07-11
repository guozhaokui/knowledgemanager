var log = console.log;
var fs = require('fs');
var handler = require('./handler.js');
var dthandler = require('./datahandler.js');

var buf = fs.readFileSync(__dirname+'/rand10.txt','utf8');

buf = handler.prehandletxt(buf);


function statword(buf,wlen,cutnum){
	var words=new dthandler.clusterdt();
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
	if(!wn) return 0;
	return wn/word1[w1];
}

//计算是句子的概率
function getPS(s){
	var pw=1;//word1[s[0]]/buf.length;		先不考虑第一个出现的概率
	var len = s.length;
	for(var i=1; i<len; i++){
		pw*=getPW2(s[i-1],s[i]);
	}
	return pw;
}

//随机输出
function sayrandom(){
}

function test1(){
	log(getPW2('黄','蓉' ));
	log(getPW2('欧','阳' ));
	log(getPW2('武','功' ));
}

function test2(){
	//统计独立词
	var l = buf.length;
	var w = '';
	var lastw='';
	var lastp=0;
	var words={};
	for(var i=0; i<l; i++){
		w+=buf[i];
		var p = getPS(w);
		//log(w+'='+p);
		var lmt=0.7;
		if(p<lmt){
			w=buf[i];
			if(lastp>lmt){
				words[lastw]=lastp;
			}
		}else{
			lastw=w;
		}
		lastp=p;
	}
	var vw = [];
	for(var k in words){
		var cnt = word1[k[0]];
		if(cnt>15)	//第一个字超过多次以上
			vw.push([k,words[k],cnt]);
	}
	vw.sort(function(a,b){return b[1]-a[1];});
	log(vw);
}

debugger;
//log(getPS('编辑'));
test2();
exports.check=getPS;
//w1 w2的概率