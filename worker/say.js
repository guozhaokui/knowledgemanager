var log = console.log;

function say(msg){
	log(msg);
	//�Լ�˵��ҲҪ��¼
	memo.listen(msg,'ME');
}
