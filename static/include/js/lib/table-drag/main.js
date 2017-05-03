/*global $*/
/**
 * 表格拖拽功能的入口文件
 * @author 王洋
 * @version 2015-08-06
 * @since 2015-08-06
 */
define(function(require, exports, module) {
	var Util = require('util'), util = new Util(), Dialog = require('dialog'), popWin = new Dialog();
	require('lib/table-drag/tableDrag')($);
	require('lib/table-drag/sortAble');
	require('lib/table-drag/layout');
	var tableDragCommon = {
		/**
		 * 获取排序的信息
		 * @return {Array:sortArr 包含索引，列名，宽度信息的数组}
		 * @param {Object:$sortObj 调整顺序目标对象}
		 * @param {Object:$widthObj 计算宽度的对象}
		 * @author wangyang
		 * @version 2016-11-24
		 * @since 2016-11-24
		 */
		getSortMsg : function($sortObj, $widthObj) {
			//获取当前表头索引值
			var sortArr = [], cI = '', cN = '', colWidthStr = '';
			$.each($sortObj, function(i, v) {
				var cObj = {};
				cObj.cI = i, cObj.cN = $(v).attr('col-name');
				//cObj.cW = $(v)[0].offsetWidth;
				//如果初始化就点击列设置/保存 页面只有width的百分比 没有style=“width” 所以取值要进行判断
				colWidthStr = $widthObj[i].style.width;
				if (colWidthStr) {
					//如果不为空,说明有当前宽度
					colWidthStr = colWidthStr.substring(0, colWidthStr.length - 2);
					cObj.cW = parseFloat(colWidthStr);
				} else {
					//为空，则只有width的百分比，那就取实际宽度
					cObj.cW = $widthObj[i].offsetWidth;
				}
				sortArr.push(cObj);
			});
			return sortArr;
		},
		/**
		 * 获取初始化页面信息
		 * @return {Array:sortArr 包含索引，列名，宽度信息的数组}
		 * @param {Object:$sortObj 目标对象}
		 * @author wangyang
		 * @version 2016-11-24
		 * @since 2016-11-24
		 */
		getInitSortMsg : function($sortObj) {
			//获取当前表头索引值
			var sortArr = [], cI = '', cN = '', tableWidth = 0, sum = 0;
			//解决IE8下取不到window.innerWidth的问题
			if(window.innerWidth){
				screenWidth = window.innerWidth - 20;
			}else{
				var B= document.body, D= document.documentElement;  
        		screenWidth= Math.min(D.clientWidth, B.clientWidth)-20; 
			}
			$.each($sortObj, function(i, v) {
				var cObj = {}, colWidth = 0;
				cObj.cI = i, cObj.cN = $(v).attr('col-name');
				colWidth = $(v).attr('width');
				if (colWidth) {
					cObj.cW = parseFloat(colWidth) / 100 * screenWidth * 0.95;
					sum += cObj.cW;
				}
				sortArr.push(cObj);
			});
			return sortArr;
		},
		/**
		 * 获取设置列的选项
		 * @return {void}
		 * @param {String:setFormUrl 保存设置的url}
		 * @author wangyang
		 * @version 2016-11-01
		 * @since 2016-11-01
		 */
		getFormOrderDlg : function(setFormUrl, dragTable, callBackFunc) {
			$.dialog({
				id : 'getFormOrderDlg',
				lock : true,
				padding : '0',
				title : '列设置',
				content : $('#sortArea')[0],
				init : function() {
					var $that = this;
					//动态计算表格的宽度
					var realWidth = 0;
					$.each($('#sortable li'), function(i, v) {
						realWidth += parseInt($(v)[0].offsetWidth, 10) + 20;
					});
					$('#sortable').css({
						'width' : realWidth + 'px'
					});

					//设置鼠标移动标记
					$(document).off('mousedown', '#sortable li').on('mousedown', '#sortable li', function() {
						$(this).css({
							'cursor' : 'move'
						});
					});
					$(document).off('mouseup', '#sortable li').on('mouseup', '#sortable li', function() {
						$(this).css({
							'cursor' : 'pointer'
						});
					});
					//列拖拽
					$("#sortable").sortable();
					$("#sortable").disableSelection();
					//保存-
					$('body').off('click', '#saveSortBtn').on('click', '#saveSortBtn', function() {
						var sortArr = [];
						sortArr = tableDragCommon.getSortMsg($('li', $('#sortable')), $('th', dragTable));
						//设置表单排序
						tableDragCommon.setForm(sortArr, setFormUrl, callBackFunc);
						$that.close();
						return false;
					});
					//取消
					$('body').off('click', '.cancelDlg').on('click', '.cancelDlg', function() {
						$that.close();
						return false;
					});
				}
			});
		},
		/**
		 * 表格设置
		 * @return {void}
		 * @param {Array:sortArr 包含索引，列名，宽度信息的数组}
		 * @param {String:setFormUrl 设置表单请求的url}
		 * @author wangyang
		 * @version 2016-11-01
		 * @since 2016-11-01
		 */
		setForm : function(sortArr, setFormUrl, callBackFunc) {
			$('#formMsg').val(JSON.stringify(sortArr));
			$.commonAjax({
				type : 'post',
				url : setFormUrl,
				data : $('#setForm').serialize(),
				success : function(re) {
					popWin.tinyAlert('设置成功！', 1);
					//设置成功以后 调用刷新页面的方法，对于业务来讲需要记住当前搜索条件，所以各自页面写自己的毁掉
					setTimeout(function() {
						callBackFunc();
					}, 1100);

				},
				error : function(msg, status) {
					popWin.alert(msg);
				}
			});
		},
		//初始化方法
		init : function(options) {
			//表格拖拽--更改列宽
			$(options.dragTable).tableDrag();
			//获取设置列排序弹窗
			$('body').delegate(options.sortFormBtn, 'click', function() {
				tableDragCommon.getFormOrderDlg(options.setFormUrl, options.dragTable, options.callBackFunc);
				return false;
			});
			//点击 保存当前格式
			$('body').delegate(options.saveFormStyleBtn, 'click', function() {
				var sortArr = tableDragCommon.getSortMsg($('li', $('#sortable')), $('th', dragTable));
				tableDragCommon.setForm(sortArr, options.setFormUrl, options.callBackFunc);
				return false;
			});
			//点击 自动设置列宽
			$('body').delegate(options.initWidthBtn, 'click', function() {
				var sortArr = tableDragCommon.getInitSortMsg($('th', $(options.dragTable)));
				tableDragCommon.setForm(sortArr, options.setFormUrl, options.callBackFunc);
				return false;
			});
		}
	};
	module.exports = tableDragCommon;
});
