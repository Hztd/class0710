if(document.addEventListener){
	document.addEventListener('DOMContentLoaded',global);
}else{
	setTimeout(global,1000);
}

function global(){

	
	var navList = document.querySelector('#wrap #header .down #navList');
	var headerLiNodes = document.querySelectorAll('#wrap #header .down #navList li');
	var headerDown = document.querySelector('#wrap #header .down');
	
	

	setUlWidth();
	function setUlWidth(){
		var sumWidth = 0;
		for(var i=0;i<headerLiNodes.length;i++){
			sumWidth+=headerLiNodes[i].offsetWidth;
		}
		console.log(sumWidth);
		navList.style.width = sumWidth+'px'
	}
	
	
	var callback = {
		t1:0,
		t2:0,
		disX:0,
		start:function(){
			this.t1=Date.now();
		},
		move:function(target,disX){
			this.disX= disX;
			return XPJ(target);
		},
		end:function(content){
			this.t2=Date.now();
			// 速度=路程/时间
			var speed = this.disX/(this.t2-this.t1);
			// 移动的距离
			backAndSilde(content,speed,callback)
		}
	}
	
	move(headerDown,callback);
	

	var linjie = document.documentElement.clientWidth - navList.offsetWidth;
	
	
	
	function backAndSilde(content,speed){
		content.style.transition = 'left 1s linear';
				var left = content.offsetLeft;
					
					var endMove = speed*300;
					console.log('滑动的距离：',endMove);  
					console.log('当前的left为',content.offsetLeft);

					
					var over = left+endMove;
					
					if(over<0 && over>linjie){
						content.style.left = over+'px';
						console.log('滑动后的left为：',content.offsetLeft);

					}
					
	
				
				
				if (left > 0) {
					content.style.transition = 'left 1s cubic-bezier(.17,.67,.56,1.44)';
					content.style.left = 0;
				} else if (left < linjie) {
					content.style.transition = 'left 1s cubic-bezier(.17,.67,.56,1.44)';
		
					content.style.left = linjie + 'px';
				}
	}
	
	
	function XPJ(target){
		var smallWhite = 0;
		if(target>0){
			
			smallWhite =target;
			
			var scale = 1-smallWhite/document.documentElement.clientWidth;
			
			target = smallWhite*scale;
			console.log(smallWhite,scale);
			return target;
		}else if(target<linjie){
			
			smallWhite = Math.abs(target)-Math.abs(linjie);
			
			var scale = 1-smallWhite/document.documentElement.clientWidth;
			
			target = linjie-smallWhite*scale;
			return target;
		}
		return target;
	}
	
	
	
}