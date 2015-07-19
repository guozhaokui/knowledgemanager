
var fs = require('fs');
var log = console.log;

function prehandletxt(buf){
	//预处理一下，修改所有的符合为空格
	buf = buf.replace(/\r\n/g,' ');
	var biaodian = '，。：！“”‘’…、？（）《》　/';
	var ebiaodian = escape(biaodian).replace(/%/g,'\\');
	var regbiao = new RegExp('[+'+ebiaodian+']','g');
	buf = buf.replace(regbiao,' ');
	//空格也去掉
	buf = buf.replace(/[ ]*/g,'');
	return buf;
}
exports.prehandletxt=prehandletxt;