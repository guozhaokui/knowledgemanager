/*
	输入一个文本，统计用到的所有的字，然后随机生成一个文本例子。
	相当于一个常用字的随机分布
*/
var log = console.log;
var fs = require('fs');
var handler = require('./handler.js');
var dthandler = require('./datahandler.js');

var buf = fs.readFileSync('../sample/2/zhenhuan.txt','utf8');
buf = handler.prehandletxt(buf);

//num是重复几次
function genrandom(buf,wlen,num,f){
	var words=new dthandler.clusterdt();
	var len = buf.length;
	for(var i=0; i<len-wlen; i++){
		var w = buf.slice(i,i+wlen);
		i%1000==0?log(i/len):"";
		if(w.indexOf(' ')<0)
			words.adddt(w);
	}
	var w1=[];
	for( v in words.smpdt ){
		w1.push(v);	
	}
	var outbuf='';
	for(var n=0,sz=num*w1.length; n<sz; n++){
		outbuf+=w1[parseInt(Math.random()*w1.length)];
	}
	fs.writeFileSync(f,outbuf,'utf8');
}

genrandom(buf,1,10,__dirname+'/rand10.txt');