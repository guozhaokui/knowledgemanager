var log = console.log;
var fs = require('fs');
var dthandler = require('./datahandler.js');

//var buf = fs.readFileSync(__dirname+'/../sample/en/ANDERSEN/05.txt','utf8');
var buf = fs.readFileSync(__dirname+'/../sample/de/fengzhiying.txt','utf8');

function statwordlatin(buf){
	var words=new dthandler.clusterdt();
	buf=buf.replace(/\r\n/g,' ');
	buf=buf.replace(/\r/g,' ');
	buf=buf.replace(/[ \t\.,\'\":\!;\?\-]+/g,' ');
	allwords = buf.split(' ');
	allwords.forEach(function(w){
		words.adddt(w.toLowerCase());
	})
	return words.sort(0);//words.sort(cutnum==null?3:cutnum);
}

var words = statwordlatin(buf);
var b1='';
words.forEach(function(w){
	b1+=JSON.stringify(w);
	b1+='\r\n';
});
fs.writeFileSync('d:/temp/xk.txt',b1,'utf8');
log(words);




//计算在w1后面跟着w2的概率
function getPW2(w1,w2){
	var w=w1+w2;
	var wn = word2[w];
	if(!wn) return 0;
	return wn/word1[w1];
}

//计算当s的第一个字出现的时候，出现s的概率
function getPS(s){
	var pw=1;//word1[s[0]]/buf.length;		先不考虑第一个出现的概率
	var len = s.length;
	for(var i=1; i<len; i++){
		pw*=getPW2(s[i-1],s[i]);
	}
	return pw;
}

//计算是句子的概率
function getPS1(s){
	var pw=word1[s[0]]/buf.length;
	var len = s.length;
	for(var i=1; i<len; i++){
		pw*=getPW2(s[i-1],s[i]);
	}
	return pw;
	
}

//随机输出
function sayrandom(){
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

exports.check=getPS;
//w1 w2的概率