//
function say(str:string){
    process.stdout.write(str);
}

process.stdin.setEncoding('utf-8');

function read(prompt:string, onSentense:(string)=>void) {
    var str='';
    say(prompt + ':');
    process.stdin.resume();
    process.stdin.once('data', function(chunk) {
        process.stdin.pause();
        str+=chunk;
        var p = str.indexOf('\n');
        if(p>=0){
            var line = str.substr(0,p);
            str =str.substr(p);
            onSentense(line);
        }
    });
}

function readloop(){
    read("Bot",(data)=>{
        if(data.indexOf('eee')>=0){
        }
        say('get '+data+'\n');
        readloop();
    })
}

readloop();

