define(function(require, exports, modules) {
	return function(jquery) {
		(function($) {
			$.fn.extend({
				tableDrag : function(options) {
					return this.each(function() {
						var $obj = $(this), $headers = $('thead>tr>th', $obj);
						//判断当前th中是否有span 如果没有 则添加
						$.each($headers,function(i,v){
							if($('span.ui-resize',$(v)).length<1){
								$(v).append('<span class="f-r ui-resize"></span>');
							}
						});
						var items = $('thead>tr>th>span.ui-resize', $obj);
						var $tbody = $('tbody', $obj), $thead = $('thead', $obj);
						//拖拽列宽的标记线
						var $curGbox = $('#rs_mwest-grid');
						//单元格中span mousedown
						items.mousedown(function(e) {
							if ($(e.target).closest("th>span", $obj).length !== 1) {
								return false;
							}
							//获取当前列的索引
							var ci = drag.getCellIndex(this);
							drag.dragStart(ci, e, drag.getOffset(ci));
							return false;
						});
						$headers.mousemove(function(e) {
							if (drag.resizing) {
								drag.dragMove(e);
								return false;
							}
						});
						$(document).bind("mouseup", function() {
							if (drag.resizing) {
								drag.dragEnd();
								return false;
							}
							return true;
						});
						//拖拽表格相关
						var ts = this, drag = {
							//浏览器类型
							msie : navigator.appName === 'Microsoft Internet Explorer',
							resizing : false,
							tblwidth : $obj.width,
							//拖拽开始
							dragStart : function(i, x, y) {
								var gridLeftPos = $tbody.offset().left;
								drag.resizing = {
									idx : i,
									startX : x.clientX,
									sOL : x.clientX - gridLeftPos
								};
								$thead[0].style.cursor = "col-resize";
								//显示标记线
								$curGbox.css({
									display : "block",
									left : x.clientX - gridLeftPos,
									top : y[1],
									height : y[2]
								});
								document.onselectstart = function() {
									return false;
								};
							},
							//拖拽进行中
							dragMove : function(x) {
								if (drag.resizing) {
									var diff = x.clientX - drag.resizing.startX, h = $headers[this.resizing.idx], newWidth = h.offsetWidth + diff, hn, nWn;
									$curGbox.css({
										left : drag.resizing.sOL + diff
									});
									this.newWidth = drag.tblwidth + diff;
									h.newWidth = newWidth;
								}
							},
							//拖拽结束
							dragEnd : function() {
								$thead[0].style.cursor = "default";
								if (drag.resizing) {
									var idx = drag.resizing.idx, nw = $headers[idx].newWidth || $headers[idx].width;
									nw = parseInt(nw, 10);
									$curGbox.css("display", "none");
									//自动设置列宽功能计算时 取width的百分比 所以不能回填这个值
									//$headers[idx].width = nw;
									$headers[idx].style.width = nw + "px";
									drag.tblwidth = this.newWidth || drag.tblwidth;
									$tbody.css("width", drag.tblwidth + "px");
									$thead.css("width", drag.tblwidth + "px");
									$thead.scrollLeft = $tbody.scrollLeft;
									//拖拽结束后，要将td中对应的div的宽度改变
									drag.resizeContent(nw);
									drag.resizing = false;
								}
								document.onselectstart = function() {
									return true;
								};
							},
							//重置表格中的宽度
							resizeContent : function(nw) {
								$.each($('tr', $obj), function(i, v) {
									var $cTd = $(v).find('td').eq(drag.resizing.idx);
									$cTd.find('div').css("width", nw + "px");
								});

							},
							//获取指定单元格的索引
							getCellIndex : function(cell) {
								var c = $(cell);
								if (c.is('tr')) {
									return false;
								}
								c = (!c.is('td') && !c.is('th') ? c.closest("td,th") : c)[0];
								if (drag.msie) {
									return $.inArray(c, c.parentNode.cells);
								}
								return c.cellIndex;
							},
							//获取指定列方位
							getOffset : function(iCol) {
								var $th = $($headers[iCol]), ret = [$th.position().left + $th.outerWidth()];
								ret[0] -= $tbody[0].scrollLeft;
								ret.push($thead.offset().top);
								ret.push($tbody.offset().top - $thead.offset().top + $tbody.height());
								return ret;
							}
						};

					});
				}
			});
		})(jquery);
	};
});
