/**
 * Created by Administrator on 2017/4/12 0012.
 */

$(function(){
	
	var _smallImg = $("#smallImg"); //小图
	var _smallArea = $("#smallArea"); //小区域
	
	var _bigImg = $("#bigImg"); //大图
	var _bigArea = $("#bigArea"); //大区域
	
	//刚加载就隐藏大区域
	_bigArea.css("display","none");
	//设置小区域的宽高
	//width() innerWidth() outerWidth()
	//_smallArea.width/_bigArea.width == _smallImg.width/_bigImg.width
	//_smallArea.width = _smallImg.width/_bigImg.width * _bigArea.width;
	//_smallArea.width( _smallImg.width() / _bigImg.width() * _bigArea.width() );
	// _smallArea.height( _smallImg.height() / _bigImg.height() * _bigArea.height() );
	
	//放大系数/放大比例
	var scale = _bigImg.width() / _smallImg.width();
	
	//鼠标移动事件
	$(document).mousemove(function(e){
		
		var leftSide = _smallImg.offset().left; //小图左边界
		var rightSide = leftSide + _smallImg.width(); //右边界
		var topSide = _smallImg.offset().top; //上边界
		var bottomSide = topSide + _smallImg.height(); //下边界
		
		//如果在小图区域内
		if (e.pageX > leftSide && e.pageX < rightSide && e.pageY > topSide && e.pageY < bottomSide) {
			
			//显示小区域
			_smallArea.css("display", "block");
			
			var x = e.pageX - _smallImg.offset().left - _smallArea.width()/2;
			var y = e.pageY - _smallImg.offset().top - _smallArea.height()/2;
			
			//如果超出左边界, 则设置x为0
			if (x < 0) {
				x = 0;
			}
			//如果超出右边界, 则设置为右边界位置的值
			else if ( x > _smallImg.width()-_smallArea.width() ) {
				x = _smallImg.width()-_smallArea.width();
			}
			
			//如果超出上边界, 则最小为0
			if (y < 0) {
				y = 0;
			}
			//如果超出下边界, 则设置为下边界位置的值
			else if ( y > _smallImg.height()-_smallArea.height() ) {
				y = _smallImg.height()-_smallArea.height();
			}
			
			
			//移动小区域
			_smallArea.css({left: x, top: y});
			
			//移动大图的位置
			_bigImg.css({left: -x*scale, top:-y*scale});
			
		}
		else {
			//隐藏小区域
			_smallArea.css("display", "none");
		}
		
	})
	
	//显示隐藏大区域
	_smallArea.hover(
		function () {
			_bigArea.show();
		},
		function () {
			_bigArea.hide();
		}
	)
	
})