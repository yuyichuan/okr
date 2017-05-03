define(function(require, exports, module) {
	$.fn.layout = function(options) {
		var defaults = {
			dir : 'W', //E(东),S(南),W(西),N(北)
			resizer : false, //ture表示可拖动，false表示不可拖动
			toggler : false, //ture表示可以点击打开关闭，false表示不能点击打开关闭
			width : 100//默认宽度
		};
		var opts = $.extend({}, defaults, options);
		return this.each(function() {
			west_layout($(this), opts);
		});
	};
	//左侧
	function west_layout($elem, opts) {
		//添加拖动条
		if (opts.resizer) {
			$elem.after(create_layout_resizer('west'));
		}
		layout_w_W_E($elem);
		//元素宽度计算
		//改变窗体大小执行函数
		$(window).resize(function() {
			layout_w_W_E($elem);
		}).trigger('resize');
		//拖动执行
		w_resizer($elem);
	}

	//右侧
	function east_layout($elem, opts) {
		//添加拖动条data_all
		if (opts.resizer) {
			$elem.after(create_layout_resizer('east'));
		}
		//元素宽度计算
		//改变窗体大小执行函数
		$(window).resize(function() {
			alert(2)
			layout_w_W_E($elem);
		}).trigger('resize');
		//拖动执行
		e_resizer($elem);
	}

	//创建拖动条，
	function create_layout_resizer(dir) {
		return str = '<div class="ui_layout_resizer ui_layout_resizer_' + dir + '" >' + '&nbsp;</div>';
	}

	//左右计算高度
	function layout_h_W_E($elem) {
		var h = $elem.parent().outerHeight();
		$elem.outerHeight(h).siblings('div').outerHeight(h);

	}

	//左右计算宽度
	function layout_w_W_E($elem) {
		var $parent = $elem.parent(),
            $west = $parent.children('.ui_layout_west'),
            $east = $parent.children('.ui_layout_east'),
 			total_w = $parent.outerWidth(true),
 			west_w = $west.outerWidth(true)|| 0,
 			west_h= $west[0].offsetHeight|| 0,
 			east_w = $east.outerWidth(true) || 0,
 			$resizer = $parent.children('.ui_layout_resizer'),
 			resizer_w = $($resizer[0]).outerWidth(true),
 			resizer_len = $resizer.length,
 			$center = $parent.children('.ui_layout_center');
        	$center.outerWidth(total_w - west_w - east_w - resizer_w * resizer_len);
        	//alert('west_w:'+west_w);
        if (west_w > 0) {
            $west.css({ 'left': 0 + 'px' });
            $resizer.css({ 'left': west_w + 'px','height':west_h+'px'});
            $center.css({ 'left': west_w + resizer_w + 'px' });
            $parent.css({'height':west_h+30+'px'});
        }
        if (east_w > 0) {
            $east.css({ 'right': 0 + 'px' });
            $resizer.css({ 'right': east_w + 'px' });
            $center.css({ 'left':0 + 'px' });
        }
	}

	//拖动
	function w_resizer($elem) {
		var $parent = $elem.parent(), $resizer = $parent.children('.ui_layout_resizer_west'), resizer_h = $resizer.height(), resizer_w = $resizer.width(), mouse_down_client = {};
		$resizer.mousedown(function(e) {
			var offset = $resizer.offset();
			mouse_down_client.X = e.clientX;
			mouse_down_client.Y = e.clientY;
			diff = mouse_down_client.X - offset.left;
			//创建拖动条
			create_layout_resizer_move($parent, offset, 'west');
			//只有当mousedown的情况才执行mousemove事件
			$(document).mousemove(function(e) {
				$('.ui_layout_resizer_move').css('left', e.clientX - diff);
			});
			//mouseup的时候解绑mousemove函数
			$(document).mouseup(function(e) {
				//$(document).unbind('mousemove');
				$resizer_move = $parent.children('.ui_layout_resizer_move');
				if ($resizer_move.length > 0) {
					$elem.outerWidth($resizer_move.offset().left);
					layout_w_W_E($elem);
					$('.ui_layout_resizer_mask').remove();
					$('.ui_layout_resizer_move').remove();
				}
			});
		});
	}

	function e_resizer($elem) {
		var $parent = $elem.parent(), $resizer = $parent.children('.ui_layout_resizer_east'), resizer_h = $resizer.height(), resizer_w = $resizer.width(), mouse_down_client = {};
		$resizer.mousedown(function(e) {
			var offset = $resizer.offset();
			mouse_down_client.X = e.clientX;
			mouse_down_client.Y = e.clientY;
			diff = mouse_down_client.X - offset.left;
			//创建拖动条
			create_layout_resizer_move($parent, offset, 'east');
			//只有当mousedown的情况才执行mousemove事件
			$(document).mousemove(function(e) {
				$('.ui_layout_resizer_move').css('left', e.clientX - diff);
			});
			//mouseup的时候解绑mousemove函数
			$(document).unbind('mouseup').mouseup(function(e) {
				$(document).unbind('mousemove');
				$resizer_move = $parent.children('.ui_layout_resizer_move');
				if ($resizer_move.length > 0) {
					$elem.outerWidth($parent.width() - $resizer_move.offset().left);
					layout_w_W_E($elem)
					$('.ui_layout_resizer_mask').remove();
					$('.ui_layout_resizer_move').remove();
				}
				//触发highstoc内部的resize事件
				$(window).trigger('resize');
			});
		});
	}

	//创建拖动条,跟随鼠标移动
	function create_layout_resizer_move($parent, offset, dir) {
		var $win = $(window), win_h = $(window).height(), win_w = $(window).width(), $resizer = $parent.children('.ui_layout_resizer_' + dir);
		var str = '<div class="ui_layout_resizer_mask" style="width:' + win_w + 'px;height:' + win_h + 'px;position:absolute;z-index:9;top:0;left:0;"></div>' + '<div class="ui_layout_resizer_move" style="position:absolute;z-index:99;height:' + $resizer.height() + 'px; width:' + $resizer.width() + 'px;left:' + offset.left + 'px ; top:' + offset.top + '; " >' + '&nbsp;</div>';
		$parent.append(str);

	}

});
