(function(w){
	w.move=move;
})(window)



function move(wrap, callback) {

	var content = wrap.children[0];

	// 计算临界值
	var linjie = document.documentElement.clientWidth - content.offsetWidth;
	// 定义元素起始位置
	var elePoint = 0;
	var startPoint = 0;
	wrap.addEventListener('touchstart', function(event) {
		content.style.transition = '';
		var touch = event.changedTouches[0];
		// 获取手指的起始位置和元素起始位置
		elePoint = content.offsetLeft;
		startPoint = touch.clientX;
			
		if(callback && typeof callback.start === 'function'){
			callback.start();
		}

	});
	wrap.addEventListener('touchmove', function(event) {
		var touch = event.changedTouches[0];
		// 获取手指结束位置
		var endPoint = touch.clientX;
		// 计算手指距离差
		disX = endPoint - startPoint;
		// 计算元素结束位置
		var toPoint = disX + elePoint;
		// 判断结束位置是否越界,越界则触发橡皮筋效果,越来越难拉
		if(callback && typeof callback.move  === 'function'){
			toPoint = callback.move(toPoint,disX);
		}
		content.style.left = toPoint + 'px';



	});
	wrap.addEventListener('touchend', function(event) {
		if(callback && typeof callback.end  === 'function'){
			callback.end(content);
		}
	});

	return false;

}
