
var fs = require('fs');
var log = console.log;
var iconv = require('iconv-lite');
var bWin = require('os').platform()==='win32';
log('bwin='+bWin);
if(!bWin)
	process.stdin.setEncoding('utf8');

process.stdin.on('readable', function() {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    //process.stdout.write('data: ' + chunk);
	onInput(chunk);
  }
});

process.stdin.on('end', function() {
  process.stdout.write('end');
});

function onInput(s){
	if(bWin)
		s = iconv.decode(s, 'gbk');
	log(s);
}
//log(readSync());