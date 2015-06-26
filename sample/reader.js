var log = console.log;
var fs = require('fs');

var buf = fs.readFileSync('sdyxz.txt','utf8');

function clusterdt(){
	this.smpdt={};
	this.adddt=function(v){
		if(this.smpdt[v]===undefined){
			this.smpdt[v]=1;
		}else{
			this.smpdt[v]++;
		}
	}
	this.clear=function(){
		this.smpdt={};
	}
	this.sort=function(){
		var sorted = [];
		for(var k in this.smpdt){
			sorted.push({k:k,v:this.smpdt[k]});
		}
		sorted.sort(function(a,b){return a.v>b.v?-1:1;});
		return sorted;
	}
	this.save=function(f){
		var sted = this.sort();
		var outbuf=[];
		sted.forEach(function(v){outbuf.push(v.k+' '+v.v);});
		fs.writeFileSync(f,outbuf.join('\r\n'));	
	}
}

var words=new clusterdt();
var len = buf.length;
/*
for(var i=0; i<len; i++){
	words.adddt(buf[i]);
}
log('len='+len);

//统计单个字的频率
words.save('word.txt');
*/

/*
//统计两个字的关联度
//\r\n 去掉么
//所有的两个字的个数
var w2len = len-1;
words.clear();
for(var i=0; i<len-1; i++){
	var w2 = buf[i]+buf[i+1];
	words.adddt(w2);
}
words.save('word2.txt');
*/

//三个字
words.clear();
for(var i=0; i<len-2; i++){
	var w = buf.slice(i,i+3);
	log(i/len);
	words.adddt(w);
}
words.save('word3.txt');

//4个字
words.clear();
for(var i=0; i<len-3; i++){
	var w = buf.slice(i,i+4);
	log(i/len);
	words.adddt(w);
}
words.save('word4.txt');

//5个字
words.clear();
for(var i=0; i<len-4; i++){
	var w = buf.slice(i,i+5);
	log(i/len);
	words.adddt(w);
}
words.save('word5.txt');

//6个字
words.clear();
for(var i=0; i<len-5; i++){
	var w = buf.slice(i,i+6);
	log(i/len);
	words.adddt(w);
}
words.save('word6.txt');