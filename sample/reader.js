var log = console.log;
var fs = require('fs');

var buf = fs.readFileSync('sdyxz.txt','utf8');

var words={};
var len = buf.length;
for(var i=0; i<len; i++){
	if(words[buf[i]]===undefined){
		words[buf[i]]=1;
	}else
		words[buf[i]]++;
}
log('len='+len);
log(JSON.stringify(words));
