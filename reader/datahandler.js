var fs = require('fs');
var log = console.log;

function clusterdt(){
	this.dtnum=0;
	this.smpdt={};
	this.adddt=function(v){
		if(this.smpdt[v]===undefined){
			this.smpdt[v]=1;
			this.dtnum++;
		}else{
			this.smpdt[v]++;
		}
	}
	this.clear=function(){
		this.smpdt={};
		this.dtnum=0;
	}
	this.sort=function(){
		var sorted = new Array(this.dtnum);
		var i=0;
		for(var k in this.smpdt){
			sorted[i++]={k:k,v:this.smpdt[k]};
		}
		sorted.sort(function(a,b){return b.v-a.v;});
		//去掉少的
		var cutnum=3;
		var n=0;
		for(; n<sorted.length; n++){
			if(sorted[n].v<cutnum)
				break;
		}
		return sorted.slice(0,n);
	}
	this.save=function(f){
		var sted = this.sort();
		var outbuf= new Array(sted.length);
		var i=0;
		sted.forEach(function(v){outbuf[i++]=(v.k+' '+v.v);});
		fs.writeFileSync(f,outbuf.join('\r\n'));	
	}
}

exports.clusterdt = clusterdt;