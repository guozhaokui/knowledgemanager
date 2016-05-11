//
function read(prompt, callback:(string)=>void) {
    var str='';
    process.stdout.write(prompt + ':');
    process.stdin.resume();
    process.stdin.setEncoding('utf-8');
    process.stdin.on('data', function(chunk) {
        process.stdin.pause();
        str+=chunk;
        var p = str.indexOf('\n');
        if(p>=0){
            var line = str.substr(0,p);
            str =str.substr(p);
            callback(line);
        }
    });
}

function readloop(){
    read("Bot1",(data)=>{
        console.log('get '+data);
        readloop();
    })
}

readloop();

