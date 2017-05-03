/*global $*/
/**
 * IVF通用模块
 * @author 王洋
 * @version 2015-08-06
 * @since 2015-08-06
 */
define(function(require, exports, module) {
	var Util = require('util'), util = new Util(), Dialog = require('dialog'), popWin = new Dialog();
	require('poshytip');
	var Common = {
		//错误提示泡泡
		initPoshytip : function($inputElem, context) {
			$inputElem.poshytip('disable');
			$inputElem.poshytip('destroy');
			$inputElem.poshytip({
				className : 'tip-yellowsimple',
				content : context,
				showOn : 'focus',
				showTimeout : 1,
				alignTo : 'target',
				alignX : 'center',
				offsetY : 5,
				allowTipHover : false
			});
		},
		/**
		 * 保存表单  防重复提交
		 * -保存成功之后页面跳转
		 * @return {void}
		 * @param {Object tarForm:要保存的表单,afterSaveUrl:保存成功后跳转的url}
		 * @author wangyang
		 * @version 2015-08-07
		 * @since 2015-08-07
		 */
		doSaveRefresh : function(tarForm, afterSaveUrl) {
			//用于异步请求中 防止重复提交 刷新表单token
			var refreshTokenUrl = $('#seajsFile').attr('data-refresh-token');
			var formData, saveUrl;
			saveUrl = tarForm.attr('action'), formData = tarForm.serialize();
			$.commonAjaxLink({
				type : 'post',
				url : saveUrl,
				data : formData,
				success : function(re) {
					popWin.tinyAlert('保存成功！', 1);
					setTimeout(function() {
						window.location.href = afterSaveUrl;
					}, 1500);
				},
				error : function(msg, status) {
					//异步提交，刷新token，保证重复提交验证功能正常
						$.get(refreshTokenUrl,{
							r : Math.random()
						}, function(data) {
							$('#formToken').val(data.data);
							popWin.alert(msg);
						}, 'json');
				}
			});
		},
		/**
		 * 保存表单
		 * -保存成功之后页面跳转
		 * @return {void}
		 * @param {Object tarForm:要保存的表单}
		 * @param {String:afterSaveUrl:保存成功后跳转的url}
		 * @author wangyang
		 * @version 2016-10-26
		 * @since 2016-10-26
		 */
		doSave : function(tarForm, afterSaveUrl) {
			var formData, saveUrl;
			saveUrl = tarForm.attr('action'), formData = tarForm.serialize();
			$.commonAjaxLink({
				type : 'post',
				url : saveUrl,
				data : formData,
				success : function(re) {
					popWin.tinyAlert('保存成功！', 1);
					setTimeout(function() {
						window.location.href = afterSaveUrl;
					}, 1500);
				},
				error : function(msg, status) {
					if (status == 2) {
						//后台返回2 则页面跳转
						window.location.href = msg;
					} else {
						popWin.alert(msg);
					}
				}
			});
		},
		/**
		 * 删除-列表中的删除,适用于删除成功后跳转页面情况
		 * @return {void}
		 * @param {String options:删除时的参数组成的对象}
		 * @author wangyang
		 * @version 2015-08-04
		 * @since 2015-08-04
		 */
		doDel : function(options) {
			$.commonAjax({
				type : 'post',
				url : options.url,
				data : options.data,
				success : function(re) {//成功-刷新页面
					popWin.tinyAlert('删除成功！', 1);
					setTimeout(function() {
						if(options.afterUrl){
							window.location.href = options.afterUrl;
						}
						if(options.callback){
							options.callback();
						}
					}, 1500);
				},
				error : function(msg, status) {
					popWin.alert(msg);
				}
			});
		},
		/**
		 * 复选框全选
		 * @return {void}
		 * @param {checkBtn:全选按钮 checkBox:目标复选框}
		 * @author tangxu
		 * @version 2015-08-10
		 * @since 2015-08-10
		 */
		selectAll : function(checkBtn, checkBox) {
			var isChecked = checkBtn.prop("checked");
			!isChecked ? checkBox.prop("checked", false) : checkBox.prop("checked", true);
			checkBox.trigger('change');
		},
		/**
		 * 查看-编辑 页面显示切换
		 * @return {void}
		 * @author wangyang
		 * @version 2015-08-22
		 * @since 2015-08-22
		 */
		toggleView : function() {
			//定义 显示页的按钮区域，编辑页的按钮区域，编辑页区域，显示页区域。
			var $editBtns, $saveBtns, $editArea, $showArea;
			$editBtns = $('.edit-btns'), $saveBtns = $('.save-btns'), $editArea = $('.edit-area'), $showArea = $('.show-area');
			//编辑,返回按钮 隐藏;保存，取消按钮显示；显示区域隐藏；编辑区域显示；
			$editBtns.toggle();
			$saveBtns.toggle();
			$editArea.toggle();
			$showArea.toggle();
		},
		/**
		 * 数字统计
		 * @return {void}
		 * @author wangyang
		 * @version 2016-06-28
		 * @since 2016-06-28
		 */
		showNum : function() {
			var _pnt = $('.textCount');
			_pnt.on('input propertychange', function(e) {
				var len = $(this).val().length;
				$(this).next('.text-r').find('span').empty().text(len);
			});
			_pnt.trigger('propertychange');
			_pnt.on('focus', function() {
				var len = $(this).val().length;
				$(this).next('.text-r').find('span').empty().text(len);
			});

			// IE9浏览器中按 backspace, delete 键不会触发 input 事件，所以这里改用 keyup 处理
			var tempEle = document.createElement("b");
			tempEle.innerHTML = "<!--[if IE 9]><i></i><![endif]-->";
			var isIE9 = tempEle.getElementsByTagName("i").length === 1;
			if (isIE9) {
				_pnt.on("keyup", function(event) {
					var len = $(this).val().length;
					$(this).next('.text-r').find('span').empty().text(len);
				});
			}
			return this;
		}
		
	};
	module.exports = Common;
});
