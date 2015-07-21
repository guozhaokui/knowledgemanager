var log = console.log;

function say(msg){
	log(msg);
	//自己说的也要记录
	memo.listen(msg,'ME');
}
